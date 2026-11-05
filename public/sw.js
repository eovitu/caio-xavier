const cacheName = 'saidareta-offline-v1';
const offlinePage = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.add(offlinePage)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith('saidareta-offline-') && key !== cacheName)
      .map((key) => caches.delete(key)),
  )));
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(fetch(event.request).catch(async () =>
    (await caches.match(offlinePage)) ?? Response.error(),
  ));
});
