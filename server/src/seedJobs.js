import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from './models/Job.model.js';

dotenv.config();

const DB_URI = process.env.DATABASE_URL || "mongodb://localhost:27017/collegereviewz";

const initialJobs = [
  // Engineering & Tech
  {
    title: "Software Engineer (Full Stack)",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    description: "Join us to build the core infrastructure of our next-generation college discovery platform and AI applications.",
    requirements: ["3+ years of experience with React and Node.js.", "Experience with MongoDB.", "Strong understanding of REST APIs and microservices."],
    isActive: true
  },
  {
    title: "Backend Developer",
    department: "Engineering",
    location: "Kolkata",
    type: "Full-Time",
    description: "Design and optimize robust APIs, database architecture, and microservices for our growing ecosystem.",
    requirements: ["Deep expertise in Node.js and Express.", "Experience with Redis caching and complex MongoDB aggregations.", "Knowledge of AWS/GCP."],
    isActive: true
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Faridabad",
    type: "Full-Time",
    description: "Craft pixel-perfect, responsive UI experiences. You will be building animations and interactive components.",
    requirements: ["Expertise in React.js and CSS/Tailwind.", "Experience with Framer Motion or similar animation libraries.", "Strong eye for design detail."],
    isActive: true
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    description: "Automate our CI/CD pipelines, manage cloud infrastructure, and ensure 99.99% uptime for our services.",
    requirements: ["Experience with Docker, Kubernetes, and GitHub Actions.", "AWS or Google Cloud expertise.", "Strong scripting skills."],
    isActive: true
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    type: "Full-Time",
    description: "Extract actionable insights from extensive education data to improve our student career prediction algorithms.",
    requirements: ["Proficiency in SQL and Python.", "Experience with data visualization tools (Tableau, PowerBI).", "Strong analytical problem-solving skills."],
    isActive: true
  },
  {
    title: "Machine Learning Engineer",
    department: "Data Science",
    location: "Remote",
    type: "Full-Time",
    description: "Design and implement AI models for predictive college counseling and automated resume-to-job matching.",
    requirements: ["Experience with Python, TensorFlow, or PyTorch.", "Background in NLP and recommendation systems."],
    isActive: true
  },
  // Product & Design
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-Time",
    description: "Lead the life-cycle of our platform features from ideation through launch. You will sit at the intersection of tech, design, and business.",
    requirements: ["3+ years of Product Management experience.", "Excellent communication and prioritization skills.", "Experience with agile methodologies."],
    isActive: true
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-Time",
    description: "Shape the visual language of our products. Design intuitive user journeys and stunning interfaces.",
    requirements: ["Strong portfolio showcasing web and mobile app design.", "Expertise in Figma.", "Understanding of HCI principles."],
    isActive: true
  },
  // Marketing & Sales
  {
    title: "Sales Executive",
    department: "Sales",
    location: "Kolkata",
    type: "Full-Time",
    description: "We need a driven Sales Executive to build partnerships with universities and expand our institutional client base.",
    requirements: ["Proven B2B sales experience.", "Strong communication and negotiation skills.", "Experience in the EdTech sector is a plus."],
    isActive: true
  },
  {
    title: "Business Development Associate",
    department: "Sales",
    location: "Faridabad",
    type: "Full-Time",
    description: "Identify new market opportunities, generate leads, and assist in closing deals with institutional partners.",
    requirements: ["1-2 years of sales or BD experience.", "Excellent cold-emailing and networking skills."],
    isActive: true
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-Time",
    description: "Help us reach millions of students. You will be responsible for defining and executing digital marketing campaigns.",
    requirements: ["Experience in SEO, SEM, and social media marketing.", "Creative storytelling abilities.", "Data-driven approach to campaign optimization."],
    isActive: true
  },
  {
    title: "SEO Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-Time",
    description: "Optimize our platform content to rank organically across search engines to drive inbound student traffic.",
    requirements: ["Deep understanding of technical SEO and keyword research.", "Experience with Google Analytics and Search Console."],
    isActive: true
  },
  {
    title: "Social Media Manager",
    department: "Marketing",
    location: "Remote",
    type: "Part-Time",
    description: "Manage our presence on Instagram, LinkedIn, and Twitter to build a vibrant community of students.",
    requirements: ["Experience growing social media accounts.", "Strong copywriting skills.", "Knowledge of current social media trends."],
    isActive: true
  },
  // Content & Creative
  {
    title: "Video Editor",
    department: "Content Production",
    location: "Kolkata",
    type: "Full-Time",
    description: "Edit engaging, high-quality videos for our social media channels and platform ecosystem.",
    requirements: ["Proficiency in Adobe Premiere Pro and After Effects.", "Strong sense of pacing and visual storytelling.", "Experience editing short-form content."],
    isActive: true
  },
  {
    title: "Videographer",
    department: "Content Production",
    location: "Faridabad",
    type: "Full-Time",
    description: "Shoot high-quality video content featuring campus tours, student interviews, and promotional material.",
    requirements: ["Experience with professional camera equipment and lighting.", "Ability to direct talent on set.", "Willingness to travel to various campuses."],
    isActive: true
  },
  {
    title: "Graphic Designer",
    department: "Design",
    location: "Remote",
    type: "Full-Time",
    description: "Create compelling marketing assets, social media posts, and brand materials.",
    requirements: ["Proficiency in Adobe Creative Suite (Illustrator, Photoshop).", "Strong eye for typography and layout."],
    isActive: true
  },
  {
    title: "Content Writer",
    department: "Content Production",
    location: "Remote",
    type: "Contract",
    description: "Write informative, engaging articles about college admissions, study abroad tips, and career guides.",
    requirements: ["Exceptional writing and editing skills.", "Ability to research complex topics and simplify them for students."],
    isActive: true
  },
  // Operations & Student Success
  {
    title: "Academic Counsellor",
    department: "Counseling",
    location: "Remote",
    type: "Full-Time",
    description: "Provide expert, data-driven college admission guidance to students looking to study domestically and abroad.",
    requirements: ["Deep understanding of college admission processes.", "Excellent interpersonal and communication skills.", "Empathy and passion for student success."],
    isActive: true
  },
  {
    title: "HR Manager",
    department: "Human Resources",
    location: "Remote",
    type: "Full-Time",
    description: "Scale our team efficiently. Oversee recruitment, onboarding, culture building, and employee satisfaction.",
    requirements: ["3+ years of HR or TA experience in tech startups.", "Strong understanding of remote work culture.", "Excellent conflict resolution skills."],
    isActive: true
  },
  {
    title: "Customer Support Specialist",
    department: "Operations",
    location: "Remote",
    type: "Full-Time",
    description: "Be the first point of contact for students and parents using our platform, resolving issues empathetically.",
    requirements: ["Excellent written communication skills.", "Patience and problem-solving mindset.", "Experience with Zendesk or Intercom."],
    isActive: true
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");

        await Job.deleteMany({});
        console.log("Cleared existing jobs");

        await Job.insertMany(initialJobs);
        console.log(`Successfully inserted ${initialJobs.length} jobs.`);

        mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedDB();
