console.log('Service Worker: Registered');

const CACHE_NAME = 'cache1';
const urlsToCache = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/css/responsive.css',
	'/data/restaurants.json',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg'
]

self.addEventListener('install', (event) => {
	// install
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then((cache) => {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
})


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('Found in cache')
          return response;
        }

        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
              	console.log('cache the new response')
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});
