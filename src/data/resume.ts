import { Resume } from "@/types/resume";

export const resume: Resume = {
  name: "Shashwat Singh Chauhan",
  contact: {
    email: "shashwatcha10@gmail.com",
    linkedin: "https://www.linkedin.com/in/shashwatschauhan/",
    mobile: "+91-9982602200",
  },
  summary: "Full-stack engineer specializing in enterprise backend systems, cloud integrations, and developer tooling.",
  skills: {
    languages: ["Java", "SQL", "Python", "C#"],
    backend: ["Spring Boot", "Spring MVC", "JAX-RS", "REST APIs", "IBM MQ", "Okta", "SFTP / FTP", "MVC Architecture"],
    databases: ["MySQL", "SQL"],
    frontend: ["HTML", "CSS", "JSP", "ReactJS", "React Native"],
    devopsTools: ["Git", "GitHub", "GitLab", "GitHub Actions", "GitLab CI", "AutoSys", "Maven", "Flyway", "HashiCorp Vault", "Datadog", "ArmorCode"],
    cloudStorage: ["AWS S3", "Firebase"],
    domain: ["ETF Order Management Systems", "Financial Services", "System Integration", "Capital Markets"],
  },
  experience: [
    {
      title: "Java Developer",
      company: "Genpact India Pvt. Ltd., Bangalore",
      period: "Feb 2025 – Present",
      highlights: [
        "Developing and maintaining a business-critical ETF Order Management System used daily by 50+ users across the client's Authorized Participants (APs), processing 50+ high-value creation and redemption orders a day across 6,000+ IBM MQ messages, where every message must be handled exactly once, in order, with consistent state across multiple systems.",
        "Designed and delivered end-to-end workflows for two new order statuses spanning multiple repositories (C# frontend, Spring Boot server, and Java service layer), coordinating changes across every tier to ship each as a complete, working feature.",
        "Set up connectivity to a new external order-routing platform and built the inbound workflows to receive and process orders from it end to end.",
        "Raised unit test coverage of the Java server from 7% to 78%+ across 230+ source files, and set up unit test result reporting in CI pipelines for visibility on every build.",
        "Led Root Cause Analysis (RCA) on production incidents as primary owner across a multi-tier platform with a C# frontend and Java/Spring Boot server, tracing application, integration, and cache issues through 4M+ Datadog log events a day and shipping preventive fixes.",
        "Maintain Python automation run as AutoSys jobs that receives inbound files over SFTP and FTP, fetches upstream data, generates 4–5K+ PLF and basket files across the infrastructure, distributes them to multiple AWS S3 locations, and sends automated email notifications.",
        "Migrated projects from Java 8 to Java 21 and from a proprietary Popcorn starter parent to the open-spring starter parent, resolving deprecated APIs and improving long-term maintainability.",
        "Moved repositories from GitLab to GitHub, rebuilding GitLab pipelines as organization-standard GitHub Actions CI/CD workflows and moving CI secrets to HashiCorp Vault.",
        "Work on application security across Okta-based authentication with Okta user groups for role-based access, and remediated security findings reported by ArmorCode across enterprise applications.",
        "Implemented database schema and data migrations using Flyway, ensuring version-controlled deployments across multiple environments.",
        "Designed and maintained in-memory caching solutions and developed checklist/health-check APIs used by load balancer and proxy health checks to keep traffic on healthy instances, improving performance, cache validation, and operational monitoring.",
        "Integrated enterprise applications with internal financial platforms to support end-to-end order lifecycle management and status tracking.",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Blockstash, C3I Hub IIT Kanpur, Kanpur",
      period: "Sep 2024 – Nov 2024",
      highlights: [
        "Designed and developed a secure chat application using the MERN stack to facilitate communication between law enforcement agencies (LEAs) and cryptocurrency exchanges.",
        "Implemented frontend dashboards and backend APIs for request management, real-time chat, and user authentication.",
        "Conducted web scraping and token decoding to analyze cryptocurrency transactions and map suspicious activities.",
      ],
    },
  ],
  projects: [
    {
      title: "E-Garage",
      client: "Dr. Devpriya Soni",
      period: "Jun 2023 – Jun 2024",
      details: [
        "Developed a standalone automobile platform integrating three ML models: Car Price Estimator, Car Maintenance Tracker, and Fuel Efficiency Estimator, providing comprehensive services for users and service centers.",
        "Implemented XAI (Explainable AI) to predict and explain the causes for maintenance needs in automobiles.",
        "Designed and developed the frontend using HTML and CSS, creating an intuitive and user-friendly interface.",
      ],
    },
    {
      title: "FlySmart",
      client: "Self-directed project",
      period: "Apr 2025 – Jun 2025",
      details: [
        "Developed a full-stack flight management and booking system with role-based access for Owner, Manager, and Customer, enabling secure and segmented control.",
        "Built two separate dashboards for Flight Managers and Business Owners, and a booking interface for end users to streamline administrative and customer-facing operations.",
        "Implemented backend with Java, Spring Boot, and MySQL, featuring modular service layers and Spring MVC architecture.",
        "Created a dynamic frontend using JSP for seamless user interaction and content rendering.",
      ],
    },
  ],
  education: {
    institution: "Jaypee Institute of Information Technology, Noida",
    degree: "B.Tech in Computer Science",
    period: "2020 – 2024",
  },
};
