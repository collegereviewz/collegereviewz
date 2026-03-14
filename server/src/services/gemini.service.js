import dotenv from 'dotenv';

dotenv.config();

/**
 * Extract fee structure and other details from college-related text
 * STUBBED: AI removal requested by user.
 * @returns {Promise<null>}
 */
export const extractCollegeInfo = async (collegeName, scrapedText = '', retries = 2) => {
  console.log('AI extractCollegeInfo disabled by configuration');
  return null;
};

/**
 * Categorize news items using regex
 * STUBBED: AI removal requested by user. Improved with regex categorization.
 * @param {Array} newsItems - List of raw news items {title, link}
 * @returns {Promise<Array>} - News items with categorization
 */
export const categorizeNews = async (newsItems) => {
  console.log('News Categorization: Using Regex Fallback (AI disabled)');

  const rules = [
    { category: 'MBBS', keywords: /NEET|Medical|AIIMS|MCC|Doctors|NMC|BDS|Health Minister|MBBS|AYUSH/i },
    { category: 'BE/B.Tech', keywords: /JEE|JoSAA|Engineering|B\.Tech|IIT|NIT|IIIT|NTA|CSAB|COAP/i },
    { category: 'Law', keywords: /CLAT|Law|NLU|BCI|AIBE|legal education/i },
    { category: 'Science', keywords: /B\.Sc|M\.Sc|Research|KVPY|INSPIRE|Science|ISRO|Physics|Chemistry/i },
    { category: 'Commerce', keywords: /CA|CMA|CS|MBA|Commerce|CAT|MAT|XAT|Accounts|Finance|IIM/i },
    { category: 'Pharmacy', keywords: /B\.Pharm|D\.Pharm|Pharmacy|GPAT|Pharma|PCI/i },
    { category: 'ME/M.Tech', keywords: /GATE|M\.Tech|ME|PG Engineering/i },
    { category: 'B.Sc Nursing', keywords: /Nursing|B\.Sc Nursing|ANM|GNM|Nursing Council/i }
  ];

  return newsItems.map(item => {
    let category = 'General';
    let type = 'News';
    const title = item.title;

    for (const rule of rules) {
      if (rule.keywords.test(title)) {
        category = rule.category;
        break;
      }
    }

    if (/alert|notification|notice|announcement|deadline|last date/i.test(title)) {
      type = 'Exam Alerts';
    } else if (/admission|apply|registration|enrollment/i.test(title)) {
      type = 'Admission Alerts';
    }

    return {
      ...item,
      category,
      type,
      summary: title.length > 60 ? title.substring(0, 57) + '...' : title
    };
  });
};
