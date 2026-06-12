const CACHE_NAME = 'las-tortuguitas-ninja-v4';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './informe-anual-app.js',
  './manifest.webmanifest',
  './pages/mapa-calor.html',
  './assets/images/turtle-circle-logo.png',
  './assets/icons/turtle-circle-logo-192.png',
  './assets/icons/turtle-circle-logo-512.png',
  './assets/data/zonales-data.js',
  './assets/data/vacantes-resumen.csv',
  './assets/data/vacantes-resumen-data.js',
  './assets/data/README-vacantes.md'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
