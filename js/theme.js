/* SafeSteps theme switch. Three options: System, Dark, Light.
   The no-flash part is a tiny inline script in the <head> of every page.
   This file wires the radio buttons and stores one choice.
   Case data is never stored. Only this one value is persisted, inside try/catch. */

(function () {
  "use strict";

  var KEY = "safesteps.theme";
  var radios = document.querySelectorAll('input[name="theme"]');
  if (!radios.length) return;

  var media = window.matchMedia("(prefers-color-scheme: light)");

  function read() {
    try {
      return window.localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function save(value) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch (e) {
      /* storage unavailable, the choice just will not persist */
    }
  }

  function resolve(pref) {
    if (pref === "dark" || pref === "light") return pref;
    return media.matches ? "light" : "dark";
  }

  function apply(pref) {
    document.documentElement.setAttribute("data-theme", resolve(pref));
    Array.prototype.forEach.call(radios, function (radio) {
      radio.checked = radio.value === pref;
    });
  }

  apply(read() || "system");

  Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener("change", function () {
      if (!radio.checked) return;
      save(radio.value);
      apply(radio.value);
    });
  });

  media.addEventListener("change", function () {
    if ((read() || "system") === "system") apply("system");
  });
})();
