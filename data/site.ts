export const siteInfo = {
  name: "Southern Air Ducts",
  phone: "+94 112 746 131",
  phoneRaw: "+94112746131",
  mobile: "077 308 3002",
  // WhatsApp number in international format, digits only (from the 077 308 3002 mobile).
  whatsapp: "94773083002",
  email: "info@southernairduct.com",
  address: ["No 617/4/A Piliyandala Road,", "Egodawatta,Arawwala,", "Pannipitiya,"],
};

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Service", href: "/#services" },
  { label: "Product", href: "/#products" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const heroStat = {
  text: "We have completed over 440 projects islandwide.",
  value: 40,
  suffix: "K+",
};

export const aboutStats = [
  { value: 14, suffix: "+", label: "Years Our Story begin" },
  { value: 200, suffix: "+", label: "Project completed" },
  { value: null, text: "24/7", label: "Emergency Support" },
] as const;

export const services = [
  { icon: "/icons/serviceIcon/service-icon-1.svg", title: "Air Conditioning Installation & Repair", text: "Efficient cooling systems designed for comfort and energy savings." },
  { icon: "/icons/serviceIcon/service-icon-2.svg", title: "Indoor Air Quality Solutions", text: "Air purifiers, ventilation, and humidity control for healthier air." },
  { icon: "/icons/serviceIcon/service-icon-3.svg", title: "HVAC Maintenance & Tune-Ups", text: "Prevent breakdowns and extend system lifespan with regular servicing." },
  { icon: "/icons/serviceIcon/service-icon-4.svg", title: "Commercial HVAC Solutions", text: "Customized climate systems for offices, retail, and industrial spaces." },
];

export const processSteps = [
  { title: "Send your enquiry", text: "Share drawings, sizes or product codes through the form or WhatsApp" },
  { title: "Get a quote", text: "Receive a clear price and lead time, usually within one working day." },
  { title: "We fabricate", text: "Your ducts are cut, formed, finished and quality-checked in our workshop" },
  { title: "Delivered to site", text: "Packed and delivered, with installation support when you need it." },
];

// Placeholder answers — confirm real copy with the client.
export const faqs = [
  { q: "How frequently should a premium HVAC system be serviced?", a: "We recommend a professional service at least once a year, and twice a year for heavily used commercial systems, to keep performance high and prevent breakdowns." },
  { q: "Do you offer priority or emergency support?", a: "Yes. Our team provides 24/7 emergency support for urgent breakdowns across the island." },
  { q: "How long does a typical installation take?", a: "It depends on the size and complexity of the project. After a site assessment we give you a clear timeline with your quote." },
  { q: "Do you provide consultation before installation?", a: "Yes. We review your space, needs and budget before recommending a system, so you get the right solution." },
  { q: "Are your technicians certified and insured?", a: "Our technicians are trained professionals. Contact us for details of our certifications and insurance cover." },
];
