const CACHE_NAME = "daily-uplift-v1";
const assetsToCache = [
    "/Daily-Uplift/",

    "/Daily-Uplift/index.html",

    "/Daily-Uplift/css/index.css",

    "/Daily-Uplift/js/index.js",
    "/Daily-Uplift/js/affirmations.js",

    "/Daily-Uplift/images/spash.png",
    "/Daily-Uplift/images/android-chrome-192x192.png",
    "/Daily-Uplift/images/android-chrome-512x512.png",
    "/Daily-Uplift/images/apple-touch-icon.png",
    "/Daily-Uplift/images/favicon-16x16.png",
    "/Daily-Uplift/images/favicon-32x32.png",

    "/Daily-Uplift/images/icon.png",
    "/Daily-Uplift/images/icon-512.png",

    "/Daily-Uplift/manifest.json",
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