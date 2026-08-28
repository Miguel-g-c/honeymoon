const CACHE = 'honeymoon-shell-v4';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './assets/css/styles.css', './assets/icons/icon.svg', './assets/js/app.js', './assets/js/data.js', './assets/js/maps.js', './assets/js/router.js', './assets/js/storage.js'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => { if (event.request.method === 'GET' && new URL(event.request.url).origin === location.origin) event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))); });
