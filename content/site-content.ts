export const timeline = [
  {
    year: "1948",
    title: "Początek Halki",
    text: "Józef Kościelny i grono przyjaciół powołują zespół, aby ożywić życie śpiewacze Lublińca i pielęgnować regionalne tradycje.",
  },
  {
    year: "1990",
    title: "Własne stowarzyszenie",
    text: "Członkowie tworzą Stowarzyszenie Zespołu Pieśni i Tańca Halka, które od tej pory wspiera rozwój grupy.",
  },
  {
    year: "2018",
    title: "70 lat na scenie",
    text: "Jubileuszowy koncert łączy obecnych i dawnych członków oraz przypomina najważniejsze pieśni i tańce zespołu.",
  },
  {
    year: "2023",
    title: "Nowy rozdział w MDK",
    text: "Halka rozpoczyna działalność w Miejskim Domu Kultury w Lublińcu, zyskując przestrzeń dla kolejnych pokoleń.",
  },
  {
    year: "2024",
    title: "Śląsk w Warszawie",
    text: "Zespół występuje na Krakowskim Przedmieściu podczas Spotkania z Kulturą Śląską i zdobywa wyróżnienia w konkursie Śląskie Śpiewanie.",
  },
  {
    year: "Dziś",
    title: "Tradycja w ruchu",
    text: "Dzieci, młodzież i dorośli wspólnie tańczą, śpiewają i tworzą kolejne strony żywej kroniki Halki.",
  },
] as const;

export const schedule = [
  {
    day: "ŚRO",
    time: "15:30-17:50",
    title: "Grupy dziecięce",
    meta: "6-14 lat, środy i piątki",
  },
  {
    day: "ŚRO",
    time: "18:00-20:00",
    title: "Grupa reprezentacyjna",
    meta: "Młodzież i dorośli, środy i piątki",
  },
  {
    day: "CZW",
    time: "17:30-19:30",
    title: "Próba chóru",
    meta: "Cotygodniowe spotkanie wokalne",
  },
] as const;

export const contact = {
  phoneDisplay: "34 351 06 87",
  phone: "+48343510687",
  email: "imprezy@mdk.lubliniec.pl",
  address: "ul. Stalmacha 12, 42-700 Lubliniec",
  mapLink: "https://maps.app.goo.gl/Fbw8pngy29Q4Bpmo9",
  mdkLink: "https://mdk.lubliniec.pl/sekcje-mdk/zespol-piesni-i-tanca-halka/",
};

export const facts = [
  { value: "1948", label: "rok założenia" },
  { value: "365", label: "pieśni w dorobku" },
  { value: "90", label: "tańców" },
  { value: "25", label: "sztuk teatralnych" },
] as const;
