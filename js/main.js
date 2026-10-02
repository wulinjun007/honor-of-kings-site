/* Honor of Kings fan-made design study — interactions
   (nav state, battlefield tabs, hero filter, reveal, floating CTA) */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scrolled state ---------- */
  var nav = document.querySelector(".nav");
  var floatCta = document.querySelector(".float-cta");

  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (floatCta) floatCta.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".nav-burger");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  /* ---------- Battlefield tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".map-tab"));
  var slides = Array.prototype.slice.call(document.querySelectorAll(".map-stage .map-slide"));
  var capTitle = document.querySelector(".map-caption h3");
  var capDesc = document.querySelector(".map-caption p");
  var capIndex = document.querySelector(".map-index");
  var mapCurrent = 0;
  var mapTimer = null;

  function showMap(i) {
    mapCurrent = (i + slides.length) % slides.length;
    slides.forEach(function (img, k) {
      img.classList.toggle("show", k === mapCurrent);
    });
    tabs.forEach(function (t, k) {
      t.classList.toggle("active", k === mapCurrent);
      t.setAttribute("aria-selected", k === mapCurrent ? "true" : "false");
    });
    var data = slides[mapCurrent].dataset;
    if (capTitle) capTitle.textContent = data.title || "";
    if (capDesc) capDesc.textContent = data.desc || "";
    if (capIndex) capIndex.textContent = data.index || "";
  }

  function startMapAuto() {
    if (reducedMotion || slides.length < 2) return;
    stopMapAuto();
    mapTimer = setInterval(function () { showMap(mapCurrent + 1); }, 6000);
  }
  function stopMapAuto() {
    if (mapTimer) { clearInterval(mapTimer); mapTimer = null; }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { showMap(i); startMapAuto(); });
  });
  var stage = document.querySelector(".map-stage");
  if (stage) {
    stage.addEventListener("mouseenter", stopMapAuto);
    stage.addEventListener("mouseleave", startMapAuto);
  }
  if (slides.length) { showMap(0); startMapAuto(); }

  /* ---------- Heroes filter ---------- */
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".hero-filter"));
  var heroTiles = Array.prototype.slice.call(document.querySelectorAll(".hero-tile"));

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var role = btn.dataset.role || "all";
      heroTiles.forEach(function (tile) {
        var match = role === "all" || tile.dataset.role === role;
        tile.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!reducedMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
