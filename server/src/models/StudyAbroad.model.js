import mongoose from 'mongoose';

const studyAbroadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // The country slug (e.g., 'canada')
  name: { type: String, required: true },
  flag: { type: String, required: true },
  description: { type: String },
  intake: { type: String },
  colleges: { type: String },
  tuition: { type: String },
  
  country_core: {
    currency: { type: String },
    language: { type: String },
    time_zone: { type: String },
    student_popularity_score: { type: Number }
  },
  
  hero: {
    summary: { type: String },
    lastUpdated: { type: String },
    visaPolicyVersion: { type: String },
    decisionStrip: {
      costLevel: { type: String },
      visaDifficulty: { type: String },
      partTimeFeasibility: { type: String },
      jobOutcomeStrength: { type: String },
      prPath: { type: String }
    }
  },
  
  snapshot: {
    bestFor: { type: String },
    avoidIf: { type: String },
    topCities: [{ type: String }],
    popularCourses: [{ type: String }],
    knownRisks: { type: String }
  },
  
  education_system: {
    ug: {
      entry: { type: String },
      duration: { type: String },
      notes: { type: String }
    },
    pg: {
      entry: { type: String },
      tests: { type: String },
      duration: { type: String },
      internship: { type: String }
    },
    diploma: {
      bestFor: { type: String },
      transfer: { type: String }
    }
  },
  
  eligibility: {
    academics: { type: String },
    backlogs: { type: String },
    gapYears: { type: String },
    englishTests: { type: String }
  },
  
  intakes: [{
    name: { type: String },
    deadline: { type: String }
  }],
  
  cost: {
    summary: {
      low: { type: String },
      mid: { type: String },
      high: { type: String }
    },
    tuition: {
      ug: { type: String },
      pg: { type: String },
      diploma: { type: String }
    },
    livingCost: {
      rent: { type: String },
      food: { type: String },
      transport: { type: String },
      insurance: { type: String },
      monthlyTotal: { type: String }
    },
    oneTime: {
      appFee: { type: String },
      visa: { type: String },
      flight: { type: String }
    }
  },
  
  scholarships: [{
    name: { type: String },
    amount: { type: String },
    eligibility: { type: String },
    deadline: { type: String },
    difficulty: { type: String }
  }],
  
  visa_policy: {
    typeString: { type: String }, // 'type' is a reserved keyword in Mongoose, mapped from type
    processingTime: { type: String },
    fundsProof: { type: String },
    refusalReasons: [{ type: String }]
  },
  
  work: {
    allowedHours: { type: String },
    wageRange: { type: String },
    reality: { type: String }
  },
  
  post_study: {
    pswDuration: { type: String },
    eligibility: { type: String },
    jobMarket: [{
      sector: { type: String },
      demand: { type: String },
      salary: { type: String },
      notes: { type: String }
    }],
    prPath: { type: String }
  },
  
  risks: [{
    scenario: { type: String },
    plan: { type: String }
  }],
  
  roi: {
    avgStartingSalary: { type: String },
    breakEven: { type: String }
  },
  
  faqs: [{
    q: { type: String },
    a: { type: String }
  }],
  
  topUniversities: {
    engineering: [{ type: String }],
    medical: [{ type: String }],
    business: [{ type: String }],
    design: [{ type: String }]
  }
}, { timestamps: true });

const StudyAbroad = mongoose.model('StudyAbroad', studyAbroadSchema);
export default StudyAbroad;
