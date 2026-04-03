self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("keuangan-keluarga").then(function(cache) {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
