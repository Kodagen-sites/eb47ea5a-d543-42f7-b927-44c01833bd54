/**
 * site-config.ts — single source of truth for SaharaOps.
 * Generation: cinematic-site-generator · Archetype G
 * Content: SaharaOps — Operational Readiness Consulting for Startups, SMEs & NGOs.
 */

export type Service = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  description: string;
  deliverables: string[];
  imageUrl: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export const siteConfig = {
  headerVariant: "transparent-ghost",

  company: {
    name: "SaharaOps",
    legalName: "SaharaOps Ltd.",
    tagline: "Operational Readiness Consulting.",
    description:
      "SaharaOps helps Startups, SMEs, and NGOs build the systems, processes, and strategies they need to scale efficiently, cut costs, and achieve sustainable growth.",
    email: "hello@saharaops.com",
    location: "Remote · Worldwide",
  },

  contact: {
    email: "hello@saharaops.com",
    phone: "+1 555 010 0000",
    location: "Remote · Working with teams worldwide",
    calendlyUrl: "https://calendly.com/saharaops/consultation",
  },

  seo: {
    siteUrl: "https://saharaops.com",
    title: "Operational Readiness Consulting for Startups, SMEs & NGOs | SaharaOps",
    description:
      "SaharaOps helps Startups, SMEs, and NGOs in Africa, the Middle East, Europe, and Asia scale with operational readiness, process optimization, and investor readiness consulting.",
    locale: "en_US",
  },

  hero: {
    eyebrow: "Operational Readiness Consulting",
    h1: ["Operational readiness", "for Startups,", "SMEs & NGOs."],
    subhead:
      "We build the systems, processes, and strategies that help organizations scale efficiently, cut costs, and achieve sustainable growth.",
    ctaLabel: "Book a Consultation",
    ctaHref: "/contact",
  },

  valueProp: {
    eyebrow: "Why SaharaOps?",
    statement:
      "Growth requires structure. Without the right processes, strategy and execution fall out of sync — leading to inefficiencies, quality issues, and missed opportunities. At SaharaOps, we close that gap.",
  },

  typeStatement: {
    eyebrow: "What we believe",
    statement:
      "At the heart of every organization lies a simple truth: growth requires structure.",
  },

  services: [
    {
      slug: "startups",
      index: "01",
      name: "For Startups",
      summary: "Build resilience, scale faster, and get investment-ready.",
      description:
        "Scaling a startup often comes with chaos — broken processes, rising costs, and investor demands. We help you bring structure without slowing growth, from burn-rate optimization to investor readiness, so you scale with clarity and confidence.",
      deliverables: [
        "Operational Readiness Assessments — current vs. future state",
        "Process Optimization & Automation — reduce costs, improve efficiency",
        "Investor Readiness — pitch decks, financial forecasts, business model validation",
        "Scaling & Market Expansion Strategies",
        "Agile Project & Change Management",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-startups.jpg",
    },
    {
      slug: "smes",
      index: "02",
      name: "For SMEs",
      summary: "Streamline operations and scale sustainably.",
      description:
        "SMEs face unique challenges — managing costs, building resilient teams, and expanding into new markets while staying efficient. We help SMEs design scalable systems and remove the inefficiencies that slow growth.",
      deliverables: [
        "Business Process Optimization — workflow redesign, automation tools",
        "Organizational Design & Talent Development — team structure, leadership coaching",
        "Risk Management & Business Resilience",
        "Expansion into New Markets & Product Lines",
        "Performance Management & Succession Planning",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-smes.jpg",
    },
    {
      slug: "ngos",
      index: "03",
      name: "For NGOs & Nonprofits",
      summary: "Strengthen accountability, improve impact, and deliver programs effectively.",
      description:
        "Nonprofits must demonstrate efficiency, accountability, and measurable impact to donors and stakeholders. We work with NGOs to improve internal processes, knowledge management, and program delivery.",
      deliverables: [
        "Knowledge Management — capture, organize, and share learning",
        "Donor & Stakeholder Reporting — impact frameworks, compliance documentation",
        "Process Documentation & Workflow Standardization",
        "Governance & Change Management Support",
        "Digital Transformation & Program Scaling",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-ngos.jpg",
    },
  ] as Service[],

  process: {
    eyebrow: "How it works",
    heading: "Four steps, in order.",
    image: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-process.jpg",
    steps: [
      {
        index: "01",
        title: "Discovery Call",
        body: "We learn about your goals, challenges, and opportunities.",
      },
      {
        index: "02",
        title: "Assessment",
        body: "We map your current systems, processes, and gaps.",
      },
      {
        index: "03",
        title: "Implementation",
        body: "We design and roll out tailored solutions alongside your team.",
      },
      {
        index: "04",
        title: "Support & Handover",
        body: "We equip your team with the tools, training, and documentation to keep going.",
      },
    ] as ProcessStep[],
  },

  stats: {
    eyebrow: "Proven outcomes",
    items: [
      { value: 3, suffix: " days", label: "Therapist onboarding — down from 6 weeks" },
      { value: 4, suffix: "", label: "Continents of delivery experience" },
      { value: 100, suffix: "%", label: "Tailored, outcome-driven engagements" },
    ] as Stat[],
  },

  showcase: {
    eyebrow: "Proven outcomes",
    heading: "Results you can measure.",
    intro:
      "From scaling startups to optimizing SMEs and strengthening NGOs — reduced burn rates, faster onboarding, stronger donor accountability, and aligned teams.",
    images: [
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-1.jpg", alt: "Startup operational readiness session", caption: "Reduced burn rate" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-2.jpg", alt: "SME process optimization review", caption: "Scaling efficiency" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-3.jpg", alt: "NGO donor reporting workflow", caption: "Donor accountability" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-4.jpg", alt: "Leadership alignment working session", caption: "Team alignment" },
    ],
  },

  testimonials: {
    eyebrow: "Client success stories",
    heading: "See how we've helped organizations thrive.",
    items: [
      {
        quote:
          "When we engaged Chisobem, Sema had a product and almost non-existent process. Working with SaharaOps got us the systems we needed to effectively run the business. We scaled the time for onboarding therapists from 6 weeks to 2 — and are now bringing that to 3 days.",
        author: "Founder",
        role: "SEMA",
      },
      {
        quote:
          "Chisobem was critical to structuring our business operations in such a way that allowed the management team to focus on delivering work and managing client relationships. The systems she helped us build across Sales, IT, Operations, Account Receivables, and HR were key contributors to our ability to sell the business eventually.",
        author: "Founder",
        role: "Impakt Advisors",
      },
      {
        quote:
          "Thank you for helping us build much-needed structure around this business, and for helping me understand the actual workings and production costs associated with it. I now have a work-in-progress document I can consult to clearly see our position.",
        author: "Founder",
        role: "Card Sugar",
      },
      {
        quote:
          "Chisobem is an exceptional growth expert who empowers businesses to leverage proven strategies and frameworks to unlock new market opportunities. With deep expertise in commercialization, investment readiness, and corporate governance, she has been instrumental in supporting our portfolio companies to expand market presence and attract follow-on investment.",
        author: "Founder",
        role: "Ennovate Ventures",
      },
    ] as Testimonial[],
  },

  cta: {
    eyebrow: "Start here",
    heading: ["Ready to build your", "operational backbone?"],
    body: "Book a consultation today and start scaling with confidence.",
    ctaLabel: "Book a Consultation",
    ctaHref: "/contact",
  },

  socials: {
    linkedin: "https://www.linkedin.com/company/saharaops",
    x: "https://x.com/saharaops",
  },

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  footer: {
    variant: "institutional",
    brandStatement:
      "SaharaOps is an Operational Readiness consultancy for Startups, SMEs, and NGOs. We design and embed the systems, processes, and strategies that help organizations scale efficiently and grow sustainably.",
    ctaHeadline: "Operational readiness for organizations that intend to grow.",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
