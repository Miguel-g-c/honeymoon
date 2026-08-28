import { APP_DATA } from './data.js';

const shell = document.querySelector('.app-shell');
shell.innerHTML = `<p class="online-status">Itinerario disponible sin conexión tras la primera visita.</p><section class="card"><h2 class="section-title">Todo listo para el viaje</h2><p class="muted">El itinerario se está preparando.</p></section>`;

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
void APP_DATA;
