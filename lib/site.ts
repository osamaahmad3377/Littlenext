// Central place for company details and copy.
// Replace the placeholder contact details below before going live.

export const site = {
  name: "Littlenext",
  tagline: "Global trade, made simple.",
  description:
    "Littlenext is an Australian-based parent company in international import and export, sourcing and supplying commodities, textiles and baby products for businesses worldwide.",
  country: "Australia",
  url: "https://www.littlenext.com", // TODO: replace with your real domain

  contact: {
    email: "info@littlenext.com", // TODO: replace
    phone: "+61 0 0000 0000", // TODO: replace
    whatsapp: "", // TODO: digits only incl. country code, e.g. "61400000000"; leave empty to hide
    address: "Office address, City, Australia", // TODO: replace
    hours: "Monday to Saturday, 9am to 6pm (AEST)",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Divisions", href: "#divisions" },
    { label: "Services", href: "#services" },
    { label: "Network", href: "#network" },
    { label: "Process", href: "#process" },
  ],
} as const;

/** Words cycled in the hero headline: "We move ___ across borders." */
export const heroWords = ["commodities", "textiles", "baby products", "quality goods"];

export const tradeModes = ["Import", "Export", "Sourcing"] as const;

export type Division = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  imageAlt: string;
};

export const divisions: Division[] = [
  {
    id: "commodities",
    title: "Commodities",
    summary:
      "Agricultural and industrial staples, sourced at scale from trusted origins and delivered to specification.",
    items: ["Rice & grains", "Pulses & lentils", "Sugar", "Spices", "Edible oils", "Dry fruits & nuts"],
    image: "/images/commodities.jpg",
    imageAlt: "Close-up of golden wheat grains",
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

export const stats = [
  { value: 3, label: "Specialised divisions" },
  { value: 2, label: "Directions: import and export" },
  { value: 6, label: "Core trade services" },
  { value: 1, label: "Point of contact for everything" },
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
