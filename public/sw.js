// sw.js - Enterprise Pharmaceutical Intelligence Platform Service Worker
// Advanced PWA capabilities with caching, offline support, and background sync

const CACHE_NAME = 'enterprise-pharma-intelligence-v2.0.0';
const DYNAMIC_CACHE = 'enterprise-pharma-dynamic-v2.0.0';
const API_CACHE = 'enterprise-pharma-api-v2.0.0';

// Cache configuration
const CACHE_CONFIG = {
  staticCacheTTL: 7 * 24 * 60 * 60 * 1000, // 7 days
  apiCacheTTL: 60 * 60 * 1000, // 1 hour
  imageCacheTTL: 30 * 24 * 60 * 60 * 1000, // 30 days
  maxEntries: {
    static: 100,
    dynamic: 50,
    api: 200,
    images: 50
  }
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/src/index.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html' // Fallback page for offline mode
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/health',
  '/api/status',
  '/api/proxy'
];

// Route patterns for different caching strategies
const ROUTE_PATTERNS = {
  // Cache-first for static assets
  cacheFirst: [
    /\/icons\//,
    /\/images\//,
    /\/assets\//,
    /\.(?:js|css|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot|ico)$/
  ],
  
  // Network-first for API calls
  networkFirst: [
    /\/api\//,
    /clinicaltrials\.gov/,
    /api\.fda\.gov/,
    /pubchem\.ncbi\.nlm\.nih\.gov/,
    /www\.ebi\.ac\.uk\/chembl/,
    /rest\.uniprot\.org/,
    /api\.platform\.opentargets\.org/
  ],
  
  // Stale-while-revalidate for dynamic content
  staleWhileRevalidate: [
    /\/$/,
    /\/search/,
    /\/dashboard/,
    /\/results/
  ]
};

// ==============================
// SERVICE WORKER INSTALLATION
// ==============================

self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    (async () => {
      try {
        // Create initial cache
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(STATIC_ASSETS);
        
        // Force activation of new service worker
        await self.skipWaiting();
        
        console.log('✅ Service Worker: Installation complete');
      } catch (error) {
        console.error('❌ Service Worker: Installation failed', error);
      }
    })()
  );
});

// ==============================
// SERVICE WORKER ACTIVATION
// ==============================

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(cacheName => 
            cacheName.startsWith('enterprise-pharma-') && 
            cacheName !== CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== API_CACHE
          )
          .map(cacheName => caches.delete(cacheName));
        
        await Promise.all(deletePromises);
        
        // Take control of all clients
        await self.clients.claim();
        
        console.log('✅ Service Worker: Activation complete');
        
        // Notify clients of activation
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_ACTIVATED',
            version: '2.0.0'
          });
        });
        
      } catch (error) {
        console.error('❌ Service Worker: Activation failed', error);
      }
    })()
  );
});

// ==============================
// FETCH EVENT HANDLER
// ==============================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and Chrome extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isDynamicContent(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// ==============================
// CACHING STRATEGIES
// ==============================

// Cache-first strategy for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`📦 Cache hit: ${request.url}`);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return new Response('Network error', { status: 408 });
  }
}

// Network-first strategy for API calls
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful API responses
      if (isAPIRequest(request.url)) {
        const cache = await caches.open(API_CACHE);
        await cache.put(request, networkResponse.clone());
        
        // Clean up old cache entries
        await cleanupCache(API_CACHE, CACHE_CONFIG.maxEntries.api);
      }
      
      return networkResponse;
    }
    
    throw new Error(`Network response not ok: ${networkResponse.status}`);
  } catch (error) {
    console.log(`🌐 Network failed, checking cache: ${request.url}`);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`📦 Serving from cache: ${request.url}`);
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html') || new Response('Offline', { status: 503 });
    }
    
    return new Response('Network error', { status: 408 });
  }
}

// Stale-while-revalidate strategy for dynamic content
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await cleanupCache(DYNAMIC_CACHE, CACHE_CONFIG.maxEntries.dynamic);
    }
    return networkResponse;
  }).catch(error => {
    console.log('Network request failed:', error);
    return cachedResponse || new Response('Network error', { status: 408 });
  });
  
  return cachedResponse || fetchPromise;
}

// ==============================
// BACKGROUND SYNC
// ==============================

self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'pharmaceutical-data-sync') {
    event.waitUntil(syncPharmaceuticalData());
  } else if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncPharmaceuticalData() {
  try {
    console.log('🧬 Syncing pharmaceutical data in background...');
    
    // Get pending sync data from IndexedDB
    const pendingData = await getPendingSyncData();
    
    for (const data of pendingData) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        // Remove from pending sync after successful upload
        await removePendingSyncData(data.id);
      } catch (error) {
        console.error('Failed to sync data:', error);
      }
    }
    
    console.log('✅ Pharmaceutical data sync complete');
  } catch (error) {
    console.error('❌ Background sync failed:', error);
  }
}

async function syncAnalytics() {
  try {
    console.log('📊 Syncing analytics data...');
    
    const analyticsData = await getPendingAnalytics();
    
    if (analyticsData.length > 0) {
      await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData)
      });
      
      await clearPendingAnalytics();
    }
    
    console.log('✅ Analytics sync complete');
  } catch (error) {
    console.error('❌ Analytics sync failed:', error);
  }
}

// ==============================
// PUSH NOTIFICATIONS
// ==============================

self.addEventListener('push', (event) => {
  console.log('📧 Push notification received');
  
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.error('Failed to parse push data:', error);
  }
  
  const options = {
    title: data.title || 'Enterprise Pharmaceutical Intelligence',
    body: data.body || 'New pharmaceutical intelligence update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    tag: data.tag || 'pharma-intelligence',
    requireInteraction: data.requireInteraction || false,
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      ...data
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event.notification.tag);
  
  event.notification.close();
  
  const action = event.action;
  const data = event.notification.data || {};
  
  if (action === 'dismiss') {
    return;
  }
  
  const urlToOpen = action === 'view' ? data.url : '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus();
            client.navigate(urlToOpen);
            return;
          }
        }
        
        // Open new window if app not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ==============================
// MESSAGE HANDLING
// ==============================

self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        type: 'VERSION',
        version: '2.0.0',
        cacheName: CACHE_NAME
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'CACHE_STATS':
      getCacheStats().then(stats => {
        event.ports[0].postMessage({ type: 'CACHE_STATS', stats });
      });
      break;
      
    case 'PREFETCH_CRITICAL':
      prefetchCriticalResources(data.urls);
      break;
      
    default:
      console.log('Unknown message type:', type);
  }
});

// ==============================
// UTILITY FUNCTIONS
// ==============================

function isStaticAsset(url) {
  return ROUTE_PATTERNS.cacheFirst.some(pattern => pattern.test(url));
}

function isAPIRequest(url) {
  return ROUTE_PATTERNS.networkFirst.some(pattern => pattern.test(url));
}

function isDynamicContent(url) {
  return ROUTE_PATTERNS.staleWhileRevalidate.some(pattern => pattern.test(url));
}

async function cleanupCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const entriesToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
  }
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter(name => name.startsWith('enterprise-pharma-'))
      .map(name => caches.delete(name))
  );
}

async function getCacheStats() {
  const stats = {};
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('enterprise-pharma-')) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      stats[cacheName] = {
        entries: keys.length,
        size: await getCacheSize(cache, keys)
      };
    }
  }
  
  return stats;
}

async function getCacheSize(cache, keys) {
  let totalSize = 0;
  
  for (const key of keys.slice(0, 10)) { // Sample first 10 for performance
    try {
      const response = await cache.match(key);
      if (response && response.body) {
        const reader = response.body.getReader();
        let size = 0;
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.length;
        }
        
        totalSize += size;
      }
    } catch (error) {
      // Ignore errors for individual entries
    }
  }
  
  return totalSize;
}

async function prefetchCriticalResources(urls) {
  const cache = await caches.open(CACHE_NAME);
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.log('Failed to prefetch:', url, error);
    }
  }
}

// ==============================
// INDEXEDDB HELPERS
// ==============================

async function getPendingSyncData() {
  // Implementation would depend on your IndexedDB structure
  return [];
}

async function removePendingSyncData(id) {
  // Implementation would depend on your IndexedDB structure
}

async function getPendingAnalytics() {
  // Implementation would depend on your IndexedDB structure
  return [];
}

async function clearPendingAnalytics() {
  // Implementation would depend on your IndexedDB structure
}

// ==============================
// ERROR HANDLING
// ==============================

self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

// ==============================
// PERIODIC BACKGROUND SYNC
// ==============================

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'pharmaceutical-data-refresh') {
    event.waitUntil(refreshPharmaceuticalData());
  }
});

async function refreshPharmaceuticalData() {
  try {
    console.log('🔄 Periodic pharmaceutical data refresh...');
    
    // Refresh critical API endpoints
    const criticalEndpoints = [
      '/api/status',
      '/api/health'
    ];
    
    const cache = await caches.open(API_CACHE);
    
    for (const endpoint of criticalEndpoints) {
      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          await cache.put(endpoint, response.clone());
        }
      } catch (error) {
        console.log(`Failed to refresh ${endpoint}:`, error);
      }
    }
    
    console.log('✅ Periodic refresh complete');
  } catch (error) {
    console.error('❌ Periodic refresh failed:', error);
  }
}

console.log('🧬 Enterprise Pharmaceutical Intelligence Service Worker v2.0.0 loaded');