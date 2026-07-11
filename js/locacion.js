const LOCATIONS_DATA = [
  {
    id: "pokemon-center",
    name: "Pokémon Center",
    city: "Pueblo Paleta",
    type: "Tienda temática",
    description: "Tienda oficial con merchandising, figuras y artículos exclusivos del mundo Pokémon.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Pokemon_Center_Tohoku_in_SENDAI_PARCO.jpg",
    mapIframe: "https://www.google.com/maps?q=Pueblo%20Paleta&output=embed"
  },
  {
    id: "cafe-pikachu",
    name: "Café Pikachu",
    city: "Ciudad Plateada",
    type: "Cafetería",
    description: "Cafetería temática con postres y bebidas inspiradas en los Pokémon de Kanto.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/1/18/Nintendo_Switch_2_release_in_NYC_113.jpg",
    mapIframe: "https://www.google.com/maps?q=Ciudad%20Plateada&output=embed"
  },
  {
    id: "estatua-charizard",
    name: "Estatua de Charizard",
    city: "Plaza Central",
    type: "Monumento",
    description: "Icono de la plaza central: una gran estatua de Charizard muy fotografiada por los fans.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Pokemon_Center_Tohoku_in_SENDAI_PARCO.jpg",
    mapIframe: "https://www.google.com/maps?q=Plaza%20Central&output=embed"
  },
  {
    id: "central-park-ny",
    name: "Central Park",
    city: "Nueva York",
    type: "Parque",
    description: "Punto de encuentro del tour clásico de Nueva York, rodeado de naturaleza y vida urbana.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg",
    mapIframe: "https://www.google.com/maps?q=Central%20Park%20New%20York&output=embed"
  },
  {
    id: "torre-eiffel",
    name: "Torre Eiffel",
    city: "París",
    type: "Monumento",
    description: "Escenario del tour nocturno de París, iluminada y visible durante el crucero por el Sena.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/8/85/Tower_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    mapIframe: "https://www.google.com/maps?q=Torre%20Eiffel%20Paris&output=embed"
  },
  {
    id: "port-vell",
    name: "Port Vell",
    city: "Barcelona",
    type: "Puerto",
    description: "Puerto de Barcelona donde parte la aventura marina con snorkel en la Barceloneta.",
    mapImg: "https://upload.wikimedia.org/wikipedia/commons/2/22/Port_Vell_Rambla_de_Mar_04.JPG",
    mapIframe: "https://www.google.com/maps?q=Port%20Vell%20Barcelona&output=embed"
  }
];

let LOC_CACHE = [];
let LOC_FILTERED = [];

function el(q) { return document.querySelector(q); }
function createFromHTML(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
function debounce(fn, wait = 220) { let t; return function(...a){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,a), wait); }; }

function renderLocationsList(list) {
  const container = document.getElementById('locationsList');
  if (!container) return;
  container.innerHTML = '';
  if (!list || list.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-muted">No se encontraron locaciones.</p></div>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(l => {
    const html = `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="p-3 rounded shadow-sm" style="background:var(--card-bg); color:var(--card-text);">
          <div class="d-flex flex-column gap-2">
            <img src="${l.mapImg || 'assets/images/regions/placeholder.png'}" alt="${l.name}" style="width:100%;height:160px;object-fit:cover;border-radius:8px;">
            <div>
              <h5 class="mb-1">${l.name}</h5>
              <div class="text-muted small mb-2">${l.city} · ${l.type}</div>
              <p class="small text-truncate mb-2" style="max-width:260px;">${l.description}</p>
              <button class="btn btn-sm btn-custom" data-id="${l.id}" onclick="openLocationDetail('${l.id}')">Ver</button>
            </div>
          </div>
        </article>
      </div>`;
    frag.appendChild(createFromHTML(html));
  });
  container.appendChild(frag);
  container.setAttribute('aria-busy', 'false');
}

function renderLocationDetail(l) {
  if (!l) return;
  const detail = document.getElementById('location-detail');
  if (!detail) return;
  detail.dataset.location = l.id || '';
  if (el('#locationName')) el('#locationName').textContent = l.name || '';
  if (el('#locationCity')) el('#locationCity').textContent = l.city || '—';
  if (el('#locationType')) el('#locationType').textContent = l.type || '—';
  if (el('#locationDescription')) el('#locationDescription').textContent = l.description || '';
  if (el('#locationMapImg')) {
    el('#locationMapImg').src = l.mapImg || 'assets/images/regions/placeholder.png';
    el('#locationMapImg').alt = `Mapa de ${l.name || 'la locación'}`;
  }

  detail.style.display = 'block';
  const listEl = document.getElementById('locationsList');
  if (listEl) listEl.style.display = 'none';
  const backBtn = document.getElementById('backToList');
  if (backBtn) backBtn.style.display = 'inline-block';
  detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el('#locationName')?.focus();
}

function showLocationsList() {
  const detail = document.getElementById('location-detail');
  if (detail) detail.style.display = 'none';
  const listEl = document.getElementById('locationsList');
  if (listEl) listEl.style.display = '';
  const backBtn = document.getElementById('backToList');
  if (backBtn) backBtn.style.display = 'none';
}

function loadLocations(data = null) {
  return new Promise((resolve) => {
    LOC_CACHE = Array.isArray(data) ? data : LOCATIONS_DATA;
    LOC_FILTERED = [...LOC_CACHE];
    renderLocationsList(LOC_FILTERED);
    resolve(LOC_FILTERED);
  });
}

function doLocationFilter(q) {
  const ql = (q || '').trim().toLowerCase();
  if (!ql) {
    LOC_FILTERED = [...LOC_CACHE];
  } else {
    LOC_FILTERED = LOC_CACHE.filter(l => {
      return (l.name || '').toLowerCase().includes(ql)
        || (l.city || '').toLowerCase().includes(ql)
        || (l.type || '').toLowerCase().includes(ql)
        || (l.description || '').toLowerCase().includes(ql);
    });
  }
  renderLocationsList(LOC_FILTERED);
}

const handleLocationSearch = debounce((e) => {
  const q = (e && e.target) ? e.target.value : (document.getElementById('locationSearch')?.value || '');
  doLocationFilter(q);
}, 220);

function openLocationDetail(id) {
  const l = LOC_CACHE.find(x => x.id === id || x.name.toLowerCase() === String(id).toLowerCase());
  if (!l) return;
  renderLocationDetail(l);
}

window.loadLocations = loadLocations;
window.handleLocationSearch = handleLocationSearch;
window.openLocationDetail = openLocationDetail;

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('locationSearch');
  if (searchInput) {
    searchInput.removeEventListener('input', handleLocationSearch);
    searchInput.addEventListener('input', handleLocationSearch);
  }
  const backBtn = document.getElementById('backToList');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      showLocationsList();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    });
  }
  if (!LOC_CACHE || LOC_CACHE.length === 0) loadLocations();
});
