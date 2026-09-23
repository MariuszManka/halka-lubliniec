"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "@phosphor-icons/react";
import { historyJourneys } from "../content/history-journeys";
import shapes from "../content/history-map-shapes.json";
import "./history-map.css";

type CountryId = typeof historyJourneys[number]["id"];
const mercator = (latitude: number) => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
function position(longitude: number, latitude: number) {
  return { x: (longitude + 32) * 12, y: (mercator(72) - mercator(latitude)) * 180 / Math.PI * 12 };
}
const visited = new Set<string>(historyJourneys.map(country => country.id));

export function HistoryMap() {
  const [selected, setSelected] = useState<CountryId>("GEO");
  const [hovered, setHovered] = useState<CountryId | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const journey = historyJourneys.find(country => country.id === selected)!;

  useEffect(() => {
    if (viewport.current && canvas.current) {
      viewport.current.scrollLeft = position(19, 50).x / 1200 * canvas.current.clientWidth - viewport.current.clientWidth / 2;
    }
  }, []);

  function selectCountry(id: CountryId, center = false) {
    setSelected(id);
    if (center && viewport.current && canvas.current) {
      const country = historyJourneys.find(item => item.id === id)!;
      const point = position(country.longitude, country.latitude);
      viewport.current.scrollTo({ left: point.x / 1200 * canvas.current.clientWidth - viewport.current.clientWidth / 2, behavior: "instant" });
    }
  }

  return (
    <section className="history-travels" id="halka-na-swiecie" aria-labelledby="history-map-title">
      <header className="history-travels-heading">
        <h2 id="history-map-title">Halka<br /><em>na świecie.</em></h2>
        <div>
          <p>Halka zabierała ze sobą pieśni, tańce i kawałek rodzinnego Śląska. W archiwum zostały spotkania i wspomnienia z <strong>{historyJourneys.length} krajów poza Polską.</strong></p>
          <p className="history-map-hint">Najedź na pinezkę lub wybierz kraj, żeby poznać ślad podróży.</p>
        </div>
      </header>

      <div className="history-map-viewport" ref={viewport} aria-label="Mapa podróży Halki. Na małym ekranie mapę można przesuwać poziomo." tabIndex={0}>
        <div className="history-map-canvas" ref={canvas}>
          <svg className="history-map-geography" viewBox="0 0 1200 780" aria-hidden="true">
            {shapes.map(country => <path key={country.id} d={country.d} className={`history-map-land${visited.has(country.id) ? " is-visited" : ""}${country.id === (hovered ?? selected) ? " is-active" : ""}${country.id === "POL" ? " is-home" : ""}`} />)}
            <text x="190" y="410" className="history-map-sea">Ocean Atlantycki</text>
            <text x="830" y="670" className="history-map-sea">Morze Czarne</text>
          </svg>
          <div className="history-map-home" style={{ left: `${(position(18.68, 50.67).x / 12).toFixed(3)}%`, top: `${(position(18.68, 50.67).y / 7.8).toFixed(3)}%` }}><span />Lubliniec</div>
          {historyJourneys.map(country => {
            const point = position(country.longitude, country.latitude);
            return <button key={country.id} type="button" className={`history-map-pin${selected === country.id ? " is-selected" : ""}${hovered === country.id ? " has-tooltip" : ""}`} style={{ left: `${(point.x / 12).toFixed(3)}%`, top: `${(point.y / 7.8).toFixed(3)}%` }} aria-label={`${country.country} — ${country.dates}`} aria-pressed={selected === country.id} aria-controls="history-map-detail" onPointerEnter={() => setHovered(country.id)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(country.id)} onBlur={() => setHovered(null)} onClick={() => selectCountry(country.id)} onKeyDown={event => { if (event.key === "Escape") { setHovered(null); } }}>
              <MapPin weight="fill" size={29} aria-hidden="true" />
              <span className="history-map-tooltip">{country.country}</span>
            </button>;
          })}
        </div>
      </div>

      <div className="history-travels-bottom">
        <div className="history-map-countries" role="group" aria-label="Wybierz kraj podróży">
          {historyJourneys.map(country => <button type="button" key={country.id} aria-pressed={selected === country.id} aria-controls="history-map-detail" onClick={() => selectCountry(country.id, true)}>{country.country}</button>)}
        </div>
        <div className="history-map-detail" id="history-map-detail" aria-live="polite" aria-atomic="true">
          <div><p className="history-map-date">{journey.dates}</p><h3>{journey.country}</h3></div>
          <div><p className="history-map-place">{journey.places}</p><p>{journey.text}</p></div>
        </div>
        <p className="history-map-source">Podróże z planszy „Najdalsze podróże” z archiwalnej wystawy Halki. Pinezki wskazują kraje, nie dokładne miejsca występów. Podkład mapy: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>.</p>
      </div>
    </section>
  );
}
