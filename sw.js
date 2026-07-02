/* 天问 · AskTheOracle — Service Worker
   Copyright (C) 2026 天问 (AskTheOracle)
   Licensed under GNU AGPL v3.0 */

var CACHE_NAME = 'tiwen-v1';

var PRECACHE_URLS = [
  '.',
  'index.html',
  'css/style.css',
  'js/gua-data.js',
  'js/stroke-data.js',
  'js/animation.js',
  'js/app.js',
  'manifest.json',
  'icon.svg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (name) {
          return name !== CACHE_NAME;
        }).map(function (name) {
          return caches.delete(name);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
