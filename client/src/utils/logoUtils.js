/**
 * Utility to fetch official college/brand logos.
 * Uses the Clearbit Logo API as the primary source.
 * Falls back to a generic favicon or placeholder if needed.
 */

export const getCollegeLogo = (domain, name) => {
    // 1. High-fidelity hardcoded official logos for major Indian institutions
    const officialLogos = {
        'IIT Delhi': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg',
        'AIIMS New Delhi': 'https://upload.wikimedia.org/wikipedia/en/9/9b/All_India_Institute_of_Medical_Sciences%2C_New_Delhi_Logo.svg',
        'IIM Ahmedabad': 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/iima-logo.png',
        'NIT Trichy': 'https://upload.wikimedia.org/wikipedia/en/9/91/National_Institute_of_Technology_Tiruchirappalli_logo.png',
        'BITS Pilani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/BITS_Pilani-Logo.svg/512px-BITS_Pilani-Logo.svg.png',
        'SRM University': 'https://upload.wikimedia.org/wikipedia/en/f/fe/SRM_University_logo.png',
        'Manipal University': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/India-MAHE-logo.png',
        'LPU': 'https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png',
        'VIT Vellore': 'https://upload.wikimedia.org/wikipedia/en/c/c5/Vellore_Institute_of_Technology_logo_2017.png',
        'Amity University': 'https://upload.wikimedia.org/wikipedia/en/a/ad/Amity_University_logo.png'
    };

    if (name && officialLogos[name]) return officialLogos[name];
    if (!domain) return null;

    // 2. Normalize domain (remove http/https and trailing slashes)
    const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

    // 3. Chain of automatic sources:
    // a. Google Favicon Service (The "Check on Google" requirement)
    // b. Unavatar.io (Social/Brand aggregator)
    // c. Clearbit (Business data source)
    return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128&fallback=https://unavatar.io/${cleanDomain}?fallback=https://logo.clearbit.com/${cleanDomain}`;
};

/**
 * Heuristic to guess the domain from a college name if not provided.
 * This is a basic mapper for major Indian institutions.
 */
export const guessDomainByName = (name) => {
    if (!name) return null;
    const cleanName = name.toUpperCase().trim();

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
        'CHANDIGARH COLLEGE OF ENGINEERING AND TECHNOLOGY': 'ccet.ac.in'
    };

    // Try direct mapping first
    if (mappings[cleanName]) return mappings[cleanName];

    // Try substring matching for major universities if they appear in the name
    if (cleanName.includes('BITS PILANI')) return 'bits-pilani.ac.in';
    if (cleanName.includes('VIT VELLORE')) return 'vit.ac.in';
    if (cleanName.includes('SYMBIOSIS')) return 'siu.edu.in';
    if (cleanName.includes('AMITY')) return 'amity.edu';

    return null;
};
