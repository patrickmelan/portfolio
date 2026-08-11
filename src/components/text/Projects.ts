const projects = [
  {                                                                                                                 
    title: "GovToKnow",     
    description: "Next.js landing site and React admin/client portals built for GovToKnow, along with FastAPI backend, Stripe integration, and custom, embeddable chat widget for municipal websites.",
    image: "/govtoknow.png",
    technologies: ["Next.js", "React", "TypeScript", "FastAPI", "SQLModel", "Stripe", "Docker", "AWS EC2", "nginx", "GitHub Actions"],
    demo: "https://govtoknow.com/",
  },
  {                                                                                                                 
    title: "POLITY Website",     
    description: "Next.js website for POLITY Inc., including full SEO implementation, scroll animations, and static generation.",
    image: "/polity.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Nodemailer", "reCAPTCHA", "AWS Amplify"],
    demo: "https://www.polityinc.com/",
  },
  /*{
    title: "NCAA ML Bracket Predictor",     
    description: "XGBoost model trained on Kaggle NCAA tournament data augmented with Torvik adjusted efficiency ratings to predict game outcomes. Runs 10,000 Monte Carlo simulations of the 68-team bracket to generate per-team round-by-round advancement probabilities, then surfaces results in a Next.js frontend with live betting line      comparison via the Odds API.",                                                                                    
    image: "/final_four.png",
    technologies: ["Python", "XGBoost", "pandas", "NumPy", "Next.js", "React", "Tailwind CSS", "TypeScript"],
    demo: "https://github.com/patrickmelan/Onions-Basketball-Index",
  },*/
  {                                                                                                                 
    title: "Easton Flipped Website + Dashboard",
    description: "Full-stack (containerized) real estate platform for a local house-flipping business. Client-facing frontend is built using Next.js and Tailwind, pulling live property data, inputted on the admin dashboard, from the PostgreSQL DB through the custom API.",
    image: "/EastonFlippedImg.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Drizzle ORM", "PostgreSQL", "AWS S3", "Recharts"],
    demo: "https://eastonflipped.com",
  },
  {
    title: "Parent Compass Coaching Website",
    description: "Next.js website for a local parent coaching business with SMTP configured using Resend.",
    image: "/ParentCompass.png",
    technologies: ["Next.js", "Resend", "TailwindCSS"],
    demo: "https://www.parentcompasscoaching.com/",
  },
  {
    title: "POLITY Data Request Form",
    description: "Full-stack multi-municipality data review platform built for POLITY Inc. Custom Express API fuzzy-matches MAT and GIS parcel records, allowing users to resolve discrepancies in the multi-step React wizard.",
    image: "/PolityForm.png",
    technologies: ["React", "Tailwind CSS", "Clerk", "Node.js", "Express", "AWS S3", "AWS DynamoDB", "AWS Athena", "AWS EC2", "Fuse.js", "PapaParse"], 
  }
];

export default projects;
