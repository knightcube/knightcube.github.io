export const caseStudies = {
  "mba-quiz-portal": {
    title: "MBA Quiz Practice Portal",
    breadcrumb: "Case Study",
    role: "Software Engineer & Product Architect",
    timeline: "2026",
    status: "Deployed",
    heroImage: "/images/mba_quiz.gif",
    story: [
      "Built to solve a real-world problem for my batch of 200+ MMS students at IIM Indore who needed high-quality exam practice material.",
      "Trained Claude on lecture transcriptions, book chapters, and notes to generate an AI-curated curriculum of 500+ questions, and built a highly scalable React engine to serve them.",
    ],
    problem: {
      text: "Students lacked a centralized, mobile-responsive platform to practice complex quantitative subjects and track their weak topics.",
      points: [
        "No efficient way to track, isolate, and exclusively reattempt incorrect or skipped questions.",
      ],
    },
    solution: {
      text: "Architected a React/Vite quiz app featuring a decoupled JSON data hub and Supabase integration.",
      points: [
        "Engineered an automated 'Targeted Weakness Review' funnel using the React Context API.",
      ],
    },
    architecture: [
      {
        icon: "database",
        title: "JSON Data Hub",
        description: "The frontend is structured around a central JSON data hub that feeds question content to components, allowing for dynamic rendering and easy updates."
      },
      {
        icon: "cloud_sync",
        title: "Supabase Backend",
        description: "Handles user authentication, data storage for user progress and performance metrics, and serves as the backend for the 'Targeted Weakness Review' funnel."
      },
      {
        icon: "memory",
        title: "React/Vite Engine",
        description: "Optimized bundling with Vite. Implemented React-Markdown."
      }
    ]
  },
 
};