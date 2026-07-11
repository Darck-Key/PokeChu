const TOURS_DATA = [
  {
    id: "nueva-york-clasica",
    title: "Tour clásico Nueva York",
    region: "Nueva York",
    duration: "full",
    durationLabel: "8 horas",
    level: "Intermedio",
    capacity: 12,
    price: "120€",
    summary: "Recorrido por los lugares más icónicos de Nueva York: Central Park, Times Square, Estatua de la Libertad y más.",
    itinerary: [
      "Encuentro en Central Park",
      "Paseo por Times Square y Broadway",
      "Almuerzo en el distrito financiero",
      "Ferri a la Estatua de la Libertad"
    ],
    includes: ["Guía", "Transporte", "Almuerzo"],
    gallery: ["assets/images/tours/times-square.jpg","assets/images/tours/statue-of-liberty.jpg"],
    thumb: "assets/images/tours/central-park.jpg",
    mapImg: "assets/images/regions/kanto.jpg",
    mapIframe: "https://www.google.com/maps?q=Central%20Park%20New%20York&output=embed",
    notes: "Traer calzado cómodo y agua.",
    schedule: ["Lunes 09:00", "Miércoles 09:00", "Sábado 08:00"]
  },
  {
    id: "paris-nocturno",
    title: "Tour nocturno París",
    region: "París",
    duration: "short",
    durationLabel: "2.5 horas",
    level: "Principiante",
    capacity: 8,
    price: "60€",
    summary: "Paseo nocturno por París para ver la Torre Eiffel iluminada, un crucero por el Sena y Montmartre.",
    itinerary: ["Punto de encuentro: Torre Eiffel", "Crucero por el Sena", "Paseo por Montmartre"],
    includes: ["Guía", "Crucero"],
    gallery: ["assets/images/tours/montmartre.jpg","assets/images/tours/pont-neuf.jpg"],
    thumb: "assets/images/tours/eiffel-tower.jpg",
    mapImg: "assets/images/regions/kalos.jpg",
    mapIframe: "https://www.google.com/maps?q=Torre%20Eiffel%20Paris&output=embed",
    notes: "Recomendado para mayores de 10 años.",
    schedule: ["Viernes 20:00"]
  },
  {
    id: "barcelona-aventura-marina",
    title: "Aventura marina Barcelona",
    region: "Barcelona",
    duration: "half",
    durationLabel: "5 horas",
    level: "Intermedio",
    capacity: 10,
    price: "75€",
    summary: "Excursión por el Puerto Vell y la Barceloneta con actividades acuáticas y vistas del Mediterráneo.",
    itinerary: ["Salida en barco desde Port Vell", "Snorkel en Barceloneta", "Tiempo libre en la playa", "Regreso"],
    includes: ["Guía", "Equipo de snorkel", "Bebidas"],
    gallery: ["assets/images/tours/port-vell.jpg","assets/images/tours/barceloneta.jpg"],
    thumb: "assets/images/tours/port-vell.jpg",
    mapImg: "assets/images/regions/hoenn.jpg",
    mapIframe: "https://www.google.com/maps?q=Port%20Vell%20Barcelona&output=embed",
    notes: "Actividad sujeta a condiciones meteorológicas.",
    schedule: ["Domingo 07:00"]
  }
];

let TOURS_CACHE = [];
let TOURS_FILTERED = [];
let CURRENT_TOUR_ID = null;

function el(q) { return document.querySelector(q); }
function createFromHTML(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
function debounce(fn, wait = 220) { let t; return function(...a){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,a), wait); }; }

function renderToursList(list) {
  const container = document.getElementById('toursList');
  if (!container) return;
  container.innerHTML = '';
  if (!list || list.length === 0) {
    container.innerHTML = '<div class="col-12"><p class="text-muted">No se encontraron tours.</p></div>';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(t => {
    const html = `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="p-3 rounded shadow-sm" style="background:var(--card-bg); color:var(--card-text);">
          <div class="d-flex flex-column gap-2">
            <img src="${t.thumb || 'assets/images/tours/placeholder.png'}" alt="${t.title}" style="width:100%;height:160px;object-fit:cover;border-radius:8px;">
            <div>
              <h5 class="mb-1">${t.title}</h5>
              <div class="text-muted small mb-2">${t.region} · ${t.durationLabel} · ${t.level}</div>
              <p class="small text-truncate mb-2" style="max-width:260px;">${t.summary}</p>
              <div class="d-flex justify-content-between align-items-center">
                <strong>${t.price}</strong>
                <button class="btn btn-sm btn-custom" data-id="${t.id}" onclick="openTourDetail('${t.id}')">Ver</button>
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

function renderTourDetail(t) {
  if (!t) return;
  const detail = document.getElementById('tour-detail');
  if (!detail) return;
  detail.dataset.tour = t.id || '';
  el('#tourTitle').textContent = t.title || '';
  el('#tourRegion').textContent = t.region || '—';
  el('#tourDuration').textContent = t.durationLabel || '—';
  el('#tourLevel').textContent = t.level || '—';
  el('#tourCapacity').textContent = t.capacity || '—';
  el('#tourPrice').textContent = t.price || '—';
  el('#tourSummary').textContent = t.summary || '';
  el('#tourNotes').textContent = t.notes || '—';

  const itineraryEl = el('#tourItinerary');
  if (itineraryEl) {
    itineraryEl.innerHTML = '';
    (t.itinerary || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      itineraryEl.appendChild(li);
    });
  }

  const includesEl = el('#tourIncludes');
  if (includesEl) {
    includesEl.innerHTML = '';
    (t.includes || []).forEach(item => {
      const span = document.createElement('span');
      span.className = 'badge bg-success me-1 mb-1';
      span.textContent = item;
      includesEl.appendChild(span);
    });
  }

  const scheduleEl = el('#tourSchedule');
  if (scheduleEl) {
    scheduleEl.innerHTML = '';
    (t.schedule || []).forEach(item => {
      const span = document.createElement('span');
      span.className = 'badge bg-info text-dark me-1 mb-1';
      span.textContent = item;
      scheduleEl.appendChild(span);
    });
  }

  const galleryEl = el('#tourGallery');
  if (galleryEl) {
    galleryEl.innerHTML = '';
    (t.gallery || []).forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = t.title;
      img.className = 'img-fluid rounded mb-2';
      galleryEl.appendChild(img);
    });
  }

  const mapIframeEl = el('#tourMapIframe');
  if (mapIframeEl) {
    mapIframeEl.src = t.mapIframe || 'https://www.google.com/maps?q=&output=embed';
    mapIframeEl.title = `Mapa de ${t.region || 'la locación del tour'}`;
  }

  detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el('#tourTitle')?.focus();
}

function loadTours(data = null) {
  return new Promise((resolve) => {
    TOURS_CACHE = Array.isArray(data) ? data : TOURS_DATA;
    TOURS_FILTERED = [...TOURS_CACHE];
    renderToursList(TOURS_FILTERED);
    resolve(TOURS_FILTERED);
  });
}

function doTourFilter(q) {
  const ql = (q || '').trim().toLowerCase();
  if (!ql) {
    TOURS_FILTERED = [...TOURS_CACHE];
  } else {
    TOURS_FILTERED = TOURS_CACHE.filter(t => {
      return (t.title || '').toLowerCase().includes(ql)
        || (t.region || '').toLowerCase().includes(ql)
        || (t.summary || '').toLowerCase().includes(ql);
    });
  }
  renderToursList(TOURS_FILTERED);
}

const handleTourSearch = debounce((e) => {
  const q = (e && e.target) ? e.target.value : (document.getElementById('tourSearch')?.value || '');
  doTourFilter(q);
}, 220);

function filterToursByRegion(region) {
  if (!region) {
    TOURS_FILTERED = [...TOURS_CACHE];
  } else {
    TOURS_FILTERED = TOURS_CACHE.filter(t => t.region === region);
  }
  renderToursList(TOURS_FILTERED);
}

function filterToursByDuration(duration) {
  if (!duration) {
    TOURS_FILTERED = [...TOURS_CACHE];
  } else {
    TOURS_FILTERED = TOURS_CACHE.filter(t => t.duration === duration);
  }
  renderToursList(TOURS_FILTERED);
}

function resetTourFilters() {
  TOURS_FILTERED = [...TOURS_CACHE];
  renderToursList(TOURS_FILTERED);
}

function openTourDetail(id) {
  const t = TOURS_CACHE.find(x => x.id === id || x.title.toLowerCase() === String(id).toLowerCase());
  if (!t) return;
  renderTourDetail(t);
}

window.loadTours = loadTours;
window.handleTourSearch = handleTourSearch;
window.filterToursByRegion = filterToursByRegion;
window.filterToursByDuration = filterToursByDuration;
window.resetTourFilters = resetTourFilters;
window.openTourDetail = openTourDetail;

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tourSearch');
  if (searchInput) {
    searchInput.removeEventListener('input', handleTourSearch);
    searchInput.addEventListener('input', handleTourSearch);
  }
  document.querySelectorAll('[data-region]').forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region') || '';
      filterToursByRegion(region);
      document.querySelectorAll('[data-region]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelectorAll('[data-duration]').forEach(btn => {
    btn.addEventListener('click', () => {
      const duration = btn.getAttribute('data-duration') || '';
      filterToursByDuration(duration);
      document.querySelectorAll('[data-duration]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.getElementById('clearTourFilters')?.addEventListener('click', () => {
    document.getElementById('tourSearch').value = '';
    document.querySelectorAll('[data-region]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('[data-duration]').forEach(b => b.classList.remove('active'));
    resetTourFilters();
  });

  if (!TOURS_CACHE || TOURS_CACHE.length === 0) loadTours();
});
