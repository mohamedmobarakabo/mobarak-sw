const CACHE_NAME='mobarak-v5';
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function(c){
    return c.addAll(['/']);
  }));
});
self.addEventListener('activate',function(e){
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(function(cached){
      var net=fetch(e.request).then(function(r){
        if(r&&r.status===200){var c=r.clone();caches.open(CACHE_NAME).then(function(ca){ca.put(e.request,c);});}
        return r;
      }).catch(function(){return cached||new Response('',{status:503});});
      return cached||net;
    })
  );
});
