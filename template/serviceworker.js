"use strict";

const CACHE = "dotnet-cheatsheet-v3";
const CORE = [
    "./static/JetBrainsMono-Light.ttf",
    "./static/JetBrainsMono-Light.woff2",
    "./static/normalize.css",
    "./static/open-sans-cyrillic-ext-300-normal.ttf",
    "./static/open-sans-cyrillic-ext-300-normal.woff2",
    "./static/print.css",
    "./static/script.js",
    "./static/style.css",
    "./site.webmanifest",
    "./index.html",
    "./010-basiccommands.html",
    "./020-project.html",
    "./030-powershell.html",
    "./035-csharpbasics.html",
    "./040-types.html",
    "./045-type-interfaces.html",
    "./060-strings.html",
    "./070-exceptions.html",
    "./075-generics.html",
    "./080-collections.html",
    "./090-linq.html",
    "./095-regex.html",
    "./100-paternmatch.html",
    "./105-tasks.html",
    "./110-io.html",
    "./111-attribs.html",
    "./112-serialization.html",
    "./114-validation.html",
    "./120-crypto.html",
    "./130-reflection.html",
    "./140-ui.html",
    "./150-nuget.html",
    "./155-shortcuts.html",
    "./160-csharp-versions.html",
    "./changelog.html"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then((cached) =>
            cached ||
            fetch(event.request).then((res) => {
                const copy = res.clone();
                caches.open(CACHE).then((c) => c.put(event.request, copy));
                return res;
            }).catch(() => cached)
        )
    );
});

