# Web Scraping + AI Data Fetching Flow (CollegeReviewz)

This document explains the **end-to-end pipeline** that populates and refreshes the `colleges` collection in MongoDB using:

- **Web scraping (Python)** for fees/listings (Collegedunia)
- **AI + Google Search (Node/Gemini)** for rich “profile” fields (about, cutoffs, admissions, etc.)
- **Lightweight website scraping (Node/Cheerio)** for periodic updates (notifications/news/events + regex-based fees/packages)

---

## Big-picture flowchart (how everything connects)

```mermaid
flowchart TD
  %% ===== Inputs =====
  A1[AISHE master CSV\nclient/src/pages/ExploreColleges/aisheall.csv] -->|match + upsert| DB[(MongoDB: colleges)]
  A2[Manual / curated lists\nscripts/*.json] -->|sync JSON fields| DB

  %% ===== Web scraping path (Python) =====
  subgraph PY["Python scraping (Collegedunia)"]
    P1[Playwright listing scrape\nserver/scraper/universal_scraper.py\n(or scrape_listing.py)] --> P2[universal_results.json\nlisting_results.json]
    P2 --> P3[Mongo sync / merge\nserver/scraper/bulk_sync.py]
    P4[Scrapy + Playwright spider\nserver/scraper/collegescraper/spiders/collegedunia.py] --> P5[Mongo pipeline writes\nserver/scraper/collegescraper/pipelines.py]
  end

  P3 --> DB
  P5 --> DB

  %% ===== AI enrichment path (Node + Gemini) =====
  subgraph AI["AI enrichment (Gemini + Google Search tool)"]
    G1[Select target colleges\nmissing or stale fields] --> G2[Prompt Gemini with\n tools: { googleSearch: {} }]
    G2 --> G3[Parse/clean JSON response]
    G3 -->|upsert / update by _id or name| DB
  end

  %% Scripts that run AI enrichment
  S1[server/scripts/sync_all_colleges.js\n(batch update by updates.lastUpdated)] --> G1
  S2[server/scripts/fetch_rcc_gemini.js\n(one-off: RCC example)] --> G2

  %% ===== Live updates scraping (Node/Cheerio) =====
  subgraph UPD["Official-site updates (cron)"]
    C1[node-cron every 10 min\nserver/src/services/cron.service.js] --> C2[updateCollegeData(collegeId)\nserver/src/services/update.service.js]
    C2 --> C3[guessDomain() OR college.officialWebsite]
    C3 --> C4[axios GET homepage + cheerio parse\nscrapeUpdates()]
    C4 -->|write updates + sometimes fees/packages| DB
  end

  %% ===== API + Client consumption =====
  DB --> API[Express API\nserver/src/index.js]
  API --> R1[/api/colleges\nlist + search + filters\ncollege.controller.getColleges]
  API --> R2[/api/colleges/:name/courses\ncollege.controller.getCollegeCourses]
  API --> R3[/api/colleges/:name/stats\ncollege.controller.getCollegeStats]
  API --> R4[/api/colleges/:id/updates\nupdate.controller.getCollegeUpdates]
  R1 --> UI[React client pages\nclient/src/pages/ExploreColleges/*]
  R2 --> UI
  R3 --> UI
  R4 --> UI
```

---

## Data “truth” location (where final data lives)

- **Database**: MongoDB collection `colleges` using `server/src/models/College.model.js`
- **What gets stored**:
  - Identity/metadata: `name`, `state`, `district`, `address`, `institutionType`, `managementType`, `establishedYear`, IDs like `aisheId`, `aicteId`
  - Profile content: `about`, `cutOffs`, `admissionProcess`, `ranking`, `studentLife`, `facilities`, `scholarships`, `faq`, etc.
  - Money fields: `fees`, `avgPackage`, `highestPackage`
  - Media: `photos[]`, `videos[]`, `mapLink`
  - Course table: `courses[]` (programme/level/course/intake/fees)
  - “Live updates”: `updates.notifications[]`, `updates.news[]`, `updates.events[]`, `updates.lastUpdated`

---

## Pipeline 1: Base dataset import (AISHE → MongoDB)

### What it does
Takes the AISHE CSV (`client/src/pages/ExploreColleges/aisheall.csv`) and **matches it to existing colleges** (or inserts new ones).

### Script
- `server/scripts/enrich-with-aishe.js`

### Matching strategy (high level)
- Prefer match by `aisheId` if present
- Else match by normalized `name + state`
- Else fallback to a light prefix/fuzzy check (still within same state)

### Output
Updates/sets:
- `aisheId`, `state`, `district`, `university`, `universityAisheCode`, `officialWebsite`, `establishedYear`, `managementType`, `institutionType`, `address`

---

## Pipeline 2: Web scraping (Python) → MongoDB (fees/placement/courses)

You have **two scraping styles**:

### (A) Playwright listing scraper (fast “table extraction”)
**Goal**: quickly extract a lot of colleges and basic numbers from Collegedunia listing tables:
- `fees`
- `avg_placement`
- `highest_placement`

**Key files**
- `server/scraper/universal_scraper.py`  
  - loops categories/states
  - writes progress to `universal_results.json`
- `server/scraper/scrape_listing.py`  
  - a single-page test version writing `listing_results.json`
- `server/scraper/bulk_sync.py`  
  - reads `universal_results.json`
  - matches scraped names to DB names (cleaning + word-subset heuristic)
  - updates `avgPackage` / `highestPackage`
  - attempts to fill missing `courses[].fees` via an array filter

**Important note**
`bulk_sync.py` updates course fees using:
- `courses.$[elem].fees = fee_val` only for courses where the existing fee is empty-ish.
This means it’s a “fill blanks” pass rather than a strict overwrite.

### (B) Scrapy + Playwright spider (targeted “courses-fees” page)
**Goal**: for colleges missing fee data, search Collegedunia and scrape the `.../courses-fees` table.

**Key files**
- Spider: `server/scraper/collegescraper/spiders/collegedunia.py`
  - reads DB colleges with `fees` missing (pilot: `.limit(10)`)
  - hits `https://collegedunia.com/search?q=...`
  - opens first result → `/courses-fees`
  - extracts `(course, fees, intake)` rows
  - yields items containing `aicteId`, `name`, `courses[]`
- Pipeline: `server/scraper/collegescraper/pipelines.py`
  - uses `aicteId` to update the target college
  - matches embedded course docs by `courses.course`
  - writes `courses.$.fees` and `courses.$.intake`

---

## Pipeline 3: AI “profile enrichment” (Gemini + Google Search) → MongoDB

This path is for **rich narrative + structured sections** that are hard to scrape reliably:
- About/history/accreditation
- Admissions steps
- Cutoffs/ranks
- Rankings & placement narrative + recruiters list
- Photos/videos links
- Scholarships, facilities, student life
- FAQs
- Contact details

### How it works
1. **Choose a college**
   - One-off (example): RCC
   - Batch: select colleges whose `updates.lastUpdated` is missing or older than a cutoff
2. **Prompt Gemini** with a strict JSON schema and force the model to use:
   - `tools: [{ googleSearch: {} }]`
3. **Parse the JSON**
   - cleanup code fences
   - fallback regex to grab the first `{ ... }` block if needed
4. **Write to MongoDB**
   - Upsert by name regex (RCC script) or update by `_id` (bulk sync script)
   - Set `updates.lastUpdated` to mark the record as refreshed

### Scripts
- `server/scripts/fetch_rcc_gemini.js`
  - one-off “RCC Institute…” example
  - builds a very detailed prompt and upserts by name regex
- `server/scripts/sync_all_colleges.js`
  - batch mode
  - selects colleges with missing/stale `updates.lastUpdated`
  - rate limit protection:
    - retries (incl. longer waits on 429)
    - fixed delay between colleges
  - writes progress to `server/sync_progress.json`

### Why this is separate from the Python scrapers
- The AI path is meant to fill **all sections** of a “profile page” in one shot.
- The Python scrapers are better for **structured tables** (fees/intake/placements) at scale.

---

## Pipeline 4: “Live Updates” scraping (official websites) via cron → MongoDB

This path is **not Gemini-based**. It uses classic HTML fetch + parse.

### What it does
Periodically refreshes:
- `updates.notifications[]`
- `updates.news[]`
- `updates.events[]`
- `updates.lastUpdated`

Also attempts simple regex extraction for:
- `fees`
- `avgPackage`
- `highestPackage`

### How it works
- Scheduler: `server/src/services/cron.service.js`
  - runs every **10 minutes**
  - loops through colleges (currently `College.find({})`)
  - calls `updateCollegeData(college._id)` sequentially with a small delay
- Scraper: `server/src/services/update.service.js`
  - determines a domain via:
    - `college.officialWebsite` OR
    - `guessDomain(college.name)` mapping
  - does `axios.get()` of the homepage
  - uses `cheerio` to extract links and categorize them as notice/news/event
  - saves `college.updates = scrapedData`

### On-demand endpoint
- Route: `GET /api/colleges/:id/updates`
  - Controller: `server/src/controller/update.controller.js`
  - Uses a **24h cache check**:
    - if `updates.lastUpdated` is recent, return cached
    - else scrape now via `updateCollegeData(id)`

---

## How the client finally sees this data

### Backend endpoints (main ones)
- `GET /api/colleges`
  - search by `name/district/state`
  - filter by `state`, `course`, `stream`
  - returns paginated results with review-derived `rating` + `reviewsCount`
  - implemented in `server/src/controller/college.controller.js` (`getColleges`)
- `GET /api/colleges/:name/courses`
  - returns `courses[]` for a single college
- `GET /api/colleges/:name/stats`
  - returns review aggregates
- `GET /api/colleges/:id/updates`
  - returns `updates` (and triggers refresh if stale)

### Frontend
Your Explore/College profile pages render whatever exists in MongoDB for that college:
- “static-ish” sections (AI-enriched or imported)
- “live updates” sections (cron/endpoint scraped)

---

## Practical “what to run when” (typical workflows)

### 1) Initialize / expand the base dataset
- Run `server/scripts/enrich-with-aishe.js` to populate identifiers + metadata for many colleges.

### 2) Fill fees/placements quickly (web scraping)
- Run Playwright listing scrape to get broad coverage:
  - `server/scraper/universal_scraper.py`
- Sync it into MongoDB:
  - `server/scraper/bulk_sync.py`

### 3) Fill full profile sections (AI + Google Search)
- For one college:
  - `server/scripts/fetch_rcc_gemini.js`
- For many colleges in batches:
  - `server/scripts/sync_all_colleges.js` (optionally pass batch size)

### 4) Keep “updates” fresh automatically
- Start the server; cron will run:
  - `server/src/services/cron.service.js`
- Or hit:
  - `GET /api/colleges/:id/updates`

---

## Key files index (quick navigation)

### AI (Gemini)
- `server/scripts/sync_all_colleges.js`
- `server/scripts/fetch_rcc_gemini.js`
- `server/scripts/verify_rcc.js` (verifies one document shape/fields)

### Base import (AISHE)
- `server/scripts/enrich-with-aishe.js`

### Python scraping
- `server/scraper/universal_scraper.py`
- `server/scraper/scrape_listing.py`
- `server/scraper/bulk_sync.py`
- `server/scraper/collegescraper/spiders/collegedunia.py`
- `server/scraper/collegescraper/pipelines.py`

### Server (API + cron updates)
- `server/src/index.js`
- `server/src/models/College.model.js`
- `server/src/controller/college.controller.js`
- `server/src/controller/update.controller.js`
- `server/src/services/cron.service.js`
- `server/src/services/update.service.js`

