/* Header/footer injector lives in /js/site.js so existing pages keep working.
   This file exists so Dreamz has a components/ folder parallel to Ganjavores.
   Load order on inner pages:
     /components/age-gate.js
     /js/products.js
     /js/cart.js
     /js/site.js
*/
(function () {
  if (window.DreamzUI) return;
  var s = document.createElement("script");
  s.src = "/js/site.js";
  document.head.appendChild(s);
})();
