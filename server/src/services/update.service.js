import College from '../models/College.model.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Heuristic to guess official website domain from college name
 */
export const guessDomain = (name) => {
    if (!name) return null;
    const n = name.toUpperCase();

    const mappings = {
        'IIT DELHI': 'iitd.ac.in',
        'AIIMS NEW DELHI': 'aiims.edu',
        'IIM AHMEDABAD': 'iima.ac.in',
        'NIT TRICHY': 'nitt.edu',
        'BITS PILANI': 'bits-pilani.ac.in',
        'MANIPAL UNIVERSITY': 'manipal.edu',
        'IIT BOMBAY': 'iitb.ac.in',
        'SRM UNIVERSITY': 'srmist.edu.in',
        'VIT VELLORE': 'vit.ac.in',
        'LPU': 'lpu.in',
        'AMITY UNIVERSITY': 'amity.edu',
        'DELHI UNIVERSITY': 'du.ac.in',
        'IIT MADRAS': 'iitm.ac.in',
        'IIT KANPUR': 'iitk.ac.in',
        'IIT KHARAGPUR': 'iitkgp.ac.in',
        'IIT ROORKEE': 'iitr.ac.in',
        'IIT GUWAHATI': 'iitg.ac.in',
        'JNU NEW DELHI': 'jnu.ac.in',
        'BHU VARANASI': 'bhu.ac.in',
        'SYMBIOSIS INSTITUTE OF TECHNOLOGY': 'sitpune.edu.in',
        'SVKMS NMIMS DEEMED TO BE UNIVERSITY': 'nmims.edu',
        'GOSWAMI GANESH DUTTA SANATAN DHARMA COLLEGE': 'ggdsd.ac.in',
        'YUGANTAR INSTITUTE OF TECHNOLOGY AND MANAGEMENT': 'yitmindia.ac.in',
        'CHANDIGARH UNIVERSITY': 'cuchd.in',
        'THAPAR UNIVERSITY': 'thapar.edu',
        'PECH UNIVERSITY': 'pec.ac.in',
        'PANJAB UNIVERSITY': 'puchd.ac.in'
    };

    if (mappings[n]) return mappings[n];

    // Pattern based guessing for common prefixes/suffixes
    if (n.includes('NMIMS')) return 'nmims.edu';
    if (n.includes('BITS PILANI')) return 'bits-pilani.ac.in';
    if (n.includes('VIT VELLORE')) return 'vit.ac.in';
    if (n.includes('SRM')) return 'srmist.edu.in';
    if (n.includes('AMITY')) return 'amity.edu';
    if (n.includes('LPU')) return 'lpu.in';

    return null;
};

/**
 * Media fetching with AI disabled
 */
export const fetchMediaWithAI = async (collegeName, state) => {
    console.log('AI fetchMediaWithAI disabled');
    return null;
};


/**
 * Update a specific college by ID
 * STUBBED: Scraper removal requested by user.
 */
export const updateCollegeData = async (collegeId) => {
    try {
        const college = await College.findById(collegeId);
        if (!college) return null;

        let domain = college.officialWebsite || guessDomain(college.name);
        if (!college.officialWebsite && domain) college.officialWebsite = domain;

        // Scraper logic removed as per user request. 
        // We only update lastUpdated to stop repetitive cron attempts if any still exist.
        if (college.updates) {
            college.updates.lastUpdated = new Date();
        } else {
            college.updates = { lastUpdated: new Date() };
        }
        
        await college.save();
        return college.updates;
    } catch (err) {
        console.error(`Update Error for ${collegeId}:`, err.message);
        return null;
    }
};
