import { HeroSlide } from "@/src/types/pages";

export const siteContent = {

   /* =========================
     NAVIGATION
     ========================= */
  navigation: [
    {
      label: "What We Do",
      type: "mega",
      sections: [
        {
          title: "Transactions & Structuring",
          items: [
            {
              label: "Transaction Advisory",
              description:
                "End-to-end support across acquisitions, divestments and investments.",
              href: "#what-we-do",
            },
            {
              label: "Group & Business Restructuring",
              description:
                "Simplifying structures and unlocking long-term value.",
              href: "#what-we-do",
            },
          ],
        },
        {
          title: "Tax & Regulatory",
          items: [
            {
              label: "Tax & Regulatory Structuring",
              description:
                "Direct, indirect tax and FEMA driven advisory.",
              href: "#what-we-do",
            },
            {
              label: "International Tax & Transfer Pricing",
              description:
                "Inbound, outbound and cross-border advisory.",
              href: "#what-we-do",
            },
          ],
        },
        {
          title: "Finance & Governance",
          items: [
            {
              label: "Fund Raise, Valuation & CFO Services",
              description:
                "Capital, valuation and financial leadership.",
              href: "#what-we-do",
            },
            {
              label: "Governance, Compliance & Litigation",
              description:
                "Representation, compliance and dispute support.",
              href: "#what-we-do",
            },
          ],
        },
      ],
    },
    { label: "Values", href: "#our-philosophy" },
    { label: "Why Treta", href: "#why-treta" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],

  /* =========================
     SEO
     ========================= */
  seo: {
    title: "Treta Group — Transactions, Tax & Strategic Advisory",
    description:
      "Treta Group provides transaction, tax, restructuring and strategic advisory services with a strong commercial mindset and practical implementation.",
  },
  /* =========================
     HERO
     ========================= */
  hero: {
    slides: [
      {
        kicker: "Transactions | Tax | Strategy",
        title: "Advisory that drives outcomes",
        subtitle:
          "Strategic, tax-efficient and commercially viable solutions across the business lifecycle.",
        animation: "fadeUp",
        parallax: 0.25,
        media: {
          type: "image",
          src: "/images/hero/strategy.jpg",
        },
        cta: {
          primary: { label: "Talk to Us", href: "#contact" },
          secondary: { label: "What We Do", href: "#what-we-do" },
        },
      },
      {
        kicker: "Trusted Advisors",
        title: "From structuring to execution",
        subtitle:
          "We partner with businesses, promoters and investors to create long-term value.",
        animation: "slideLeft",
        parallax: 0.15,
        media: {
          type: "image",
          src: "/images/hero/treta-transactions.jpg",
        },
        cta: {
          primary: { label: "Our Services", href: "#what-we-do" },
          secondary: { label: "Why Treta", href: "#why-treta" },
        },
      },
    ] satisfies HeroSlide[],
  },

  /* =========================
     WHAT WE DO
     ========================= */
  whatWeDo: {
    header: {
      eyebrow: "Services",
      title: "What We Do",
      description:
        "We advise businesses, promoters, families and investors on structuring, transactions, taxation and governance with a focus on value creation.",
    },
    items: [
      {
        title: "Transaction & Deal Advisory",
        description:
          "Integrated advisory across acquisitions, divestments, investments and strategic transactions.",
        image: "/images/hero/strategy.jpg"
      },
      {
        title: "Tax & Regulatory Structuring",
        description:
          "Efficient structuring across direct tax, indirect tax, FEMA and regulatory frameworks.",
        image: "/images/hero/strategy.jpg"

      },
      {
        title: "Business & Group Restructuring",
        description:
          "Simplification of complex structures to unlock operational and financial efficiency.",
        image: "/images/hero/strategy.jpg"

      },
      {
        title: "International Tax & Cross-border Advisory",
        description:
          "Inbound and outbound investment structuring, transfer pricing and global tax optimization.",
        image: "/images/hero/strategy.jpg"

      },
      {
        title: "Fund Raise, Valuation & CFO Services",
        description:
          "Support across fundraising, valuation, financial modelling and strategic CFO services.",
        image: "/images/hero/strategy.jpg"

      },
      {
        title: "Governance, Compliance & Litigation",
        description:
          "Advisory across governance, regulatory compliance, representations and litigation support.",
        image: "/images/hero/strategy.jpg"

      },
    ],
  },

  /* =========================
     OUR PHILOSOPHY
     ========================= */
  philosophy: {
    header: {
      eyebrow: "Values",
      title: "Our Philosophy",
      description:
        "The principles that guide how we think, advise and partner with our clients.",
    },
    items: [
      {
        title: "Kaizen – Continuous Improvement",
        description:
          "We believe in continuously refining our thinking, processes and execution.",
          outline: "Continuous improvement through disciplined execution.",

          image: "/images/hero/strategy.jpg"
      },
      {
        title: "Expanding the Art of Possible",
        description:
          "We challenge conventional boundaries through innovation and forward thinking.",
          outline: "Challenging constraints through innovation.",

      },
      {
        title: "Clients Come First",
        description:
          "Long-term relationships built on trust, responsiveness and commitment.",
      },
      {
        title: "Value Delivery",
        description:
          "Our focus is on delivering outcomes aligned with business realities.",
      },
      {
        title: "Integrity",
        description:
          "We operate with the highest standards of honesty, ethics and transparency.",
      },
      {
        title: "Ubuntu",
        description:
          "Collaboration, empathy and shared success drive everything we do.",
      },
    ],
  },

  /* =========================
     WHY TRETA
     ========================= */
  whyTreta: {
    header: {
      eyebrow: "Why Treta",
      title: "Advisory built on clarity, integrity, and long-term impact",
      description:
        "Treta Group is a Hyderabad-based advisory firm partnering with businesses across their lifecycle to create sustainable value.",
    },
    points: [
      {
        title: "Commercial clarity",
        description:
          "Business-first advice balancing tax efficiency, regulatory soundness and practicality.",
        icon: "Target",
      },
      {
        title: "Integrity at the core",
        description:
          "Transparency and ethics guide every recommendation we make.",
        icon: "ShieldCheck",
      },
      {
        title: "Ecosystem thinking",
        description:
          "We align founders, advisors, regulators and capital — not silos.",
        icon: "Network",
      },
      {
        title: "Long-term value creation",
        description:
          "Success measured by sustained outcomes, not short-term transactions.",
        icon: "TrendingUp",
      },
    ],
  },
};
