const mongoose = require("mongoose");
const Shot = require("../models/shot.js");
const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const authorId = new mongoose.Types.ObjectId("68e434abd8fd41fad0d7f25e");

const shotInitialData = [
  {
    title: "UI/UX Designer",
    image: "/images/1.webp",
    hearts: 12,
    likes: 1210,
    tags: ["UI", "UX", "Design", "Web"],
    description: "Modern UI/UX design concepts for web applications.",
    author: authorId,
  },
  {
    title: "Josh Warren",
    image: "/images/2.webp",
    hearts: 25,
    likes: 1325,
    tags: ["Portfolio", "Creative", "Modern"],
    description: "A creative portfolio showcasing modern design ideas.",
    author: authorId,
  },
  {
    title: "Immo Unit",
    image: "/images/3.webp",
    hearts: 18,
    likes: 1412,
    tags: ["Real Estate", "App", "Clean"],
    description: "A clean real estate application design.",
    author: authorId,
  },
  {
    title: "Emote",
    image: "/images/4.webp",
    hearts: 30,
    likes: 1578,
    tags: ["Emotions", "System", "Interactive"],
    description: "An interactive system to express emotions visually.",
    author: authorId,
  },
  {
    title: "Nixtio",
    image: "/images/5.webp",
    hearts: 22,
    likes: 1634,
    tags: ["Branding", "Tech", "Startup"],
    description: "Branding and design for tech startups.",
    author: authorId,
  },
  {
    title: "Jetpacks",
    image: "/images/6.webp",
    hearts: 14,
    likes: 1769,
    tags: ["Gaming", "UI", "Futuristic"],
    description: "Futuristic UI concepts inspired by gaming.",
    author: authorId,
  },
  {
    title: "Ethereum",
    image: "/images/7.webp",
    hearts: 37,
    likes: 1882,
    tags: ["Crypto", "Wallet", "Blockchain"],
    description: "Blockchain wallet and crypto dashboard designs.",
    author: authorId,
  },
  {
    title: "Tubik Arts",
    image: "/images/8.webp",
    hearts: 20,
    likes: 1925,
    tags: ["Art", "Mobile", "Creative"],
    description: "Creative mobile app concepts from Tubik Arts.",
    author: authorId,
  },
  {
    title: "Lain",
    image: "/images/9.webp",
    hearts: 11,
    likes: 2050,
    tags: ["Minimal", "Web", "Typography"],
    description: "Minimal typography-based web design layout.",
    author: authorId,
  },
  {
    title: "Dribbble",
    image: "/images/10.webp",
    hearts: 42,
    likes: 2122,
    tags: ["Social", "Platform", "Community"],
    description: "A social platform for designers to showcase work.",
    author: authorId,
  },
  {
    title: "Behance",
    image: "/images/11.webp",
    hearts: 28,
    likes: 2266,
    tags: ["Showcase", "Creative", "Portfolio"],
    description: "Creative showcase and portfolio platform.",
    author: authorId,
  },
  {
    title: "Figma",
    image: "/images/12.webp",
    hearts: 33,
    likes: 2391,
    tags: ["Design", "Collaboration", "Tools"],
    description: "Collaborative tool for UI/UX design projects.",
    author: authorId,
  },
];

async function connectDB() {
  await mongoose.connect(process.env.MONGOATLASURL);
  console.log("Successfully connected to DB.");

  await Shot.deleteMany({});
  console.log("Successfully cleared old data!");

  await Shot.insertMany(shotInitialData);
  console.log("Successfully inserted new data!");

  mongoose.disconnect();
}

connectDB().catch((error) => {
  console.log("Error while connecting to DB!", error.message);
  mongoose.disconnect();
});
