export const site = {
  brand: "FolioDémo",
  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#apropos" },
    { label: "Projets", href: "#projets" },
  ],
  cta: "Me contacter",
  hero: {
    title: "Salut, je suis",
    role: "directeur de création",
    description:
      "Le bon design doit être invisible. Du logo au langage, je bâtis des marques qui connectent et convertissent.",
    portrait:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    services: [
      { id: "01", label: "Stratégie de marque" },
      { id: "02", label: "Identité visuelle" },
      { id: "03", label: "Design packaging" },
      { id: "04", label: "Direction créative" },
    ],
  },
  trusted: {
    title: "Des marques qui m'ont fait confiance",
    logos: ["Supa Blox", "Hype Blox", "Frame Blox", "Ultra Blox"],
  },
  about: {
    eyebrow: "L'envers du décor",
    title: "Façonner des expériences qui simplifient la vie",
    body: "Je suis designer produit : j'imagine des interfaces nettes et intuitives qui résolvent de vrais problèmes, avec une attention obsessionnelle aux détails et au mouvement.",
  },
  projects: [
    {
      title: "Veste studio",
      image:
        "https://images.unsplash.com/photo-1551028711-22b7cefc2f90?auto=format&fit=crop&w=800&q=80",
      alt: "Veste sur cintre, photographie monochrome",
    },
    {
      title: "Écoute immersive",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      alt: "Portrait avec casque audio",
    },
    {
      title: "Soin minimal",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
      alt: "Flacon cosmétique minimaliste",
    },
  ],
  footer: {
    note: "Démo portfolio — React, Vite, Tailwind, shadcn/ui",
    year: new Date().getFullYear(),
  },
} as const
