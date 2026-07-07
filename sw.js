// 卡皮巴拉计时器 - Service Worker
// 版本号，发布时递增即可
const CACHE_VERSION = "v2";
const CACHE_NAME = "capybara-timer-" + CACHE_VERSION;

// 需要预缓存的核心文件
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon.svg"
];

// ========== 安装：预缓存核心资源 ==========
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] 预缓存中...");
      return cache.addAll(PRECACHE);
    })
  );
  self.skipWaiting();
});

// ========== 激活：清理旧版本缓存 ==========
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("capybara-timer-") && k !== CACHE_NAME)
          .map((k) => {
            console.log("[SW] 清理旧缓存:", k);
            return caches.delete(k);
          })
      )
    )
  );
  self.clients.claim();
});

// ========== 请求拦截 ==========
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // 跳过非 GET 请求
  if (request.method !== "GET") return;

  // 跳过 Chrome 扩展请求
  if (!request.url.startsWith("http")) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  // 对 HTML 页面请求：网络优先，保证内容最新
  if (request.destination === "document") {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch {
      // 离线时回退缓存
      const cached = await caches.match(request);
      return cached || new Response("离线模式，请联网后重试", { status: 503 });
    }
  }

  // 对静态资源：缓存优先，后台更新
  const cached = await caches.match(request);
  if (cached) {
    // 后台静默更新缓存
    fetch(request).then((response) => {
      if (response.ok) {
        caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
      }
    }).catch(() => {});
    return cached;
  }

  // 未命中缓存，尝试网络
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 504 });
  }
}