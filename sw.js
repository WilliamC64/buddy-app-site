/* Buddy App service worker.
 * Bump CACHE_VERSION whenever app-shell files change so clients pick up the new version. */
const CACHE_VERSION = 'v1';
const SHELL_CACHE = `buddy-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `buddy-runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/buddies.js',
  './js/origins.js',
  './js/scenarios.js',
  './js/subjects.js',
  './js/app.js',
  './manifest.webmanifest',
  './favicon.ico',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('buddy-') && k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Navigation: network-first, falling back to the cached index.html when offline.
async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put('./index.html', response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match('./index.html', { ignoreSearch: true });
    return cached || Response.error();
  }
}

// MP3 voices: cached on first use. Media elements send Range requests, which
// can't be cached as-is (206), so fetch the full file once and serve it from cache.
async function handleAudio(request) {
  const url = request.url.split('#')[0];
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(url, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const response = await fetch(url, { credentials: 'same-origin' });
    if (response && response.status === 200) cache.put(url, response.clone());
    return response;
  } catch (err) {
    return Response.error();
  }
}

// Other same-origin static assets: cache-first, then network (and cache the result).
async function handleStatic(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.status === 200 && response.type === 'basic') {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else if (/\.mp3$/i.test(url.pathname)) {
    event.respondWith(handleAudio(request));
  } else {
    event.respondWith(handleStatic(request));
  }
});
