"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";

type Choice = { value: string; label: string; hasEvents?: boolean };

function CalendarChoice({ label, title, value, options, onSelect, variant }: {
  label: string;
  title: string;
  value: string;
  options: Choice[];
  onSelect: (value: string) => void;
  variant: "month" | "year";
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const positionPanel = () => {
    const button = trigger.current;
    const popup = panel.current;
    if (!button || !popup) return;
    const rect = button.getBoundingClientRect();
    const width = popup.offsetWidth;
    const height = popup.offsetHeight;
    popup.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
    const below = rect.bottom + 8;
    popup.style.top = `${below + height <= window.innerHeight - 12 ? below : Math.max(12, rect.top - height - 8)}px`;
  };

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", positionPanel);
    window.addEventListener("scroll", positionPanel, true);
    return () => {
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel, true);
    };
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" className={`events-calendar-title-choice events-calendar-title-${variant}`}
        aria-label={`${label}: ${options.find((option) => option.value === value)?.label}`}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={id} popoverTarget={id}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            panel.current?.showPopover();
          }
        }}>
        {options.find((option) => option.value === value)?.label}<CaretDown size={14} weight="bold" aria-hidden="true" />
      </button>
      <div id={id} ref={panel} popover="auto" className="events-calendar-picker-panel"
        onToggle={(event) => {
          const isOpen = event.newState === "open";
          setOpen(isOpen);
          if (isOpen) {
            positionPanel();
            panel.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus({ preventScroll: true });
          }
        }}
        onBlur={(event) => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node) && event.relatedTarget !== trigger.current) panel.current?.hidePopover();
        }}>
        <div className="events-calendar-picker-caption" id={`${id}-label`}>{title}</div>
        <div className="events-calendar-picker-options" role="listbox" aria-labelledby={`${id}-label`}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              panel.current?.hidePopover();
              trigger.current?.focus({ preventScroll: true });
              return;
            }
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'));
            const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
            let next: number | undefined;
            if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
            if (event.key === "ArrowLeft") next = (index + buttons.length - 1) % buttons.length;
            if (event.key === "ArrowDown") next = Math.min(index + 3, buttons.length - 1);
            if (event.key === "ArrowUp") next = Math.max(index - 3, 0);
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = buttons.length - 1;
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== " ") {
              const match = options.findIndex((option, optionIndex) => optionIndex > index && option.label.toLocaleLowerCase("pl").startsWith(event.key.toLocaleLowerCase("pl")));
              const firstMatch = options.findIndex((option) => option.label.toLocaleLowerCase("pl").startsWith(event.key.toLocaleLowerCase("pl")));
              if (match >= 0 || firstMatch >= 0) next = match >= 0 ? match : firstMatch;
            }
            if (next !== undefined) { event.preventDefault(); buttons[next]?.focus(); }
          }}>
          {options.map((option) => (
            <button type="button" role="option" aria-selected={value === option.value} tabIndex={value === option.value ? 0 : -1}
              aria-label={`${option.label}${option.hasEvents ? ", wydarzenia poza próbami" : ""}`}
              key={option.value} onClick={() => {
                onSelect(option.value);
                panel.current?.hidePopover();
                trigger.current?.focus({ preventScroll: true });
              }}>
              {option.label}
              {value === option.value ? <Check size={12} weight="bold" aria-hidden="true" /> : option.hasEvents ? <i className="events-month-dot" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function EventsCalendarHeader({ selectedMonth, currentMonth, monthNames, years, eventMonths, onSelect }: {
  selectedMonth: string;
  currentMonth: string;
  monthNames: string[];
  years: number[];
  eventMonths: Set<string>;
  onSelect: (value: string) => void;
}) {
  const [year, month] = selectedMonth.split("-");
  return (
    <header className="events-calendar-toolbar">
      <div className="events-calendar-title" role="heading" aria-level={3} aria-label={`${monthNames[Number(month) - 1]} ${year}`}>
        <CalendarChoice variant="month" label="Wybierz miesiąc" title={`Miesiąc · ${year}`} value={month}
          options={monthNames.map((label, index) => ({ value: String(index + 1).padStart(2, "0"), label, hasEvents: eventMonths.has(`${year}-${String(index + 1).padStart(2, "0")}`) }))}
          onSelect={(value) => onSelect(`${year}-${value}`)} />
        <CalendarChoice variant="year" label="Wybierz rok" title="Wybierz rok" value={year}
          options={years.map((value) => ({ value: String(value), label: String(value) }))}
          onSelect={(value) => onSelect(`${value}-${month}`)} />
      </div>
      <button type="button" className="events-calendar-today" disabled={selectedMonth === currentMonth} onClick={() => onSelect(currentMonth)} aria-label="Przejdź do bieżącego miesiąca">Dzisiaj</button>
    </header>
  );
}
