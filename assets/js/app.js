import { APP_DATA, DAYS, STAYS } from './data.js';
import { mapLabel, mapUrl } from './maps.js';
import { dayHref, parseRoute, routeHref, tripDayForToday } from './router.js';

const shell = document.querySelector('.app-shell');
const nav = document.querySelector('.bottom-nav');
const formatDate = (date) => new Intl.DateTimeFormat('es-ES', { weekday:'long', day:'numeric', month:'long' }).format(new Date(`${date}T12:00:00`));
const escape = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const status = () => `<p class="online-status ${navigator.onLine ? '' : 'offline'}">${navigator.onLine ? 'Contenido guardado; los mapas y fuentes necesitan conexión.' : 'Sin conexión: itinerario disponible; mapas y fuentes necesitan conexión.'}</p>`;
const mapAction = location => `<a class="button-link button--light" data-online-link href="${mapUrl(location)}" target="_blank" rel="noreferrer">${mapLabel(location)}</a>`;
const sourceAction = source => source ? `<a class="source-link" data-online-link href="${source}" target="_blank" rel="noreferrer">Ver fuente ↗</a>` : '';
const stayFor = id => STAYS.find(stay => stay.id === id);

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

function route() {
  const groups = [['China', DAYS.filter(day => day.country === 'china')], ['Indonesia', DAYS.filter(day => day.country === 'indonesia')]];
  return `${status()}<h2 class="section-title">La ruta</h2><p class="muted route-intro">Toda la luna de miel, día a día. Toca una parada para abrir su guía.</p>${groups.map(([name, days]) => `<section class="route-group"><h3>${name}</h3>${days.map(day => { const stay = stayFor(day.stay); return `<a class="route-day" href="${dayHref(day.date)}"><time>${new Date(`${day.date}T12:00:00`).toLocaleDateString('es-ES',{day:'numeric',month:'short'})}</time><span><strong>${escape(day.city)}</strong><small>${escape(day.type)}${stay ? ` · ${escape(stay.name)}` : ''}</small></span><b aria-hidden="true">›</b></a>`; }).join('')}</section>`).join('')}`;
}

function dayTeaser(date) {
  const day = DAYS.find(item => item.date === date);
  if (!day) return home();
  return `${status()}<section class="card"><p class="eyebrow">${formatDate(day.date)}</p><h2 class="section-title">${escape(day.city)}</h2><p>La guía detallada se está cargando.</p><a class="button-link" href="#/ruta">Volver a la ruta</a></section>`;
}

function render() {
  const route = parseRoute();
  if (route.invalid) location.hash = routeHref('home');
  const active = route.invalid ? 'home' : route.name === 'day' ? '' : route.name;
  nav.querySelectorAll('a').forEach(link => link.toggleAttribute('aria-current', link.dataset.nav === active));
  shell.innerHTML = route.name === 'route' ? route() : route.name === 'day' ? dayTeaser(route.date) : home();
}

window.addEventListener('hashchange', render);
window.addEventListener('online', render);
window.addEventListener('offline', render);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
render();
void APP_DATA;
