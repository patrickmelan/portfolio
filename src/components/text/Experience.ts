const experiences = [
  {
    title: "Freelance Full-Stack Developer",
    company: "Easton Flipped, LLC",
    period: "February 2026 - Present",
    type: "Freelance",
    description:
      "Built and deployed a full-stack real estate platform for a local property flipping business, handling everything from infrastructure to authentication.",
    achievements: [
      "Built a full-stack platform with Next.js 15 and PostgreSQL via Drizzle ORM",
      "Implemented JWT authentication at the edge via Next.js middleware",
      "Configured multi-container Docker Compose deployment with Caddy reverse proxy for auto HTTPS",
      "Integrated reCAPTCHA v3 and self-hosted Umami analytics",
      "Set up AWS Route 53 DNS and S3 image uploads for the admin dashboard",
    ],
    technologies: ["Next.js 15", "PostgreSQL", "Drizzle ORM", "Docker", "AWS S3", "AWS Route 53", "Caddy", "Umami"],
  },
  {
    title: "Freelance Software Engineer",
    company: "Polity Inc.",
    period: "May 2025 - Present",
    type: "Freelance",
    description:
      "Built a multi-client government data review platform in React + Tailwind CSS, serving 9 municipalities through a Clerk-authenticated multi-step wizard with two core flows: field mapping and record validation.",
    achievements: [
      "Designed and deployed an Express REST API on AWS EC2 integrating S3 file uploads, DynamoDB batch writes, and Athena SQL queries to store and surface permit, GIS parcel, and code violation data at scale",
      "Implemented server-side fuzzy matching with Fuse.js over paginated Athena results to detect MAT vs. GIS parcel discrepancies (addresses, owner names) across thousands of government records",
      "Bundled the React app with custom Webpack config and deployed to S3 for embedding in Polity's Webflow site",
    ],
    technologies: ["React", "Tailwind CSS", "Clerk", "Node.js", "Express", "AWS S3", "AWS DynamoDB", "AWS Athena", "AWS EC2", "Fuse.js", "Webpack"],
  },
  {
    title: "IT Software Development Intern",
    company: "St. Luke's University Health Network",
    period: "June 2024 - August 2024",
    type: "Internship",
    description:
      "Worked alongside software development professionals to plan, build, test, and deploy internal tooling, with a focus on data dashboards and workflow automation.",
    achievements: [
      "Built a real-time Power BI dashboard for employee statistics across the network",
      "Participated in Agile sprint planning and contributed to the team task board",
      "Developed automation solutions using Power Automate and Azure Functions",
      "Gained hands-on experience with the full in-house software development lifecycle",
    ],
    technologies: ["Microsoft Power BI", "Power Automate", "Azure", "Python", "C#"],
  },
  {
    title: "IT Security Intern",
    company: "St. Luke's University Health Network",
    period: "June 2023 - August 2023",
    type: "Internship",
    description:
      "Rotated through Identity Access Management, Disaster Recovery, and Cybersecurity teams, gaining exposure to enterprise security operations at a major health network.",
    achievements: [
      "Wrote KQL queries in Microsoft Sentinel for cybersecurity monitoring and employee cyber safety",
      "Learned IAM policies and procedures; assisted in onboarding and access support/analysis",
      "Shadowed senior engineers to understand IT security architecture and incident response",
      "Participated in cross-department daily standups covering multiple IT teams",
    ],
    technologies: ["KQL", "Microsoft Sentinel", "Azure AD"],
  },
  {
    title: "Student, B.S. in Software Engineering",
    company: "Drexel University",
    period: "September 2025 - June 2030 (expected)",
    type: "Education",
    description:
      "Pursuing a B.S. in Software Engineering with coursework spanning algorithms, systems design, and applied mathematics.",
    achievements: [
      "3.95 GPA — Dean's List, Fall & Winter Quarters",
      "Relevant coursework: Programming I & II, Computing & Informatics Design I-III, Multivariate Calculus",
      "Member of the Drexel AI/ML Society",
      "Student Manager for the Women's Basketball Team",
    ],
    technologies: ["Python", "Unix", "Git"],
  }
  /*{
    title: "High School Student",
    company: "Easton Area High School",
    period: "September 2021 - June 2025",
    type: "Education",
    description:
      "Graduated with a strong CS and business background, competing in state-level programming competitions.",
    achievements: [
      "Maintained a 4.0 GPA in all CS-related courses",
      "Commencement Welcome Speaker",
      "2023 PA FBLA Coding & Programming State Champion",
      "2024 PA FBLA Mobile Application Development State Champion",
      "Worked as a PIAA Basketball official since December 2023",
    ],
    technologies: [
      "Python",
      "Java",
      "JavaScript",
      "Git",
      "SQL",
      "Firebase",
      "OpenAI API",
    ],
  },*/
];

export default experiences;
