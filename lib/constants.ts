// Sumway Global Management Private Limited - Central Constants

export const COMPANY_DETAILS = {
  name: "Sumway Global Management Private Limited",
  shortName: "Sumway Global",
  tagline: "Your Happiness Our Resolution",
  since: "30 September 2024",
  address: "210 Stock Exchange Building, JLN Marg, Malviya Nagar, Jaipur, Rajasthan 302017",
  phone: "+91 9414940434",
  phoneDisplay: "+91 94149 40434",
  email: "sumwayglobal@gmail.com",
  whatsapp: "919414940434",
  hours: "Monday - Saturday: 9:30 AM - 6:30 PM (Sunday Closed)",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8970715366366!2d75.80373837617658!3d26.843187976689626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6001ab43037%3A0xe21fcf4dfaf758c0!2sJaipur%20Stock%20Exchange%20Building!5e0!3m2!1sen!2sin!4v1717060000000!5m2!1sen!2sin"
};

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/sumway-global",
  twitter: "https://twitter.com/sumwayglobal",
  instagram: "https://instagram.com/sumwayglobal",
  facebook: "https://facebook.com/sumwayglobal"
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "About Us", href: "/company/about-us", desc: "Our journey, milestones and corporate profile" },
      { label: "Mission & Vision", href: "/company/mission-vision", desc: "What drives our dedication to excellence" },
      { label: "Who We Are", href: "/company/who-we-are", desc: "Our corporate culture and business foundation" },
      { label: "What We Do", href: "/company/what-we-do", desc: "Strategic staffing, tech and business operations" },
      { label: "Leadership Team", href: "/company/leadership-team", desc: "Meet the executive board steering global growth" },
      { label: "Why Choose Us", href: "/company/why-choose-us", desc: "Our unique enterprise advantages and comparison" },
      { label: "Client Portfolio", href: "/company/client-portfolio", desc: "Brands that trust Sumway Global for recruitment" },
      { label: "CSR Activities", href: "/company/csr", desc: "Giving back and sustainable corporate governance" }
    ]
  },
  {
    label: "Industries",
    href: "#",
    children: [
      { label: "BPO Operations", href: "/industries/bpo", desc: "Global customer service and back-office solutions" },
      { label: "IT & Software Development", href: "/industries/it-software", desc: "Custom digital solutions and systems architecture" },
      { label: "Digital Marketing", href: "/industries/digital-marketing", desc: "Data-driven SEO, PPC and brand transformation" },
      { label: "Skill Development", href: "/industries/skill-development", desc: "Fostering Indian talent for tomorrow's business" }
    ]
  },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Staffing Solutions", href: "/services/staffing-solutions", desc: "Contract and full-time professional staffing" },
      { label: "Recruitment Process Outsourcing (RPO)", href: "/services/rpo", desc: "End-to-end management of corporate hiring" },
      { label: "Internship Programs", href: "/services/internship", desc: "Industrial and corporate internship placement" },
      { label: "Web Dev & Graphic Design", href: "/services/web-development-graphic", desc: "Stunning websites, applications and designs" },
      { label: "Support Services", href: "/services/support-services", desc: "Virtual assistants, BPO hires and helpdesk operations" }
    ]
  },
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Workforce Management", href: "/solutions/workforce-management", desc: "Optimizing employee scheduling and performance" },
      { label: "BPO Hiring Solutions", href: "/solutions/bpo-hiring", desc: "High-volume call center and support recruiting" },
      { label: "Business Support Operations", href: "/solutions/business-support", desc: "Compliance, HR consulting and payroll systems" },
      { label: "Digital Transformation", href: "/solutions/digital-transformation", desc: "Modernizing corporate infrastructure with IT" }
    ]
  },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const STATS = [
  { id: "years", label: "Years Active", value: 2, suffix: "+" },
  { id: "clients", label: "Clients Served", value: 150, suffix: "+" },
  { id: "industries", label: "Industries Covered", value: 8, suffix: "" },
  { id: "placed", label: "Professionals Placed", value: 2500, suffix: "+" }
];

export const SERVICES = [
  {
    id: "staffing",
    title: "Staffing Solutions",
    href: "/services/staffing-solutions",
    icon: "Users",
    desc: "Placing premium executive, technical, and commercial candidates in top-tier roles.",
    benefits: ["Direct Hire Placements", "Contract-to-Hire Flexibility", "Vetted Quality Professionals"]
  },
  {
    id: "rpo",
    title: "Recruitment Process Outsourcing (RPO)",
    href: "/services/rpo",
    icon: "Briefcase",
    desc: "Strategic, end-to-end recruitment outsourcing to streamline your corporate talent pipeline.",
    benefits: ["Reduced Cost-Per-Hire", "Scalable Recruiter Deployment", "Employer Brand Uplift"]
  },
  {
    id: "internship",
    title: "Internship Programs",
    href: "/services/internship",
    icon: "GraduationCap",
    desc: "Bridging the gap between raw academy talent and practical, enterprise-grade work experience.",
    benefits: ["Pre-Screened Indian Talents", "Hands-on Industry Mentoring", "Pipelining Future Leaders"]
  },
  {
    id: "web-dev",
    title: "Web & Graphic Design",
    href: "/services/web-development-graphic",
    icon: "Laptop",
    desc: "Creating jaw-dropping web apps and marketing collateral designed to wow digital consumers.",
    benefits: ["Responsive Modern Web Dev", "High-conversion UX Wireframes", "Brand Visual Standard Setup"]
  },
  {
    id: "support",
    title: "Support Services",
    href: "/services/support-services",
    icon: "Headphones",
    desc: "Full-service BPO, helpdesk, and administrative support tailored for international scaling.",
    benefits: ["24/7 Virtual Assistance", "Multilingual Support Channels", "Robust Operations Security"]
  }
];

export const SOLUTIONS = [
  {
    id: "workforce",
    title: "Workforce Management",
    href: "/solutions/workforce-management",
    icon: "Clock",
    problem: "Rising overheads and scheduling inefficiencies impact employee morale and production.",
    benefits: ["Optimized shift scheduling and tracking", "AI-driven capacity planning", "Real-time compliance validation"]
  },
  {
    id: "bpo-hiring",
    title: "BPO Hiring Solutions",
    href: "/solutions/bpo-hiring",
    icon: "PhoneCall",
    problem: "Extremely high turnover and training cost in the customer relations industry.",
    benefits: ["Tailored psychological profile screening", "High-volume recruitment campaigns in Jaipur", "Pre-trained customer service agents ready"]
  },
  {
    id: "business-support",
    title: "Business Support Operations",
    href: "/solutions/business-support",
    icon: "ShieldCheck",
    problem: "Navigating local Indian regulations, payroll scaling, and HR administrative burdens.",
    benefits: ["Complete payroll and tax compliance processing", "Statutory benefits administration", "HR policy standardizing and setup"]
  },
  {
    id: "digital",
    title: "Digital Transformation",
    href: "/solutions/digital-transformation",
    icon: "TrendingUp",
    problem: "Legacy technologies and slow processes dragging down competitive capacity.",
    benefits: ["Cloud infrastructure migrations", "Process automation & workflow digitization", "Custom IT software development"]
  }
];

export const INDUSTRIES = [
  {
    id: "bpo",
    title: "BPO & Customer Care",
    href: "/industries/bpo",
    stats: "24/7 Operations",
    desc: "Back-office operations, voice, chat and helpdesk support services delivering global excellence.",
    image: "https://images.unsplash.com/photo-1521791136364-7286472b6458?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "it",
    title: "IT & Software Services",
    href: "/industries/it-software",
    stats: "React, Next.js, Cloud",
    desc: "Outsourced product engineering, app development, database configuration and security.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "digital",
    title: "Digital Marketing",
    href: "/industries/digital-marketing",
    stats: "300%+ ROI Growth",
    desc: "Elevating brands through robust SEO practices, creative visual assets, and pay-per-click ad systems.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "skill",
    title: "Skill Development",
    href: "/industries/skill-development",
    stats: "98% Placement Rate",
    desc: "Empowering university graduates and career shifters with industry-vetted job training modules.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
  }
];

export const LEADERSHIP = [
  {
    name: "Dr. Sankalp Bendale",
    role: "Chairman & Managing Director",
    bio: "Visionary corporate strategist with 15+ years of scaling consulting firms across BPO and technology landscapes.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    linkedin: "#"
  },
  {
    name: "Mrs. Meenakshi Sharma",
    role: "Director of HR Operations",
    bio: "Champion of talent curation, specializing in RPO setups, statutory compliance, and staffing operations in India.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    linkedin: "#"
  },
  {
    name: "Mr. Rajat Verma",
    role: "Chief Technology Officer",
    bio: "Architect of robust software solutions, leading digital transformations, API channels, and enterprise cloud migrations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    linkedin: "#"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Sumway Global transformed our hiring timeline. Their RPO solutions reduced our sourcing time by 40% and delivered incredibly qualified candidates.",
    name: "Amit K. Singhal",
    role: "VP of Engineering",
    company: "TechnoStack Global",
    rating: 5
  },
  {
    quote: "Highly professional customer care team. Their virtual assistants handle our support channels beautifully, letting us focus on strategic product operations.",
    name: "Sarah Jenkins",
    role: "Director of Support",
    company: "Apex Retail US",
    rating: 5
  },
  {
    quote: "Their skill development trainees are exceptional. They join our team ready to execute projects, cutting training costs to almost zero.",
    name: "Devendra Rajawat",
    role: "Managing Partner",
    company: "Jaipur Digital Solutions",
    rating: 5
  }
];

export const JOBS = [
  {
    id: "bpo-assoc",
    title: "Customer Support Associate (Voice/Chat)",
    dept: "BPO Operations",
    type: "Full-Time",
    loc: "Jaipur, IN",
    desc: "Looking for energetic communicators to assist global clients via voice and live chat channels.",
    reqs: [
      "Excellent spoken and written English skills",
      "Willingness to work in shifts (rotational)",
      "Basic computing and typing proficiency (30 WPM+)"
    ]
  },
  {
    id: "nextjs-dev",
    title: "React / Next.js Full Stack Engineer",
    dept: "IT & Software",
    type: "Full-Time",
    loc: "Jaipur (On-site)",
    desc: "Join our digital transformation division to construct premium, lightning-fast web assets for corporate clients.",
    reqs: [
      "2+ years experience building applications in React and Next.js App Router",
      "Strong command over TypeScript and Tailwind CSS styles",
      "Familiarity with serverless database systems and REST/GraphQL APIs"
    ]
  },
  {
    id: "intern-digital",
    title: "Digital Marketing Trainee (Internship)",
    dept: "Digital Marketing",
    type: "Internship",
    loc: "Jaipur, IN",
    desc: "A hands-on placement program working on live corporate projects, SEO indexing, and social ad sets.",
    reqs: [
      "Basic understanding of social channels and SEO keywords",
      "Excellent written communication and copywriting drive",
      "Duration: 6 Months (Performance-based PPO offer)"
    ]
  }
];

export const BLOGS = [
  {
    slug: "scaling-talent-pipeline-2026",
    category: "Recruitment",
    title: "Scaling Your Corporate Talent Pipeline in 2026: The RPO Advantage",
    date: "May 25, 2026",
    excerpt: "Discover why standard hiring systems are falling behind and how recruitment outsourcing can secure premium talent fast.",
    author: "Meenakshi Sharma",
    readTime: "5 Min Read",
    image: "https://images.unsplash.com/photo-1521791136364-7286472b6458?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "why-jaipur-is-india-next-it-hub",
    category: "Industry News",
    title: "Why Jaipur is Emerging as India's Next Top BPO and IT Destination",
    date: "April 18, 2026",
    excerpt: "Lower operational overheads, state-of-the-art buildings, and rich university graduates make the Pink City a key corporate node.",
    author: "Sankalp Bendale",
    readTime: "7 Min Read",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
  },
  {
    slug: "harnessing-nextjs-tailwind-luxury-web",
    category: "Technology",
    title: "Harnessing Next.js & Tailwind CSS for Exquisite Dark Luxury Web Layouts",
    date: "March 10, 2026",
    excerpt: "Analyzing the modern user preferences for dark modes, sleek transitions, gold accents, and fluid glassmorphic effects.",
    author: "Rajat Verma",
    readTime: "4 Min Read",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  }
];
