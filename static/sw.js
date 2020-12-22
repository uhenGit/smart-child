const version = "v_1";
const cachedFiles = [
    './static/script/index.js',
    './static/script/math.js',
    './static/script/bootstrap.min.js',
    './static/script/jquery-3.5.1.slim.min.js',
    './static/script/popper.min.js',
    './static/script/similar.js',
    './static/script/translate.js',

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