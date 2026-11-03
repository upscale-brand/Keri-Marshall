/* ============================================================
   Chomp Gums — Design 1 "Editorial Care"
   Purposeful interactions: scroll reveals, curtain images,
   split-heading word masks, counters, mobile nav.
   ============================================================ */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header state on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  if (header) { window.addEventListener("scroll", onScroll, { passive: true }); }
  onScroll();

  /* ---------- mobile navigation ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  function closeNav() {
    if (nav) nav.classList.remove("open");
    if (toggle) {
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    document.body.classList.remove("nav-locked");
  }
  if (toggle && nav) toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-locked", open);
  });
  if (nav) nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------- split-heading: wrap words for masked rise ---------- */
  document.querySelectorAll("[data-split]").forEach(function (heading) {
    var words = heading.textContent.trim().split(/\s+/);
    heading.textContent = "";
    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "split-word";
      outer.setAttribute("aria-hidden", "true");
      var inner = document.createElement("span");
      inner.textContent = word;
      inner.style.setProperty("--w", i);
      outer.appendChild(inner);
      heading.appendChild(outer);
      heading.appendChild(document.createTextNode(" "));
    });
    heading.setAttribute("aria-label", words.join(" "));
  });

  /* ---------- reveal on scroll (single observer) ---------- */
  var revealables = document.querySelectorAll(
    "[data-reveal], [data-reveal-group], [data-curtain], [data-split], [data-journey]"
  );
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
