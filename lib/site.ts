// Central place for company details and copy.
// Replace the placeholder contact details below before going live.

export const site = {
  name: "Littlenext",
  tagline: "Global trade, made simple.",
  description:
    "Littlenext is a parent company in international import and export — sourcing and supplying commodities, textiles and baby products for businesses worldwide.",
  url: "https://www.littlenext.com", // TODO: replace with your real domain

  contact: {
    email: "info@littlenext.com", // TODO: replace
    phone: "+00 000 000 0000", // TODO: replace
    whatsapp: "", // TODO: digits only incl. country code, e.g. "923001234567" — leave empty to hide
    address: "Office address, City, Country", // TODO: replace
    hours: "Mon – Sat, 9:00 – 18:00",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Divisions", href: "#divisions" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

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
      "From fibre to finished goods — yarns, fabrics and made-ups produced by mills we know and audit.",
    items: ["Yarn", "Greige & finished fabric", "Home textiles", "Towels & linen", "Denim", "Readymade garments"],
    image: "/images/textiles.jpg",
    imageAlt: "Neutral-toned garments hanging on a clothing rail",
  },
  {
    id: "baby-products",
    title: "Baby Products",
    summary:
      "Safe, compliant essentials for little ones — sourced from certified manufacturers for retailers and distributors.",
    items: ["Diapers & wipes", "Feeding & bottles", "Baby apparel", "Bath & skincare", "Toys & accessories", "Nursery essentials"],
    image: "/images/baby-products.jpg",
    imageAlt: "Baby's feet wrapped in a soft white blanket",
  },
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
    text: "Tell us what you need — we find, compare and negotiate with the right manufacturers.",
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
    text: "Invoices, certificates of origin, packing lists and compliance — prepared correctly, first time.",
    icon: "doc",
  },
] as const;

export const steps = [
  {
    title: "Share your requirement",
    text: "Product, specification, quantity and destination. A short call or email is enough to start.",
  },
  {
    title: "Sourcing & quotation",
    text: "We shortlist suppliers, collect samples where needed and send a clear, all-in quotation.",
  },
  {
    title: "Quality & compliance",
    text: "Production is monitored and inspected; documents and certifications are prepared in parallel.",
  },
  {
    title: "Shipping & delivery",
    text: "Goods are shipped, tracked and cleared — you get regular updates until they reach your door.",
  },
];

export const values = [
  { title: "One point of contact", text: "A single team managing every supplier, shipment and document for you." },
  { title: "Quality first", text: "Every order is checked against agreed specifications before it ships." },
  { title: "Transparent pricing", text: "Clear quotations with no hidden costs, so you can plan with confidence." },
  { title: "Reliable timelines", text: "Realistic lead times and proactive updates at every stage." },
];
