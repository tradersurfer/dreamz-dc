/* DREAMZ DC — sitewide 21+ age gate
   Include on every public page, before other scripts:
   <script src="/components/age-gate.js"></script>
   Acceptance is saved in localStorage. Never auto-dismiss.
*/
(function () {
  var KEY = "dreamz_age_ok_2026";
  window.DREAMZ_AGE_KEY = KEY;
  if (localStorage.getItem(KEY) === "yes") return;
  if (document.getElementById("dz-age-overlay") || document.getElementById("ageGate")) return;

  var css = document.createElement("style");
  css.textContent =
    ".dz-age-overlay{position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px}" +
    ".dz-age-box{background:#1a1a2e;border-radius:20px;padding:40px 32px;max-width:420px;width:100%;text-align:center;border:1px solid rgba(255,255,255,.1);color:#fff;font-family:Inter,system-ui,sans-serif}" +
    ".dz-age-box h2{margin:0 0 12px;font-size:1.7rem}" +
    ".dz-age-box p{color:#aaa;margin:0 0 24px;line-height:1.5}" +
    ".dz-age-enter{background:linear-gradient(135deg,#d4a853,#c49040);color:#0f0f1a;border:none;padding:14px 36px;border-radius:12px;font-weight:700;font-size:1.05rem;cursor:pointer;width:100%}" +
    ".dz-age-alt{display:block;margin-top:14px;background:transparent;color:#fff;border:2px solid rgba(255,255,255,.28);padding:12px 28px;border-radius:12px;font-weight:600;cursor:pointer;width:100%}";
  document.head.appendChild(css);

  var overlay = document.createElement("div");
  overlay.className = "dz-age-overlay";
  overlay.id = "dz-age-overlay";
  overlay.innerHTML =
    '<div class="dz-age-box" role="dialog" aria-modal="true" aria-labelledby="dz-age-title">' +
    '<div style="font-size:2.4rem;margin-bottom:10px">🌿</div>' +
    '<h2 id="dz-age-title">You Must Be 21+</h2>' +
    "<p>By entering DREAMZ DC Compound you certify that you are 21 years of age or older. Valid photo ID required at pickup or delivery.</p>" +
    '<button class="dz-age-enter" type="button" id="dzAgeEnter">I&rsquo;m 21+ — Enter</button>' +
    '<button class="dz-age-alt" type="button" id="dzAgeCert">Self-Certify / Visitor Pass</button>' +
    '<button class="dz-age-alt" type="button" id="dzAgeLeave">Leave</button>' +
    "</div>";

  function mount() {
    if (!document.body) return document.addEventListener("DOMContentLoaded", mount);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    document.getElementById("dzAgeEnter").addEventListener("click", function () {
      localStorage.setItem(KEY, "yes");
      overlay.remove();
      document.body.style.overflow = "";
    });
    document.getElementById("dzAgeCert").addEventListener("click", function () {
      window.location.href = "https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39";
    });
    document.getElementById("dzAgeLeave").addEventListener("click", function () {
      window.location.href = "https://www.dc.gov";
    });
  }
  mount();
})();
