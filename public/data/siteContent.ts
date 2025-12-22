import { HeroSlide } from "@/src/types/heroslide";

export const siteContent = {
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
              description: "End-to-end support across acquisitions, divestments and investments.",
              href: "#what-we-do",
            },
            {
              label: "Group & Business Restructuring",
              description: "Simplifying structures and unlocking value.",
              href: "#what-we-do",
            },
          ],
        },
        {
          title: "Tax & Regulatory",
          items: [
            {
              label: "Tax & Regulatory Structuring",
              description: "Direct, indirect tax and FEMA driven advisory.",
              href: "#what-we-do",
            },
            {
              label: "International Tax & Transfer Pricing",
              description: "Inbound, outbound and cross-border advisory.",
              href: "#what-we-do",
            },
          ],
        },
        {
          title: "Finance & Governance",
          items: [
            {
              label: "Fund Raise, Valuation & CFO Services",
              description: "Capital, valuation and financial leadership.",
              href: "#what-we-do",
            },
            {
              label: "Governance, Compliance & Litigation",
              description: "Representation, compliance and dispute support.",
              href: "#what-we-do",
            },
          ],
        },
      ],
    },
    { label: "Values", href: "#values" },
    { label: "Why Treta", href: "#why" },
    { label: "Contact", href: "#contact" },
  ],

  seo: {
    title: "Treta Group — Transactions, Tax & Strategic Advisory",
    description:
      "Treta Group provides transaction, tax, restructuring and strategic advisory services with a strong commercial mindset and practical implementation.",
  },

  hero: {
    slides: [
      {
        kicker: "Transactions | Tax | Strategy",
        title: "Advisory that drives outcomes",
        subtitle:
          "Strategic, tax-efficient and commercially viable solutions across the business lifecycle.",
        media: {
          type: "image",
          src: "/images/hero/strategy.jpg",
        },
        animation: "fadeUp",
        parallax: 0.25,
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
        media: {
          type: "image",
          src: "/images/hero/treta-transactions.jpg",
        },
        animation: "slideLeft",
        parallax: 0.15,
        cta: {
          primary: { label: "Our Services", href: "#what-we-do" },
          secondary: { label: "Why Treta", href: "#why" },
        },
      },
    ] satisfies HeroSlide[],
  },

  whatWeDo: {
    title: "What We Do",
    subtitle:
      "We advise businesses, promoters, families and investors on structuring, transactions, taxation and governance with a clear focus on value creation and implementation.",
    items: [
      {
        title: "Transaction & Deal Advisory",
        description:
          "Advisory across acquisitions, divestments, investments and strategic transactions with integrated commercial, financial and tax evaluation.",
      },
      {
        title: "Tax & Regulatory Structuring",
        description:
          "Design and implementation of efficient structures across direct tax, indirect tax, FEMA, company law and sectoral regulations.",
      },
      {
        title: "Business & Group Restructuring",
        description:
          "Simplification of complex group structures, asset rationalization, cost optimization and resolution of inefficiencies.",
      },
      {
        title: "International Tax & Cross-border Advisory",
        description:
          "Inbound and outbound investment structuring, transfer pricing, expatriate taxation and global tax optimization.",
      },
      {
        title: "Fund Raise, Valuation & CFO Services",
        description:
          "Support across fundraising, valuation, financial modelling, cash flow management and strategic CFO services.",
      },
      {
        title: "Governance, Compliance & Litigation",
        description:
          "End-to-end advisory on compliance, regulatory representations, dispute resolution and litigation support.",
      },
    ],
  },

  
};
