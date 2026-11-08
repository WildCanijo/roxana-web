// Every image is a page of Roxana's book (BOOK_2027_RF_in.pdf), rendered
// at two sizes: sm for tiles and cards, lg for the project viewer.
export const sm = (page: number) => `/work/sm/p${String(page).padStart(2, "0")}.jpg`;
export const lg = (page: number) => `/work/lg/p${String(page).padStart(2, "0")}.jpg`;

export type Category = "Branding" | "Digital" | "Editorial" | "Art Direction";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  year?: string;
  roles: string[];
  summary: string;
  goals?: string[];
  credits?: string[];
  cover: number;
  pages: number[];
};

export const PROJECTS: Project[] = [
  {
    id: "azulik-web",
    title: "Azulik",
    subtitle: "Website redesign",
    category: "Digital",
    roles: ["UI/UX", "Web design", "Art direction"],
    summary:
      "A redesign of Azulik's website that strengthens its identity as a universe of hospitality, art and nature, with better usability, visual aesthetics and navigation on every platform.",
    goals: [
      "Clear navigation",
      "Less friction in bookings",
      "A stronger brand story",
      "Visual hierarchy built around the user's experience",
      "Visual storytelling in line with the Azulik universe",
    ],
    cover: 30,
    pages: [29, 30, 31, 32],
  },
  {
    id: "country-lakes",
    title: "Country Lakes",
    subtitle: "Brand architecture · Mérida, Yucatán",
    category: "Branding",
    roles: ["Brand identity", "Art direction", "Campaign"],
    summary:
      "A family of identities for a residential development in Mérida. The master brand sits above three sub-brands, Serona, Borus and Ophidia, each with its own glyph, palette and voice, carried through print, merchandise and billboard campaigns.",
    cover: 9,
    pages: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  {
    id: "gran-lagarto",
    title: "Gran Lagarto",
    subtitle: "Golf Sanctuary",
    category: "Branding",
    roles: ["Brand identity", "Merchandise", "Art direction"],
    summary:
      "A heritage golf identity with a crocodile emblem, a script-and-serif wordmark and a deep green palette, applied to leather goods, apparel and club life.",
    cover: 19,
    pages: [19, 20, 21, 22],
  },
  {
    id: "mawi",
    title: "Mawi",
    subtitle: "Art & interior design studio",
    category: "Branding",
    roles: ["Logotype", "Brand identity", "Stationery"],
    summary:
      "A fluid, liquid-metal logotype for an art and interior design studio, paired with a warm, crafted image world and a quiet monospaced system for stationery, packaging and web.",
    cover: 8,
    pages: [6, 7, 8],
  },
  {
    id: "roth",
    title: "Roth Architecture",
    subtitle: "Web design",
    category: "Digital",
    roles: ["UI/UX", "Web design"],
    summary:
      "A dark, sculptural website for an architecture studio, built around its generative organic structure, with project filters and a menu designed for mobile first.",
    cover: 35,
    pages: [33, 34, 35],
  },
  {
    id: "loop",
    title: "Loop",
    subtitle: "Light Festival",
    category: "Branding",
    roles: ["Brand identity", "Out of home", "Print"],
    summary:
      "A vibrating logotype and spirograph graphics for a light festival, applied to street posters, business cards and event credentials.",
    cover: 3,
    pages: [2, 3],
  },
  {
    id: "azulik-nye",
    title: "Azulik NYE",
    subtitle: "A journey to the 5th element",
    category: "Branding",
    year: "2021",
    roles: ["Event identity", "Web"],
    summary:
      "The identity and website for a New Year's Eve dinner and multisensory experience at SFER IK Tulum. A sacred-geometry mark links earth, wind, fire and water to humanity: five elements, five senses.",
    cover: 5,
    pages: [4, 5],
  },
  {
    id: "claro-musica",
    title: "Claro Música",
    subtitle: "América Móvil",
    category: "Digital",
    roles: ["Product design", "UI/UX"],
    summary:
      "UI/UX for Claro Música, América Móvil's music streaming platform: onboarding, discovery and the player experience.",
    cover: 36,
    pages: [36],
  },
  {
    id: "papalote",
    title: "Papalote Museo del Niño",
    subtitle: "Interactive experience",
    category: "Digital",
    roles: ["Concept", "UX", "Interface design"],
    summary:
      "Work on the museum's interactive experiences, from concept and UX through to interface design, including a laser-cutter station where kids design their own pieces.",
    cover: 37,
    pages: [37],
  },
  {
    id: "twolander",
    title: "Twolander",
    subtitle: "Home Abroad · magazine",
    category: "Editorial",
    roles: ["Editorial design", "Identity", "Art direction"],
    summary:
      "The masthead, identity and editorial system for a travel and culture magazine: airy layouts for photography and a playful illustrated food section.",
    cover: 39,
    pages: [38, 39, 40, 41],
  },
  {
    id: "azulik-hive",
    title: "Azulik Hive",
    subtitle: "Brochure",
    category: "Editorial",
    year: "2021",
    roles: ["Editorial design"],
    summary:
      "An editorial brochure for Azulik Hive that pairs restrained typography with the brand's fashion and art collaborations.",
    cover: 28,
    pages: [28],
  },
  {
    id: "la-quinta-emilia",
    title: "La Quinta Emilia",
    subtitle: "Casa productora",
    category: "Branding",
    roles: ["Brand identity", "Stationery"],
    summary:
      "An identity for a production house, built on a primitive, totem-like symbol and a classical serif, with a dark, sculptural mood for its imagery.",
    cover: 24,
    pages: [23, 24],
  },
  {
    id: "in-between",
    title: "In Between",
    subtitle: "Azulik Sounds",
    category: "Art Direction",
    year: "2020",
    roles: ["Art direction", "Poster series"],
    summary:
      "A poster series for sunset sessions at Tseen Ja, with a 360° view over Tulum's jungle and the sea, in collages of texture, eclipse and orbit.",
    cover: 25,
    pages: [25],
  },
  {
    id: "tseen-ja",
    title: "Tseen Ja",
    subtitle: "Azulik · art & set design",
    category: "Art Direction",
    year: "2019",
    roles: ["Art", "Set design"],
    summary:
      "Collage artworks for the restaurant's campaign and a cocktail set design built from paper, stone and fibre.",
    credits: ["Set design: Roxana Fadanelli", "Photography: Santiago Baravalle", "Tulum, México"],
    cover: 27,
    pages: [26, 27],
  },
  {
    id: "concepts",
    title: "Concept shoots",
    subtitle: "Aníkena & more",
    category: "Art Direction",
    roles: ["Art direction", "Concept creation"],
    summary:
      "Conceptual fashion and brand shoots: fabric, water and raw architecture used to tell the story of each collection.",
    credits: ["Art direction: Roxana Fadanelli", "Photography: Santiago Baravalle"],
    cover: 43,
    pages: [42, 43, 44],
  },
];

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Branding",
  "Digital",
  "Editorial",
  "Art Direction",
];

// Tall crops of book photos (public/work/tall) that run along the hero
// ticker, each linked to the project it comes from.
export const TICKER: { src: string; alt: string; project: string }[] = [
  ["country-lakes", "Borus logo embroidered on a white shirt collar"],
  ["concepts", "Model standing in still water, Aníkena shoot"],
  ["gran-lagarto", "Gran Lagarto leather golf bag tag"],
  ["country-lakes", "Woman reading the Serona book"],
  ["tseen-ja", "Cocktail set design with red paper and gold leaf"],
  ["la-quinta-emilia", "Lit pillar in a dark room, La Quinta Emilia"],
  ["concepts", "Figure wrapped in fabric, concept shoot"],
  ["gran-lagarto", "Gran Lagarto golf jacket"],
  ["azulik-web", "Azulik website on a phone"],
  ["country-lakes", "Hand holding an Ophidia postcard"],
  ["loop", "Loop Light Festival street poster"],
  ["concepts", "Woman holding a branch, concept shoot"],
  ["mawi", "Wicker vases, Mawi"],
  ["twolander", "Twolander magazine cover"],
  ["country-lakes", "Borus tote bag"],
  ["in-between", "In Between poster for Azulik Sounds"],
  ["gran-lagarto", "Gran Lagarto leather golf glove"],
  ["twolander", "Illustrated food spread in a magazine"],
  ["claro-musica", "Claro Música sign-in screen"],
  ["twolander", "Reading an illustrated magazine spread"],
  ["country-lakes", "Ophidia packaging with an embossed seal"],
  ["gran-lagarto", "Golfer at sunset, Gran Lagarto"],
  ["roth", "Roth Architecture organic sphere"],
  ["country-lakes", "Man sailing, Serona campaign"],
].map(([project, alt], i) => ({
  project,
  alt,
  src: `/work/tall/t${String(i + 1).padStart(2, "0")}.jpg`,
}));

export const EXPERIENCE = [
  {
    period: "2022 — Present",
    role: "Freelance Art Director & Product Designer",
    org: "Independent",
    text: "Branding, creative direction, digital presence and design strategy for international brands.",
  },
  {
    period: "2019 — 2022",
    role: "Senior Design Manager",
    org: "AZULIK",
    text: "Led design for the luxury hospitality brand: brand identity, web design, art direction, UX and digital strategy.",
  },
  {
    period: "2017 — 2019",
    role: "Product Team Lead",
    org: "América Móvil",
    text: "Led product design for Claro's music platforms.",
  },
  {
    period: "2014 — 2016",
    role: "Senior UX Designer",
    org: "Cocolab",
    text: "Interactive digital experiences for museums and major brands, including Papalote Museo del Niño, Corona and Victoria.",
  },
  {
    period: "2011 — 2014",
    role: "Art Director",
    org: "ISUUE Magazine",
    text: "Editorial design and art direction.",
  },
];

export const SKILLS = [
  "Art & creative direction",
  "Branding & brand identity",
  "UI/UX design",
  "Product design",
  "Web design",
  "Wireframing & prototyping",
  "Digital & interactive experiences",
  "Editorial & commercial design",
  "Social media design",
];

export const TOOLS = ["Figma", "Illustrator", "Photoshop", "InDesign"];

export const STRENGTHS = [
  {
    title: "Leadership",
    text: "Experience managing creative teams and leading product and design initiatives.",
  },
  {
    title: "Versatility",
    text: "Brings together traditional graphic design, digital product design, branding and UX.",
  },
  {
    title: "Premium branding",
    text: "Work for luxury hospitality and internationally recognised brands.",
  },
  {
    title: "Digital experience",
    text: "A background in interactive experiences and digital platforms.",
  },
  {
    title: "Creative strategy",
    text: "Contributes beyond execution: concept, brand positioning and art direction.",
  },
];

export const CLIENTS = [
  "AZULIK",
  "América Móvil",
  "Claro Música",
  "Papalote Museo del Niño",
  "Cocolab",
  "Corona",
  "Victoria",
  "Roth Architecture",
  "Country Lakes",
  "ISUUE Magazine",
];

export const EMAIL = "roxana.fadanelli@gmail.com";
