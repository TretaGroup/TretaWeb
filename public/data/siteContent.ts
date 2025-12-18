import { HeroSlide } from "@/src/types/heroslide";

export const siteContent = {
  navigation: [

    {
      label: "Services",
      type: "mega",
      sections: [
        {
          title: "Strategy",
          items: [
            {
              label: "Business Strategy",
              description: "Clear direction aligned to growth.",
              href: "#strategy",
            },
            {
              label: "Brand Positioning",
              description: "Differentiation that compounds.",
              href: "#branding",
            },
          ],
        },
        {
          title: "Execution",
          items: [
            {
              label: "Design Systems",
              description: "Scalable, human-centered design.",
              href: "#design",
            },
            {
              label: "Development",
              description: "Modern, fast, reliable products.",
              href: "#development",
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
    title: "Treta — Strategy, Design & Growth",
    description:
      "Treta helps organizations build clarity, confidence, and credibility through strategy, design, and execution.",
  },

    hero: {
    slides: [
      {
        kicker: "Hello There",
        title: "Strategy that creates momentum",
        subtitle: "Clear direction aligned to growth and outcomes.",
        media: {
          type: "image",
          src: "/images/hero/strategy.jpg",
        },
        animation: "fadeUp",
        parallax: 0.25,
        cta: {
          primary: { label: "Start a Project", href: "#contact" },
          secondary: { label: "Our Services", href: "#services" },
        },
      },
      {
        kicker: "Hello There",
        title: "Design that earns trust",
        subtitle: "Human-centered systems that scale beautifully.",
        media: {
          type: "video",
          src: "/videos/hero-design.mp4",
          poster: "/images/hero/design-poster.jpg",
        },
        animation: "slideLeft",
        parallax: 0.15,
        cta: {
          primary: { label: "View Work", href: "#work" },
          secondary: { label: "Why Treta", href: "#why" },
        },
      },
    ] satisfies HeroSlide[],
  },







  services: [
    { title: "Strategy", description: "Clear direction aligned with business goals." },
    { title: "Design", description: "Elegant, functional, human-centered design." },
    { title: "Development", description: "Robust, scalable, modern solutions." },
    { title: "Growth", description: "Execution focused on measurable outcomes." },
  ],

  values: ["Clarity", "Integrity", "Focus", "Excellence", "Collaboration"],

  whyTreta: [
    "Built for today’s leaders",
    "Relentless execution",
    "Proven frameworks",
    "Case-study driven",
  ],

  cta: {
    label: "Let’s Talk",
  },
};
