/* FIELD NOTES — minimal interaction layer */
(function () {
  // live UTC clock in the status strip
  function tick() {
    var els = document.querySelectorAll('[data-clock]');
    if (!els.length) return;
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    var t = p(d.getUTCHours()) + ':' + p(d.getUTCMinutes()) + ':' + p(d.getUTCSeconds()) + 'Z';
    els.forEach(function (e) { e.textContent = t; });
  }
  tick();
  setInterval(tick, 1000);

  // copy buttons on code blocks
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var block = btn.closest('.codeblock');
    var pre = block && block.querySelector('pre');
    if (!pre) return;
    var text = pre.innerText.replace(/^\s*\$\s/gm, '').trimEnd();
    navigator.clipboard && navigator.clipboard.writeText(text);
    var prev = btn.textContent;
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(function () { btn.textContent = prev; btn.classList.remove('copied'); }, 1400);
  });

  // mobile sidebar toggle on content page
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.side-toggle');
    if (!t) return;
    var side = t.closest('.doc-side');
    if (!side) return;
    side.setAttribute('data-open', side.getAttribute('data-open') === 'true' ? 'false' : 'true');
  });
})();
