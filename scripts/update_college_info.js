const fs = require('fs');
const path = require('path');

const INFO_PATH = path.join(__dirname, 'college_info.json');

// New data to merge
const newGains = {
    "SIKKIM MANIPAL INSTITUTE OF TECHNOLOGY": {
        "website": "smit.smu.edu.in",
        "avgPackage": "₹6,48,000",
        "highestPackage": "₹54,00,000"
    },
    "PARUL INSTITUTE OF ENGINEERING & TECHNOLOGY": {
        "website": "paruluniversity.ac.in",
        "fees": "₹6,00,000",
        "avgPackage": "₹8,00,000",
        "highestPackage": "₹60,00,000"
    },
    "VISHWAKARMA GOVERNMENT ENGINEERING COLLEGE": {
        "website": "vgecg.ac.in",
        "fees": "₹12,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹22,00,000"
    },
    "SARVAJANIK COLLEGE OF ENGINEERING AND TECHNOLOGY": {
        "website": "scet.ac.in",
        "fees": "₹4,72,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹21,00,000"
    },
    "SRM MADURAI COLLEGE FOR ENGINEERING & TECHNOLOGY": {
        "website": "srmmcet.edu.in",
        "avgPackage": "₹5,80,000",
        "highestPackage": "₹12,00,000"
    },
    "S.S.AGRAWAL INSTITUTE OF ENGINEERING & TECHNOLOGY": {
        "website": "ssagrawal.org",
        "fees": "₹2,77,828",
        "avgPackage": "₹3,00,000",
        "highestPackage": "₹6,00,000"
    },
    "APOLLO INSTITUTE OF ENGGINEERING & TECHNOLOGY": {
        "website": "aiet.edu.in",
        "fees": "₹2,56,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹15,00,000"
    },
    "GOVERNMENT ENGINEERING COLLEGE PALANPUR": {
        "website": "gecpalanpur.ac.in",
        "fees": "₹12,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹5,00,000"
    },
    "SARDAR VALLABHBHAI PATEL INSTITUTE OF TECHNOLOGY (SVIT)": {
        "website": "svitvasad.ac.in",
        "fees": "₹3,64,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹16,00,000"
    },
    // Batch 2
    "MERCHANT ENGINEERING COLLEGE": {
        "website": "mec.edu.in",
        "fees": "₹1,60,000",
        "avgPackage": "₹2,00,000",
        "highestPackage": "₹3,60,000"
    },
    "SHRRE SWAMINARAYAN GADI INSTITUTE OF TECHNOLOGY": {
        "website": "ssgit.com",
        "fees": "₹2,40,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹15,00,000"
    },
    "COLLEGE OF ENGINEERING KALLOOPPARA": {
        "website": "cek.ac.in",
        "fees": "₹1,68,000",
        "avgPackage": "₹2,00,000",
        "highestPackage": "₹3,50,000"
    },
    "KMCT COLLEGE OF TECHNOLOGY AND MANAGEMENT": {
        "website": "kmct.edu.in",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹7,50,000"
    },
    "MUSALIAR COLLEGE OF ENGINEERING AND TECHNOLOGY": {
        "website": "musaliarcollege.com",
        "fees": "₹5,02,000",
        "avgPackage": "₹1,80,000",
        "highestPackage": "₹12,00,000"
    },
    "PROVIDENCE COLLEGE OF ENGINEERING": {
        "website": "providence.edu.in",
        "fees": "₹3,73,000",
        "avgPackage": "₹3,20,000",
        "highestPackage": "₹12,50,000"
    },
    "SREE NARAYANA GURU COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "sngcet.org",
        "fees": "₹5,02,000",
        "avgPackage": "₹4,20,000",
        "highestPackage": "₹6,30,000"
    },
    "SREE NARAYANA GURUKULAM COLLEGE OF ENGINEERING": {
        "website": "sngce.ac.in",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹4,00,000"
    },
    "ST. JOSEPH'S COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "sjcetpalai.ac.in",
        "fees": "₹5,02,000",
        "avgPackage": "₹3,60,000",
        "highestPackage": "₹8,00,000"
    },
    "TKM COLLEGE OF ENGINEERING": {
        "website": "tkmce.ac.in",
        "fees": "₹48,000",
        "avgPackage": "₹5,70,000",
        "highestPackage": "₹34,00,000"
    },
    // Batch 3
    "TOMS COLLEGE OF ENGINEERING": {
        "website": "toms.ac.in",
        "fees": "₹3,00,000"
    },
    "VEDAVYASA INSTITUTE OF TECHNOLOGY": {
        "website": "vedavyasa.ac.in",
        "fees": "₹1,60,000",
        "avgPackage": "₹4,80,000",
        "highestPackage": "₹12,50,000"
    },
    "VIDYA ACADEMY OF SCIENCE & TECHNOLOGY": {
        "website": "vidyaacademy.ac.in",
        "fees": "₹5,02,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹15,60,000"
    },
    "VISAT ENGINEERING COLLEGE": {
        "website": "visat.ac.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹5,60,000",
        "highestPackage": "₹12,00,000"
    },
    "GOVERNMENT COLLEGE OF ART AND DESIGN": {
        "website": "gcad.ac.in",
        "fees": "₹27,000"
    },
    "SANJEEVAN GROUP OF INSTITUTIONS": {
        "website": "sanjeevan.edu.in",
        "fees": "₹3,53,980",
        "avgPackage": "₹2,80,000",
        "highestPackage": "₹7,00,000"
    },
    "AGNIHOTRI COLLEGE OF ENGINEERING": {
        "website": "agnihotriengg.org",
        "fees": "₹3,60,000",
        "avgPackage": "₹3,00,000",
        "highestPackage": "₹3,50,000"
    },
    "AHINSA INSTITUTE OF TECHNOLOGY": {
        "website": "ahinsadeu.org",
        "fees": "₹3,60,360",
        "avgPackage": "₹2,50,000",
        "highestPackage": "₹5,00,000"
    },
    "ALL INDIA SHRI SHIVAJI MEMORIAL SOCIETY'S COLLEGE OF ENGINEERING": {
        "website": "aissmscoe.com",
        "fees": "₹4,59,132",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹14,00,000"
    },
    "ANURADHA COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "anuradhaengg.org",
        "fees": "₹3,38,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹10,00,000"
    },
    // Batch 4
    "ANNASAHEB DANGE COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "adcet.ac.in",
        "fees": "₹4,74,000",
        "avgPackage": "₹4,00,000"
    },
    "ARVIND GAVALI COLLEGE OF ENGINEERING": {
        "website": "agce.com",
        "fees": "₹3,60,000",
        "avgPackage": "₹1,80,000",
        "highestPackage": "₹13,00,000"
    },
    "ASHOKRAO MANE COLLEGE OF PHARMACY": {
        "website": "amcop.org",
        "fees": "₹3,40,000",
        "avgPackage": "₹2,50,000",
        "highestPackage": "₹4,00,000"
    },
    "ATHARVA COLLEGE OF ENGINEERING": {
        "website": "atharvacoe.ac.in",
        "fees": "₹4,24,000",
        "avgPackage": "₹5,50,000",
        "highestPackage": "₹12,00,000"
    },
    "B. K. BIRLA COLLEGE OF ARTS, SCIENCE & COMMERCE": {
        "website": "bkbirlacollegekalyan.com",
        "fees": "₹42,000",
        "avgPackage": "₹2,16,000"
    },
    "B. J. GOVERNMENT MEDICAL COLLEGE": {
        "website": "bjmc.edu.in",
        "fees": "₹5,31,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹8,00,000"
    },
    "B. K. P. S. COLLEGE OF ARCHITECTURE": {
        "website": "bkps.edu",
        "fees": "₹1,25,000"
    },
    "BABASAHEB NAIK COLLEGE OF ENGINEERING": {
        "website": "bncoepusad.ac.in",
        "fees": "₹2,57,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹4,00,000"
    },
    // Batch 7
    "CENTRAL INSTITUTE OF PETROCHEMICALS ENGINEERING & TECHNOLOGY": {
        "website": "cipet.gov.in",
        "fees": "₹2,71,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹12,00,000"
    },
    "CHHATRAPATI SHIVAJI MAHARAJ UNIVERSITY": {
        "website": "csmu.ac.in",
        "fees": "₹8,06,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹30,00,000"
    },
    "CHHATTISGARH INSTITUTE OF TECHNOLOGY RAIGARH": {
        "website": "citraigarh.com",
        "fees": "₹4,88,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹8,00,000"
    },
    "CHOUKSEY ENGINEERING COLLEGE": {
        "website": "cecbilaspur.ac.in",
        "fees": "₹2,40,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹12,00,000"
    },
    "CHRIST COLLEGE, IRINJALAKUDA": {
        "website": "christcollegeijk.edu.in",
        "fees": "₹90,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹10,00,000"
    },
    "COLLEGE OF ENGINEERING & TECHNOLOGY-PAYYANUR": {
        "website": "cetpayyanur.ac.in",
        "fees": "₹5,02,000",
        "avgPackage": "₹4,80,000",
        "highestPackage": "₹12,50,000"
    },
    "D.A.V. COLLEGE": {
        "website": "davchoshiarpur.org",
        "fees": "₹63,400",
        "avgPackage": "₹2,72,000"
    },
    "DERA NATUNG GOVERNMENT COLLEGE": {
        "website": "dngc.ac.in",
        "fees": "₹44,160",
        "avgPackage": "₹2,00,000"
    },
    "DR. S. & S. S. GHANDHY COLLEGE OF ENGINEERING": {
        "website": "ssgc.cteguj.in",
        "fees": "₹1,02,200",
        "avgPackage": "₹5,50,000",
        "highestPackage": "₹12,00,000"
    },
    // Batch 8
    "DR.S.S. BHATNAGAR UNIVERSITY INSTITUTE OF CHEMICAL ENGG. & TECH.": {
        "website": "uicet.puchd.ac.in",
        "fees": "₹80,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹20,00,000"
    },
    "DR. SHYAMA PRASAD MUKHERJEE INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY": {
        "website": "iiitnr.ac.in",
        "avgPackage": "₹16,25,000",
        "highestPackage": "₹85,00,000"
    },
    "FR. CONCEICAO RODRIGUES COLLEGE OF ENGINEERING": {
        "website": "frcrce.ac.in",
        "fees": "₹8,10,000",
        "avgPackage": "₹6,46,000",
        "highestPackage": "₹34,50,000"
    },
    "G. H. RAISONI COLLEGE OF ENGINEERING": {
        "website": "ghrce.raisoni.net",
        "fees": "₹6,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹18,00,000"
    },
    "G. S. MANDAL'S MARATHWADA INSTITUTE OF TECHNOLOGY MIT": {
        "website": "mit.asia",
        "fees": "₹4,00,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹23,00,000"
    },
    "GANDHI ACADEMY OF TECHNOLOGY AND ENGINEERING": {
        "website": "gate.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹4,50,000"
    },
    "GAYATRI VIDYA PARISHAD COLLEGE OF ENGINEERING": {
        "website": "gvpce.ac.in",
        "fees": "₹4,20,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹50,00,000"
    },
    "GODAVARI INSTITUTE OF ENGINEERING AND TECHNOLOGY": {
        "website": "giet.ac.in",
        "fees": "₹3,00,000",
        "avgPackage": "₹5,75,000",
        "highestPackage": "₹25,00,000"
    },
    "GOKARAJU RANGARAJU INSTITUTE OF ENGINEERING AND TECHNOLOGY": {
        "website": "griet.ac.in",
        "fees": "₹5,60,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹51,60,000"
    },
    "GURU NANAK DEV ENGINEERING COLLEGE": {
        "website": "gnecollege.com",
        "fees": "₹3,95,000",
        "avgPackage": "₹4,75,000",
        "highestPackage": "₹20,00,000"
    },
    // Batch 9
    "H.V.P.M.'S COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "hvpmcoet.in",
        "fees": "₹3,73,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹15,00,000"
    },
    "HIND INSTITUTE OF MEDICAL SCIENCES": {
        "website": "himsup.com",
        "avgPackage": "₹15,00,000",
        "highestPackage": "₹30,00,000"
    },
    "HYDERABAD INSTITUTE OF TECHNOLOGY AND MANAGEMENT HITAM": {
        "website": "hitam.org",
        "fees": "₹5,60,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹24,00,000"
    },
    "IDEAL INSTITUTE OF TECHNOLOGY, KAKINADA": {
        "website": "idealtech.edu.in",
        "fees": "₹1,60,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹36,00,000"
    },
    "IDEAL INSTITUTE OF TECHNOLOGY, GHAZIABAD": {
        "website": "idealit.edu.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹3,50,000"
    },
    // Batch 10
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT KOTTAYAM": {
        "website": "iiitkottayam.ac.in",
        "avgPackage": "₹11,91,000",
        "highestPackage": "₹50,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT SURAT": {
        "website": "iiitsurat.ac.in",
        "avgPackage": "₹15,59,000",
        "highestPackage": "₹1,20,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT VADODARA": {
        "website": "iiitvadodara.ac.in",
        "avgPackage": "₹12,00,000",
        "highestPackage": "₹56,30,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT ALLAHABAD": {
        "website": "iiita.ac.in",
        "fees": "₹2,58,000",
        "avgPackage": "₹33,00,000",
        "highestPackage": "₹1,20,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT LUCKNOW": {
        "website": "iiitl.ac.in",
        "avgPackage": "₹33,71,000",
        "highestPackage": "₹1,45,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT GUWAHATI": {
        "website": "iiitg.ac.in",
        "avgPackage": "₹16,75,000",
        "highestPackage": "₹71,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT MANIPUR": {
        "website": "iiitmanipur.ac.in",
        "fees": "₹7,48,000", // 1.87 * 4
        "avgPackage": "₹8,70,000",
        "highestPackage": "₹40,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT KALYANI": {
        "website": "iiitkalyani.ac.in",
        "fees": "₹8,20,000", // 2.05 * 4
        "avgPackage": "₹9,27,000",
        "highestPackage": "₹44,00,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT DHARWAD": {
        "website": "iiitdwd.ac.in",
        "avgPackage": "₹12,00,000",
        "highestPackage": "₹78,12,000"
    },
    "INDIAN INSTITUTE OF INFORMATION TECHNOLOGY IIIT RAICHUR": {
        "website": "iiitr.ac.in",
        "avgPackage": "₹18,00,000",
        "highestPackage": "₹45,00,000"
    },
    // Batch 11
    "INSTITUTE OF CHEMICAL TECHNOLOGY ICT MUMBAI": {
        "website": "ictmumbai.edu.in",
        "fees": "₹7,20,000",
        "avgPackage": "₹10,00,000",
        "highestPackage": "₹60,00,000"
    },
    "INSTITUTE OF ENGINEERING AND TECHNOLOGY IET LUCKNOW": {
        "website": "ietlucknow.ac.in",
        "fees": "₹3,40,000",
        "avgPackage": "₹8,20,000",
        "highestPackage": "₹53,00,000"
    },
    "INSTITUTE OF ENGINEERING AND TECHNOLOGY IET DAVV INDORE": {
        "website": "ietdavv.edu.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹70,00,000"
    },
    "ISLAMIC UNIVERSITY OF SCIENCE AND TECHNOLOGY IUST": {
        "website": "iust.ac.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹5,40,000",
        "highestPackage": "₹18,00,000"
    },
    "JEPPIAAR ENGINEERING COLLEGE": {
        "website": "jeppiaarclg.com",
        "fees": "₹4,00,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹21,00,000"
    },
    "JIS COLLEGE OF ENGINEERING": {
        "website": "jiscollege.ac.in",
        "fees": "₹4,70,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹15,00,000"
    },
    "JORHAT ENGINEERING COLLEGE": {
        "website": "jecassam.ac.in",
        "fees": "₹44,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹26,00,000"
    },
    "KIIT UNIVERSITY": {
        "website": "kiit.ac.in",
        "fees": "₹19,00,000",
        "avgPackage": "₹8,50,000",
        "highestPackage": "₹63,00,000"
    },
    "KONGU ENGINEERING COLLEGE": {
        "website": "kongu.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹5,50,000",
        "highestPackage": "₹45,00,000"
    },
    // Batch 12
    "KUMARAGURU COLLEGE OF TECHNOLOGY": {
        "website": "kct.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹50,00,000"
    },
    "KURUKSHETRA UNIVERSITY": {
        "website": "kuk.ac.in",
        "fees": "₹2,23,150",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹44,00,000"
    },
    "L. D. COLLEGE OF ENGINEERING": {
        "website": "ldce.ac.in",
        "fees": "₹40,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹42,00,000"
    },
    "L. J. INSTITUTE OF ENGINEERING AND TECHNOLOGY": {
        "website": "ljiet.ac.in",
        "fees": "₹3,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹18,00,000"
    },
    "LADY DOAK COLLEGE": {
        "website": "ladydoakcollege.edu.in",
        "fees": "₹1,50,000",
        "avgPackage": "₹3,00,000",
        "highestPackage": "₹32,00,000"
    },
    "LAKSHMI NARAIN COLLEGE OF TECHNOLOGY LNCT": {
        "website": "lnct.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹5,50,000",
        "highestPackage": "₹1,12,00,000"
    },
    "LNM INSTITUTE OF INFORMATION TECHNOLOGY LNMIIT": {
        "website": "lnmiit.ac.in",
        "fees": "₹15,00,000",
        "avgPackage": "₹13,36,000",
        "highestPackage": "₹1,24,00,000"
    },
    "LOYOLA COLLEGE": {
        "website": "loyolacollege.edu",
        "fees": "₹3,00,000",
        "avgPackage": "₹6,34,000",
        "highestPackage": "₹28,00,000"
    },
    "LOVELY PROFESSIONAL UNIVERSITY": {
        "website": "lpu.in",
        "fees": "₹14,40,000",
        "avgPackage": "₹7,92,000",
        "highestPackage": "₹2,50,00,000"
    },
    "M. S. RAMAIAH INSTITUTE OF TECHNOLOGY": {
        "website": "msrit.edu",
        "fees": "₹8,00,000",
        "avgPackage": "₹7,66,000",
        "highestPackage": "₹58,00,000"
    },
    // Batch 13
    "MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY": {
        "website": "mmmut.ac.in",
        "fees": "₹6,00,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹59,00,000"
    },
    "MADRAS INSTITUTE OF TECHNOLOGY": {
        "website": "mitindia.edu",
        "fees": "₹1,38,400",
        "avgPackage": "₹8,00,000",
        "highestPackage": "₹36,50,000"
    },
    "MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY": {
        "website": "mait.ac.in",
        "fees": "₹7,44,000",
        "avgPackage": "₹8,00,000",
        "highestPackage": "₹64,00,000"
    },
    "MAHARASHTRA INSTITUTE OF TECHNOLOGY MIT PUNE": {
        "website": "mitwpu.edu.in",
        "fees": "₹12,40,000",
        "avgPackage": "₹6,23,000",
        "highestPackage": "₹51,36,000"
    },
    "MAHARAJA SURAJMAL INSTITUTE OF TECHNOLOGY": {
        "website": "msit.in",
        "fees": "₹5,38,000",
        "avgPackage": "₹7,10,000",
        "highestPackage": "₹80,00,000"
    },
    "MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY": {
        "website": "manit.ac.in",
        "fees": "₹5,81,000",
        "avgPackage": "₹13,00,000",
        "highestPackage": "₹56,00,000"
    },
    "MALAVIYA NATIONAL INSTITUTE OF TECHNOLOGY": {
        "website": "mnit.ac.in",
        "fees": "₹6,74,000",
        "avgPackage": "₹11,58,000",
        "highestPackage": "₹64,00,000"
    },
    "MOTILAL NEHRU NATIONAL INSTITUTE OF TECHNOLOGY": {
        "website": "mnnit.ac.in",
        "fees": "₹6,57,000",
        "avgPackage": "₹19,48,000",
        "highestPackage": "₹72,00,000"
    },
    "NETAJI SUBHAS UNIVERSITY OF TECHNOLOGY": {
        "website": "nsut.ac.in",
        "fees": "₹11,29,000",
        "avgPackage": "₹17,75,000",
        "highestPackage": "₹1,00,00,000"
    },
    "PECS UNIVERSITY OF TECHNOLOGY": {
        "website": "pec.ac.in",
        "fees": "₹7,71,000",
        "avgPackage": "₹15,97,000",
        "highestPackage": "₹83,00,000"
    },
    // Batch 14
    "MALNAD COLLEGE OF ENGINEERING": {
        "website": "mcehassan.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹21,00,000"
    },
    "MANAV RACHNA INTERNATIONAL INSTITUTE OF RESEARCH AND STUDIES": {
        "website": "manavrachna.edu.in",
        "fees": "₹7,20,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹54,00,000"
    },
    "MANIPAL INSTITUTE OF TECHNOLOGY": {
        "website": "manipal.edu",
        "fees": "₹18,00,000",
        "avgPackage": "₹12,31,000",
        "highestPackage": "₹69,25,000"
    },
    "MANIPAL UNIVERSITY JAIPUR": {
        "website": "jaipur.manipal.edu",
        "fees": "₹18,04,000",
        "avgPackage": "₹9,00,000",
        "highestPackage": "₹88,00,000"
    },
    "MAR ATHANASIUS COLLEGE OF ENGINEERING": {
        "website": "mace.ac.in",
        "fees": "₹1,40,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹35,00,000"
    },
    "MARATHWADA MITRA MANDAL'S COLLEGE OF ENGINEERING": {
        "website": "mmcoe.edu.in",
        "fees": "₹4,90,000",
        "avgPackage": "₹5,14,000",
        "highestPackage": "₹51,00,000"
    },
    "M S RAMAIAH UNIVERSITY": {
        "website": "msruas.ac.in",
        "fees": "₹14,00,000",
        "avgPackage": "₹6,20,000",
        "highestPackage": "₹52,00,000"
    },
    "NATIONAL INSTITUTE OF INDUSTRIAL ENGINEERING": {
        "website": "iimmumbai.ac.in",
        "fees": "₹14,06,000",
        "avgPackage": "₹30,11,000",
        "highestPackage": "₹78,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT TRICHY": {
        "website": "nitt.edu",
        "fees": "₹8,69,000",
        "avgPackage": "₹23,60,000",
        "highestPackage": "₹52,89,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT KARNATAKA SURATHKAL": {
        "website": "nitk.ac.in",
        "fees": "₹7,38,190",
        "avgPackage": "₹17,48,000",
        "highestPackage": "₹63,30,000"
    },
    // Batch 15
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT DURGAPUR": {
        "website": "nitdgp.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹7,35,000",
        "highestPackage": "₹51,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT HAMIRPUR": {
        "website": "nith.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹10,58,000",
        "highestPackage": "₹2,05,00,000"
    },
    "NATIONAL INSTITUTE of TECHNOLOGY NIT JALANDHAR": {
        "website": "nitj.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹10,80,000",
        "highestPackage": "₹62,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT JAMSHEDPUR": {
        "website": "nitjsr.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹9,50,000",
        "highestPackage": "₹82,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT KURUKSHETRA": {
        "website": "nitkkr.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹14,50,000",
        "highestPackage": "₹65,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT PATNA": {
        "website": "nitp.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹9,90,000",
        "highestPackage": "₹52,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT RAIPUR": {
        "website": "nitrr.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹11,10,000",
        "highestPackage": "₹60,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT ROURKELA": {
        "website": "nitrkl.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹14,19,000",
        "highestPackage": "₹83,60,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT SILCHAR": {
        "website": "nits.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹12,25,000",
        "highestPackage": "₹60,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT SRINAGAR": {
        "website": "nitsri.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹10,48,000",
        "highestPackage": "₹39,00,000"
    },
    // Batch 16
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT AGARTALA": {
        "website": "nita.ac.in",
        "fees": "₹5,73,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT ARUNACHAL PRADESH": {
        "website": "nitap.ac.in",
        "fees": "₹5,63,000",
        "avgPackage": "₹7,37,000",
        "highestPackage": "₹59,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT DELHI": {
        "website": "nitdelhi.ac.in",
        "fees": "₹6,36,000",
        "avgPackage": "₹17,19,000",
        "highestPackage": "₹58,50,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT GOA": {
        "website": "nitgoa.ac.in",
        "fees": "₹5,60,000",
        "avgPackage": "₹9,24,000",
        "highestPackage": "₹35,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT MANIPUR": {
        "website": "nitmanipur.ac.in",
        "fees": "₹5,79,000",
        "avgPackage": "₹7,30,000",
        "highestPackage": "₹14,50,000"
    },
    "NATIONAL INSTITUTE of TECHNOLOGY NIT MEGHALAYA": {
        "website": "nitm.ac.in",
        "fees": "₹6,00,000",
        "avgPackage": "₹9,70,000",
        "highestPackage": "₹46,30,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT MIZORAM": {
        "website": "nitmz.ac.in",
        "fees": "₹6,08,000",
        "avgPackage": "₹8,40,000",
        "highestPackage": "₹35,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT NAGALAND": {
        "website": "nitnagaland.ac.in",
        "fees": "₹5,97,000",
        "avgPackage": "₹7,92,000",
        "highestPackage": "₹13,95,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT PUDUCHERRY": {
        "website": "nitpy.ac.in",
        "fees": "₹5,94,000",
        "avgPackage": "₹7,90,000",
        "highestPackage": "₹24,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT SIKKIM": {
        "website": "nitsikkim.ac.in",
        "fees": "₹5,82,000",
        "avgPackage": "₹8,50,000",
        "highestPackage": "₹44,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT UTTARAKHAND": {
        "website": "nituk.ac.in",
        "fees": "₹5,84,000",
        "avgPackage": "₹8,03,000",
        "highestPackage": "₹12,50,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT WARANGAL": {
        "website": "nitw.ac.in",
        "fees": "₹5,45,000",
        "avgPackage": "₹14,35,000",
        "highestPackage": "₹88,00,000"
    },
    // Batch 17
    "MEWAR UNIVERSITY": {
        "website": "mewaruniversity.org",
        "fees": "₹4,00,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹2,60,00,000"
    },
    "MIT ACADEMY OF ENGINEERING": {
        "website": "mitaoe.ac.in",
        "fees": "₹6,80,000",
        "avgPackage": "₹6,10,000",
        "highestPackage": "₹28,00,000"
    },
    "MIT ART, DESIGN AND TECHNOLOGY UNIVERSITY": {
        "website": "mituniversity.edu.in",
        "fees": "₹12,00,000",
        "avgPackage": "₹11,70,192",
        "highestPackage": "₹61,00,000"
    },
    "MIT COLLEGE OF ENGINEERING": {
        "website": "mitwpu.edu.in",
        "fees": "₹6,50,000",
        "avgPackage": "₹5,02,000",
        "highestPackage": "₹37,26,000"
    },
    "MIT SCHOOL OF ENGINEERING": {
        "website": "mitwpu.edu.in",
        "fees": "₹6,50,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹51,00,000"
    },
    "MISRIMAL NAVAJEE MUNOTH JAIN ENGINEERING COLLEGE": {
        "website": "mnmjec.ac.in",
        "fees": "₹4,50,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹10,00,000"
    },
    "MET'S INSTITUTE OF ENGINEERING": {
        "website": "metbhujbalknowledgecity.ac.in",
        "fees": "₹3,50,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹23,00,000"
    },
    // Batch 18
    "MODY UNIVERSITY OF SCIENCE AND TECHNOLOGY": {
        "website": "modyuniversity.ac.in",
        "fees": "₹10,00,000",
        "avgPackage": "₹11,15,000",
        "highestPackage": "₹32,88,000"
    },
    "MOTILAL NEHRU NATIONAL INSTITUTE OF TECHNOLOGY MNNIT ALLAHABAD": {
        "website": "mnnit.ac.in",
        "fees": "₹6,57,000",
        "avgPackage": "₹20,43,000",
        "highestPackage": "₹72,00,000"
    },
    "M S RAMAIAH INSTITUTE OF TECHNOLOGY": {
        "website": "msrit.edu",
        "fees": "₹12,56,000",
        "avgPackage": "₹7,66,000",
        "highestPackage": "₹58,00,000"
    },
    "MUKESH PATEL SCHOOL OF TECHNOLOGY MANAGEMENT & ENGINEERING": {
        "website": "nmims.edu",
        "fees": "₹14,00,000",
        "avgPackage": "₹11,50,000",
        "highestPackage": "₹27,00,000"
    },
    "MUMBAI UNIVERSITY INSTITUTE OF CHEMICAL TECHNOLOGY": {
        "website": "ictmumbai.edu.in",
        "fees": "₹3,48,000",
        "avgPackage": "₹10,00,000",
        "highestPackage": "₹60,00,000"
    },
    "VALLURUPALLI NAGESWARA RAO VIGNANA JYOTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY": {
        "website": "vnrvjiet.ac.in",
        "fees": "₹5,40,000",
        "avgPackage": "₹7,17,000",
        "highestPackage": "₹54,00,000"
    },
    "VELAGAPUDI RAMAKRISHNA SIDDHARTHA ENGINEERING COLLEGE": {
        "website": "vrsiddhartha.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹52,60,000"
    },
    // Batch 19
    "MUTHOOT INSTITUTE OF TECHNOLOGY AND SCIENCE": {
        "website": "mgmits.ac.in",
        "fees": "₹4,32,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹11,10,000"
    },
    "MUZAFFARPUR INSTITUTE OF TECHNOLOGY": {
        "website": "mitmuzaffarpur.org",
        "fees": "₹22,120",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹29,00,000"
    },
    "MVSR ENGINEERING COLLEGE": {
        "website": "mvsrec.edu.in",
        "fees": "₹5,31,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹30,00,000"
    },
    "NALANDA COLLEGE OF ENGINEERING": {
        "website": "ncechandi.ac.in",
        "fees": "₹60,000",
        "avgPackage": "₹3,20,000",
        "highestPackage": "₹8,60,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT ANDHRA PRADESH": {
        "website": "nitandhra.ac.in",
        "fees": "₹5,45,000",
        "avgPackage": "₹7,24,000",
        "highestPackage": "₹44,10,000"
    },
    // Batch 20
    "NARASARAOPETA ENGINEERING COLLEGE": {
        "website": "nrtec.ac.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹14,50,000"
    },
    "NARAYANA ENGINEERING COLLEGE (NELLORE)": {
        "website": "necn.ac.in",
        "fees": "₹1,89,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹24,00,000"
    },
    "NARULA INSTITUTE OF TECHNOLOGY": {
        "website": "nit.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹6,25,000",
        "highestPackage": "₹47,88,000"
    },
    "NATIONAL INSTITUTE OF FOUNDRY AND FORGE TECHNOLOGY": {
        "website": "niamt.ac.in",
        "fees": "₹4,40,000",
        "avgPackage": "₹7,40,000",
        "highestPackage": "₹15,00,000"
    },
    "NATIONAL INSTITUTE OF SCIENCE AND TECHNOLOGY": {
        "website": "nist.edu",
        "fees": "₹12,00,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹23,00,000"
    },
    "NETAJI SUBHAS INSTITUTE OF TECHNOLOGY": {
        "website": "nsut.ac.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹18,00,000",
        "highestPackage": "₹65,00,000"
    },
    // Batch 21
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT CALICUT": {
        "website": "nitc.ac.in",
        "fees": "₹5,50,000",
        "avgPackage": "₹11,98,000",
        "highestPackage": "₹56,59,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT DURGAPUR": {
        "website": "nitdgp.ac.in",
        "fees": "₹5,50,000",
        "avgPackage": "₹12,61,000",
        "highestPackage": "₹80,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT HAMIRPUR": {
        "website": "nith.ac.in",
        "fees": "₹5,50,000",
        "avgPackage": "₹10,58,000",
        "highestPackage": "₹58,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT JALANDHAR": {
        "website": "nitj.ac.in",
        "fees": "₹5,50,000",
        "avgPackage": "₹9,48,000",
        "highestPackage": "₹52,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT KURUKSHETRA": {
        "website": "nitkkr.ac.in",
        "fees": "₹5,91,000",
        "avgPackage": "₹13,89,000",
        "highestPackage": "₹64,28,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT RAIPUR": {
        "website": "nitrr.ac.in",
        "fees": "₹5,50,000",
        "avgPackage": "₹11,10,000",
        "highestPackage": "₹60,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT ROURKELA": {
        "website": "nitrkl.ac.in",
        "fees": "₹5,00,000",
        "avgPackage": "₹12,00,000",
        "highestPackage": "₹60,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT SILCHAR": {
        "website": "nits.ac.in",
        "fees": "₹5,70,000",
        "avgPackage": "₹12,25,000",
        "highestPackage": "₹60,00,000"
    },
    // Batch 22
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT SURATHKAL": {
        "website": "nitk.ac.in",
        "fees": "₹6,02,000",
        "avgPackage": "₹16,25,000",
        "highestPackage": "₹55,00,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT TIRUCHIRAPPALLI": {
        "website": "nitt.edu",
        "fees": "₹6,43,000",
        "avgPackage": "₹15,76,000",
        "highestPackage": "₹52,89,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT PATNA": {
        "website": "nitp.ac.in",
        "fees": "₹6,12,000",
        "avgPackage": "₹9,90,000",
        "highestPackage": "₹41,37,000"
    },
    "NATIONAL INSTITUTE OF TECHNOLOGY NIT UTTARAKHAND": {
        "website": "nituk.ac.in",
        "fees": "₹5,84,000",
        "avgPackage": "₹8,03,000",
        "highestPackage": "₹32,00,000"
    },
    // Batch 23
    "CHOUKSEY ENGINEERING COLLEGE": {
        "website": "cecbilaspur.ac.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹12,00,000"
    },
    "DR. C. V. RAMAN UNIVERSITY": {
        "website": "cvru.ac.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹4,30,000",
        "highestPackage": "₹10,50,000"
    },
    "LAKHMI CHAND INSTITUTE OF TECHNOLOGY": {
        "website": "lcit.edu.in",
        "fees": "₹2,00,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹12,00,000"
    },
    "YUGANTAR INSTITUTE OF TECHNOLOGY AND MANAGEMENT": {
        "website": "yugantar.co.in",
        "fees": "₹1,20,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹13,00,000"
    },
    "RAIPUR INSTITUTE OF TECHNOLOGY": {
        "website": "ritengineering.education",
        "fees": "₹3,00,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹23,00,000"
    },
    "ISBM UNIVERSITY": {
        "website": "isbmuniversity.edu.in",
        "fees": "₹2,10,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹17,20,000"
    },
    "ANJANEYA UNIVERSITY": {
        "website": "anjaneyauniversity.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹26,00,000"
    },
    // Batch 24
    "SCHOOL OF ENGINEERING OP JINDAL UNIVERSITY": {
        "website": "opju.ac.in",
        "fees": "₹7,20,000",
        "avgPackage": "₹8,20,000",
        "highestPackage": "₹60,00,000"
    },
    "KALINGA UNIVERSITY- FACULTY OF TECHNOLOGY": {
        "website": "kalingauniversity.ac.in",
        "fees": "₹4,08,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹30,00,000"
    },
    "CHHATTISGARH INSTITUTE OF TECHNOLOGY RAIGARH": {
        "website": "citraigarh.ac.in",
        "fees": "₹4,88,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹8,00,000"
    },
    "INDIAN INSTITUTE OF HANDLOOM TECHNOLOGY": {
        "website": "iiht.ac.in",
        "fees": "₹1,00,000",
        "avgPackage": "₹2,00,000",
        "highestPackage": "₹4,00,000"
    },
    "SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL MANAGEMENT & TECHNOLOGY": {
        "website": "ssipmt.com",
        "fees": "₹3,35,000",
        "avgPackage": "₹7,50,000",
        "highestPackage": "₹42,00,000"
    },
    "RSR RUNGTA COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "rungta.ac.in",
        "fees": "₹4,93,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹48,00,000"
    },
    "KIRODIMAL INSTITUTE OF TECHNOLOGY": {
        "website": "kitraigarh.ac.in",
        "fees": "₹4,86,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹8,00,000"
    },
    // Batch 25
    "SCHOOL OF STUDIES OF ENGINEERING AND TECHNOLOGY, GURU GHASIDAS VISHWAVIDYALAYA, BILASPUR": {
        "website": "ggv.ac.in",
        "fees": "₹1,47,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹64,00,000"
    },
    "COLUMBIA INSTITUTE OF ENGINEERING & TECHNOLOGY": {
        "website": "columbiaengineering.in",
        "fees": "₹2,87,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹16,00,000"
    },
    "GOVERNMENT ENGINEERING COLLEGE BILASPUR": {
        "website": "gecbilaspur.ac.in",
        "fees": "₹47,675",
        "avgPackage": "₹6,16,000",
        "highestPackage": "₹30,00,000"
    },
    "CHHATRAPATI SHIVAJI INSTITUTE OF TECHNOLOGY": {
        "website": "csitdurg.in",
        "fees": "₹3,00,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹12,00,000"
    },
    "CHRISTIAN COLLEGE OF ENGINEERING AND TECHNOLOGY": {
        "website": "ccetbhilai.ac.in",
        "fees": "₹3,04,000",
        "avgPackage": "₹4,80,000",
        "highestPackage": "₹13,80,000"
    },
    "BHILAI INSTITUTE OF TECHNOLOGY, RAIPUR.": {
        "website": "bitraipur.ac.in",
        "fees": "₹3,12,000",
        "avgPackage": "₹5,20,000",
        "highestPackage": "₹24,00,000"
    },
    "BHILAI INSTITUTE OF TECHNOLOGY": {
        "website": "bitbhilai.ac.in",
        "fees": "₹3,20,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹42,00,000"
    },
    "SCHOOL OF ENGINEERING AND INFORMATION TECHNOLOGY": {
        "website": "matsuniversity.ac.in",
        "fees": "₹3,20,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹10,00,000"
    },
    // Batch 26
    "CHRIST COLLEGE OF ENGINEERING AND TECHNOLOGY": {
        "website": "christcet.edu.in",
        "fees": "₹1,16,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹6,00,000"
    },
    "SIKKIM MANIPAL INSTITUTE OF TECHNOLOGY": {
        "website": "smu.edu.in/smit.html",
        "fees": "₹12,00,000",
        "avgPackage": "₹6,48,000",
        "highestPackage": "₹54,00,000"
    },
    "SRM MADURAI COLLEGE FOR ENGINEERING & TECHNOLOGY": {
        "website": "srmmadurai.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹12,00,000"
    },
    "SRM INSTITUTE OF SCIENCE AND TECHNOLOGY TIRUCHIRAPPALLI": {
        "website": "srmist.edu.in/trichy",
        "fees": "₹6,00,000",
        "avgPackage": "₹7,50,000",
        "highestPackage": "₹57,00,000"
    },
    "SRM INSTITUTE OF SCIENCE AND TECHNOLOGY RAMAPURAM PART CAMPUS": {
        "website": "srmrmp.edu.in",
        "fees": "₹8,00,000",
        "avgPackage": "₹6,50,000",
        "highestPackage": "₹55,00,000"
    },
    "SRM TRP ENGINEERING COLLEGE": {
        "website": "trp.srmtrichy.edu.in",
        "fees": "₹2,20,000",
        "avgPackage": "₹4,40,000",
        "highestPackage": "₹44,00,000"
    },
    "SRM VALLIAMMAI ENGINEERING COLLEGE": {
        "website": "srmvalliammai.ac.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹12,00,000"
    },
    "SRM INSTITUTE OF MANAGEMENT AND TECHNOLOGY": {
        "website": "srmist.edu.in",
        "fees": "₹10,00,000",
        "avgPackage": "₹7,70,000",
        "highestPackage": "₹44,14,000"
    },
    // Batch 27
    "UNIVERSITY TEACHING DEPARTMENT CSVTU BHILAI": {
        "website": "csvtu.ac.in",
        "fees": "₹4,09,000",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹20,00,000",
        "rating": 3.8,
        "reviews": 1928,
        "rankingInfo": "State Technical University"
    },
    "DR. SHYAMA PRASAD MUKHERJEE INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY": {
        "website": "iiitnr.ac.in",
        "fees": "₹6,00,000",
        "avgPackage": "₹18,90,000",
        "highestPackage": "₹1,20,00,000",
        "rating": 4.2,
        "reviews": 48,
        "rankingInfo": "NIRF #201-300 (Engineering)"
    },
    "CHHATTISGARH ENGINEERING COLLEGE": {
        "website": "cecdurg.ac.in",
        "fees": "₹2,40,000",
        "avgPackage": "₹3,00,000",
        "highestPackage": "₹5,00,000",
        "rating": 2.8,
        "reviews": 112
    },
    "SAI MAHAVIDYALAYA": {
        "website": "saicollege.org",
        "fees": "₹65,100",
        "avgPackage": "₹3,60,000",
        "highestPackage": "₹7,00,000",
        "rating": 3.8,
        "reviews": 519,
        "naac": "B++ Grade",
        "rankingInfo": "NAAC B++ Accredited"
    },
    "GD RUNGTA COLLEGE OF SCIENCE AND TECHNOLOGY": {
        "website": "gd rungta.ac.in",
        "fees": "₹89,900",
        "avgPackage": "₹4,00,000",
        "highestPackage": "₹48,00,000",
        "rating": 4.2,
        "reviews": 72,
        "naac": "B+ Grade",
        "rankingInfo": "NAAC B+ Accredited"
    },
    "SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL STUDIES": {
        "website": "ssips.edu.in",
        "fees": "₹3,15,400",
        "avgPackage": "₹5,75,000",
        "highestPackage": "₹33,00,000",
        "rating": 3.6,
        "reviews": 150,
        "rankingInfo": "NIRF #151-300 Band",
        "naac": "B++ Grade",
        "nba": "Accredited (Mechanical)"
    },
    // Batch 5
    "BHARATI VIDYAPEETH COLLEGE OF ENGINEERING": {
        "website": "bvcoepune.edu.in",
        "fees": "₹5,08,000",
        "avgPackage": "₹7,00,000",
        "highestPackage": "₹34,00,000"
    },
    "BHARATI VIDYAPEETH'S COLLEGE OF ENGINEERING FOR WOMEN": {
        "website": "bvcoewpune.edu.in",
        "fees": "₹4,30,000",
        "avgPackage": "₹5,24,000",
        "highestPackage": "₹27,00,000"
    },
    "BHARATIYA VIDYA BHAVAN'S SARDAR PATEL COLLEGE OF ENGINEERING": {
        "website": "spce.ac.in",
        "fees": "₹3,38,800",
        "avgPackage": "₹6,48,000",
        "highestPackage": "₹27,00,000"
    },
    "BHARATIYA VIDYA BHAVAN'S SARDAR PATEL INSTITUTE OF TECHNOLOGY": {
        "website": "spit.ac.in",
        "fees": "₹6,82,000",
        "avgPackage": "₹15,32,000",
        "highestPackage": "₹61,55,000"
    },
    "BHARATI VIDYAPEETH'S INSTITUTE OF COMPUTER APPLICATIONS & MANAGEMENT": {
        "website": "bvicam.ac.in",
        "fees": "₹3,80,000",
        "avgPackage": "₹5,00,000",
        "highestPackage": "₹19,00,000"
    },
    "BHARATI VIDYAPEETH'S COLLEGE OF PHARMACY": {
        "website": "bvcop.edu.in",
        "fees": "₹4,00,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹6,50,000"
    },
    "BHARATI VIDYAPEETH COLLEGE OF ARCHITECTURE": {
        "website": "bvcoa.edu.in",
        "fees": "₹6,39,000",
        "avgPackage": "₹5,50,000",
        "highestPackage": "₹12,00,000"
    },
    // Batch 6
    "BITS PILANI - BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE, PILANI": {
        "website": "bits-pilani.ac.in",
        "fees": "₹22,00,000",
        "avgPackage": "₹19,00,000",
        "highestPackage": "₹60,00,000"
    },
    "BIRLA VISHWAKARMA MAHAVIDYALAYA BVM": {
        "website": "bvmengineering.ac.in",
        "fees": "₹5,24,000",
        "avgPackage": "₹6,00,000",
        "highestPackage": "₹15,00,000"
    },
    "BHOJ REDDY ENGINEERING COLLEGE FOR WOMEN": {
        "website": "brecw.ac.in",
        "fees": "₹3,00,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹32,00,000"
    },
    "BRAHMADEVDADA MANE COLLEGE OF ENGINEERING": {
        "website": "bmcet.edu.in",
        "fees": "₹3,44,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹8,00,000"
    },
    "C. K. PITHAWALLA COLLEGE OF ENGINEERING & TECHNOLOGY": {
        "website": "ckpcet.ac.in",
        "fees": "₹1,80,000",
        "avgPackage": "₹4,50,000",
        "highestPackage": "₹15,00,000"
    },
    "C. K. SHAH VIJAPURWALA INSTITUTE OF MANAGEMENT": {
        "website": "cksvim.edu.in",
        "fees": "₹2,20,000",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹18,00,000"
    },
    "CHADALAWADA RAMANAMMA ENGINEERING COLLEGE": {
        "website": "crectirupati.com",
        "fees": "₹2,22,400",
        "avgPackage": "₹3,50,000",
        "highestPackage": "₹12,00,000"
    },
    "CHAITANYA BHARATHI INSTITUTE OF TECHNOLOGY": {
        "website": "cbit.ac.in",
        "fees": "₹5,60,000",
        "avgPackage": "₹10,00,000",
        "highestPackage": "₹59,91,000"
    },
    "CSI COLLEGE OF ENGINEERING": {
        "website": "csice.edu.in",
        "fees": "₹2,68,000",
        "avgPackage": "₹3,60,000",
        "highestPackage": "₹8,00,000"
    }
};

const handleUpdate = () => {
    let data = {};
    if (fs.existsSync(INFO_PATH)) {
        data = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    }

    Object.entries(newGains).forEach(([college, info]) => {
        if (!data[college]) data[college] = {};
        data[college] = { ...data[college], ...info };
    });

    fs.writeFileSync(INFO_PATH, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Updated college_info.json with ${Object.keys(newGains).length} entries.`);
};

handleUpdate();
