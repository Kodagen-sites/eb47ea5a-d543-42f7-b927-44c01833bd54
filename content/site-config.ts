/**
 * site-config.ts — single source of truth for SaharaOps.
 * Generation: cinematic-site-generator · Archetype G · Style S11 (Architectural Product)
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
    tagline: "Operations engineered to scale.",
    description:
      "SaharaOps builds the operating systems that carry growth-stage companies from improvised effort to compounding momentum.",
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
    title: "SaharaOps — Operations Consulting for Growth-Stage Companies",
    description:
      "SaharaOps designs and embeds the operating systems that let growth-stage companies scale without breaking. Operational diagnostics, process architecture, revenue operations.",
    locale: "en_US",
  },

  hero: {
    eyebrow: "Operations Consulting",
    h1: ["Operations", "engineered", "to scale."],
    subhead:
      "SaharaOps builds the operating systems that carry growth-stage companies from improvised effort to compounding momentum.",
    ctaLabel: "Book a Consultation",
    ctaHref: "/contact",
  },

  valueProp: {
    eyebrow: "The premise",
    statement:
      "Growth breaks the systems that created it. We rebuild them — quietly, precisely, in step with your team.",
  },

  typeStatement: {
    eyebrow: "What we believe",
    statement:
      "Operations is not overhead. It is the compounding interest of a company that decided to take itself seriously.",
  },

  services: [
    {
      slug: "operational-diagnostics",
      index: "01",
      name: "Operational Diagnostics",
      summary: "A clear map of where the business leaks time, margin, and momentum.",
      description:
        "We pressure-test how the company actually runs — not how the org chart says it does. Through interviews, data review, and process tracing we surface the friction that compounds silently: handoffs that drop, decisions that stall, work that gets done twice. You leave with a ranked, evidenced picture of what to fix first.",
      deliverables: [
        "Cross-functional process trace",
        "Friction and bottleneck ledger",
        "Ranked remediation roadmap",
        "Executive readout and working session",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-operational-diagnostics.jpg",
    },
    {
      slug: "process-architecture",
      index: "02",
      name: "Process Architecture",
      summary: "Workflows and systems designed to hold their shape as you scale.",
      description:
        "We design the core operating processes — intake, delivery, reporting, escalation — so they stay legible as headcount doubles. Each workflow is documented, instrumented, and owned. The result is a company that runs the same way on a Tuesday in Q4 as it did the day you launched it.",
      deliverables: [
        "Core workflow blueprints",
        "Ownership and RACI mapping",
        "Tooling and automation plan",
        "Operating documentation library",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-process-architecture.jpg",
    },
    {
      slug: "revenue-operations",
      index: "03",
      name: "Revenue Operations",
      summary: "One pipeline of truth across sales, marketing, and finance.",
      description:
        "We align the three functions that quietly disagree with each other. A single funnel definition, shared metrics, clean handoffs, and forecasting your board can trust. Revenue stops being a story told three different ways and becomes a system you can steer.",
      deliverables: [
        "Unified funnel and stage definitions",
        "Shared metric and reporting layer",
        "Lead-to-cash handoff design",
        "Forecasting and pipeline review cadence",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-revenue-operations.jpg",
    },
    {
      slug: "org-team-design",
      index: "04",
      name: "Org & Team Design",
      summary: "Structure built for the stage you are entering, not the one you left.",
      description:
        "We design the team shape, reporting lines, and decision rights for the next phase of growth — before the cracks force the conversation. Roles get sharp edges, managers get span they can actually hold, and the company keeps moving while it reorganizes.",
      deliverables: [
        "Target operating model",
        "Role and decision-rights design",
        "Hiring sequence and leveling guide",
        "Transition and communication plan",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-org-team-design.jpg",
    },
    {
      slug: "implementation-embed",
      index: "05",
      name: "Implementation & Embed",
      summary: "We stay in the room until the change is real, not just recommended.",
      description:
        "Strategy that lives in a deck is a cost, not a result. We embed alongside your team through rollout — running the meetings, building the tooling, coaching the owners — until the new way of working is simply the way the company works.",
      deliverables: [
        "Rollout plan and milestone cadence",
        "Hands-on tooling and automation build",
        "Owner coaching and enablement",
        "Adoption tracking and course-correction",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-implementation-embed.jpg",
    },
    {
      slug: "fractional-coo",
      index: "06",
      name: "Fractional COO",
      summary: "Senior operational leadership, on the cadence your company needs.",
      description:
        "For founders who need an operating partner but not yet a full-time hire, we hold the COO seat — running the operating rhythm, owning execution, and building the function until it is ready to hand to a permanent leader.",
      deliverables: [
        "Weekly operating rhythm ownership",
        "Cross-functional execution oversight",
        "Board and leadership reporting",
        "COO succession and handoff plan",
      ],
      imageUrl: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/service-fractional-coo.jpg",
    },
  ] as Service[],

  process: {
    eyebrow: "How we work",
    heading: "Four moves, in order.",
    image: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-process.jpg",
    steps: [
      {
        index: "01",
        title: "Diagnose",
        body: "Two to three weeks inside the business. We trace how work actually moves and rank what is costing you most.",
      },
      {
        index: "02",
        title: "Design",
        body: "We architect the operating systems — processes, structure, metrics — and pressure-test them with the people who will run them.",
      },
      {
        index: "03",
        title: "Embed",
        body: "We stay in the room through rollout, building tooling and coaching owners until the new way of working holds on its own.",
      },
      {
        index: "04",
        title: "Compound",
        body: "We hand back a company that improves itself — with the operating rhythm and instrumentation to keep getting sharper.",
      },
    ] as ProcessStep[],
  },

  stats: {
    eyebrow: "By design",
    items: [
      { value: 90, suffix: "", label: "Days to first measurable shift" },
      { value: 3, suffix: "", label: "Functions aligned — revenue, ops, finance" },
      { value: 100, suffix: "%", label: "Embedded delivery, never slideware" },
    ] as Stat[],
  },

  showcase: {
    eyebrow: "The work",
    heading: "Operating systems, not slide decks.",
    intro:
      "Every engagement leaves behind something the company can run — documented workflows, instrumented metrics, and owners who know how it all fits.",
    images: [
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-1.jpg", alt: "Operating model whiteboard session", caption: "Operating model design" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-2.jpg", alt: "Pipeline and metrics review", caption: "Revenue review cadence" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-3.jpg", alt: "Process architecture documentation", caption: "Workflow architecture" },
      { src: "https://zykgxmubadvmlxpkqrzd.supabase.co/storage/v1/object/public/site-assets/eb47ea5a-d543-42f7-b927-44c01833bd54/images/section-gallery-4.jpg", alt: "Leadership working session", caption: "Embedded delivery" },
    ],
  },

  testimonials: {
    eyebrow: "In their words",
    heading: "What changes when the system holds.",
    items: [
      {
        quote:
          "We were scaling on heroics. SaharaOps replaced the heroics with a system — and the team finally stopped firefighting long enough to grow.",
        author: "Lena Acheampong",
        role: "Founder & CEO, Series-B SaaS",
      },
      {
        quote:
          "They did not hand us a deck. They sat in our standups, rebuilt our pipeline, and left when our own people could run it. That is rare.",
        author: "Marcus Reyes",
        role: "VP Operations, Logistics Scale-up",
      },
      {
        quote:
          "Our board forecasts went from fiction to something we could defend in a quarter. The revenue operations work paid for itself almost immediately.",
        author: "Priya Nadkarni",
        role: "CFO, Growth-stage Fintech",
      },
    ] as Testimonial[],
  },

  cta: {
    eyebrow: "Start here",
    heading: ["Ready to make the", "system carry the weight?"],
    body: "Book a 30-minute consultation. We will walk through where your operations are straining and whether SaharaOps is the right fit to fix it.",
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
      "SaharaOps is an operations consultancy for growth-stage companies. We design and embed the operating systems that let teams scale without breaking.",
    ctaHeadline: "Operations engineered to scale.",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
