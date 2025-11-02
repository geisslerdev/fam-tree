const CACHE_VERSION = "planner-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-256.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png",
];

// Install: cache shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// Fetch: cache-first for static assets, network-first for others
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Always try network for navigation (enable offline page if needed)
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("/index.html")));
    return;
  }

  // For same-origin static assets use cache-first
  if (STATIC_ASSETS.includes(url.pathname) || url.origin === location.origin) {
    event.respondWith(
      caches
        .match(req)
        .then(
          (cached) =>
            cached ||
            fetch(req).then((resp) => {
              return caches.open(CACHE_VERSION).then((cache) => {
                cache.put(req, resp.clone());
                return resp;
              });
            })
        )
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  // default network-first
  event.respondWith(
    fetch(req)
      .then((resp) => {
        return caches.open(CACHE_VERSION).then((cache) => {
          cache.put(req, resp.clone());
          return resp;
        });
      })
      .catch(() => caches.match(req))
  );
});
