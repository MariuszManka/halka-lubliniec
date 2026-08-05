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
  locationUrl?: string;
  kind: "Występ" | "Próba" | "Warsztaty";
  groups: EventGroup[];
  note?: string;
};

// Dodawanie wydarzenia: skopiuj jeden wpis, nadaj mu unikalne id i zmień dane.
// Data ma format RRRR-MM-DD, a grupy wybierz z: ensemble, children, choir, ballet.
const oneOffEvents: CalendarEvent[] = [
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

type WeeklyPractice = {
  id: string;
  weekday: number;
  time: string;
  endTime: string;
  title: string;
  groups: EventGroup[];
  note: string;
};

const rehearsalLocation = "Siedziba zespołu";
const rehearsalLocationUrl = "https://maps.app.goo.gl/Fbw8pngy29Q4Bpmo9";
const rehearsalPeriod = { start: "2026-08-05", end: "2026-09-30" };

const weeklyPractices: WeeklyPractice[] = [
  {
    id: "sroda-dzieci-1",
    weekday: 3,
    time: "15:30",
    endTime: "16:20",
    title: "Próba 1 grupy dziecięcej",
    groups: ["children"],
    note: "Grupa dla dzieci w wieku 6–8 lat.",
  },
  {
    id: "sroda-dzieci-2",
    weekday: 3,
    time: "16:30",
    endTime: "17:50",
    title: "Próba 2 grupy dziecięcej",
    groups: ["children"],
    note: "Grupa dla dzieci w wieku 9–14 lat.",
  },
  {
    id: "sroda-reprezentacyjna",
    weekday: 3,
    time: "18:00",
    endTime: "20:00",
    title: "Próba grupy reprezentacyjnej",
    groups: ["ballet"],
    note: "Grupa taneczna reprezentacyjna dla młodzieży i dorosłych.",
  },
  {
    id: "czwartek-chor",
    weekday: 4,
    time: "17:30",
    endTime: "19:30",
    title: "Próba chóru",
    groups: ["choir"],
    note: "Cotygodniowa próba chóru.",
  },
  {
    id: "piatek-dzieci-1",
    weekday: 5,
    time: "15:30",
    endTime: "16:20",
    title: "Próba 1 grupy dziecięcej",
    groups: ["children"],
    note: "Grupa dla dzieci w wieku 6–8 lat.",
  },
  {
    id: "piatek-dzieci-2",
    weekday: 5,
    time: "16:30",
    endTime: "17:50",
    title: "Próba 2 grupy dziecięcej",
    groups: ["children"],
    note: "Grupa dla dzieci w wieku 9–14 lat.",
  },
  {
    id: "piatek-reprezentacyjna",
    weekday: 5,
    time: "18:00",
    endTime: "20:00",
    title: "Próba grupy reprezentacyjnej",
    groups: ["ballet"],
    note: "Grupa taneczna reprezentacyjna dla młodzieży i dorosłych.",
  },
];

const createWeeklyPracticeEvents = (practice: WeeklyPractice): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const cursor = new Date(`${rehearsalPeriod.start}T12:00:00Z`);
  const end = new Date(`${rehearsalPeriod.end}T12:00:00Z`);

  while (cursor <= end) {
    if (cursor.getUTCDay() === practice.weekday) {
      const date = cursor.toISOString().slice(0, 10);
      events.push({
        id: `${practice.id}-${date}`,
        date,
        time: practice.time,
        endTime: practice.endTime,
        title: practice.title,
        location: rehearsalLocation,
        locationUrl: rehearsalLocationUrl,
        kind: "Próba",
        groups: practice.groups,
        note: practice.note,
      });
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return events;
};

export const calendarEvents: CalendarEvent[] = [
  ...oneOffEvents,
  ...weeklyPractices.flatMap(createWeeklyPracticeEvents),
].sort((a, b) => `${a.date}-${a.time ?? "99:99"}`.localeCompare(`${b.date}-${b.time ?? "99:99"}`));
