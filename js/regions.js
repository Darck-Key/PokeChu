const regionsData = {
  kanto: {
    key: "kanto",
    title: "Kanto",
    subtitle: "La región original del mundo Pokémon, hogar de Pueblo Paleta y Ciudad Plateada.",
    history:
      "Kanto es la región original del mundo Pokémon, hogar de ciudades icónicas como Pueblo Paleta y Ciudad Plateada. Aquí comenzaron muchas aventuras clásicas y se establecieron las primeras ligas Pokémon.",
    introYoutubeId: "hxooaOBJUjs",
    introLocal: "",
    starters: [
      { number: "001", name: "Bulbasaur", img: "assets/images/pokemon/001.png", type: "Planta/Veneno" },
      { number: "004", name: "Charmander", img: "assets/images/pokemon/004.png", type: "Fuego" },
      { number: "007", name: "Squirtle", img: "assets/images/pokemon/007.png", type: "Agua" }
    ],
    emblem: {
      number: "025",
      name: "Pikachu",
      img: "assets/images/pokemon/025.png",
      desc: "Pikachu es el símbolo más reconocido de Kanto y compañero emblemático de muchas aventuras."
    },
    mapImg: "assets/images/regions/kanto.jpg",
    mapIframe: ""
  },

  johto: {
    key: "johto",
    title: "Johto",
    subtitle: "Región rica en tradiciones, ruinas antiguas y leyendas Pokémon.",
    history:
      "Johto es una región con fuerte tradición cultural, conocida por sus santuarios, ruinas y la conexión con Pokémon legendarios.",
    introYoutubeId: "MDHfHuynUnE",
    introLocal: "",
    starters: [
      { number: "152", name: "Chikorita", img: "assets/images/pokemon/152.png", type: "Planta" },
      { number: "155", name: "Cyndaquil", img: "assets/images/pokemon/155.png", type: "Fuego" },
      { number: "158", name: "Totodile", img: "assets/images/pokemon/158.png", type: "Agua" }
    ],
    emblem: {
      number: "249",
      name: "Lugia",
      img: "assets/images/pokemon/249.png",
      desc: "Lugia, guardián de los mares, es uno de los emblemas legendarios asociados a Johto."
    },
    mapImg: "assets/images/regions/johto.jpg",
    mapIframe: ""
  },

  hoenn: {
    key: "hoenn",
    title: "Hoenn",
    subtitle: "Región de islas, océanos y volcanes, famosa por su diversidad natural.",
    history:
      "Hoenn es una región con gran variedad de hábitats: islas, selvas, volcanes y océanos. Sus leyendas giran en torno a los titanes de la tierra y el mar.",
    introYoutubeId: "x5UqwSOfeqI",
    introLocal: "",
    starters: [
      { number: "252", name: "Treecko", img: "assets/images/pokemon/252.png", type: "Planta" },
      { number: "255", name: "Torchic", img: "assets/images/pokemon/255.png", type: "Fuego" },
      { number: "258", name: "Mudkip", img: "assets/images/pokemon/258.png", type: "Agua" }
    ],
    emblem: {
      number: "382",
      name: "Kyogre",
      img: "assets/images/pokemon/382.png",
      desc: "Kyogre representa el poder del océano en Hoenn."
    },
    mapImg: "assets/images/regions/hoenn.jpg",
    mapIframe: ""
  },

  sinnoh: {
    key: "sinnoh",
    title: "Sinnoh",
    subtitle: "Región montañosa con lagos sagrados y una fuerte conexión con la mitología Pokémon.",
    history:
      "Sinnoh es una región de paisajes montañosos, lagos cristalinos y templos antiguos. Sus leyendas hablan de la creación del mundo Pokémon y de Dialga y Palkia.",
    introYoutubeId: "uBmMvGJ7uBE",
    introLocal: "",
    starters: [
      { number: "387", name: "Turtwig", img: "assets/images/pokemon/387.png", type: "Planta" },
      { number: "390", name: "Chimchar", img: "assets/images/pokemon/390.png", type: "Fuego" },
      { number: "393", name: "Piplup", img: "assets/images/pokemon/393.png", type: "Agua" }
    ],
    emblem: {
      number: "483",
      name: "Dialga",
      img: "assets/images/pokemon/483.png",
      desc: "Dialga es el guardián del tiempo y símbolo de Sinnoh."
    },
    mapImg: "assets/images/regions/sinnoh.jpg",
    mapIframe: ""
  },

  teselia: {
    key: "teselia",
    title: "Teselia",
    subtitle: "Región moderna con grandes ciudades, puentes y una amplia variedad de Pokémon.",
    history:
      "Teselia es una región con contrastes entre naturaleza y gran ciudad. Destaca por sus puentes monumentales, gimnasios variados y una fuerte tradición de competencias Pokémon.",
    introYoutubeId: "8t_NY-9r_IE",
    introLocal: "",
    starters: [
      { number: "495", name: "Snivy", img: "assets/images/pokemon/495.png", type: "Planta" },
      { number: "498", name: "Tepig", img: "assets/images/pokemon/498.png", type: "Fuego" },
      { number: "501", name: "Oshawott", img: "assets/images/pokemon/501.png", type: "Agua" }
    ],
    emblem: {
      number: "644",
      name: "Zekrom",
      img: "assets/images/pokemon/644.png",
      desc: "Zekrom es el emblemático Pokémon legendario de Teselia."
    },
    mapImg: "assets/images/regions/teselia.jpg",
    mapIframe: ""
  },

  kalos: {
    key: "kalos",
    title: "Kalos",
    subtitle: "Región elegante inspirada en Francia, conocida por su arte, moda y Pokémon variados.",
    history:
      "Kalos es una región centrada en la belleza, la moda y la cultura. Alberga la Torre Prisma, ciudades brillantes y una Liga Pokémon con un toque muy especial.",
    introYoutubeId: "LCNHc12volU",
    introLocal: "",
    starters: [
      { number: "650", name: "Chespin", img: "assets/images/pokemon/650.png", type: "Planta" },
      { number: "653", name: "Fennekin", img: "assets/images/pokemon/653.png", type: "Fuego" },
      { number: "656", name: "Froakie", img: "assets/images/pokemon/656.png", type: "Agua" }
    ],
    emblem: {
      number: "716",
      name: "Xerneas",
      img: "assets/images/pokemon/716.png",
      desc: "Xerneas representa la vida y la elegancia de Kalos."
    },
    mapImg: "assets/images/regions/kalos.jpg",
    mapIframe: ""
  },

  alola: {
    key: "alola",
    title: "Alola",
    subtitle: "Archipiélago tropical inspirado en Hawái, hogar de formas regionales y leyendas únicas.",
    history:
      "Alola es una región formada por cuatro islas principales y una isla artificial. Destaca por sus formas regionales de Pokémon, el Pokédex local y la tradición de los trial battles.",
    introYoutubeId: "aKniN9oVe4Y",
    introLocal: "",
    starters: [
      { number: "722", name: "Rowlet", img: "assets/images/pokemon/722.png", type: "Planta/Volador" },
      { number: "725", name: "Litten", img: "assets/images/pokemon/725.png", type: "Fuego" },
      { number: "728", name: "Popplio", img: "assets/images/pokemon/728.png", type: "Agua" }
    ],
    emblem: {
      number: "785",
      name: "Tapu Koko",
      img: "assets/images/pokemon/785.png",
      desc: "Tapu Koko es el guardián de la isla de Melemele en Alola."
    },
    mapImg: "assets/images/regions/alola.png",
    mapIframe: ""
  },

  galar: {
    key: "galar",
    title: "Galar",
    subtitle: "Región inspirada en Reino Unido, con paisajes verdes, campos antiguos y Dynamax.",
    history:
      "Galar es una región con una fuerte cultura Pokémon, gimnasios con arenas espectaculares y el fenómeno Dynamax. Sus ciudades mezclan tradición y modernidad.",
    introYoutubeId: "7hUQUx3-HXs",
    introLocal: "",
    starters: [
      { number: "810", name: "Grookey", img: "assets/images/pokemon/810.png", type: "Planta" },
      { number: "813", name: "Scorbunny", img: "assets/images/pokemon/813.png", type: "Fuego" },
      { number: "816", name: "Sobble", img: "assets/images/pokemon/816.png", type: "Agua" }
    ],
    emblem: {
      number: "888",
      name: "Zacian",
      img: "assets/images/pokemon/888.png",
      desc: "Zacian es el Pokémon legendario que protege Galar."
    },
    mapImg: "assets/images/regions/galar.jpg",
    mapIframe: ""
  },

  paldea: {
    key: "paldea",
    title: "Paldea",
    subtitle: "Región mediterránea con paisajes abiertos, academias y aventuras Terastal.",
    history:
      "Paldea es una región con un paisaje variado de lagos, desiertos y ciudades costeras. Su academia y el fenómeno Terastal son el centro de muchas historias.",
    introYoutubeId: "xWfHsLXo5s8",
    introLocal: "",
    starters: [
      { number: "906", name: "Sprigatito", img: "assets/images/pokemon/906.png", type: "Planta" },
      { number: "909", name: "Fuecoco", img: "assets/images/pokemon/909.png", type: "Fuego" },
      { number: "912", name: "Quaxly", img: "assets/images/pokemon/912.png", type: "Agua" }
    ],
    emblem: {
      number: "1000",
      name: "Koraidon",
      img: "assets/images/pokemon/1000.png",
      desc: "Koraidon es el Pokémon ancestral de Paldea."
    },
    mapImg: "assets/images/regions/paldea.jpg",
    mapIframe: ""
  }
};

function padNumber(n) {
  return String(n).padStart(3, "0");
}

function createElementFromHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

function renderRegionTemplate(data) {
  if (!data) return;

  const titleEl = document.getElementById("regionTitle");
  const subtitleEl = document.getElementById("regionSubtitle");
  const historyEl = document.getElementById("regionHistory");
  const emblemImgEl = document.getElementById("regionEmblemImg");
  const emblemNameEl = document.getElementById("regionEmblemName");
  const emblemInlineEl = document.getElementById("regionEmblemInline");
  const startersEl = document.getElementById("regionStarters");
  const mapImgEl = document.getElementById("regionMapImg");
  const mapIframeWrap = document.getElementById("regionMapIframe");
  const videoLocalWrap = document.getElementById("regionVideoLocal");
  const videoEl = document.getElementById("regionVideoEl");
  const videoYTWrap = document.getElementById("regionVideoYT");
  const iframeEl = document.getElementById("regionVideoIframe");

  if (titleEl) titleEl.textContent = data.title || "";
  if (subtitleEl) subtitleEl.textContent = data.subtitle || "";
  if (historyEl) historyEl.textContent = data.history || "";

  if (emblemImgEl) {
    emblemImgEl.src = data.emblem?.img || "assets/images/pokemon/placeholder.png";
    emblemImgEl.alt = data.emblem?.name || "Emblema";
  }
  if (emblemNameEl) emblemNameEl.textContent = `${data.emblem?.name || ""}`;
  if (emblemInlineEl) emblemInlineEl.textContent = data.emblem?.name || "";

  if (mapImgEl) {
    mapImgEl.src = data.mapImg || "";
    mapImgEl.alt = `Mapa de ${data.title || "la región"}`;
  }
  if (mapIframeWrap) {
    if (data.mapIframe) {
      mapIframeWrap.innerHTML = `<iframe src="${data.mapIframe}" style="border:0;width:100%;height:260px;" allowfullscreen loading="lazy"></iframe>`;
      mapIframeWrap.style.display = "block";
    } else {
      mapIframeWrap.innerHTML = "";
      mapIframeWrap.style.display = "none";
    }
  }

  if (videoLocalWrap && videoEl && videoYTWrap && iframeEl) {
    videoLocalWrap.style.display = "none";
    videoYTWrap.style.display = "none";
    videoEl.pause();
    videoEl.removeAttribute("src");
    iframeEl.removeAttribute("src");

    if (data.introYoutubeId) {
      let ytSrc = data.introYoutubeId;
      if (!ytSrc.startsWith('http')) {
        ytSrc = 'https://www.youtube.com/embed/' + ytSrc;
      }
      iframeEl.src = ytSrc;
      iframeEl.setAttribute('width', '560');
      iframeEl.setAttribute('height', '315');
      iframeEl.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframeEl.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframeEl.setAttribute('frameborder', '0');
      iframeEl.setAttribute('allowfullscreen', '');
      videoYTWrap.style.display = "block";
    } else if (data.introLocal) {
      videoEl.src = data.introLocal;
      videoLocalWrap.style.display = "block";
    }
  }

  if (startersEl) {
    startersEl.innerHTML = "";
    (data.starters || []).forEach((s) => {
      const typeClass = "type-" + (s.type || "").split(/[\/,]/)[0].toLowerCase();
      const cardHtml = `
        <div class="p-2">
          <div class="pokedex-card shadow text-center" style="padding:10px; min-width:140px;">
            <img src="${s.img || 'assets/images/pokemon/placeholder.png'}" alt="${s.name}" style="width:110px;height:110px;object-fit:contain;">
            <div class="mt-2"><strong>#${padNumber(s.number)} ${s.name}</strong></div>
            <div class="mt-1"><span class="badge ${typeClass}">${s.type}</span></div>
          </div>
        </div>`;
      const node = createElementFromHTML(cardHtml);
      startersEl.appendChild(node);
    });
  }

  if (titleEl) {
    titleEl.setAttribute("tabindex", "-1");
    titleEl.focus({ preventScroll: true });
  }
}

function initRegionPage(regionKey) {
  try {
    const key = regionKey || "kanto";
    const data = regionsData[key];
    if (!data) {
      console.warn("regions.js: región no encontrada:", key);
      return;
    }
    renderRegionTemplate(data);
  } catch (err) {
    console.error("regions.js: error inicializando la página de región", err);
  }
}

async function loadRegionsFromJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo cargar regions.json");
    const json = await res.json();
    Object.keys(json).forEach((k) => {
      regionsData[k] = json[k];
    });
    return true;
  } catch (err) {
    console.error("regions.js: error cargando JSON de regiones", err);
    return false;
  }
}

window.regionsData = regionsData;
window.initRegionPage = initRegionPage;
window.loadRegionsFromJSON = loadRegionsFromJSON;

document.addEventListener("DOMContentLoaded", () => {
  try {
    const regionEl = document.getElementById("region-detail");
    if (!regionEl) return;
    const regionKey = regionEl.dataset?.region || "kanto";
    initRegionPage(regionKey);
  } catch (e) {
    console.error("regions.js: error en auto-inicialización", e);
  }
});
