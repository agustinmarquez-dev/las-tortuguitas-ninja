/* =============================================
   LAS TORTUGUITAS NINJA — APP JS
   Vanilla JS · Sin frameworks · Sin dependencias
   ============================================= */

// ── NAV SPA ──────────────────────────────────
const navItems = document.querySelectorAll('.nav-item');
const pages    = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function navigate(pageId) {
  const targetPageId = document.getElementById('page-' + pageId) ? pageId : 'inicio';

  // Ocultar todas las páginas
  pages.forEach(page => {
    page.classList.remove('active');
    page.hidden = true;
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
  });

  // Mostrar la página destino
  const target = document.getElementById('page-' + targetPageId);
  if (target) {
    target.classList.add('active');
    target.hidden = false;
  }

  window.dispatchEvent(new CustomEvent('dashboard:navigate', {
    detail: { page: targetPageId }
  }));

  // Marcar nav item activo
  const activeNav = document.querySelector(`[data-page="${targetPageId}"]`);
  if (activeNav) {
    activeNav.classList.add('active');
    activeNav.setAttribute('aria-current', 'page');
  }

  if (window.location.hash !== `#${targetPageId}`) {
    window.history.replaceState(null, '', `#${targetPageId}`);
  }

  // Cerrar sidebar en mobile si está abierto
  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    const page = item.dataset.page;
    if (!page) return;
    e.preventDefault();
    if (page) navigate(page);
  });
});

const navigationEntry = performance.getEntriesByType('navigation')[0];
const isReload = navigationEntry?.type === 'reload';
const initialPage = isReload ? 'inicio' : (window.location.hash.replace('#', '') || 'inicio');
navigate(initialPage);

if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => {
      console.warn('No se pudo registrar el service worker:', error);
    });
  });
}

// ── RELOJ Y FECHA DINÁMICOS ───────────────────
const MESES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre'
];

function updateDatetime() {
  const now  = new Date();
  const dia  = now.getDate();
  const mes  = MESES[now.getMonth()];
  const anio = now.getFullYear();

  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  const dateEl = document.getElementById('current-date');
  const timeEl = document.getElementById('current-time');

  if (dateEl) dateEl.textContent = `${dia} de ${mes} de ${anio}`;
  if (timeEl) timeEl.textContent = `${hh}:${mm}`;
}

updateDatetime();
setInterval(updateDatetime, 30_000); // actualizar cada 30 seg

// ── MOBILE MENU ───────────────────────────────
function openSidebar() {
  if (!sidebar || !overlay) return;
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  overlay.setAttribute('aria-hidden', 'false');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  if (!sidebar || !overlay) return;
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  overlay.setAttribute('aria-hidden', 'true');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (overlay)   overlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSidebar();
});

// ── PREVIEW GOOGLE SHEETS: VACANTES ──────────
const vacantesPreviewFrame = document.getElementById('vacantes-sheet-preview');
const reloadVacantesPreview = document.getElementById('reload-vacantes-preview');

if (vacantesPreviewFrame && reloadVacantesPreview) {
  reloadVacantesPreview.addEventListener('click', () => {
    vacantesPreviewFrame.src = vacantesPreviewFrame.src;
  });
}

// ── BUSCADOR DE ZONALES ──────────────────────
const zonalSearchInput = document.getElementById('zonal-search');
const zonalResultsEl = document.getElementById('zonales-results');
const zonalResultCountEl = document.getElementById('zonales-result-count');
const zonalOverviewEl = document.getElementById('zonales-overview');
const zonalTotalCountEl = document.getElementById('zonal-total-count');
const zonalBreakdownEl = document.getElementById('zonal-breakdown');
const zonalFilterButtons = document.querySelectorAll('[data-zonal-filter]');
const brandFilterButtons = document.querySelectorAll('[data-brand-filter]');

const zonalState = {
  items: [],
  query: '',
  capacitador: 'todos',
  marca: 'todos'
};

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getByName(collection, name) {
  const normalizedName = normalizeText(name);
  return collection.find(item => normalizeText(item.nombre) === normalizedName);
}

function flattenOrganigrama(org) {
  const empresa = org.empresa || '';
  return (org.estructura?.reportes || []).flatMap(regional => (
    (regional.gtes_zonales || []).map(zonal => ({
      ...zonal,
      empresa,
      regional: regional.nombre,
      regionalTelefono: regional.telefono,
      regionalEmail: regional.email
    }))
  ));
}

function buildZonalItems(zonales, organigramas) {
  const detalles = organigramas.flatMap(flattenOrganigrama);

  return zonales.flatMap(grupo => (
    grupo.zonales.map(zonal => {
      const detalle = getByName(detalles, zonal.nombre);
      return {
        ...zonal,
        capacitador: grupo.capacitador,
        telefono: detalle?.telefono || '',
        email: detalle?.email || '',
        locales: detalle?.locales || [],
        regionalTelefono: detalle?.regionalTelefono || '',
        regionalEmail: detalle?.regionalEmail || '',
        searchable: normalizeText([
          zonal.nombre,
          zonal.marca,
          zonal.regional,
          zonal.zona,
          grupo.capacitador,
          ...(detalle?.locales || [])
        ].join(' '))
      };
    })
  )).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || 'Sin dato';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function renderZonalOverview() {
  if (!zonalOverviewEl) return;

  const byCapacitador = countBy(zonalState.items, 'capacitador');
  const byMarca = countBy(zonalState.items, 'marca');
  const byZona = countBy(zonalState.items, 'zona');

  const metrics = [
    ['Zonales', zonalState.items.length],
    ['Mariano', byCapacitador.Mariano || 0],
    ['Agustina', byCapacitador.Agustina || 0],
    ['Agustín', byCapacitador.Agustín || 0],
    ['Extremas', byMarca.Extremas || 0],
    ['Sabores', byMarca['Sabores Express'] || 0],
    ['Zonas', Object.keys(byZona).length]
  ];

  zonalOverviewEl.innerHTML = metrics.map(([label, value]) => `
    <div class="zonal-metric">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('');
}

function renderZonalBreakdown(items) {
  if (!zonalBreakdownEl || !zonalTotalCountEl) return;

  zonalTotalCountEl.textContent = zonalState.items.length;
  const byZone = countBy(zonalState.items, 'zona');
  const max = Math.max(...Object.values(byZone), 1);

  zonalBreakdownEl.innerHTML = Object.entries(byZone)
    .sort((a, b) => b[1] - a[1])
    .map(([zona, total]) => `
      <div class="zonal-breakdown-row">
        <span>${zona}</span>
        <strong>${total}</strong>
        <div class="zonal-breakdown-bar"><span style="width:${(total / max) * 100}%"></span></div>
      </div>
    `).join('');
}

function getFilteredZonales() {
  const query = normalizeText(zonalState.query);

  return zonalState.items.filter(item => {
    const matchesQuery = !query || item.searchable.includes(query);
    const matchesCapacitador = zonalState.capacitador === 'todos' || item.capacitador === zonalState.capacitador;
    const matchesMarca = zonalState.marca === 'todos' || item.marca === zonalState.marca;
    return matchesQuery && matchesCapacitador && matchesMarca;
  });
}

function renderZonalResults() {
  if (!zonalResultsEl || !zonalResultCountEl) return;

  const results = getFilteredZonales();
  zonalResultCountEl.textContent = `${results.length} resultado${results.length === 1 ? '' : 's'}`;

  if (!results.length) {
    zonalResultsEl.innerHTML = `
      <div class="zonal-empty">
        No encontré coincidencias con esa búsqueda.
      </div>
    `;
    return;
  }

  zonalResultsEl.innerHTML = results.map(item => {
    const locales = item.locales.length
      ? item.locales.map(local => `<span class="zonal-tag">${local}</span>`).join('')
      : '<span class="zonal-tag">Locales no informados</span>';
    const email = item.email
      ? `<a href="mailto:${item.email}">${item.email}</a>`
      : '<strong>Sin dato</strong>';
    const phone = item.telefono || 'Sin dato';

    return `
      <article class="zonal-result-card">
        <div class="zonal-card-head">
          <div>
            <h3>${item.nombre}</h3>
            <span>${item.marca}</span>
          </div>
          <span>${item.zona}</span>
        </div>
        <div class="zonal-card-grid">
          <div class="zonal-card-field">
            <span>Capacitador</span>
            <strong>${item.capacitador}</strong>
          </div>
          <div class="zonal-card-field">
            <span>Regional</span>
            <strong>${item.regional}</strong>
          </div>
          <div class="zonal-card-field">
            <span>Teléfono</span>
            <strong>${phone}</strong>
          </div>
          <div class="zonal-card-field">
            <span>Email</span>
            ${email}
          </div>
        </div>
        <div class="zonal-card-field">
          <span>Locales</span>
          <div class="zonal-locales">${locales}</div>
        </div>
      </article>
    `;
  }).join('');
}

function setActiveButton(buttons, value, dataKey) {
  buttons.forEach(button => {
    button.classList.toggle('active', button.dataset[dataKey] === value);
  });
}

async function initZonalesSearch() {
  if (!zonalResultsEl) return;

  try {
    const embedded = window.ZONALES_EMBEDDED_DATA;
    const [zonales, extremas, sabores] = embedded
      ? [embedded.zonales, embedded.extremas, embedded.sabores]
      : await Promise.all([
        fetch('assets/data/zonales.json').then(response => response.json()),
        fetch('assets/data/organigrama-extremas.json').then(response => response.json()),
        fetch('assets/data/organigrama-sabores.json').then(response => response.json())
      ]);

    zonalState.items = buildZonalItems(zonales, [extremas, sabores]);
    renderZonalOverview();
    renderZonalBreakdown(zonalState.items);
    renderZonalResults();
  } catch (error) {
    zonalResultsEl.innerHTML = `
      <div class="zonal-empty">
        No pude cargar los datos de zonales. Abrí el proyecto desde un servidor local para consultar los JSON.
      </div>
    `;
    if (zonalResultCountEl) zonalResultCountEl.textContent = 'Error al cargar datos';
    console.error('Error cargando zonales:', error);
  }
}

if (zonalSearchInput) {
  zonalSearchInput.addEventListener('input', event => {
    zonalState.query = event.target.value;
    renderZonalResults();
  });
}

zonalFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    zonalState.capacitador = button.dataset.zonalFilter;
    setActiveButton(zonalFilterButtons, zonalState.capacitador, 'zonalFilter');
    renderZonalResults();
  });
});

brandFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    zonalState.marca = button.dataset.brandFilter;
    setActiveButton(brandFilterButtons, zonalState.marca, 'brandFilter');
    renderZonalResults();
  });
});

initZonalesSearch();
