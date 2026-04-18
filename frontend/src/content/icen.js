// ICEN premium institutional copy + data
export const PILLARS = [
  { id: 1, title: "Sovereign Economy", icon: "TrendingUp", desc: "Empower emerging nations to build resilient, diversified, and globally competitive economies on their own terms." },
  { id: 2, title: "Technology & Sovereignty", icon: "Cpu", desc: "Advance digital infrastructure, AI, and semiconductor capacity as instruments of national sovereignty." },
  { id: 3, title: "Climate & Energy", icon: "Leaf", desc: "Lead the global just-transition with clean-energy corridors, critical minerals, and climate finance." },
  { id: 4, title: "Peace & Security", icon: "Shield", desc: "A doctrine of stability — diplomacy first, deterrence when needed, intervention only with mandate." },
  { id: 5, title: "Trade & Capital", icon: "Coins", desc: "New corridors of trade, settlement systems, and sovereign funds aligned with the rising world." },
  { id: 6, title: "Science & Research", icon: "FlaskConical", desc: "Fund frontier science — biotech, quantum, space — and return authorship to the Global South." },
  { id: 7, title: "Education & Talent", icon: "GraduationCap", desc: "A continental talent pipeline — universities, labs, fellowships — engineered for 2050." },
  { id: 8, title: "Health & Longevity", icon: "HeartPulse", desc: "Build regional manufacturing, digital health, and pandemic-grade response infrastructure." },
  { id: 9, title: "Infrastructure", icon: "Building2", desc: "Ports, rail, power, fiber — the quiet arithmetic of national power." },
  { id: 10, title: "Culture & Soft Power", icon: "Sparkles", desc: "Cinema, design, music, sport — the architecture of influence in a multi-polar century." },
  { id: 11, title: "Governance & Rule of Law", icon: "Scale", desc: "Institutions that outlast governments. Transparency, accountability, civic trust." },
  { id: 12, title: "Youth & Future", icon: "Users", desc: "The demographic dividend is a policy choice. Make it deliberate, make it measurable." },
];

export const REGIONS = [
  { id: "africa", name: "Africa", chapters: 14, countries: ["Nigeria","Kenya","Egypt","South Africa","Ghana","Ethiopia","Morocco","Rwanda","Senegal","Tanzania"] },
  { id: "south-asia", name: "South Asia", chapters: 6, countries: ["India","Bangladesh","Sri Lanka","Nepal","Bhutan","Maldives"] },
  { id: "southeast-asia", name: "Southeast Asia", chapters: 9, countries: ["Indonesia","Vietnam","Philippines","Thailand","Malaysia","Singapore","Cambodia"] },
  { id: "mena", name: "Middle East & North Africa", chapters: 8, countries: ["UAE","Saudi Arabia","Qatar","Jordan","Tunisia","Oman","Bahrain"] },
  { id: "latam", name: "Latin America", chapters: 10, countries: ["Brazil","Mexico","Argentina","Colombia","Chile","Peru","Uruguay"] },
  { id: "central-asia", name: "Central Asia & Caucasus", chapters: 5, countries: ["Kazakhstan","Uzbekistan","Georgia","Armenia","Azerbaijan"] },
  { id: "east-europe", name: "Eastern Europe", chapters: 4, countries: ["Poland","Romania","Serbia","Moldova"] },
  { id: "pacific", name: "Pacific & Oceania", chapters: 3, countries: ["Fiji","Papua New Guinea","Samoa"] },
];

export const TIERS = [
  {
    id: "observer",
    name: "Observer",
    price: "Complimentary",
    badge: "Entry",
    highlight: false,
    features: [
      "Access to public ICEN briefings",
      "Monthly Council newsletter",
      "Invitations to open summits",
      "Community directory (read-only)",
    ],
  },
  {
    id: "fellow",
    name: "Fellow",
    price: "By invitation",
    badge: "Most Popular",
    highlight: true,
    features: [
      "Full Fellow voting rights",
      "Private ICEN roundtables",
      "Annual Summit delegate seat",
      "Pillar working-group membership",
      "Research library & policy briefs",
    ],
  },
  {
    id: "council",
    name: "Council Member",
    price: "By nomination",
    badge: "Leadership",
    highlight: false,
    features: [
      "Seat on a Council Pillar",
      "Voting rights on policy frameworks",
      "Access to heads-of-state track",
      "Co-author ICEN policy papers",
      "Regional chapter leadership",
    ],
  },
  {
    id: "founding",
    name: "Founding Nation",
    price: "Sovereign partners",
    badge: "Institutional",
    highlight: false,
    features: [
      "Country-level charter partnership",
      "Policy lab co-development",
      "Bilateral Secretariat access",
      "Hosting rights for ICEN Summit",
      "Cross-regional alliance building",
    ],
  },
];

export const PROGRAMS = [
  { id: "summit", title: "ICEN Global Summit", tag: "Annual", desc: "A closed-door gathering of heads of state, ministers, and builders to set the emerging-world agenda for the year ahead." },
  { id: "accelerator", title: "Sovereign Accelerator", tag: "Rolling cohorts", desc: "A 9-month program for ventures and ministries building critical national capacity — from semiconductors to sovereign cloud." },
  { id: "policy-lab", title: "Policy Lab", tag: "Continuous", desc: "Where Council members co-draft model frameworks — digital assets, AI governance, mineral sovereignty — for adoption by member states." },
  { id: "fellowship", title: "Rising Fellows", tag: "Yearly cohort", desc: "100 under-40 leaders per year, placed inside governments, firms, and multilateral bodies across emerging regions." },
  { id: "bridge", title: "Capital Bridge", tag: "Ongoing", desc: "Matching sovereign capital, DFI, and private investors with pillar-aligned projects across the ICEN network." },
  { id: "observatory", title: "ICEN Observatory", tag: "Quarterly", desc: "A data, media, and intelligence arm — publishing the definitive index of emerging-world progress." },
];

export const GOVERNANCE = {
  root: { id: "general-assembly", label: "General Assembly", meta: "All member nations & Fellows" },
  children: [
    { id: "secretariat", label: "Secretariat", meta: "Executive office" },
    { id: "council", label: "Council of Pillars", meta: "12 Pillar chairs" },
    { id: "regional", label: "Regional Chapters", meta: "8 regions" },
  ],
  leaves: [
    { id: "policy", label: "Policy Lab", parent: "council" },
    { id: "summit", label: "Summit Commission", parent: "secretariat" },
    { id: "ethics", label: "Ethics Board", parent: "secretariat" },
    { id: "chapters", label: "Country Chapters", parent: "regional" },
    { id: "youth", label: "Youth Assembly", parent: "regional" },
  ],
};

export const HERO_ARCS = [
  // curated emerging-nation capitals for hero globe arcs
  { startLat: 9.0820, startLng: 8.6753, endLat: 20.5937, endLng: 78.9629 },          // Nigeria → India
  { startLat: -14.2350, startLng: -51.9253, endLat: 1.3521, endLng: 103.8198 },       // Brazil → Singapore
  { startLat: 30.0444, startLng: 31.2357, endLat: -1.2921, endLng: 36.8219 },         // Egypt → Kenya
  { startLat: 23.8859, startLng: 45.0792, endLat: 14.0583, endLng: 108.2772 },        // Saudi Arabia → Vietnam
  { startLat: 48.0196, startLng: 66.9237, endLat: -30.5595, endLng: 22.9375 },        // Kazakhstan → South Africa
  { startLat: 4.5709, startLng: -74.2973, endLat: 41.8719, endLng: 12.5674 },         // Colombia → Italy (EU dialogue)
  { startLat: -0.7893, startLng: 113.9213, endLat: 12.8628, endLng: 30.2176 },        // Indonesia → Sudan region
  { startLat: 23.6345, startLng: -102.5528, endLat: 9.145, endLng: 40.4897 },         // Mexico → Ethiopia
  { startLat: 38.9637, startLng: 35.2433, endLat: -25.2744, endLng: 133.7751 },       // Turkey → Australia (Pacific dialogue)
  { startLat: 31.7917, startLng: -7.0926, endLat: 15.2000, endLng: 101.0000 },        // Morocco → Thailand
  { startLat: 33.9391, startLng: 67.7100, endLat: -9.1900, endLng: -75.0152 },        // Afghanistan region → Peru
  { startLat: 7.8731, startLng: 80.7718, endLat: -15.7942, endLng: -47.8822 },        // Sri Lanka → Brasília
];

export const HERO_POINTS = [
  { lat: 20.5937, lng: 78.9629, size: 0.6, label: "New Delhi" },
  { lat: 9.0820, lng: 8.6753, size: 0.5, label: "Abuja" },
  { lat: -14.2350, lng: -51.9253, size: 0.6, label: "Brasília" },
  { lat: -1.2921, lng: 36.8219, size: 0.45, label: "Nairobi" },
  { lat: 30.0444, lng: 31.2357, size: 0.5, label: "Cairo" },
  { lat: -6.2088, lng: 106.8456, size: 0.55, label: "Jakarta" },
  { lat: 23.8859, lng: 45.0792, size: 0.5, label: "Riyadh" },
  { lat: 1.3521, lng: 103.8198, size: 0.45, label: "Singapore" },
  { lat: 48.0196, lng: 66.9237, size: 0.45, label: "Astana" },
  { lat: 14.0583, lng: 108.2772, size: 0.4, label: "Hanoi" },
  { lat: 4.5709, lng: -74.2973, size: 0.4, label: "Bogotá" },
  { lat: 31.7917, lng: -7.0926, size: 0.4, label: "Rabat" },
];
