import { APP_DATA, DAYS, STAYS, RECOMMENDATIONS, KIT, SOURCES } from './data.js';
import { mapFallbackUrl, mapLabel, mapUrl } from './maps.js';
import { dayHref, parseRoute, routeHref, tripDayForToday } from './router.js';
import { storage } from './storage.js';

const shell = document.querySelector('.app-shell');
const nav = document.querySelector('.bottom-nav');
const formatDate = date => new Intl.DateTimeFormat('es-ES', { weekday:'long', day:'numeric', month:'long' }).format(new Date(`${date}T12:00:00`));
const escape = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const stayFor = id => STAYS.find(stay => stay.id === id);
const locationName = location => location.local ? `${location.name} · ${location.local}` : location.name;
const recommendationStatus = status => ({ booked:'Reservado', suggested:'Sugerencia', 'must confirm':'Confirmar' }[status]);

function renderStatus() {
  const text = navigator.onLine
    ? 'Contenido guardado; los mapas y fuentes necesitan conexión.'
    : 'Sin conexión: itinerario disponible; mapas y fuentes necesitan conexión.';
  return `<p class="online-status ${navigator.onLine ? '' : 'offline'}">${text}</p>`;
}

function renderMapAction(location) {
  const primary = mapUrl(location);
  const fallback = mapFallbackUrl(location);
  const isWebLink = primary.startsWith('http');
  const webAttributes = isWebLink ? ' target="_blank" rel="noreferrer"' : '';
  const fallbackAction = fallback && fallback !== primary
    ? `<a class="source-link" data-online-link href="${fallback}" target="_blank" rel="noreferrer">AMap web</a>`
    : '';
  return `<a class="button-link button--light" data-online-link href="${primary}"${webAttributes}>${mapLabel(location)}</a>${fallbackAction}`;
}

function renderSourceAction(source) {
  return source ? `<a class="source-link" data-online-link href="${source}" target="_blank" rel="noreferrer">Ver fuente ↗</a>` : '';
}

function renderCopyButton(text, label = 'Copiar nombre/dirección') {
  return `<button class="copy-button" type="button" data-copy="${escape(text)}">${label}</button>`;
}

function renderLocationActions(location, copyLabel) {
  const copyText = `${location.local || location.name}\n${location.address}`;
  return `<div class="card-actions">${renderMapAction(location)}${renderCopyButton(copyText, copyLabel)}</div>`;
}

function renderLocationCard(location, label = 'Lugar') {
  return `<article class="location-card">
    <span class="location-label">${escape(label)}</span>
    <h4>${escape(location.name)}</h4>
    ${location.local ? `<p class="local-name">${escape(location.local)}</p>` : ''}
    <p>${escape(location.address)}</p>
    ${renderLocationActions(location)}
  </article>`;
}

function renderTimelineEvent(item) {
  const statusLabel = item.status === 'booked' ? 'Reservado' : 'Confirmar';
  return `<li>
    <time>${escape(item.time)}</time>
    <span class="timeline-icon" aria-hidden="true">${escape(item.icon)}</span>
    <div>
      <strong>${escape(item.action)}</strong>
      <p>${escape(locationName(item.location))}</p>
      ${item.note ? `<small>${escape(item.note)}</small>` : ''}
      ${item.status ? `<span class="tag tag--${item.status}">${statusLabel}</span>` : ''}
      <div class="event-actions">${renderMapAction(item.location)}${renderCopyButton(`${item.location.local || item.location.name}\n${item.location.address}`, 'Copiar')}</div>
    </div>
  </li>`;
}

function renderTimeline(events, source) {
  return `<h3 class="section-title">Plan del día</h3>
    <ol class="timeline">${events.map(renderTimelineEvent).join('')}</ol>
    ${source ? `<p class="source-row">${renderSourceAction(source.url)}</p>` : ''}`;
}

function renderRecommendation(rec) {
  const statusClass = rec.status === 'must confirm' ? 'confirm' : rec.status;
  return `<article class="recommendation">
    <div>
      <span class="tag">${escape(rec.price)}</span>
      <span class="tag tag--${statusClass}">${recommendationStatus(rec.status)}</span>
      <h4>${escape(rec.name)}</h4>
      <p class="local-name">${escape(rec.local)}</p>
    </div>
    <p>${escape(rec.why)}</p>
    <p><strong>${escape(rec.signature)}</strong>${rec.note ? ` · ${escape(rec.note)}` : ''}</p>
    <div class="card-actions">${renderMapAction(rec.location)}${renderSourceAction(rec.source)}</div>
  </article>`;
}

function renderStay(stay) {
  return stay ? `<h3 class="section-title">Alojamiento</h3>${renderLocationCard(stay.location, `Estancia · ${stay.dates}`)}` : '';
}

function renderRecommendations(recs) {
  return recs.length ? `<h3 class="section-title">Comer y descubrir</h3>${recs.map(renderRecommendation).join('')}` : '';
}

function renderDayHeader(day, favourite) {
  const label = favourite ? 'Quitar de favoritos' : 'Guardar en favoritos';
  return `<div class="day-head">
    <div>
      <p class="eyebrow">${formatDate(day.date)} · ${escape(day.type)}</p>
      <h2>${escape(day.city)}</h2>
    </div>
    <button class="favourite ${favourite ? 'is-favourite' : ''}" type="button" data-favourite="${day.date}" aria-pressed="${favourite}" aria-label="${label}">♥</button>
  </div>`;
}

function renderDaySwitch(index) {
  const previous = index ? `<a class="button-link button--light" href="${dayHref(DAYS[index - 1].date)}">← Anterior</a>` : '<span></span>';
  const next = index < DAYS.length - 1 ? `<a class="button-link button--light" href="${dayHref(DAYS[index + 1].date)}">Siguiente →</a>` : '<span></span>';
  return `<nav class="day-switch" aria-label="Cambiar de día">${previous}<a class="button-link button--light" href="#/ruta">Ruta</a>${next}</nav>`;
}

function renderDayGuide(day, { stay, recommendations, favourite, source, index }) {
  return `${renderStatus()}
    ${renderDayHeader(day, favourite)}
    ${day.warning ? `<p class="warning"><strong>Must confirm.</strong> ${escape(day.warning)}</p>` : ''}
    <section class="day-grid">
      <div>${renderTimeline(day.events, source)}</div>
      <aside>${renderStay(stay)}${renderRecommendations(recommendations)}</aside>
    </section>
    ${renderDaySwitch(index)}`;
}

function renderChecklist(items, checks) {
  return items.map((item, index) => `<label><input type="checkbox" data-check="${index}" ${checks[index] ? 'checked' : ''}><span>${escape(item)}</span></label>`).join('');
}

function renderTrainRoutes(routes) {
  return routes.map(route => `<div class="train-route">
    <strong>${escape(route.label)}</strong>
    ${route.stations.map(([english, chinese]) => `<div class="station-copy"><span>${escape(english)}<small>${escape(chinese)}</small></span>${renderCopyButton(`${english}\n${chinese}`, 'Copiar estación')}</div>`).join('')}
  </div>`).join('');
}

function renderPhrases(phrases) {
  return phrases.map(([chinese, spanish]) => `<div class="phrase">
    <div><strong>${escape(chinese)}</strong><span>${escape(spanish)}</span></div>
    ${renderCopyButton(chinese, 'Copiar')}
  </div>`).join('');
}

function renderKit(checks, favourites, notes) {
  const favouriteCities = favourites.map(date => DAYS.find(day => day.date === date)?.city).filter(Boolean);
  return `${renderStatus()}
    <h2 class="section-title">Kit de viaje</h2>
    <section class="card"><h3 class="card-title">Antes de salir</h3><div class="checklist">${renderChecklist(KIT.checklist, checks)}</div></section>
    <section class="card">
      <h3 class="card-title">China: transporte y comida</h3>
      ${KIT.tips.map(tip => `<p class="tip">${escape(tip)}</p>`).join('')}
      <h4 class="kit-subtitle">Estaciones listas para copiar</h4>
      ${renderTrainRoutes(KIT.trainRoutes)}
    </section>
    <section class="card"><h3 class="card-title">Frases para copiar</h3>${renderPhrases(KIT.phrases)}</section>
    <section class="card"><h3 class="card-title">Emergencias</h3>${KIT.emergency.map(item => `<p class="tip">${escape(item)}</p>`).join('')}<p class="currency">${escape(KIT.currency)}</p></section>
    <section class="card">
      <h3 class="card-title">Notas privadas</h3>
      <p class="muted">Solo se guardan en este navegador. No incluyas datos sensibles en la app pública.</p>
      <textarea id="private-notes" rows="6" placeholder="Contactos, recordatorios, lo que necesitéis…">${escape(notes)}</textarea>
      <div class="card-actions"><button type="button" class="button" data-save-notes>Guardar notas</button><button type="button" class="button button--light" data-reset>Restablecer datos locales</button></div>
    </section>
    <section class="card"><h3 class="card-title">Favoritos guardados</h3><p class="muted">${favouriteCities.length ? favouriteCities.join(' · ') : 'Aún no hay días guardados.'}</p></section>`;
}

function home() {
  const today = tripDayForToday();
  const first = DAYS[0].date;
  const last = DAYS.at(-1).date;
  const current = new Date();
  const start = new Date(`${first}T00:00:00`);
  const end = new Date(`${last}T23:59:59`);
  const headline = today ? `Hoy: ${today.city}` : current < start ? `Faltan ${Math.ceil((start - current) / 86400000)} días` : 'Viaje completado';
  const action = today
    ? `<a class="button-link" href="${dayHref(today.date)}">Abrir el día de hoy</a>`
    : current < start ? `<a class="button-link" href="${dayHref(first)}">Ver la salida</a>` : '<a class="button-link" href="#/ruta">Recordar la ruta</a>';
  const preview = (today || DAYS[0]).events.slice(0, 3).map(item => `<li><strong>${escape(item.time)}</strong><span>${escape(item.action)}</span></li>`).join('');
  return `${renderStatus()}<section class="card hero-card"><p class="eyebrow">${today ? 'En ruta' : 'China → Indonesia'}</p><h2>${headline}</h2><p>${today ? `Es ${formatDate(today.date)}. Aquí tienes las próximas paradas.` : '22 días de ciudades, montañas, arrozales y mar.'}</p>${action}</section><section><h2 class="section-title">Próximamente</h2><ol class="quick-list">${preview}</ol></section><section class="card"><h2 class="card-title">Tu compañero, incluso sin red</h2><p class="muted">Guarda la app. Las notas, favoritos y checklist se quedan solo en este navegador.</p><a class="button-link button--light" href="#/kit">Abrir Kit de viaje</a></section>`;
}

function routeView() {
  const groups = [['China', DAYS.filter(day => day.country === 'china')], ['Indonesia', DAYS.filter(day => day.country === 'indonesia')]];
  const routeGroups = groups.map(([name, days]) => `<section class="route-group"><h3>${name}</h3>${days.map(day => {
    const stay = stayFor(day.stay);
    const detail = `${escape(day.type)}${stay ? ` · ${escape(stay.location.name)}` : ''}`;
    const date = new Date(`${day.date}T12:00:00`).toLocaleDateString('es-ES', { day:'numeric', month:'short' });
    return `<a class="route-day" href="${dayHref(day.date)}"><time>${date}</time><span><strong>${escape(day.city)}</strong><small>${detail}</small></span><b aria-hidden="true">›</b></a>`;
  }).join('')}</section>`).join('');
  return `${renderStatus()}<h2 class="section-title">La ruta</h2><p class="muted route-intro">Toda la luna de miel, día a día. Toca una parada para abrir su guía.</p>${routeGroups}`;
}

function dayView(date) {
  const day = DAYS.find(item => item.date === date);
  if (!day) return home();
  const source = day.date === '2026-09-01' ? SOURCES[0] : day.date === '2026-09-02' ? SOURCES[1] : null;
  return renderDayGuide(day, {
    stay: stayFor(day.stay),
    recommendations: RECOMMENDATIONS.filter(rec => rec.day === day.date),
    favourite: storage.favourites().includes(day.date),
    source,
    index: DAYS.indexOf(day),
  });
}

function kit() { return renderKit(storage.checklist(), storage.favourites(), storage.notes()); }

function render() {
  const currentRoute = parseRoute();
  if (currentRoute.invalid) location.hash = routeHref('home');
  const actualDay = tripDayForToday();
  if (currentRoute.name === 'home' && actualDay) { location.hash = dayHref(actualDay.date); return; }
  const active = currentRoute.invalid ? 'home' : currentRoute.name === 'day' ? '' : currentRoute.name;
  nav.querySelectorAll('a').forEach(link => {
    if (link.dataset.nav === active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  shell.innerHTML = currentRoute.name === 'route' ? routeView() : currentRoute.name === 'kit' ? kit() : currentRoute.name === 'day' ? dayView(currentRoute.date) : home();
}

shell.addEventListener('click', async event => {
  const copy = event.target.closest('[data-copy]');
  if (copy) {
    try { await navigator.clipboard.writeText(copy.dataset.copy); copy.textContent = 'Copiado'; setTimeout(() => { copy.textContent = copy.dataset.copy.includes('\n') ? 'Copiar nombre/dirección' : 'Copiar'; }, 1500); } catch { window.prompt('Copia este texto:', copy.dataset.copy); }
    return;
  }
  const favourite = event.target.closest('[data-favourite]');
  if (favourite) { storage.toggleFavourite(favourite.dataset.favourite); render(); return; }
  if (event.target.closest('[data-save-notes]')) { storage.saveNotes(document.querySelector('#private-notes').value); event.target.textContent = 'Guardadas'; return; }
  if (event.target.closest('[data-reset]') && window.confirm('¿Borrar checklist, favoritos y notas de este navegador?')) { storage.reset(); render(); }
});

shell.addEventListener('change', event => { if (event.target.matches('[data-check]')) storage.toggleChecklist(event.target.dataset.check); });
window.addEventListener('hashchange', render);
window.addEventListener('online', render);
window.addEventListener('offline', render);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js', { updateViaCache:'none' }));
render();
void APP_DATA;
