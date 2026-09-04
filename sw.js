const CACHE_NAME = 'puti-v1';
const urlsToCache = [
  '/puti-jingping/',
  '/puti-jingping/index.html',
  '/puti-jingping/manifesto.html',
  '/puti-jingping/notes.html',
  '/puti-jingping/tools/mirror.html',
  '/puti-jingping/tools/score.html',
  '/puti-jingping/method/douyin-detox.html',
  '/puti-jingping/method/cognitive-discipline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});