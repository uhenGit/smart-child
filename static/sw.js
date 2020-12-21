const version = "v_1";
const cachedFiles = [
    './static/script/index.js',
    './static/script/math.js',

];

self.addEventListener('install', (e) => {
    console.log('sw installed');
    e.waitUntil(caches.open(version).then(cache => {return cache.addAll(cachedFiles)}));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys()
    .then(keyList => {
        return Promise.all(keyList.map(key => {
            if (key !== version) {
                return caches.delete(key);
            }
        }));
    })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  });