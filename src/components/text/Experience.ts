const experiences = [
  {
    title: "Founding AI Engineer",
    company: "GovToKnow",
    link: "https://www.govtoknow.com/",
    period: "May 2026 - Present",
    description:
      "Rebuilt the company’s landing site in Next.js with a cleaner UI and better SEO, which increased active users and engagement by 69.7% and 46.4%, respectively. Built an in-chat records request payment system with FastAPI, SQLModel, and a custom React widget, using Stripe manual-capture holds, ID upload verification, and an admin approval/denial portal, gating sensitive data behind a human layer. Built the admin and client-portal UIs in React and TypeScript using shadcn/ui, set up CI/CD for the Dockerized app on AWS EC2, and led incident response when we had a production outage.",
    technologies: ["Next.js", "React", "TypeScript", "FastAPI", "SQLModel", "Stripe", "Docker", "AWS EC2", "nginx", "GitHub Actions"],
  },
  {
    title: "Software Engineer",
    company: "POLITY Inc.",
    link: "https://www.polityinc.com/",
    period: "May 2025 - May 2026",
    description:
      "Built a full-stack government data platform used by nine municipalities, with a Clerk-authenticated React dashboard for field mapping and record validation. Set up an AWS Express API on EC2 that combined S3, DynamoDB, and Athena to store and query parcel data, and used Fuse.js to fuzzy match MAT/GIS discrepancies across thousands of records. Rebuilt the company’s site using Next.js and TailwindCSS with static generation, dynamic OG images, and full SEO metadata.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Node.js", "AWS", "Fuse.js"],
  },
  /*{
    title: "Freelance Full-Stack Developer/Designer",
    company: "Easton Flipped, LLC",
    link: "https://eastonflipped.com",
    period: "February 2026 - April 2026",
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
  },*/
  {
    title: "IT Software Development Intern",
    company: "St. Luke's University Health Network",
    link: "https://www.slhn.org",
    period: "June - August 2024",
    type: "Internship",
    description:
      "Built a Power BI dashboard that tracks physician stats from Azure to automate reports and reduce manual HR work. Set up a Power Automate workflow to run the Azure query weekly and refresh the dashboard on its own.",
    technologies: ["Microsoft Power BI", "Power Automate", "Azure"],
  },
  {
    title: "IT Security Intern",
    company: "St. Luke's University Health Network",
    link: "https://www.slhn.org",
    period: "June - August 2023",
    type: "Internship",
    description:
      "Rotated through the Identity Access Management, Disaster Recovery, and Cybersecurity teams. Wrote KQL queries in Microsoft Sentinel for security monitoring and shadowed senior engineers on security architecture and incident response.",
    technologies: ["KQL", "Microsoft Sentinel", "Azure AD"],
  },
  /*{
    title: "Student, B.S. in Software Engineering",
    company: "Drexel University",
    link: "https://drexel.edu",
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
  }*/
];

export default experiences;
