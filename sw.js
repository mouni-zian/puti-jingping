const CACHE_NAME = 'puti-v2';
const urlsToCache = [
  '/puti-jingping/',
  '/puti-jingping/index.html',
  '/puti-jingping/manifesto.html',
  '/puti-jingping/notes.html',
  '/puti-jingping/style.css',
  '/puti-jingping/manifest.webmanifest',
  '/puti-jingping/icon.svg',
  '/puti-jingping/tools/mirror.html',
  '/puti-jingping/tools/score.html',
  '/puti-jingping/tools/intake.html',
  '/puti-jingping/tools/cocoon.html',
  '/puti-jingping/method/douyin-detox.html',
  '/puti-jingping/method/cognitive-discipline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});