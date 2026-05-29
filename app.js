/* =============================================
   LAS TORTUGUITAS NINJA — APP JS
   Vanilla JS · Sin frameworks · Sin dependencias
   ============================================= */

// ── NAV SPA ──────────────────────────────────
const navItems = document.querySelectorAll('.nav-item');
const pages    = document.querySelectorAll('.page');

function navigate(pageId) {
  // Ocultar todas las páginas
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  // Mostrar la página destino
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Marcar nav item activo
  const activeNav = document.querySelector(`[data-page="${pageId}"]`);
  if (activeNav) activeNav.classList.add('active');

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
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (overlay)   overlay.addEventListener('click', closeSidebar);
