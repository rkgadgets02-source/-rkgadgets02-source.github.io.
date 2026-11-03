// Offline helper. Keeps a copy of PackCheck on the phone so it opens with no internet.
// Raise the version number below every time you upload new app files.
// The new version installs and takes over straight away, and the app shows
// "New version available — tap to update" so the screen reloads with it.
const CACHE = 'packcheck-v5';
const FILES = [
  'index.html',
  'privacy.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'vendor/html5-qrcode.min.js',
  'vendor/tesseract.min.js',
  'vendor/worker.min.js',
  'vendor/tesseract-core-lstm.wasm.js',
  'vendor/tesseract-core-simd-lstm.wasm.js',
  'vendor/eng.traineddata.gz',
  'vendor/xlsx.full.min.js'
];
const OFFLINE_PAGE = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
  '<title>PackCheck</title><body style="font:18px system-ui,sans-serif;padding:24px;background:#f1f5f9;color:#10222f">' +
  '<h1 style="font-size:22px">PackCheck needs internet once</h1><p>Connect to the internet and open the app again. After that it works offline.</p></body>';

// Files are fetched fresh (not from the browser's HTTP cache) so a new version is complete.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

// Lets the app ask a waiting version to take over (kept for versions that are already waiting).
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(req.mode === 'navigate' ? openPage(e) : openFile(e));
});

// Every page opens from the saved copy, so the app never fails to start offline.
// Unknown addresses inside the app open the app itself.
async function openPage(e) {
  const cache = await caches.open(CACHE);
  const path = new URL(e.request.url).pathname;
  const name = path.split('/').pop();
  const key = FILES.includes(name) && name.endsWith('.html') ? name : 'index.html';
  const hit = await cache.match(key);
  if (hit) {
    e.waitUntil(refreshPage(cache, key, hit.clone(), e.resultingClientId));
    return hit;
  }
  try {
    const res = await fetch(e.request);
    if (res.ok) cache.put(key, res.clone());
    return res;
  } catch (err) {
    return new Response(OFFLINE_PAGE, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  }
}

// Checks online for a newer page. If index.html changed, the app is told so it can offer an update.
async function refreshPage(cache, key, saved, pageId) {
  try {
    const res = await fetch(key, { cache: 'no-cache' });
    if (!res.ok) return;
    const [fresh, old] = await Promise.all([res.clone().text(), saved.text()]);
    if (fresh === old) return;
    await cache.put(key, res);
    if (key !== 'index.html') return;
    for (const client of await self.clients.matchAll({ type: 'window' })) client.postMessage({ type: 'page-updated' });
    // The page that is opening may not exist yet when the check finishes, so wait for it (up to 10 seconds).
    for (let i = 0; pageId && i < 20; i++) {
      const page = await self.clients.get(pageId);
      if (page) return page.postMessage({ type: 'page-updated' });
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (err) {}
}

// Saved files are used first. A file that is not saved is fetched; if that fails offline,
// the app gets an empty "unavailable" answer instead of an error page.
async function openFile(e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(e.request, { ignoreSearch: true });
  if (hit) return hit;
  try {
    return await fetch(e.request);
  } catch (err) {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}
