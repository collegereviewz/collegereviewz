import StudyAbroad from '../models/StudyAbroad.model.js';

// Get all countries (lightweight list for directory grid)
export const getAllCountries = async (req, res) => {
  try {
    const countries = await StudyAbroad.find({}, 'id name flag description intake colleges tuition').lean();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching study abroad countries:', error);
    res.status(500).json({ message: 'Error fetching countries data' });
  }
};

// Get a single country's full 360 detailed data by slug id
export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await StudyAbroad.findOne({ id }).lean();
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    // Remap visa_policy.typeString to visa_policy.type for frontend compatibility
    if (country.visa_policy && country.visa_policy.typeString) {
      country.visa_policy.type = country.visa_policy.typeString;
      delete country.visa_policy.typeString;
    }
    
    res.status(200).json(country);
  } catch (error) {
    console.error(`Error fetching study abroad country details for ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching country details' });
  }
};
