/* ============================================================
   Zonales — Selección operaciones dashboard
   Data + chart rendering. Chart.js v4 (loaded via CDN).
   ============================================================ */

// Chart.js dark-theme defaults
function applyChartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.color = '#475569';
  Chart.defaults.borderColor = '#E2E8F0';
  Chart.defaults.font.family = '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  Chart.defaults.font.size = 11;
  Chart.defaults.plugins.legend.labels.color = '#475569';
}
const CHART_BORDER = '#FFFFFF';
const GRID_COLOR = '#E2E8F0';

// ─── COLORS ──────────────────────────────────────────
const COLORS = {
  Agustina: { fill: 'rgba(239,68,68,0.18)', line: '#EF4444', text: '#DC2626' },
  Facundo:  { fill: 'rgba(37,99,235,0.18)', line: '#2563EB', text: '#1D4ED8' },
  Emiliano: { fill: 'rgba(34,197,94,0.18)', line: '#22C55E', text: '#15803D' },
  Agustin:  { fill: 'rgba(168,85,247,0.18)', line: '#A855F7', text: '#7E22CE' },
  Mariano:  { fill: 'rgba(249,115,22,0.18)', line: '#F97316', text: '#C2410C' }
};

// ─── DATA ────────────────────────────────────────────
const noPresPorMes = {
  Enero:   { Agustin: 13, Agustina: 14, Emiliano: 1,  Facundo: 4,  Mariano: 0 },
  Febrero: { Agustin: 3,  Agustina: 2,  Emiliano: 1,  Facundo: 2,  Mariano: 0 },
  Marzo:   { Agustin: 7,  Agustina: 10, Emiliano: 17, Facundo: 12, Mariano: 0 },
  Abril:   { Agustin: 6,  Agustina: 7,  Emiliano: 0,  Facundo: 1,  Mariano: 2 }
};

const altasMes = {
  Enero:   { Agustin: 193, Agustina: 125, Emiliano: 107, Facundo: 76 },
  Febrero: { Agustin: 177, Agustina: 92,  Emiliano: 36,  Facundo: 89 },
  Marzo:   { Agustin: 210, Agustina: 152, Emiliano: 134, Facundo: 144 },
  Abril:   { Agustin: 145, Agustina: 152, Facundo: 126,  Mariano: 70 }
};

const marcaData = {
  Todos:   { EXTREMAS: 697, SABORES: 1331 },
  Enero:   { EXTREMAS: 261, SABORES: 240 },
  Febrero: { EXTREMAS: 160, SABORES: 234 },
  Marzo:   { EXTREMAS: 288, SABORES: 352 },
  Abril:   { EXTREMAS: 188, SABORES: 305 }
};

const rawCump = [
  { Mes: "Enero",   Semana: "Primer semana",  Capacitador: "Emiliano", Cumplimiento: 0.348, ENVIADOS: 39, RESTANTES: 73, Total: 112 },
  { Mes: "Enero",   Semana: "Primer semana",  Capacitador: "Agustina", Cumplimiento: 1.0,   ENVIADOS: 13, RESTANTES: 0,  Total: 13 },
  { Mes: "Enero",   Semana: "Primer semana",  Capacitador: "Agustin",  Cumplimiento: 0.382, ENVIADOS: 47, RESTANTES: 76, Total: 123 },
  { Mes: "Enero",   Semana: "Primer semana",  Capacitador: "Facundo",  Cumplimiento: 0.8,   ENVIADOS: 36, RESTANTES: 9,  Total: 45 },
  { Mes: "Enero",   Semana: "Segunda semana", Capacitador: "Emiliano", Cumplimiento: 0.831, ENVIADOS: 98, RESTANTES: 20, Total: 118 },
  { Mes: "Enero",   Semana: "Segunda semana", Capacitador: "Agustina", Cumplimiento: 0.933, ENVIADOS: 28, RESTANTES: 2,  Total: 30 },
  { Mes: "Enero",   Semana: "Segunda semana", Capacitador: "Agustin",  Cumplimiento: 0.818, ENVIADOS: 81, RESTANTES: 18, Total: 99 },
  { Mes: "Enero",   Semana: "Segunda semana", Capacitador: "Facundo",  Cumplimiento: 0.895, ENVIADOS: 51, RESTANTES: 6,  Total: 57 },
  { Mes: "Enero",   Semana: "Tercer semana",  Capacitador: "Agustina", Cumplimiento: 0.924, ENVIADOS: 61, RESTANTES: 5,  Total: 66 },
  { Mes: "Enero",   Semana: "Tercer semana",  Capacitador: "Agustin",  Cumplimiento: 0.9,   ENVIADOS: 45, RESTANTES: 5,  Total: 50 },
  { Mes: "Enero",   Semana: "Tercer semana",  Capacitador: "Facundo",  Cumplimiento: 0.83,  ENVIADOS: 39, RESTANTES: 8,  Total: 47 },
  { Mes: "Febrero", Semana: "Primer semana",  Capacitador: "Emiliano", Cumplimiento: 0.804, ENVIADOS: 90, RESTANTES: 22, Total: 112 },
  { Mes: "Febrero", Semana: "Primer semana",  Capacitador: "Facundo",  Cumplimiento: 0.804, ENVIADOS: 90, RESTANTES: 22, Total: 112 },
  { Mes: "Febrero", Semana: "Primer semana",  Capacitador: "Agustin",  Cumplimiento: 0.967, ENVIADOS: 29, RESTANTES: 1,  Total: 30 },
  { Mes: "Febrero", Semana: "Primer semana",  Capacitador: "Agustina", Cumplimiento: 0.967, ENVIADOS: 29, RESTANTES: 1,  Total: 30 },
  { Mes: "Febrero", Semana: "Segunda semana", Capacitador: "Emiliano", Cumplimiento: 0.772, ENVIADOS: 78, RESTANTES: 23, Total: 101 },
  { Mes: "Febrero", Semana: "Segunda semana", Capacitador: "Facundo",  Cumplimiento: 0.956, ENVIADOS: 43, RESTANTES: 3,  Total: 45 },
  { Mes: "Febrero", Semana: "Segunda semana", Capacitador: "Agustin",  Cumplimiento: 0.987, ENVIADOS: 75, RESTANTES: 1,  Total: 76 },
  { Mes: "Febrero", Semana: "Segunda semana", Capacitador: "Agustina", Cumplimiento: 0.98,  ENVIADOS: 50, RESTANTES: 1,  Total: 51 },
  { Mes: "Febrero", Semana: "Tercer semana",  Capacitador: "Emiliano", Cumplimiento: 1.0,   ENVIADOS: 25, RESTANTES: 0,  Total: 25 },
  { Mes: "Febrero", Semana: "Tercer semana",  Capacitador: "Agustina", Cumplimiento: 0.923, ENVIADOS: 12, RESTANTES: 1,  Total: 13 },
  { Mes: "Febrero", Semana: "Tercer semana",  Capacitador: "Agustin",  Cumplimiento: 0.973, ENVIADOS: 73, RESTANTES: 2,  Total: 75 },
  { Mes: "Febrero", Semana: "Tercer semana",  Capacitador: "Facundo",  Cumplimiento: 0.972, ENVIADOS: 35, RESTANTES: 1,  Total: 36 },
  { Mes: "Febrero", Semana: "Cuarta semana",  Capacitador: "Agustina", Cumplimiento: 0.929, ENVIADOS: 39, RESTANTES: 3,  Total: 42 },
  { Mes: "Febrero", Semana: "Cuarta semana",  Capacitador: "Agustin",  Cumplimiento: 0.814, ENVIADOS: 83, RESTANTES: 19, Total: 102 },
  { Mes: "Febrero", Semana: "Cuarta semana",  Capacitador: "Facundo",  Cumplimiento: 0.872, ENVIADOS: 41, RESTANTES: 6,  Total: 47 },
  { Mes: "Marzo",   Semana: "Primer semana",  Capacitador: "Emiliano", Cumplimiento: 0.8,   ENVIADOS: 36, RESTANTES: 9,  Total: 45 },
  { Mes: "Marzo",   Semana: "Primer semana",  Capacitador: "Agustina", Cumplimiento: 1.0,   ENVIADOS: 11, RESTANTES: 0,  Total: 11 },
  { Mes: "Marzo",   Semana: "Primer semana",  Capacitador: "Agustin",  Cumplimiento: 0.767, ENVIADOS: 56, RESTANTES: 17, Total: 73 },
  { Mes: "Marzo",   Semana: "Primer semana",  Capacitador: "Facundo",  Cumplimiento: 0.873, ENVIADOS: 55, RESTANTES: 8,  Total: 63 },
  { Mes: "Marzo",   Semana: "Segunda semana", Capacitador: "Emiliano", Cumplimiento: 0.747, ENVIADOS: 65, RESTANTES: 22, Total: 87 },
  { Mes: "Marzo",   Semana: "Segunda semana", Capacitador: "Agustin",  Cumplimiento: 0.805, ENVIADOS: 91, RESTANTES: 22, Total: 113 },
  { Mes: "Marzo",   Semana: "Tercer semana",  Capacitador: "Emiliano", Cumplimiento: 0.644, ENVIADOS: 65, RESTANTES: 36, Total: 101 },
  { Mes: "Marzo",   Semana: "Tercer semana",  Capacitador: "Agustina", Cumplimiento: 0.917, ENVIADOS: 22, RESTANTES: 2,  Total: 24 },
  { Mes: "Marzo",   Semana: "Tercer semana",  Capacitador: "Agustin",  Cumplimiento: 0.824, ENVIADOS: 75, RESTANTES: 16, Total: 91 },
  { Mes: "Marzo",   Semana: "Tercer semana",  Capacitador: "Facundo",  Cumplimiento: 0.8,   ENVIADOS: 8,  RESTANTES: 2,  Total: 10 },
  { Mes: "Marzo",   Semana: "Cuarta semana",  Capacitador: "Emiliano", Cumplimiento: 0.373, ENVIADOS: 22, RESTANTES: 37, Total: 59 },
  { Mes: "Marzo",   Semana: "Cuarta semana",  Capacitador: "Agustina", Cumplimiento: 0.982, ENVIADOS: 55, RESTANTES: 1,  Total: 56 },
  { Mes: "Marzo",   Semana: "Cuarta semana",  Capacitador: "Agustin",  Cumplimiento: 0.699, ENVIADOS: 51, RESTANTES: 22, Total: 73 },
  { Mes: "Marzo",   Semana: "Cuarta semana",  Capacitador: "Facundo",  Cumplimiento: 0.839, ENVIADOS: 52, RESTANTES: 10, Total: 62 },
  { Mes: "Abril",   Semana: "Primer semana",  Capacitador: "Agustina", Cumplimiento: 0.835, ENVIADOS: 66, RESTANTES: 13, Total: 79 },
  { Mes: "Abril",   Semana: "Primer semana",  Capacitador: "Agustin",  Cumplimiento: 0.851, ENVIADOS: 86, RESTANTES: 15, Total: 101 },
  { Mes: "Abril",   Semana: "Primer semana",  Capacitador: "Facundo",  Cumplimiento: 0.855, ENVIADOS: 94, RESTANTES: 16, Total: 110 },
  { Mes: "Abril",   Semana: "Segunda semana", Capacitador: "Agustina", Cumplimiento: 1.0,   ENVIADOS: 26, RESTANTES: 0,  Total: 26 },
  { Mes: "Abril",   Semana: "Segunda semana", Capacitador: "Agustin",  Cumplimiento: 0.808, ENVIADOS: 42, RESTANTES: 10, Total: 52 },
  { Mes: "Abril",   Semana: "Segunda semana", Capacitador: "Facundo",  Cumplimiento: 0.710, ENVIADOS: 44, RESTANTES: 18, Total: 62 },
  { Mes: "Abril",   Semana: "Segunda semana", Capacitador: "Mariano",  Cumplimiento: 0.882, ENVIADOS: 45, RESTANTES: 6,  Total: 51 },
  { Mes: "Abril",   Semana: "Tercer semana",  Capacitador: "Agustina", Cumplimiento: 0.868, ENVIADOS: 46, RESTANTES: 7,  Total: 53 },
  { Mes: "Abril",   Semana: "Tercer semana",  Capacitador: "Agustin",  Cumplimiento: 0.863, ENVIADOS: 44, RESTANTES: 7,  Total: 51 },
  { Mes: "Abril",   Semana: "Tercer semana",  Capacitador: "Mariano",  Cumplimiento: 0.911, ENVIADOS: 41, RESTANTES: 4,  Total: 45 }
];

// ─── STATE ────────────────────────────────────────────
let mesActivo = 'Todos';
let capActivo = 'Todos';
let chartSemanal = null, chartMensual = null, chartMarca = null, chartDona = null, chartEvol = null;
let informeInicializado = false;

// ─── FILTER HANDLERS ──────────────────────────────────
function setMes(m) {
  mesActivo = m;
  document.querySelectorAll('[data-z-mes]').forEach(b => {
    b.classList.remove('active', 'all');
    if (b.dataset.zMes === m) {
      b.classList.add('active');
      if (m === 'Todos') b.classList.add('all');
    }
  });
  render();
}
function setCap(c) {
  capActivo = c;
  document.querySelectorAll('[data-z-cap]').forEach(b => {
    b.classList.remove('active', 'all', 'agustina', 'facundo', 'emiliano', 'agustin', 'mariano');
    if (b.dataset.zCap === c) {
      b.classList.add('active');
      if (c === 'Todos') b.classList.add('all');
      else b.classList.add(c.toLowerCase());
    }
  });
  render();
}

function filtered() {
  return rawCump.filter(d =>
    (mesActivo === 'Todos' || d.Mes === mesActivo) &&
    (capActivo === 'Todos' || d.Capacitador === capActivo)
  );
}

// ─── KPIs ─────────────────────────────────────────────
function renderKPIs(data) {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const rel = data.filter(d => caps.includes(d.Capacitador));

  const avgCump = rel.length ? rel.reduce((s, d) => s + d.Cumplimiento, 0) / rel.length : 0;

  let altasTotal = 0;
  const meses = mesActivo === 'Todos' ? ['Enero', 'Febrero', 'Marzo', 'Abril'] : [mesActivo];
  meses.forEach(m => { const md = altasMes[m] || {}; caps.forEach(c => { altasTotal += md[c] || 0; }); });

  let noPres = 0;
  meses.forEach(m => {
    caps.forEach(c => {
      noPres += (noPresPorMes[m] && noPresPorMes[m][c] !== undefined) ? noPresPorMes[m][c] : 0;
    });
  });
  const noPresPct = altasTotal > 0 ? (noPres / altasTotal * 100) : 0;

  const kpis = [
    { label: 'Cumplimiento promedio', val: (avgCump * 100).toFixed(1) + '%', sub: 'Enviados / total vacantes', accent: '#A78BFA' },
    { label: 'Total altas',           val: altasTotal.toLocaleString(),     sub: 'Ingresos confirmados',   accent: '#34D399' },
    { label: 'No se presentaron',     val: noPres.toLocaleString(),         sub: 'Ausentes primer día',    accent: '#F87171' },
    { label: '% Ausentismo',          val: noPresPct.toFixed(1) + '%',      sub: 'No presentes / altas',   accent: '#FBBF24' }
  ];

  document.getElementById('z-kpis').innerHTML = kpis.map(k => `
    <div class="z-kpi" style="border-top-color:${k.accent}; --z-kpi-accent:${k.accent}">
      <div class="z-kpi-label">${k.label}</div>
      <div class="z-kpi-value">${k.val}</div>
      <div class="z-kpi-sub">${k.sub}</div>
    </div>`).join('');
}

// ─── CHART: Cumplimiento semanal ──────────────────────
function renderSemanal(data) {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const semanas = ['Primer semana', 'Segunda semana', 'Tercer semana', 'Cuarta semana'];
  const labels = semanas.map(s => s.replace(' semana', ''));
  const datasets = caps.map(cap => {
    const c = COLORS[cap];
    const vals = semanas.map(sem => {
      const rows = data.filter(d => d.Capacitador === cap && d.Semana === sem);
      if (!rows.length) return null;
      return parseFloat((rows.reduce((s, d) => s + d.Cumplimiento, 0) / rows.length * 100).toFixed(1));
    });
    return { label: cap, data: vals, borderColor: c.line, backgroundColor: c.fill, pointBackgroundColor: c.line, pointRadius: 5, borderWidth: 2, spanGaps: true, tension: 0.35, fill: false };
  }).filter(d => d.data.some(v => v !== null));

  if (chartSemanal) chartSemanal.destroy();
  chartSemanal = new Chart(document.getElementById('chartSemanal'), {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, ticks: { callback: v => v + '%' }, grid: { color: GRID_COLOR } },
        x: { grid: { color: GRID_COLOR } }
      }
    }
  });
  document.getElementById('legendSemanal').innerHTML = datasets.map(d =>
    `<span class="z-legend-item"><span style="width:14px;height:3px;background:${d.borderColor};display:inline-block;border-radius:2px"></span>${d.label}</span>`
  ).join('');
}

// ─── CHART: Evolución semanal ─────────────────────────
function renderEvolucion(data) {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const semanas = ['Primer semana', 'Segunda semana', 'Tercer semana', 'Cuarta semana'];
  const labels = ['1ª Sem', '2ª Sem', '3ª Sem', '4ª Sem'];
  const rel = data.filter(d => caps.includes(d.Capacitador));
  const sumBy = key => semanas.map(sem => { const r = rel.filter(d => d.Semana === sem); return r.length ? r.reduce((s, d) => s + (d[key] || 0), 0) : null; });
  const enviados = sumBy('ENVIADOS');
  const vacantes = sumBy('Total');
  const faltantes = sumBy('RESTANTES');

  document.getElementById('subtituloEvolucion').textContent =
    `Enviados · Vacantes · Faltantes · ${capActivo !== 'Todos' ? capActivo.toUpperCase() : 'TODOS'}`;

  if (chartEvol) chartEvol.destroy();
  chartEvol = new Chart(document.getElementById('chartEvolucion'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Enviados',  data: enviados,  borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.10)', pointBackgroundColor: '#EF4444', pointBorderColor: CHART_BORDER, pointBorderWidth: 2, pointRadius: 6, borderWidth: 2, fill: true, tension: 0.4, spanGaps: true },
        { label: 'Vacantes',  data: vacantes,  borderColor: '#2563EB', backgroundColor: 'transparent',          pointBackgroundColor: CHART_BORDER, pointBorderColor: '#2563EB', pointBorderWidth: 2, pointRadius: 6, borderWidth: 2, borderDash: [6, 4], fill: false, tension: 0.4, spanGaps: true },
        { label: 'Faltantes', data: faltantes, borderColor: '#F97316', backgroundColor: 'transparent',          pointBackgroundColor: CHART_BORDER, pointBorderColor: '#F97316', pointBorderWidth: 2, pointRadius: 6, borderWidth: 2, borderDash: [3, 4], fill: false, tension: 0.4, spanGaps: true }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: GRID_COLOR }, beginAtZero: true },
        x: { grid: { color: GRID_COLOR } }
      }
    }
  });
  document.getElementById('legendEvolucion').innerHTML = [
    { label: 'Enviados',  color: '#EF4444', dash: false },
    { label: 'Vacantes',  color: '#2563EB', dash: '6,4' },
    { label: 'Faltantes', color: '#F97316', dash: '3,4' }
  ].map(l => {
    const svg = l.dash
      ? `<svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="${l.color}" stroke-width="2" stroke-dasharray="${l.dash}"/></svg>`
      : `<svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="${l.color}" stroke-width="2"/></svg>`;
    return `<span class="z-legend-item">${svg}${l.label}</span>`;
  }).join('');
}

// ─── CHART: Volumen mensual ───────────────────────────
function renderMensual() {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const meses = mesActivo === 'Todos' ? ['Enero', 'Febrero', 'Marzo', 'Abril'] : [mesActivo];
  const datasets = caps.map(cap => ({
    label: cap,
    data: meses.map(m => altasMes[m]?.[cap] || 0),
    backgroundColor: COLORS[cap].fill,
    borderColor: COLORS[cap].line,
    borderWidth: 1, borderRadius: 5
  }));

  if (chartMensual) chartMensual.destroy();
  chartMensual = new Chart(document.getElementById('chartMensual'), {
    type: 'bar',
    data: { labels: meses.map(m => m.slice(0, 3)), datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: GRID_COLOR } }
      }
    }
  });
  document.getElementById('legendMensual').innerHTML = datasets.map(d =>
    `<span class="z-legend-item"><span style="width:10px;height:10px;background:${d.backgroundColor};border-radius:3px;display:inline-block;border:1px solid ${d.borderColor}"></span>${d.label}</span>`
  ).join('');
}

// ─── CHART: Participación dona ────────────────────────
function renderDona(data) {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const rel = data.filter(d => caps.includes(d.Capacitador));
  const totales = {};
  caps.forEach(cap => { totales[cap] = rel.filter(d => d.Capacitador === cap).reduce((s, d) => s + (d.ENVIADOS || 0), 0); });
  const labels = caps.filter(c => totales[c] > 0);
  const values = labels.map(c => totales[c]);
  const total = values.reduce((a, b) => a + b, 0);
  const bgColors = labels.map(c => COLORS[c].fill);
  const borderColors = labels.map(c => COLORS[c].line);

  if (chartDona) chartDona.destroy();
  chartDona = new Chart(document.getElementById('chartDona'), {
    type: 'doughnut',
    data: { labels, datasets: [{ data: values, backgroundColor: bgColors, borderColor: borderColors, borderWidth: 2 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '58%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => { const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : '0'; return ` ${ctx.label}: ${pct}%`; } } }
      }
    },
    plugins: [{
      id: 'donaLabels',
      afterDraw(chart) {
        const { ctx, data } = chart;
        chart.getDatasetMeta(0).data.forEach((arc, i) => {
          const pct = total > 0 ? ((data.datasets[0].data[i] / total) * 100).toFixed(1) : '0';
          if (parseFloat(pct) < 4) return;
          const mid = (arc.startAngle + arc.endAngle) / 2;
          const r = (arc.outerRadius + arc.innerRadius) / 2;
          const x = arc.x + Math.cos(mid) * r;
          const y = arc.y + Math.sin(mid) * r;
          ctx.save();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '600 11px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pct + '%', x, y);
          ctx.restore();
        });
      }
    }]
  });
  document.getElementById('legendDona').innerHTML = labels.map((l, i) =>
    `<span class="z-legend-item"><span style="width:10px;height:10px;background:${bgColors[i]};border-radius:3px;display:inline-block;border:1px solid ${borderColors[i]}"></span>${l} ${total > 0 ? ((values[i] / total) * 100).toFixed(1) + '%' : ''}</span>`
  ).join('');
}

// ─── CHART: Marca ─────────────────────────────────────
function renderMarca() {
  const md = marcaData[mesActivo] || marcaData['Todos'];
  const labels = Object.keys(md);
  const values = Object.values(md);
  const total = values.reduce((a, b) => a + b, 0);
  const bg = ['rgba(37,99,235,0.18)', 'rgba(168,85,247,0.18)'];
  const bd = ['#2563EB', '#A855F7'];

  if (chartMarca) chartMarca.destroy();
  chartMarca = new Chart(document.getElementById('chartMarca'), {
    type: 'doughnut',
    data: { labels, datasets: [{ data: values, backgroundColor: bg, borderColor: bd, borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '58%', plugins: { legend: { display: false } } }
  });
  document.getElementById('legendMarca').innerHTML = labels.map((l, i) =>
    `<span class="z-legend-item"><span style="width:10px;height:10px;background:${bg[i]};border:1px solid ${bd[i]};border-radius:3px;display:inline-block"></span>${l} ${((values[i] / total) * 100).toFixed(1)}%</span>`
  ).join('');
}

// ─── RANKING ──────────────────────────────────────────
function renderRanking(data) {
  const caps = capActivo === 'Todos' ? Object.keys(COLORS) : [capActivo];
  const ranking = caps.map(cap => {
    const rows = data.filter(d => d.Capacitador === cap);
    if (!rows.length) return null;
    return { cap, avg: rows.reduce((s, d) => s + d.Cumplimiento, 0) / rows.length };
  }).filter(Boolean).sort((a, b) => b.avg - a.avg);

  document.getElementById('z-ranking').innerHTML = ranking.map((r, i) => `
    <div class="z-rank-row">
      <span class="z-rank-medal">${i + 1}</span>
      <span class="z-rank-name" style="color:${COLORS[r.cap].text}">${r.cap}</span>
      <div class="z-rank-bar-wrap">
        <div class="z-rank-bar" style="width:${(r.avg * 100).toFixed(1)}%;background:${COLORS[r.cap].fill};border:1px solid ${COLORS[r.cap].line}"></div>
      </div>
      <span class="z-rank-pct">${(r.avg * 100).toFixed(1)}%</span>
    </div>`).join('');
}

// ─── RENDER ───────────────────────────────────────────
function render() {
  if (!window.Chart || !document.getElementById('chartSemanal')) return;
  const data = filtered();
  renderKPIs(data);
  renderSemanal(data);
  renderEvolucion(data);
  renderMensual();
  renderDona(data);
  renderMarca();
  renderRanking(data);
}

// ─── INIT ─────────────────────────────────────────────
function initZonales() {
  if (informeInicializado || !window.Chart || !document.getElementById('chartSemanal')) return;
  applyChartDefaults();
  informeInicializado = true;
  render();
}

function ensureInformeRendered() {
  initZonales();
  if (!informeInicializado) return;
  requestAnimationFrame(() => {
    [chartSemanal, chartMensual, chartMarca, chartDona, chartEvol].forEach(chart => chart?.resize());
  });
}

if (document.getElementById('page-informe')?.classList.contains('active')) ensureInformeRendered();
window.addEventListener('load', () => {
  if (document.getElementById('page-informe')?.classList.contains('active')) ensureInformeRendered();
});
window.addEventListener('dashboard:navigate', event => {
  if (event.detail?.page === 'informe') ensureInformeRendered();
});
