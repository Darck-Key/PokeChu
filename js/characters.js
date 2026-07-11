const CHARACTERS_DATA = [
  {
    id: "ash-ketchum",
    name: "Ash Ketchum",
    realName: "Satoshi",
    age: "10+",
    role: "Entrenador",
    region: "kanto",
    affiliation: "Equipo de viaje",
    bio: "Joven entrenador que viaja para convertirse en Maestro Pokémon.",
    avatar: "assets/images/ash.jpg",
    pokemons: [{ number: "025", name: "Pikachu", img: "assets/images/pokemon/025.png" }],
    firstSeen: "Episodio 1",
    highlight: "Protagonista principal",
    mapImg: "assets/images/regions/kanto.jpg"
  },
  {
    id: "misty",
    name: "Misty",
    realName: "Kasumi",
    age: "10+",
    role: "Líder",
    region: "kanto",
    affiliation: "Gym Cerulean",
    bio: "Líder de gimnasio especializada en Pokémon de tipo Agua.",
    avatar: "assets/images/misty.jpg",
    pokemons: [{ number: "007", name: "Starmie", img: "assets/images/pokemon/121.png" }],
    firstSeen: "Episodio 1",
    highlight: "Líder de gimnasio",
    mapImg: "assets/images/regions/kanto.jpg"
  },
  {
    id: "gary",
    name: "Gary Oak",
    realName: "Shigeru",
    age: "10+",
    role: "Rival",
    region: "kanto",
    affiliation: "Investigador",
    bio: "Rival de Ash y nieto del Profesor Oak.",
    avatar: "assets/images/gary.jpg",
    pokemons: [{ number: "001", name: "Blastoise", img: "assets/images/pokemon/009.png" }],
    firstSeen: "Episodio 1",
    highlight: "Rival clásico",
    mapImg: "assets/images/regions/kanto.jpg"
  }
];

let CHAR_CACHE = [];
let CHAR_FILTERED = [];

function el(q) { return document.querySelector(q); }
function createFromHTML(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
function debounce(fn, wait = 200) { let t; return function(...a){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,a), wait); }; }

function renderCharactersList(list) {
  const container = document.getElementById('charactersList');
  if (!container) return;
  container.innerHTML = '';
  if (!list || list.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-muted">No se encontraron personajes.</p></div>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(c => {
    const html = `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="p-3 rounded shadow-sm" style="background:var(--card-bg); color:var(--card-text);">
          <div class="d-flex gap-3">
            <img src="${c.avatar || 'assets/images/logo.png'}" alt="${c.name}" style="width:96px;height:96px;object-fit:cover;border-radius:8px;">
            <div class="flex-fill">
              <h5 class="mb-1">${c.name}</h5>
              <div class="text-muted small mb-2">${c.role} · ${c.region}</div>
              <p class="small text-truncate mb-2" style="max-width:260px;">${c.bio}</p>
              <div>
                <button class="btn btn-sm btn-custom" data-id="${c.id}" onclick="openCharacterDetail('${c.id}')">Ver</button>
              </div>
            </div>
          </div>
        </article>
      </div>`;
    frag.appendChild(createFromHTML(html));
  });
  container.appendChild(frag);
  container.setAttribute('aria-busy', 'false');
}

function renderCharacterDetail(c) {
  if (!c) return;
  const detail = document.getElementById('character-detail');
  if (!detail) return;
  detail.dataset.character = c.id || '';
  el('#characterName').textContent = c.name || '';
  el('#characterRole').textContent = `${c.role} · ${c.region}` || '';
  el('#characterBio').textContent = c.bio || '';
  el('#characterAvatar').src = c.avatar || 'assets/images/logo.png';
  el('#characterRealName').textContent = c.realName || '—';
  el('#characterAge').textContent = c.age || '—';
  el('#characterRegion').textContent = c.region || '—';
  el('#characterAffiliation').textContent = c.affiliation || '—';
  el('#characterFirstSeen').textContent = c.firstSeen || '—';
  el('#characterHighlight').textContent = c.highlight || '—';
  el('#characterMapImg').src = c.mapImg || 'assets/images/regions/placeholder.png';

  const pokes = el('#characterPokemons');
  pokes.innerHTML = '';
  (c.pokemons || []).forEach(p => {
    const node = createFromHTML(`<div class="text-center p-1" style="min-width:88px;">
      <img src="${p.img || 'assets/images/pokemon/placeholder.png'}" alt="${p.name}" style="width:64px;height:64px;object-fit:contain;">
      <div class="small mt-1"><strong>${p.name}</strong></div>
    </div>`);
    pokes.appendChild(node);
  });

  detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el('#characterName')?.focus();
}

function loadCharacters(data = null) {
  return new Promise((resolve) => {
    CHAR_CACHE = Array.isArray(data) ? data : CHARACTERS_DATA;
    CHAR_FILTERED = [...CHAR_CACHE];
    renderCharactersList(CHAR_FILTERED);
    resolve(CHAR_FILTERED);
  });
}

function doCharacterFilter(q) {
  const ql = (q || '').trim().toLowerCase();
  if (!ql) {
    CHAR_FILTERED = [...CHAR_CACHE];
  } else {
    CHAR_FILTERED = CHAR_CACHE.filter(c => {
      return (c.name || '').toLowerCase().includes(ql)
        || (c.role || '').toLowerCase().includes(ql)
        || (c.region || '').toLowerCase().includes(ql)
        || (c.affiliation || '').toLowerCase().includes(ql);
    });
  }
  renderCharactersList(CHAR_FILTERED);
}

const handleCharacterSearch = debounce((e) => {
  const q = (e && e.target) ? e.target.value : (document.getElementById('characterSearch')?.value || '');
  doCharacterFilter(q);
}, 220);

function filterCharactersByRole(role) {
  if (!role) {
    CHAR_FILTERED = [...CHAR_CACHE];
  } else {
    CHAR_FILTERED = CHAR_CACHE.filter(c => c.role === role);
  }
  renderCharactersList(CHAR_FILTERED);
}

function filterCharactersByRegion(region) {
  if (!region) {
    CHAR_FILTERED = [...CHAR_CACHE];
  } else {
    CHAR_FILTERED = CHAR_CACHE.filter(c => c.region === region);
  }
  renderCharactersList(CHAR_FILTERED);
}

function resetCharacterFilters() {
  CHAR_FILTERED = [...CHAR_CACHE];
  renderCharactersList(CHAR_FILTERED);
}

function openCharacterDetail(id) {
  const c = CHAR_CACHE.find(x => x.id === id || x.name.toLowerCase() === String(id).toLowerCase());
  if (!c) return;
  renderCharacterDetail(c);
}

window.loadCharacters = loadCharacters;
window.handleCharacterSearch = handleCharacterSearch;
window.filterCharactersByRole = filterCharactersByRole;
window.filterCharactersByRegion = filterCharactersByRegion;
window.resetCharacterFilters = resetCharacterFilters;
window.openCharacterDetail = openCharacterDetail;

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('characterSearch');
  if (searchInput) {
    searchInput.removeEventListener('input', handleCharacterSearch);
    searchInput.addEventListener('input', handleCharacterSearch);
  }
  if (!CHAR_CACHE || CHAR_CACHE.length === 0) loadCharacters();
});
