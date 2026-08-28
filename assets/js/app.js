import { APP_DATA, DAYS, STAYS, RECOMMENDATIONS, KIT, SOURCES } from './data.js';
import { mapLabel, mapUrl } from './maps.js';
import { dayHref, parseRoute, routeHref, tripDayForToday } from './router.js';
import { storage } from './storage.js';

const shell = document.querySelector('.app-shell');
const nav = document.querySelector('.bottom-nav');
const formatDate = (date) => new Intl.DateTimeFormat('es-ES', { weekday:'long', day:'numeric', month:'long' }).format(new Date(`${date}T12:00:00`));
const escape = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const status = () => `<p class="online-status ${navigator.onLine ? '' : 'offline'}">${navigator.onLine ? 'Contenido guardado; los mapas y fuentes necesitan conexión.' : 'Sin conexión: itinerario disponible; mapas y fuentes necesitan conexión.'}</p>`;
const mapAction = location => `<a class="button-link button--light" data-online-link href="${mapUrl(location)}" target="_blank" rel="noreferrer">${mapLabel(location)}</a>`;
const sourceAction = source => source ? `<a class="source-link" data-online-link href="${source}" target="_blank" rel="noreferrer">Ver fuente ↗</a>` : '';
const stayFor = id => STAYS.find(stay => stay.id === id);
const locationName = location => location.local ? `${location.name} · ${location.local}` : location.name;
const copyButton = (text, label = 'Copiar nombre/dirección') => `<button class="copy-button" type="button" data-copy="${escape(text)}">${label}</button>`;
const recommendationStatus = status => ({ booked:'Reservado', suggested:'Sugerencia', 'must confirm':'Confirmar' }[status]);

function home() {
  const today = tripDayForToday();
  const first = DAYS[0].date;
  const last = DAYS.at(-1).date;
  const current = new Date();
  const start = new Date(`${first}T00:00:00`);
  const end = new Date(`${last}T23:59:59`);
  let headline = '';
  let action = '';
  if (today) {
    headline = `Hoy: ${today.city}`;
    action = `<a class="button-link" href="${dayHref(today.date)}">Abrir el día de hoy</a>`;
  } else if (current < start) {
    const remaining = Math.ceil((start - current) / 86400000);
    headline = `Faltan ${remaining} días`;
    action = `<a class="button-link" href="${dayHref(first)}">Ver la salida</a>`;
  } else if (current > end) {
    headline = 'Viaje completado';
    action = `<a class="button-link" href="#/ruta">Recordar la ruta</a>`;
  }
  const preview = (today || DAYS[0]).events.slice(0, 3).map(item => `<li><strong>${escape(item.time)}</strong><span>${escape(item.action)}</span></li>`).join('');
  return `${status()}<section class="card hero-card"><p class="eyebrow">${today ? 'En ruta' : 'China → Indonesia'}</p><h2>${headline}</h2><p>${today ? `Es ${formatDate(today.date)}. Aquí tienes las próximas paradas.` : `22 días de ciudades, montañas, arrozales y mar.`}</p>${action}</section><section><h2 class="section-title">Próximamente</h2><ol class="quick-list">${preview}</ol></section><section class="card"><h2 class="card-title">Tu compañero, incluso sin red</h2><p class="muted">Guarda la app. Las notas, favoritos y checklist se quedan solo en este navegador.</p><a class="button-link button--light" href="#/kit">Abrir Kit de viaje</a></section>`;
}

function routeView() {
  const groups = [['China', DAYS.filter(day => day.country === 'china')], ['Indonesia', DAYS.filter(day => day.country === 'indonesia')]];
  return `${status()}<h2 class="section-title">La ruta</h2><p class="muted route-intro">Toda la luna de miel, día a día. Toca una parada para abrir su guía.</p>${groups.map(([name, days]) => `<section class="route-group"><h3>${name}</h3>${days.map(day => { const stay = stayFor(day.stay); return `<a class="route-day" href="${dayHref(day.date)}"><time>${new Date(`${day.date}T12:00:00`).toLocaleDateString('es-ES',{day:'numeric',month:'short'})}</time><span><strong>${escape(day.city)}</strong><small>${escape(day.type)}${stay ? ` · ${escape(stay.name)}` : ''}</small></span><b aria-hidden="true">›</b></a>`; }).join('')}</section>`).join('')}`;
}

function locationCard(location, label = 'Lugar') {
  return `<article class="location-card"><span class="location-label">${label}</span><h4>${escape(location.name)}</h4>${location.local ? `<p class="local-name">${escape(location.local)}</p>` : ''}<p>${escape(location.address)}</p><div class="card-actions">${mapAction(location)}${copyButton(`${location.local || location.name}\n${location.address}`)}</div></article>`;
}

function dayView(date) {
  const day = DAYS.find(item => item.date === date);
  if (!day) return home();
  const index = DAYS.indexOf(day);
  const stay = stayFor(day.stay);
  const recs = RECOMMENDATIONS.filter(rec => rec.day === day.date);
  const favourite = storage.favourites().includes(day.date);
  const specialSource = day.date === '2026-09-01' ? SOURCES[0] : day.date === '2026-09-02' ? SOURCES[1] : null;
  return `${status()}<div class="day-head"><div><p class="eyebrow">${formatDate(day.date)} · ${escape(day.type)}</p><h2>${escape(day.city)}</h2></div><button class="favourite ${favourite ? 'is-favourite' : ''}" type="button" data-favourite="${day.date}" aria-pressed="${favourite}" aria-label="${favourite ? 'Quitar de favoritos' : 'Guardar en favoritos'}">♥</button></div>${day.warning ? `<p class="warning"><strong>Must confirm.</strong> ${escape(day.warning)}</p>` : ''}<section class="day-grid"><div><h3 class="section-title">Plan del día</h3><ol class="timeline">${day.events.map(item => `<li><time>${escape(item.time)}</time><span class="timeline-icon" aria-hidden="true">${escape(item.icon)}</span><div><strong>${escape(item.action)}</strong><p>${escape(locationName(item.location))}</p>${item.note ? `<small>${escape(item.note)}</small>` : ''}${item.status ? `<span class="tag tag--${item.status}">${item.status === 'booked' ? 'Reservado' : 'Confirmar'}</span>` : ''}<div class="event-actions">${mapAction(item.location)}${copyButton(`${item.location.local || item.location.name}\n${item.location.address}`, 'Copiar')}</div></div></li>`).join('')}</ol>${specialSource ? `<p class="source-row">${sourceAction(specialSource.url)}</p>` : ''}</div><aside>${stay ? `<h3 class="section-title">Alojamiento</h3>${locationCard(stay.location, `Estancia · ${stay.dates}`)}` : ''}${recs.length ? `<h3 class="section-title">Comer y descubrir</h3>${recs.map(rec => `<article class="recommendation"><div><span class="tag">${rec.price}</span><span class="tag tag--${rec.status === 'must confirm' ? 'confirm' : rec.status}">${recommendationStatus(rec.status)}</span><h4>${escape(rec.name)}</h4><p class="local-name">${escape(rec.local)}</p></div><p>${escape(rec.why)}</p><p><strong>${escape(rec.signature)}</strong>${rec.note ? ` · ${escape(rec.note)}` : ''}</p><div class="card-actions">${mapAction(rec.location)}${sourceAction(rec.source)}</div></article>`).join('')}` : ''}</aside></section><nav class="day-switch" aria-label="Cambiar de día">${index ? `<a class="button-link button--light" href="${dayHref(DAYS[index - 1].date)}">← Anterior</a>` : '<span></span>'}<a class="button-link button--light" href="#/ruta">Ruta</a>${index < DAYS.length - 1 ? `<a class="button-link button--light" href="${dayHref(DAYS[index + 1].date)}">Siguiente →</a>` : '<span></span>'}</nav>`;
}

function kit() {
  const checks = storage.checklist();
  const favs = storage.favourites();
  const trainStations = KIT.trainRoutes.map(route => `<div class="train-route"><strong>${escape(route.label)}</strong>${route.stations.map(([english, chinese]) => `<div class="station-copy"><span>${escape(english)}<small>${escape(chinese)}</small></span>${copyButton(`${english}\n${chinese}`, 'Copiar estación')}</div>`).join('')}</div>`).join('');
  return `${status()}<h2 class="section-title">Kit de viaje</h2><section class="card"><h3 class="card-title">Antes de salir</h3><div class="checklist">${KIT.checklist.map((item, index) => `<label><input type="checkbox" data-check="${index}" ${checks[index] ? 'checked' : ''}><span>${escape(item)}</span></label>`).join('')}</div></section><section class="card"><h3 class="card-title">China: transporte y comida</h3>${KIT.tips.map(tip => `<p class="tip">${escape(tip)}</p>`).join('')}<h4 class="kit-subtitle">Estaciones listas para copiar</h4>${trainStations}</section><section class="card"><h3 class="card-title">Frases para copiar</h3>${KIT.phrases.map(([chinese, spanish]) => `<div class="phrase"><div><strong>${escape(chinese)}</strong><span>${escape(spanish)}</span></div>${copyButton(chinese, 'Copiar')}</div>`).join('')}</section><section class="card"><h3 class="card-title">Emergencias</h3>${KIT.emergency.map(item => `<p class="tip">${escape(item)}</p>`).join('')}<p class="currency">${escape(KIT.currency)}</p></section><section class="card"><h3 class="card-title">Notas privadas</h3><p class="muted">Solo se guardan en este navegador. No incluyas datos sensibles en la app pública.</p><textarea id="private-notes" rows="6" placeholder="Contactos, recordatorios, lo que necesitéis…">${escape(storage.notes())}</textarea><div class="card-actions"><button type="button" class="button" data-save-notes>Guardar notas</button><button type="button" class="button button--light" data-reset>Restablecer datos locales</button></div></section><section class="card"><h3 class="card-title">Favoritos guardados</h3><p class="muted">${favs.length ? favs.map(date => DAYS.find(day => day.date === date)?.city).filter(Boolean).join(' · ') : 'Aún no hay días guardados.'}</p></section>`;
}

function render() {
  const currentRoute = parseRoute();
  if (currentRoute.invalid) location.hash = routeHref('home');
  const actualDay = tripDayForToday();
  if (currentRoute.name === 'home' && actualDay) { location.hash = dayHref(actualDay.date); return; }
  const active = currentRoute.invalid ? 'home' : currentRoute.name === 'day' ? '' : currentRoute.name;
  nav.querySelectorAll('a').forEach(link => link.toggleAttribute('aria-current', link.dataset.nav === active));
  shell.innerHTML = currentRoute.name === 'route' ? routeView() : currentRoute.name === 'kit' ? kit() : currentRoute.name === 'day' ? dayView(currentRoute.date) : home();
}

shell.addEventListener('click', async event => {
  const copy = event.target.closest('[data-copy]');
  if (copy) { try { await navigator.clipboard.writeText(copy.dataset.copy); copy.textContent = 'Copiado'; setTimeout(() => { copy.textContent = copy.dataset.copy.includes('\n') ? 'Copiar nombre/dirección' : 'Copiar'; }, 1500); } catch { window.prompt('Copia este texto:', copy.dataset.copy); } return; }
  const favourite = event.target.closest('[data-favourite]');
  if (favourite) { storage.toggleFavourite(favourite.dataset.favourite); render(); return; }
  if (event.target.closest('[data-save-notes]')) { storage.saveNotes(document.querySelector('#private-notes').value); event.target.textContent = 'Guardadas'; return; }
  if (event.target.closest('[data-reset]') && window.confirm('¿Borrar checklist, favoritos y notas de este navegador?')) { storage.reset(); render(); }
});
shell.addEventListener('change', event => { if (event.target.matches('[data-check]')) storage.toggleChecklist(event.target.dataset.check); });

window.addEventListener('hashchange', render);
window.addEventListener('online', render);
window.addEventListener('offline', render);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
render();
void APP_DATA;
