// Define the cache name and the files to cache
var CACHE_NAME = 'ultimate-dotnet-cheatsheet-cache-v2';
var urlsToCache = [
  '/',
  '/index.html',
  '/010-basiccommands.html',
  '/020-project.html',
  '/030-powershell.html',
  '/035-csharpbasics.html',
  '/040-types.html',
  '/045-type-interfaces.html',
  '/060-strings.html',
  '/070-exceptions.html',
  '/080-collections.html',
  '/090-linq.html',
  '/100-paternmatch.html',
  '/110-io.html',
  '/111-attribs.html',
  '/112-serialization.html',
  '/114-validation.html',
  '/120-crypto.html',
  '/130-reflection.html',
  '/135-tasks.html',
  '/140-ui.html',
  '/150-nuget.html',
  '/bootstrap.bundle.min.js',
  '/bootstrap.min.css',
  '/prism.css',
  '/prism.js',
  '/script.js',
  '/serviceworker.js',
  '/style.css'
];

// Install the service worker and cache the assets
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches
self.addEventListener('activate', function (event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
