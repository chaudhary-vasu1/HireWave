const dummyResumeData = [
  {
    _id: "1",
    title: "Software Engineer Resume",
    lastModified: "2 days ago",
    updatedAt: "2026-08-01T10:00:00.000Z",

    personal_info: {
      full_name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 9876543210",
      location: "Noida, Uttar Pradesh, India",
      profession: "Software Engineer",
      website: "https://rahulsharma.dev",
      linkedin: "https://linkedin.com/in/rahulsharma",
      image: "https://i.pravatar.cc/300?img=12",
    },

    professional_summary:
      "Passionate Full Stack Developer with expertise in the MERN stack. Experienced in building scalable web applications and REST APIs.",

    education: [
      {
        _id: "1",
        institution: "Meerut Institute of Engineering and Technology",
        degree: "Bachelor of Technology",
        field: "Computer Science and Engineering",
        startDate: "2023",
        endDate: "2027",
        cgpa: "8.35",
      },
    ],

    experience: [
      {
        _id: "1",
        company: "TechNova Solutions",
        role: "Frontend Developer Intern",
        location: "Remote",
        startDate: "May 2026",
        endDate: "July 2026",
        responsibilities: [
          "Built responsive React components.",
          "Integrated REST APIs using Axios.",
          "Improved application performance by 30%.",
        ],
      },
    ],

    projects: [
      {
        _id: "1",
        title: "HireWave",
        techStack: [
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "Tailwind CSS",
        ],
      },
    ],

    skills: {
      languages: ["Java", "JavaScript", "SQL", "HTML", "CSS"],
      frameworks: ["React", "Node.js", "Express", "Tailwind CSS"],
      databases: ["MongoDB", "MySQL"],
      tools: ["Git", "GitHub", "VS Code", "Postman"],
    },

    certifications: [
      {
        _id: "1",
        title: "Java Programming",
        issuer: "CodeAlpha",
        year: "2026",
      },
    ],

    achievements: [
      "Solved 450+ DSA problems on LeetCode.",
      "Built 10+ MERN projects.",
    ],

    languages: ["English", "Hindi"],

    interests: [
      "Open Source",
      "Artificial Intelligence",
      "Competitive Programming",
    ],
  },

  {
    _id: "2",
    title: "Frontend Developer Resume",
    lastModified: "Yesterday",
    updatedAt: "2026-08-02T10:00:00.000Z",

    personal_info: {
      full_name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 9876543210",
      location: "Noida, India",
      profession: "Frontend Developer",
      website: "https://rahulsharma.dev",
      linkedin: "https://linkedin.com/in/rahulsharma",
      image: "https://i.pravatar.cc/300?img=13",
    },

    professional_summary: "Frontend Developer specializing in React.js and Tailwind CSS.",

    education: [],
    experience: [],
    projects: [],
    skills: {},
    certifications: [],
    achievements: [],
    languages: ["English", "Hindi"],
    interests: ["Web Development"],
  },
];

export default dummyResumeData;