import ICAL from "ical.js";
import {
  calendarEvents as fallbackEvents,
  type CalendarEvent,
  type EventGroup,
} from "./events";

const WARSAW_TIME_ZONE = "Europe/Warsaw";
const DEFAULT_LOCATION = "Szczegóły wkrótce";
const DEFAULT_GOOGLE_CALENDAR_ICAL_URL = "https://calendar.google.com/calendar/ical/c_dac3ee260688995252fc8c8e7097f263cc5c0315b289f9059df37a9f5ef489e0%40group.calendar.google.com/public/basic.ics";
const GROUP_ALIASES: Array<[EventGroup, RegExp]> = [
  ["children", /(?:^|[\s,;#])(dzieci[a-z]*|children)(?:$|[\s,;])/],
  ["choir", /(?:^|[\s,;#])(chor[a-z]*|choir)(?:$|[\s,;])/],
  ["ballet", /(?:^|[\s,;#])(balet|baletu|ballet)(?:$|[\s,;])/],
  ["ensemble", /(?:^|[\s,;#])(zespol[a-z]*|halka|ensemble|dorosli)(?:$|[\s,;])/],
];

const datePartsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: WARSAW_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timePartsFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: WARSAW_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const pad = (value: number) => String(value).padStart(2, "0");
const directDate = (value: InstanceType<typeof ICAL.Time>) => `${value.year}-${pad(value.month)}-${pad(value.day)}`;

function zonedDate(value: InstanceType<typeof ICAL.Time>): string {
  if (value.isDate) return directDate(value);
  const parts = Object.fromEntries(
    datePartsFormatter.formatToParts(value.toJSDate()).map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function zonedTime(value: InstanceType<typeof ICAL.Time>): string | undefined {
  if (value.isDate) return undefined;
  const parts = Object.fromEntries(
    timePartsFormatter.formatToParts(value.toJSDate()).map((part) => [part.type, part.value]),
  );
  return `${parts.hour}:${parts.minute}`;
}

function previousDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function metadata(description: string) {
  let kind: CalendarEvent["kind"] | undefined;
  let groups: EventGroup[] | undefined;
  let locationUrl: string | undefined;
  const note: string[] = [];

  for (const rawLine of description.split(/\r?\n/)) {
    const line = rawLine.trim();
    const kindMatch = line.match(/^typ\s*:\s*(.+)$/i);
    const groupsMatch = line.match(/^grupy?\s*:\s*(.+)$/i);
    const mapMatch = line.match(/^mapa\s*:\s*(.+)$/i);

    if (kindMatch) {
      const value = normalize(kindMatch[1]);
      if (value.includes("proba")) kind = "Próba";
      else if (value.includes("warsztat")) kind = "Warsztaty";
      else if (value.includes("konkurs")) kind = "Konkurs";
      else if (value.includes("wystep") || value.includes("koncert")) kind = "Występ";
      else if (value.includes("spotkan")) kind = "Spotkanie";
      else if (value.includes("inne")) kind = "Inne";
      continue;
    }

    if (groupsMatch) {
      const value = ` ${normalize(groupsMatch[1])} `;
      groups = GROUP_ALIASES.filter(([, pattern]) => pattern.test(value)).map(([group]) => group);
      continue;
    }

    if (mapMatch) {
      locationUrl = googleMapsUrl(mapMatch[1]);
      continue;
    }

    const normalizedLine = normalize(line.replace(/[\u00a0\u202f]/g, " "));
    const isConferenceBoilerplate = /meet\.google\.com|tel\.meet|google\s+meet|kod\s+pin|support\.google\.com\/a\/users\/answer\/9282720/i.test(line);
    if (isConferenceBoilerplate || /^(dolacz w google meet|lub zadzwon|wiecej numerow telefonow|wiecej informacji o meet|join with google meet|or dial|more phone numbers)/.test(normalizedLine)) {
      continue;
    }

    if (line) note.push(line);
  }

  return { kind, groups, locationUrl, note: note.join("\n") || undefined };
}

function googleMapsUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    const googleHost = /(^|\.)google\.[a-z.]+$/i.test(url.hostname) && url.pathname.startsWith("/maps");
    const shortHost = ["maps.app.goo.gl", "goo.gl"].includes(url.hostname.toLowerCase());
    return url.protocol === "https:" && (googleHost || shortHost) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function inferKind(text: string): CalendarEvent["kind"] {
  const value = normalize(text);
  if (/(^|\s|#)proba(\s|$)/.test(value)) return "Próba";
  if (/(^|\s|#)warsztat/.test(value)) return "Warsztaty";
  if (/(^|\s|#)konkurs/.test(value)) return "Konkurs";
  if (/(^|\s|#)spotkan/.test(value)) return "Spotkanie";
  if (/(^|\s|#)(wystep|koncert|festiwal|festyn|dozynki|jarmark|gala|przeglad)/.test(value)) return "Występ";
  return "Inne";
}

function inferGroups(text: string): EventGroup[] {
  const value = ` ${normalize(text)} `;
  const groups = GROUP_ALIASES.filter(([, pattern]) => pattern.test(value)).map(([group]) => group);
  return groups.length ? groups : ["ensemble"];
}

function toCalendarEvent(
  source: InstanceType<typeof ICAL.Event>,
  start: InstanceType<typeof ICAL.Time>,
  end: InstanceType<typeof ICAL.Time>,
): CalendarEvent | null {
  const status = String(source.component.getFirstPropertyValue("status") ?? "").toUpperCase();
  const classification = String(source.component.getFirstPropertyValue("class") ?? "PUBLIC").toUpperCase();
  if (status === "CANCELLED" || ["PRIVATE", "CONFIDENTIAL"].includes(classification) || !source.summary?.trim()) return null;

  const description = source.description?.trim() ?? "";
  const parsed = metadata(description);
  const searchable = `${source.summary}\n${description}`;
  const date = zonedDate(start);
  const rawEndDate = zonedDate(end);
  const endDate = start.isDate ? previousDate(rawEndDate) : rawEndDate;
  const time = zonedTime(start);
  const endTime = zonedTime(end);

  return {
    id: `gcal-${source.uid}-${date}-${time ?? "all-day"}`,
    date,
    ...(endDate !== date ? { endDate } : {}),
    ...(time ? { time } : {}),
    ...(time && endTime ? { endTime } : {}),
    title: source.summary.trim(),
    location: source.location?.trim() || DEFAULT_LOCATION,
    ...(parsed.locationUrl ? { locationUrl: parsed.locationUrl } : {}),
    kind: parsed.kind ?? inferKind(searchable),
    groups: parsed.groups?.length ? parsed.groups : inferGroups(searchable),
    ...(parsed.note ? { note: parsed.note } : {}),
  };
}

export function parseGoogleCalendar(icalText: string, now = new Date()): CalendarEvent[] {
  const root = new ICAL.Component(ICAL.parse(icalText));
  const currentYear = now.getUTCFullYear();
  const windowStart = `${currentYear}-01-01`;
  const windowEnd = `${currentYear + 2}-01-01`;
  const events: CalendarEvent[] = [];

  for (const component of root.getAllSubcomponents("vevent")) {
    const event = new ICAL.Event(component);
    if (event.isRecurrenceException()) continue;

    if (!event.isRecurring()) {
      const mapped = toCalendarEvent(event, event.startDate, event.endDate);
      if (mapped && (mapped.endDate ?? mapped.date) >= windowStart && mapped.date < windowEnd) events.push(mapped);
      continue;
    }

    const iterator = event.iterator();
    let occurrence: InstanceType<typeof ICAL.Time> | null;
    let occurrenceCount = 0;
    while ((occurrence = iterator.next())) {
      occurrenceCount += 1;
      if (occurrenceCount > 50_000) {
        throw new Error(`Recurring event ${event.uid} exceeds the safe expansion limit.`);
      }
      const details = event.getOccurrenceDetails(occurrence);
      const occurrenceDate = zonedDate(details.startDate);
      if (occurrenceDate >= windowEnd) break;
      const mapped = toCalendarEvent(details.item, details.startDate, details.endDate);
      if (mapped && (mapped.endDate ?? mapped.date) >= windowStart) events.push(mapped);
    }
  }

  return events.sort((a, b) => `${a.date}-${a.time ?? "99:99"}`.localeCompare(`${b.date}-${b.time ?? "99:99"}`));
}

let calendarPromise: Promise<CalendarEvent[]> | undefined;

async function fetchGoogleCalendar(): Promise<CalendarEvent[]> {
  const configuredUrl = process.env.GOOGLE_CALENDAR_ICAL_URL?.trim() || DEFAULT_GOOGLE_CALENDAR_ICAL_URL;

  const url = new URL(configuredUrl);
  if (url.protocol !== "https:") throw new Error("GOOGLE_CALENDAR_ICAL_URL must use HTTPS.");
  url.searchParams.set("halkaBuild", process.env.GITHUB_SHA?.slice(0, 12) || Date.now().toString());

  try {
    const response = await fetch(url, { cache: "force-cache", headers: { Accept: "text/calendar" } });
    if (!response.ok) throw new Error(`Google Calendar returned HTTP ${response.status}.`);
    return parseGoogleCalendar(await response.text());
  } catch (error) {
    if (process.env.GOOGLE_CALENDAR_REQUIRED === "true") throw error;
    console.warn("Google Calendar unavailable; using local fallback.", error);
    return structuredClone(fallbackEvents);
  }
}

export function getCalendarEvents(): Promise<CalendarEvent[]> {
  calendarPromise ??= fetchGoogleCalendar();
  return calendarPromise;
}
