
const LOCAL_VIDEO_PATH = 'assets/videos/tu_video.mp4';
const YOUTUBE_VIDEO_ID = 'YQXwS-rZvq4';

const POKEDEX_JSON = 'assets/data/pokedex.json';
const POKEDEX_PER_PAGE = 12;

function debounce(fn, wait = 250) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function padNumber(n) {
  return String(n).padStart(3, '0');
}

function normalizeType(t) {
  return (t || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function navigate(sectionId) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
  const el = document.getElementById(sectionId);
  if (el) el.classList.add('active-section');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showRegion(region) {
  document.querySelectorAll('.region-content').forEach(rc => rc.style.display = 'none');
  const target = document.getElementById('region-' + region);
  if (target) target.style.display = 'block';

  const container = document.getElementById('region-container');
  if (container) {
    const styles = ['kanto', 'johto', 'hoenn', 'sinnoh', 'teselia', 'kalos', 'alola', 'galar', 'paldea'];
    container.classList.remove(...styles.map(s => 'style-' + s));
    container.classList.add('style-' + region);
  }

  navigate('regiones');
}

const themeBtn = document.getElementById('themeToggleBtnFloating');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.src = 'assets/images/pokemon/491.png';
        themeIcon.alt = 'Modo Oscuro';
      } else {
        themeIcon.src = 'assets/images/pokemon/488.png';
        themeIcon.alt = 'Modo Claro';
      }
    }
  if (themeBtn) themeBtn.title = theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

let POKEDEX_DATA = [];
let POKEDEX_FILTERED = [];
let POKEDEX_CURRENT_PAGE = 1;

function mapPokedexEntry(p) {
  return {
    id: p.id ?? p.number ?? Math.random(),
    number: String(p.number ?? p.id ?? '').padStart(3, '0'),
    name: p.name ?? '—',
    types: p.types ?? (p.type ? [p.type] : []),
    region: p.region ?? '',
    img: p.img ?? 'assets/images/pokemon/placeholder.png',
    description: p.description ?? '',
    base_stats: p.base_stats ?? {},
    evolution: p.evolution ?? null,
    ...p
  };
}

async function loadLocalPokedex(jsonPath = POKEDEX_JSON) {
  try {
    let json = [];
    if (Array.isArray(window.POKEDEX_LOCAL_DATA) && window.POKEDEX_LOCAL_DATA.length) {
      json = window.POKEDEX_LOCAL_DATA;
    } else {
      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error('No se pudo cargar pokedex.json');
      json = await res.json();
    }

    POKEDEX_DATA = (Array.isArray(json) ? json : Object.values(json)).map(mapPokedexEntry);

    POKEDEX_FILTERED = [...POKEDEX_DATA];
    POKEDEX_CURRENT_PAGE = 1;
    renderPokedexPage(POKEDEX_FILTERED, POKEDEX_CURRENT_PAGE);
  } catch (err) {
    console.error('loadLocalPokedex error:', err);
    const container = document.getElementById('pokedexContainer');
    if (container) container.innerHTML = '<p class="text-danger">Error cargando PokéDex.</p>';
  }
}

function createPokeCardDOM(poke) {
  const col = document.createElement('div');
  col.className = 'col-6 col-sm-4 col-md-3';

  const card = document.createElement('div');
  card.className = 'pokedex-card shadow';
  card.setAttribute('data-name', (poke.name || '').toLowerCase());
  card.setAttribute('data-type', (poke.types || []).join(' ').toLowerCase());
  card.setAttribute('data-region', (poke.region || '').toLowerCase());

  card.innerHTML = `
    <div class="text-center p-3">
      <img class="pokedex-img" src="${poke.img}" alt="${poke.name}" loading="lazy">
      <h5 class="mt-2 mb-1">${poke.name}</h5>
      <div class="text-muted mb-2">#${poke.number}</div>
      <div class="mb-2">
        ${(poke.types || []).map(t => `<span class="badge type-${t.toString().toLowerCase()} me-1">${t}</span>`).join('')}
      </div>
      <div class="d-grid">
        <button class="btn btn-sm btn-custom" type="button" data-id="${poke.id}" onclick="openDetailModal('${poke.id}')">Ver ficha</button>
      </div>
    </div>
  `;

  col.appendChild(card);
  return col;
}

function renderPokedexPage(dataArray, page = 1) {
  const container = document.getElementById('pokedexContainer');
  const paginationEl = document.getElementById('pokedexPagination');
  if (!container) return;

  const total = dataArray.length;
  const perPage = POKEDEX_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  POKEDEX_CURRENT_PAGE = current;

  const start = (current - 1) * perPage;
  const pageItems = dataArray.slice(start, start + perPage);

  container.innerHTML = '';
  if (pageItems.length === 0) {
    container.innerHTML = `<div class="col-12"><p class="text-muted">No se encontraron Pokémon.</p></div>`;
  } else {
    const fragment = document.createDocumentFragment();
    pageItems.forEach(poke => fragment.appendChild(createPokeCardDOM(poke)));
    container.appendChild(fragment);
  }

  if (paginationEl) renderPagination(total, current, perPage);

  container.setAttribute('aria-busy', 'false');
}

function renderPagination(totalItems, page = 1, perPage = POKEDEX_PER_PAGE) {
  const paginationEl = document.getElementById('pokedexPagination');
  if (!paginationEl) return;

  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const current = page;

  paginationEl.innerHTML = '';

  function createPageItem(label, targetPage, disabled = false, active = false) {
    const li = document.createElement('li');
    li.className = 'page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '');
    const a = document.createElement('button');
    a.className = 'page-link';
    a.type = 'button';
    a.textContent = label;
    if (!disabled && !active) {
      a.addEventListener('click', () => {
        POKEDEX_CURRENT_PAGE = targetPage;
        renderPokedexPage(POKEDEX_FILTERED, targetPage);
        window.scrollTo({ top: 200, behavior: 'smooth' });
      });
    }
    li.appendChild(a);
    return li;
  }

  paginationEl.appendChild(createPageItem('«', Math.max(1, current - 1), current === 1));

  const maxButtons = 7;
  let start = Math.max(1, current - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

  for (let p = start; p <= end; p++) {
    paginationEl.appendChild(createPageItem(p, p, false, p === current));
  }

  paginationEl.appendChild(createPageItem('»', Math.min(totalPages, current + 1), current === totalPages));
}

function doFilter(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    POKEDEX_FILTERED = [...POKEDEX_DATA];
  } else {
    POKEDEX_FILTERED = POKEDEX_DATA.filter(p => {
      const name = (p.name || '').toLowerCase();
      const types = (p.types || []).join(' ').toLowerCase();
      const region = (p.region || '').toLowerCase();
      const number = (p.number || '').toLowerCase();
      return name.includes(q) || types.includes(q) || region.includes(q) || number.includes(q);
    });
  }
  POKEDEX_CURRENT_PAGE = 1;
  renderPokedexPage(POKEDEX_FILTERED, 1);
}

const handleSearch = debounce(() => {
  const input = document.getElementById('pokedexSearch');
  if (!input) return;
  const container = document.getElementById('pokedexContainer');
  if (container) container.setAttribute('aria-busy', 'true');
  doFilter(input.value || '');
}, 220);

function formatEvolution(evo) {
  if (!evo) return '';
  if (typeof evo === 'string') return evo;
  if (evo.legendary) return 'Pokémon legendario: no evoluciona.';
  if (evo.mythical) return 'Pokémon mítico: no evoluciona.';
  const bits = [];
  if (evo.prev && evo.next) {
    bits.push(`${evo.prev} → ${evo.next}`);
  } else if (evo.next) {
    bits.push(`Evoluciona a ${evo.next}`);
  } else if (evo.prev) {
    bits.push(`Evolución de ${evo.prev}`);
  }
  if (evo.level) bits.push(`al nivel ${evo.level}`);
  if (evo.method) bits.push(`(${evo.method})`);
  return bits.join(' ');
}

function openDetailModal(idOrNumber) {
  const poke = POKEDEX_DATA.find(p =>
    String(p.id) === String(idOrNumber) ||
    String(p.number) === String(idOrNumber) ||
    (p.name && p.name.toLowerCase() === String(idOrNumber).toLowerCase())
  );
  if (!poke) {
    console.warn('openDetailModal: Pokémon no encontrado', idOrNumber);
    return;
  }

  const modalTitle = document.getElementById('pokedexDetailTitle');
  const modalBody = document.getElementById('pokedexDetailBody');

  if (modalTitle) modalTitle.textContent = `${poke.name} — #${poke.number}`;
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="row g-3">
        <div class="col-md-5 text-center">
          <img src="${poke.img}" alt="${poke.name}" class="img-fluid" style="max-height:260px; object-fit:contain;">
          <div class="mt-2">${(poke.types || []).map(t => `<span class="badge type-${t.toString().toLowerCase()} me-1">${t}</span>`).join('')}</div>
        </div>
        <div class="col-md-7">
          <p class="mb-2">${poke.description || '<span class="text-muted">Sin descripción.</span>'}</p>
          <h6>Estadísticas base</h6>
          <ul class="list-unstyled mb-2">
            <li><strong>HP:</strong> ${poke.base_stats?.hp ?? '—'}</li>
            <li><strong>Ataque:</strong> ${poke.base_stats?.attack ?? '—'}</li>
            <li><strong>Defensa:</strong> ${poke.base_stats?.defense ?? '—'}</li>
            <li><strong>Sp. Atk:</strong> ${poke.base_stats?.sp_atk ?? '—'}</li>
            <li><strong>Sp. Def:</strong> ${poke.base_stats?.sp_def ?? '—'}</li>
            <li><strong>Velocidad:</strong> ${poke.base_stats?.speed ?? '—'}</li>
          </ul>
          ${poke.evolution ? `<h6>Evolución</h6><p class="mb-0">${formatEvolution(poke.evolution)}</p>` : ''}
        </div>
      </div>
    `;
  }

  const modalEl = document.getElementById('pokedexDetailModal');
  if (modalEl) {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }
}

const ingresoForm = document.getElementById('ingresoForm');
const modalVideo = document.getElementById('modalVideo');
const modalYoutubeDiv = document.getElementById('modalYoutube');
const modalYoutubeIframe = document.getElementById('modalYoutubeIframe');

if (ingresoForm) {
  ingresoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('entrenador').value.trim();
    const email = document.getElementById('emailEntrenador').value.trim();

    const modalName = document.getElementById('modalUserName');
    const modalMessage = document.getElementById('modalMessage');

    if (modalName) modalName.textContent = `¡Bienvenido, ${nombre}!`;
    if (modalMessage) modalMessage.textContent = `Registro completado. Te contactaremos en ${email}.`;

    if (modalVideo) modalVideo.style.display = 'none';
    if (modalYoutubeDiv) modalYoutubeDiv.style.display = 'none';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
      modalVideo.src = LOCAL_VIDEO_PATH;
      modalVideo.load();
    }

    const onVideoError = () => {
      if (modalVideo) modalVideo.style.display = 'none';
      if (modalYoutubeDiv) modalYoutubeDiv.style.display = 'block';
      if (modalYoutubeIframe) modalYoutubeIframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;
    };

      modalVideo.oncanplay = () => {
        modalVideo.style.display = 'block';
        if (modalYoutubeDiv) modalYoutubeDiv.style.display = 'none';
        modalVideo.play().catch(() => {
          modalVideo.style.display = 'block';
        });
      };
      modalVideo.onerror = onVideoError;

      const modal = new bootstrap.Modal(document.getElementById('ingresoModal'));
      modal.show();

      this.reset();
  });
}

const ingresoModalEl = document.getElementById('ingresoModal');
if (ingresoModalEl) {
  ingresoModalEl.addEventListener('hidden.bs.modal', () => {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      modalVideo.load();
      modalVideo.oncanplay = null;
      modalVideo.onerror = null;
      modalVideo.style.display = 'none';
    }
    if (modalYoutubeIframe) modalYoutubeIframe.src = '';
    if (modalYoutubeDiv) modalYoutubeDiv.style.display = 'none';
  });
}

window.loadLocalPokedex = loadLocalPokedex;
window.handleSearch = handleSearch;
window.openDetailModal = openDetailModal;

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = (() => { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
  setTheme(savedTheme || 'light');

  navigate('inicio');

  const regionsDropdown = document.getElementById('regionsDropdown');
  if (regionsDropdown) {
    regionsDropdown.addEventListener('mouseenter', () => {
      const menu = regionsDropdown.querySelector('.dropdown-menu');
      if (menu && !menu.classList.contains('show')) menu.classList.add('show');
    });
    regionsDropdown.addEventListener('mouseleave', () => {
      const menu = regionsDropdown.querySelector('.dropdown-menu');
      if (menu && menu.classList.contains('show')) menu.classList.remove('show');
    });
  }

  const searchInput = document.getElementById('pokedexSearch');
  if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', handleSearch);
  }

  if (!POKEDEX_DATA || POKEDEX_DATA.length === 0) {
    const container = document.getElementById('pokedexContainer');
    if (container) container.setAttribute('aria-busy', 'true');
    loadLocalPokedex().catch(() => {});
  }
});
