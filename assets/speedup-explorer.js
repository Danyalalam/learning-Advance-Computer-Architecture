/* Speedup law explorer.

   <div class="explorer" data-explorer="amdahl"></div>
   data-explorer: "amdahl", "gustafson" or "both".

   Notation follows the slides: alpha is the parallelizable fraction, N the number of CPUs. */
(function () {
  const laws = {
    amdahl: { name: "Amdahl", color: '#8a3324', f: (a, n) => 1 / (1 - a + a / n) },
    gustafson: { name: 'Gustafson-Barsis', color: '#2f5d8a', f: (a, n) => (1 - a) + n * a },
  };
  const NMAX = 1024;

  document.querySelectorAll('[data-explorer]').forEach(root => {
    const kinds = root.dataset.explorer === 'both' ? ['amdahl', 'gustafson'] : [root.dataset.explorer];
    root.innerHTML =
      '<label><span>α (parallel part)</span><input type="range" min="0" max="100" value="90" data-a><output data-ao></output></label>' +
      '<label><span>N (CPUs)</span><input type="range" min="0" max="10" value="3" step="1" data-n><output data-no></output></label>' +
      '<div class="readout" data-r></div>' +
      '<svg viewBox="0 0 600 220" role="img" aria-label="Speedup against number of CPUs"></svg>';
    const aIn = root.querySelector('[data-a]'), nIn = root.querySelector('[data-n]');
    const svg = root.querySelector('svg'), readout = root.querySelector('[data-r]');

    function draw() {
      const a = aIn.value / 100, n = 2 ** nIn.value;
      root.querySelector('[data-ao]').textContent = a.toFixed(2);
      root.querySelector('[data-no]').textContent = n;

      let html = '';
      kinds.forEach(k => {
        const s = laws[k].f(a, n);
        html += '<div>' + laws[k].name + ' speedup<b style="color:' + laws[k].color + '">' + s.toFixed(2) + '</b></div>' +
                '<div>Efficiency<b>' + (100 * s / n).toFixed(0) + '%</b></div>';
      });
      if (kinds.includes('amdahl')) {
        html += '<div>Amdahl limit, N → ∞<b>' + (a === 1 ? '∞' : (1 / (1 - a)).toFixed(2)) + '</b></div>';
      }
      readout.innerHTML = html;

      // Plot: x is log2(N) from 1 to 1024, y is speedup, scaled to the largest curve value shown.
      const X0 = 40, X1 = 590, Y0 = 190, Y1 = 12;
      const ymax = Math.max(2, ...kinds.map(k => laws[k].f(a, NMAX)));
      const x = v => X0 + (Math.log2(v) / 10) * (X1 - X0);
      const y = v => Y0 - (v / ymax) * (Y0 - Y1);
      let g = '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#999"/>' +
              '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#999"/>';
      for (let e = 0; e <= 10; e += 2) {
        g += '<text x="' + x(2 ** e) + '" y="208" font-size="11" text-anchor="middle" fill="#666">' + 2 ** e + '</text>';
      }
      g += '<text x="' + (X0 - 6) + '" y="' + (Y1 + 4) + '" font-size="11" text-anchor="end" fill="#666">' + ymax.toFixed(0) + '</text>' +
           '<text x="' + (X0 - 6) + '" y="' + (Y0 + 4) + '" font-size="11" text-anchor="end" fill="#666">0</text>' +
           '<text x="' + X1 + '" y="' + (Y0 - 6) + '" font-size="11" text-anchor="end" fill="#666">N (log scale)</text>';
      kinds.forEach(k => {
        let d = '';
        for (let e = 0; e <= 10; e += 0.1) {
          const v = 2 ** e;
          d += (d ? 'L' : 'M') + x(v).toFixed(1) + ' ' + y(laws[k].f(a, v)).toFixed(1);
        }
        g += '<path d="' + d + '" fill="none" stroke="' + laws[k].color + '" stroke-width="2"/>' +
             '<circle cx="' + x(n) + '" cy="' + y(laws[k].f(a, n)) + '" r="5" fill="' + laws[k].color + '"/>';
      });
      svg.innerHTML = g;
    }
    aIn.addEventListener('input', draw);
    nIn.addEventListener('input', draw);
    draw();
  });
})();
