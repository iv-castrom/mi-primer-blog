var staticCacheName = "my-cache-v" + new Date().getTime();
var filesToCache = [
    '/',
    'static/style.css',
    'static/css/btnpwa.css',
    'static/css/django-pwa-app.css',
    'static/js/btnpwa.js',
    'static/app.js',
    
];
// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("my-cache-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).then((result)=>{
            return caches.open(staticCacheName).then(function(c) {
                c.put(event.request.url, result.clone())
                return result;
            })
        }).catch(function(e){
            return caches.match(event.request)
        })
    )
});