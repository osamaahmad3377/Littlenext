// Central place for company details and copy.
// Replace the placeholder contact details below before going live.

export const site = {
  name: "Little Next",
  tagline: "Global trade, made simple.",
  description:
    "Little Next is an Australian-based parent company in international import and export, sourcing and supplying commodities, textiles and baby products for businesses worldwide.",
  country: "Australia",
  founder: {
    name: "Imran Ahmad",
    role: "Founder",
    /** Optional: path to a portrait in /public/images (e.g. "/images/imran-ahmad.jpg"). Shows initials until added. */
    photo: "",
    /** Optional: a short first-person message from the founder. Hidden until added. */
    message: "",
  },
  abn: "70 678 994 860",
  url: "https://www.littlenext.com.au",

  contact: {
    email: "info@littlenext.com.au",
    phone: "+61 449 545 425",
    whatsapp: "61449545425", // digits only incl. country code; leave empty to hide WhatsApp
    address: "Melbourne, Victoria, Australia",
    hours: "Monday to Saturday, 9am to 6pm (AEST)",
  },

  nav: [
    { label: "Our story", href: "/about" },
    { label: "Divisions", href: "#divisions" },
    { label: "Services", href: "#services" },
    { label: "Network", href: "#network" },
    { label: "Process", href: "#process" },
  ],
} as const;

/** Hero slides: the headline word ("We move ___ across borders.") and the background photo change together.
 *  `imageMobile` is an optional portrait crop used on portrait screens (phones, upright tablets). */
export const heroSlides: { word: string; label: string; image: string; imageMobile?: string; position: string }[] = [
  {
    word: "commodities",
    label: "Commodities",
    image: "/images/hero-pulses.jpg",
    imageMobile: "/images/hero-pulses-portrait.jpg",
    position: "center",
  },
  { word: "textiles", label: "Textiles", image: "/images/hero-textiles.jpg", position: "center 30%" },
  { word: "baby products", label: "Baby Products", image: "/images/hero-baby.jpg", position: "center 60%" },
  { word: "quality goods", label: "Global Logistics", image: "/images/hero-port.jpg", position: "center" },
];

export const tradeModes = ["Import", "Export", "Sourcing"] as const;

export type Division = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  /** Optional portrait crop used on phones and tablets */
  imageMobile?: string;
  imageAlt: string;
};

export const divisions: Division[] = [
  {
    id: "commodities",
    title: "Commodities",
    summary:
      "Agricultural and industrial staples, sourced at scale from trusted origins and delivered to specification.",
    items: ["Chickpeas", "Beans", "Lentils", "Rice & grains", "Sugar", "Spices", "Edible oils", "Dry fruits & nuts"],
    image: "/images/commodities-pulses.jpg",
    imageMobile: "/images/commodities-pulses-portrait.jpg",
    imageAlt: "Chickpeas, red kidney beans and green lentils",
  },
  {
    id: "textiles",
    title: "Textiles",
    summary:
      "From fibre to finished goods: yarns, fabrics and made-ups produced by mills we know and audit.",
    items: ["Yarn", "Greige & finished fabric", "Home textiles", "Towels & linen", "Denim", "Readymade garments"],
    image: "/images/textiles.jpg",
    imageAlt: "Neutral-toned garments hanging on a clothing rail",
  },
  {
    id: "baby-products",
    title: "Baby Products",
    summary:
      "Safe, compliant essentials for little ones, sourced from certified manufacturers for retailers and distributors.",
    items: ["Diapers & wipes", "Feeding & bottles", "Baby apparel", "Bath & skincare", "Toys & accessories", "Nursery essentials"],
    image: "/images/baby-products.jpg",
    imageAlt: "Baby's feet wrapped in a soft white blanket",
  },
];

/** Company profile shown in the About section. Keep these strictly factual. */
export const facts = [
  { label: "Headquarters", value: "Melbourne, Victoria, Australia" },
  { label: "Divisions", value: "Commodities · Textiles · Baby Products" },
  { label: "Trade", value: "Import · Export · Product sourcing" },
  { label: "Freight", value: "Sea · Air · Land" },
  { label: "We work with", value: "Importers, wholesalers, retailers and distributors" },
  { label: "Registered", value: "ABN 70 678 994 860" },
];

export const services = [
  {
    title: "Import",
    text: "We bring quality goods into your market, handling suppliers, freight and clearance end to end.",
    icon: "import",
  },
  {
    title: "Export",
    text: "We take local products to international buyers with the right paperwork, packaging and partners.",
    icon: "export",
  },
  {
    title: "Product sourcing",
    text: "Tell us what you need. We find, compare and negotiate with the right manufacturers.",
    icon: "search",
  },
  {
    title: "Quality inspection",
    text: "Pre-shipment checks and sampling so what arrives matches what you ordered.",
    icon: "shield",
  },
  {
    title: "Logistics & freight",
    text: "Sea, air and land shipping coordinated with reliable forwarders and clear timelines.",
    icon: "ship",
  },
  {
    title: "Customs & documentation",
    text: "Invoices, certificates of origin, packing lists and compliance, prepared correctly the first time.",
    icon: "doc",
  },
] as const;

/** Regions shown on the network map (lon, lat). The first entry is headquarters; lanes run from it to every other region. */
export const regions: { name: string; lon: number; lat: number; hq?: boolean; labelAbove?: boolean }[] = [
  { name: "Australia", lon: 134, lat: -25, hq: true },
  { name: "Southeast Asia", lon: 104, lat: 4 },
  { name: "East Asia", lon: 116, lat: 31, labelAbove: true },
  { name: "South Asia", lon: 77, lat: 22 },
  { name: "Middle East", lon: 50, lat: 26, labelAbove: true },
  { name: "Europe", lon: 10, lat: 50, labelAbove: true },
  { name: "Africa", lon: 25, lat: 0 },
  { name: "North America", lon: -98, lat: 40, labelAbove: true },
  { name: "South America", lon: -58, lat: -15 },
];

export const steps = [
  {
    title: "Share your requirement",
    text: "Product, specification, quantity and destination. A short call or email is enough to start.",
    output: "Requirement brief",
  },
  {
    title: "Sourcing & quotation",
    text: "We shortlist suppliers, collect samples where needed and send a clear, all-in quotation.",
    output: "Supplier shortlist & quote",
  },
  {
    title: "Quality & compliance",
    text: "Production is monitored and inspected; documents and certifications are prepared in parallel.",
    output: "Inspection report & documents",
  },
  {
    title: "Shipping & delivery",
    text: "Goods are shipped, tracked and cleared, with regular updates until they reach your door.",
    output: "Delivered & cleared",
  },
];

export const values = [
  { title: "One point of contact", text: "A single team managing every supplier, shipment and document for you." },
  { title: "Quality first", text: "Every order is checked against agreed specifications before it ships." },
  { title: "Transparent pricing", text: "Clear quotations with no hidden costs, so you can plan with confidence." },
  { title: "Reliable timelines", text: "Realistic lead times and proactive updates at every stage." },
];
