export const eventGroups = {
  ensemble: { label: "Zespół", className: "group-ensemble" },
  children: { label: "Dzieci", className: "group-children" },
  choir: { label: "Chór", className: "group-choir" },
  ballet: { label: "Balet", className: "group-ballet" },
} as const;

export type EventGroup = keyof typeof eventGroups;

export type CalendarEvent = {
  id: string;
  date: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  title: string;
  location: string;
  kind: "Występ" | "Próba" | "Warsztaty";
  groups: EventGroup[];
  note?: string;
};

// Dodawanie wydarzenia: skopiuj jeden wpis, nadaj mu unikalne id i zmień dane.
// Data ma format RRRR-MM-DD, a grupy wybierz z: ensemble, children, choir, ballet.
export const calendarEvents: CalendarEvent[] = [
  {
    id: "proba-choru-23-lipca",
    date: "2026-07-23",
    time: "17:30",
    title: "Próba chóru",
    location: "Lubliniec",
    kind: "Próba",
    groups: ["choir"],
  },
  {
    id: "proba-dzieci-25-lipca",
    date: "2026-07-25",
    time: "09:00",
    endTime: "10:00",
    title: "Próba grupy dziecięcej",
    location: "Lubliniec",
    kind: "Próba",
    groups: ["children"],
  },
  {
    id: "warsztaty-generalne-lipiec",
    date: "2026-07-25",
    endDate: "2026-07-26",
    time: "10:00",
    endTime: "15:00",
    title: "Warsztaty i próba generalna",
    location: "Lubliniec",
    kind: "Warsztaty",
    groups: ["ensemble"],
  },
  {
    id: "proba-choru-28-lipca",
    date: "2026-07-28",
    time: "18:00",
    title: "Próba chóru",
    location: "Lubliniec",
    kind: "Próba",
    groups: ["choir"],
  },
  {
    id: "proba-baletu-29-lipca",
    date: "2026-07-29",
    time: "18:00",
    title: "Próba baletu",
    location: "Lubliniec",
    kind: "Próba",
    groups: ["ballet"],
  },
  {
    id: "tkb-wisla-2026",
    date: "2026-08-01",
    time: "18:35",
    title: "Tydzień Kultury Beskidzkiej",
    location: "Wisła",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "kochanowice-dzieci-2026",
    date: "2026-08-02",
    time: "15:00",
    title: "Występ grupy dziecięcej",
    location: "Kochanowice",
    kind: "Występ",
    groups: ["children"],
  },
  {
    id: "tkb-szczyrk-2026",
    date: "2026-08-02",
    time: "17:05",
    title: "Tydzień Kultury Beskidzkiej",
    location: "Szczyrk",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "spala-chor-2026",
    date: "2026-08-15",
    title: "Występ chóru",
    location: "Spała",
    kind: "Występ",
    groups: ["choir"],
  },
  {
    id: "dozynki-kocury-2026",
    date: "2026-08-30",
    title: "Dożynki",
    location: "Kocury",
    kind: "Występ",
    groups: ["ensemble", "children"],
    note: "Występują grupa dorosła oraz grupa dziecięca.",
  },
  {
    id: "zameczek-lubliniec-2026",
    date: "2026-09-03",
    time: "11:00",
    title: "Występ w DPS „Zameczek”",
    location: "Lubliniec",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "dozynki-herby-2026",
    date: "2026-09-06",
    title: "Dożynki",
    location: "Herby",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "niniwa-kokotek-11-wrzesnia",
    date: "2026-09-11",
    title: "Spotkanie w Niniwie",
    location: "Kokotek",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "dozynki-pawelki-2026",
    date: "2026-09-13",
    title: "Dożynki",
    location: "Pawełki",
    kind: "Występ",
    groups: ["ensemble"],
  },
  {
    id: "spotkanie-pokolen-niniwa-2026",
    date: "2026-09-18",
    title: "Spotkanie Pokoleń w Niniwie",
    location: "Kokotek",
    kind: "Występ",
    groups: ["children"],
    note: "Występ grupy dziecięcej.",
  },
];
