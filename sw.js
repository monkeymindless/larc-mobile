"use strict";
const BO = "larc-field-1.2.4", TEP = ["./", "icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "manifest.webmanifest"];
self.addEventListener("install", e => { e.waitUntil(caches.open(BO).then(c => c.addAll(TEP.map(u => new Request(u, {cache: "reload"})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ds => Promise.all(ds.filter(k => k.startsWith("larc-field-") && k !== BO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).catch(() =>
    e.request.mode === "navigate" ? caches.match("./index.html") : Response.error()))); });
