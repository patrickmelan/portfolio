const projects = [
  {                                                                                                                 
    title: "NCAA ML Bracket Predictor",     
    description: "XGBoost model trained on Kaggle NCAA tournament data augmented with Torvik adjusted efficiency ratings to predict game outcomes. Runs 10,000 Monte Carlo simulations of the 68-team bracket to generate per-team round-by-round advancement probabilities, then surfaces results in a Next.js frontend with live betting line      comparison via the Odds API.",                                                                                    
    image: "/final_four.png",
    technologies: ["Python", "XGBoost", "pandas", "NumPy", "Next.js", "React", "Tailwind CSS", "TypeScript"],
    demo: "/onions-index",
    category: "Data Science"
  },
  {
    title: "Polity Data Request Form",
    description:
      "Built a full-stack web app for Polity, a government data consulting company, using React and AWS. The app allows clients to visually explore their data in a dashboard before a data migration.",
    image:
      "https://cdn.prod.website-files.com/689a291b8f338acb6e4aed69/689a291b8f338acb6e4aed7c_logo.svg",
    technologies: ["React", "AWS", "DynamoDB", "S3", "Athena", "Clerk"],
    demo: "https://www.polityinc.com/",
    category: "Client Work",
  },
  {                                                                                                                 
    title: "Easton Flipped",
    description: "Full-stack real estate platform for a property renovation business, built with Next.js 15 and PostgreSQL via Drizzle ORM. JWT authentication is enforced at the Edge via Next.js middleware, protecting an admin dashboard for managing property listings with S3 image uploads and four distinct contact form flows (sell/buy/general/quick) with reCAPTCHA v3. Deployed as a multi-container Docker Compose stack with Caddy (auto HTTPS), self-hosted Umami analytics, and DNS via AWS Route 53.",
    image: "/eastonflipped.png",
    technologies: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "AWS S3", "Docker", "Tailwind CSS", "Caddy", "Umami Analytics"],
    demo: "https://eastonflipped.com",                                                                            
    category: "Client Work"
  }
];

export default projects;
