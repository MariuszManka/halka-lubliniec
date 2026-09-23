// Natural Earth 1:50m, public domain. Input is downloaded separately; no runtime requests.
// https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
import { readFileSync, writeFileSync } from 'node:fs';
const source = JSON.parse(readFileSync(new URL('../work/history/countries.geojson', import.meta.url), 'utf8'));
const mercator = latitude => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
const project = ([longitude, latitude]) => [(longitude + 32) * 12, (mercator(72) - mercator(Math.max(-80, Math.min(80, latitude)))) * 180 / Math.PI * 12];
const countries = source.features.filter(f => f.bbox[2] > -32 && f.bbox[0] < 68 && f.bbox[3] > 28 && f.bbox[1] < 72).map(f => {
  const polygons = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polygons.map(polygon => polygon.map(ring => ring.map((point, i) => `${i ? 'L' : 'M'}${project(point).map(n => n.toFixed(1)).join(',')}`).join('') + 'Z').join('')).join('');
  return { id: f.properties.ADM0_A3, d };
});
writeFileSync(new URL('../content/history-map-shapes.json', import.meta.url), JSON.stringify(countries));
