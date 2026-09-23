"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type Props = {
  year: string;
  monthNames: string[];
  selectedMonth: string;
  eventMonths: Set<string>;
  label: string;
  onSelect: (month: string) => void;
};

export function EventsMonthTabs({ year, monthNames, selectedMonth, eventMonths, label, onSelect }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setEdges({ overflow: max > 1, start: element.scrollLeft <= 1, end: element.scrollLeft >= max - 1 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const element = viewport.current;
    const selected = element?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!element || !selected) return;
    const bounds = element.getBoundingClientRect();
    const tab = selected.getBoundingClientRect();
    if (tab.left < bounds.left) element.scrollLeft += tab.left - bounds.left;
    else if (tab.right > bounds.right) element.scrollLeft += tab.right - bounds.right;
  }, [selectedMonth]);

  const scroll = (direction: number) => {
    const element = viewport.current;
    element?.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div className="events-month-tabs">
      <button className="events-month-scroll" type="button" hidden={!edges.overflow} disabled={edges.start} aria-label="Przewiń miesiące w lewo" onClick={() => scroll(-1)}>
        <CaretLeft size={18} aria-hidden="true" />
      </button>
      <div className="events-month-viewport" ref={viewport} role="tablist" aria-label={`${label} ${year}`}>
        {Array.from({ length: 12 }, (_, index) => {
          const key = `${year}-${String(index + 1).padStart(2, "0")}`;
          const hasEvents = eventMonths.has(key);
          return (
            <button
              className="events-month-tab"
              type="button"
              role="tab"
              id={`events-tab-${key}`}
              aria-controls="events-month-panel"
              aria-selected={selectedMonth === key}
              aria-label={`${monthNames[index]} ${year}${hasEvents ? ", wydarzenia poza próbami" : ""}`}
              tabIndex={selectedMonth === key ? 0 : -1}
              onClick={() => onSelect(key)}
              onKeyDown={(event) => {
                const next = event.key === "ArrowRight" ? (index + 1) % 12
                  : event.key === "ArrowLeft" ? (index + 11) % 12
                  : event.key === "Home" ? 0 : event.key === "End" ? 11 : null;
                if (next === null) return;
                event.preventDefault();
                onSelect(`${year}-${String(next + 1).padStart(2, "0")}`);
                (viewport.current?.children[next] as HTMLElement)?.focus({ preventScroll: true });
              }}
              key={key}
            >
              <span>{monthNames[index]}</span><span className="events-month-label"><small>{year}</small>{hasEvents && <i className="events-month-dot" aria-hidden="true" />}</span>
            </button>
          );
        })}
      </div>
      <button className="events-month-scroll" type="button" hidden={!edges.overflow} disabled={edges.end} aria-label="Przewiń miesiące w prawo" onClick={() => scroll(1)}>
        <CaretRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
