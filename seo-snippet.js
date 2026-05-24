// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.finecut-tools.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.finecut-tools.com/","title_tag":"Tabakschneidemaschinen 0,3 mm Feinschnitt | Finecut Tools","meta_description":"Handgefertigte Tabakschneidemaschinen für 0,3 mm Feinschnitt. FINECUT PRO aus deutscher Maschinenbaumanufaktur – Rohtabak schneiden und Tabakgenuss auf neuem Niveau."},{"page_url":"https://www.finecut-tools.com/bestellen","title_tag":"Tabakschneider kaufen FINECUT PRO | Finecut Tools","meta_description":"Jetzt FINECUT PRO Tabakschneider kaufen: handgefertigte 0,3 mm Feinschnitt-Maschine für hochwertigen Tabakgenuss. Rohtabak schneiden, Premium-Feinwerktechnik, kostenloser Versand."},{"page_url":"https://www.finecut-tools.com/blank","title_tag":"Datenschutzerklärung | Finecut Tools Tabakschneider","meta_description":"Datenschutzerklärung von Finecut Tools: Informationen zur Verarbeitung Ihrer Daten beim Kauf handgefertigter Tabakschneidemaschinen und beim Kontakt über unsere Website."}],"keywords":["Tabakschneidemaschinen","Feinwerktechnik","Rohtabak schneiden","0,3 mm Feinschnitt","FINECUT PRO","handgefertigte Tabakschneider","Tabakgenuss","Maschinenbaumanufaktur","hochwertige Tabakwaren","Tabakschneider kaufen"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.finecut-tools.com/#organization",
  "name": "Finecut Tools",
  "url": "https://www.finecut-tools.com/",
  "logo": "https://static.wixstatic.com/media/7a5888_a33f03e5790a488db69f81e36c7c07e8%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/7a5888_a33f03e5790a488db69f81e36c7c07e8%7Emv2.png",
  "image": [
    "https://static.wixstatic.com/media/7a5888_7013f49e23734d78b1a37de73896f726~mv2.jpg/v1/fill/w_450,h_350,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/external-file_edited.jpg",
    "https://static.wixstatic.com/media/fa2d47_71c9979e52a74490ab6980970a72360e~mv2.jpg/v1/crop/x_0,y_53,w_1467,h_786/fill/w_370,h_194,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/file_00000000e7a871f58e98debca835cea3_ed.jpg",
    "https://static.wixstatic.com/media/a3c153_86b7b7a7dbc64942a968e08b13dce3aa~mv2.jpg/v1/fill/w_323,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4499%20(1)_edited.jpg"
  ],
  "description": "Finecut Tools ist eine fränkische Maschinenbaumanufaktur für hochwertige, handgefertigte Tabakschneidemaschinen mit 0,3 mm Feinschnitt – 100 % made in Germany.",
  "email": "info@weinberg-events.de",
  "telephone": "+49 15144905494",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "DE"
  },
  "sameAs": [],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@weinberg-events.de",
      "telephone": "+49 15144905494",
      "areaServed": "DE"
    }
  ],
  "makesOffer": {
    "@type": "Offer",
    "url": "https://www.finecut-tools.com/bestellen",
    "price": "499.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "itemOffered": {
      "@type": "Product",
      "name": "FINECUT PRO black Edition",
      "description": "Premium Tabakschneider für Rohtabak mit 0,3 mm Feinschnitt, handgefertigt und limitiert, 100 % made in Germany.",
      "image": "https://static.wixstatic.com/media/a3c153_86b7b7a7dbc64942a968e08b13dce3aa~mv2.jpg/v1/fill/w_323,h_323,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4499%20(1)_edited.jpg",
      "brand": {
        "@type": "Brand",
        "name": "Finecut Tools"
      }
    }
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
