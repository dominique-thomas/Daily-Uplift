const CACHE_NAME = "daily-uplift-v1";
const assetsToCache = [
    "/Daily-Uplift",
    "/Daily-Uplift/css/index.css",
    "/Daily-Uplift/js/index.js",
    "/Daily-Uplift/images/icon.png",
    "/Daily-Uplift/images/icon-512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});