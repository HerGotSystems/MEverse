/* MY CYCLE — static-shell-only offline cache. Never caches health entries or backup data. */
'use strict';
const CACHE='my-cycle-shell-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('my-cycle-shell-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;const url=new URL(req.url);if(!SHELL.some(p=>new URL(p,self.registration.scope).pathname===url.pathname))return;e.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();e.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)))}return response}).catch(()=>caches.match(req).then(cached=>cached||Response.error())))});
