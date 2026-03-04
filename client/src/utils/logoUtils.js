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
    const mappings = {
        'IIT Delhi': 'iitd.ac.in',
        'AIIMS New Delhi': 'aiims.edu',
        'IIM Ahmedabad': 'iima.ac.in',
        'NIT Trichy': 'nitt.edu',
        'BITS Pilani': 'bits-pilani.ac.in',
        'Manipal University': 'manipal.edu',
        'IIT Bombay': 'iitb.ac.in',
        'SRM University': 'srmist.edu.in',
        'VIT Vellore': 'vit.ac.in',
        'LPU': 'lpu.in',
        'Amity University': 'amity.edu',
        'Delhi University': 'du.ac.in',
        'IIT Madras': 'iitm.ac.in',
        'IIT Kanpur': 'iitk.ac.in',
        'IIT Kharagpur': 'iitkgp.ac.in',
        'IIT Roorkee': 'iitr.ac.in',
        'IIT Guwahati': 'iitg.ac.in',
        'JNU New Delhi': 'jnu.ac.in',
        'BHU Varanasi': 'bhu.ac.in'
    };

    return mappings[name] || null;
};
