export const siteConfig = {
  name: "Zespół Pieśni i Tańca Halka",
  shortName: "Halka",
  city: "Lubliniec",
  founded: 1948,
  association: {
    name: 'Stowarzyszenie Zespołu Pieśni i Tańca „Halka”',
    krs: "0000186198",
    nip: "5751026830",
  },
  contact: {
    email: "zpithalka1948@gmail.com",
    phoneDisplay: "34 351 06 87",
    phone: "+48343510687",
    address: "ul. Stalmacha 12, 42-700 Lubliniec",
    mapUrl: "https://maps.app.goo.gl/Fbw8pngy29Q4Bpmo9",
    mapEmbedUrl: "https://www.google.com/maps?q=ul.%20Stalmacha%2012%2C%2042-700%20Lubliniec&output=embed",
  },
  social: {
    facebook: "https://www.facebook.com/zpit.halka",
    instagram: "https://www.instagram.com/zpit_halka/",
    youtube: "https://www.youtube.com/@zpit.halka.lubliniec",
    messenger: "https://m.me/zpit.halka",
  },
} as const;

export const mainNavigation = [
  { label: "Dołącz", href: "/dolacz" },
  { label: "Zaproś Halkę", href: "/zapros-halke" },
  { label: "Wydarzenia", href: "/wydarzenia" },
  { label: "Galeria", href: "/galeria" },
  { label: "Historia", href: "/historia" },
  { label: "Kostiumy", href: "/kostiumy" },
] as const;

export const ensembleGroups = [
  {
    id: "grupa-1",
    name: "Maluchy",
    age: "6-8 lat",
    activity: "Śpiew i taniec",
    schedule: "Środy i piątki, 15:30-16:20",
    image: "/session/children-group.webp",
    imageAlt: "Najmłodsza grupa dziecięca Zespołu Halka",
    recruitment: "open",
  },
  {
    id: "grupa-2",
    name: "Starszaki",
    age: "9-14 lat",
    activity: "Śpiew i taniec",
    schedule: "Środy i piątki, 16:30-17:50",
    image: "/session/2-grupowe-halka-wkf-7642.webp",
    imageAlt: "Druga grupa dziecięca Zespołu Halka",
    recruitment: "open",
  },
  {
    id: "chor",
    name: "Chór",
    age: "Od 15 lat",
    activity: "Śpiew wielogłosowy",
    schedule: "Czwartki, 17:30-19:30",
    image: "/session/2-grupowe-halka-wkf-8263.webp",
    imageAlt: "Chór Zespołu Pieśni i Tańca Halka",
    recruitment: "open",
  },
  {
    id: "balet",
    name: "Balet",
    age: "Od 15 lat",
    activity: "Taniec",
    schedule: "Środy i piątki, 18:00-20:00",
    image: "/session/2-grupowe-halka-wkf-0785.webp",
    imageAlt: "Grupa baletowa reprezentacyjna Zespołu Halka",
    recruitment: "open",
  },
] as const;

export const readySuites = [
  {
    id: "slaska",
    name: "Suita śląska",
    label: "Program flagowy",
    description: "Pieśni i tańce najbliższe miejscu, z którego wyrasta Halka.",
  },
  {
    id: "rzeszowska",
    name: "Suita rzeszowska",
    label: "Gotowy program",
    description: "Żywiołowy rytm, charakterystyczny śpiew i barwna forma sceniczna.",
  },
  {
    id: "krakowska",
    name: "Suita krakowska",
    label: "Gotowy program",
    description: "Rozpoznawalna energia, tempo i bogactwo krakowskich strojów.",
  },
] as const;
