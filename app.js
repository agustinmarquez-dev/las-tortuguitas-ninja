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
    e.preventDefault();
    const page = item.dataset.page;
    if (page) navigate(page);
  });
});

const initialPage = window.location.hash.replace('#', '') || 'inicio';
navigate(initialPage);

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
