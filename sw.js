const V='faying-v3',OK=['cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'].map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url),same=u.origin===location.origin;
if(r.method!=='GET'||!(same||OK.includes(u.hostname)))return;
e.respondWith((same?fetch(r.url,{cache:'no-cache'}):fetch(r)).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
