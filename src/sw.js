self.addEventListener('fetch', function (event) {
  event.respondWith(caches.open('cache').then(function (cache) {
    return cache.match(event.request).then(function (response) {
      console.log("cache request: " + event.request.url);
      var fetchPromise = fetch(event.request).then(function (networkResponse) {
        // if we got a response from the cache, update the cache
        console.log("fetch completed: " + event.request.url, networkResponse);
        if (networkResponse) {
          console.debug("updated cached page: " + event.request.url, networkResponse);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }, function (event) {
        // rejected promise - just ignore it, we're offline!
        console.log("Error in fetch()", event);
        event.waitUntil(
          caches.open('cache').then(function (cache) {
            return cache.addAll([
              '/index.html',
              '/index.html?homescreen=1',
              './img/logo.png',
              'https://fonts.googleapis.com/css?family=Roboto+Mono',
              'https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css',
              'https://code.jquery.com/jquery-3.3.1.slim.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
              'https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/js/bootstrap.min.js'
            ]);
          })
        );
      });
      // respond from the cache, or the network
      return response || fetchPromise;
    });
  }));
});

self.addEventListener('install', function (event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
  console.log("Latest version installed!");
});
