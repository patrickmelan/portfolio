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
    title: "Easton Flipped",
    description: "Full-stack real estate platform for a property renovation business, built with Next.js 15 and PostgreSQL via Drizzle ORM. JWT authentication is enforced at the Edge via Next.js middleware, protecting an admin dashboard for managing property listings with S3 image uploads and four distinct contact form flows (sell/buy/general/quick) with reCAPTCHA v3. Deployed as a multi-container Docker Compose stack with Caddy (auto HTTPS), self-hosted Umami analytics, and DNS via AWS Route 53.",
    image: "/eastonflipped.png",
    technologies: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "AWS S3", "Docker", "Tailwind CSS", "Caddy", "Umami Analytics"],
    demo: "https://eastonflipped.com",                                                                            
    category: "Client Work"
  },
  {                                                                                                                                                              
    title: "Polity Data Request Form",                                                                                                                           
    description: "Full-stack multi-municipality data review platform built for Polity Inc., a government data consulting company. Clients authenticate via Clerk and  walk through guided workflows to either map and request specific data fields or validate existing government records (permits, code violations, GIS parcels) before a data migration. An Express API on EC2 backs AWS Athena SQL queries over S3-stored data and fuzzy-matches MAT vs. GIS parcel records with Fuse.js,     surfacing discrepancies in a multi-step React wizard.",                                                                                                        
    image: "https://cdn.prod.website-files.com/689a291b8f338acb6e4aed69/689a291b8f338acb6e4aed7c_logo.svg",                                                      
    technologies: ["React", "Tailwind CSS", "Clerk", "Node.js", "Express", "AWS S3", "AWS DynamoDB", "AWS Athena", "AWS EC2", "Fuse.js", "PapaParse"],           
    demo: "",                                                                                                                          
    category: "Client Work",                                                                                                                                     
  } 
];

export default projects;
