let allCharacters = [];

// ═══ LOADER ═══
function getLoader() { return document.getElementById('globalLoader'); }
function showLoader() { const l = getLoader(); if (l) l.classList.remove('hidden'); }
function hideLoader() { const l = getLoader(); if (l) l.classList.add('hidden'); }

// ═══ RENDERIZADO DE PERSONAJES ═══
function renderCharacters(characters) {
    const container = document.querySelector('#charactersContainer');
    if (!container) return;
    container.innerHTML = '';

    if (characters.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><p class="lead text-secondary">No se encontraron datos en la enciclopedia...</p></div>`;
        return;
    }

    characters.forEach((char, index) => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-lg-4 col-xl-3';
        col.setAttribute('data-aos', 'fade-up');
        col.setAttribute('data-aos-delay', (index % 4) * 100);

        let currentImgIndex = 0;
        const images = char.imagenes || [];
        const stats = char.stats || { fuerza: 50, velocidad: 50, ki: 50, tecnica: 50 };
        const totalPower = Math.round((stats.fuerza + stats.velocidad + stats.ki + stats.tecnica) / 4);

        const transformacionesHTML = (char.transformaciones && char.transformaciones.length > 0 && char.transformaciones[0] !== "Ninguna") 
            ? char.transformaciones.map(t => `<span class="badge bg-secondary me-1 mb-1" style="font-size:0.6rem;">${t}</span>`).join('')
            : '<span class="badge bg-dark me-1 mb-1" style="font-size:0.6rem;">Ninguna</span>';
            
        const tecnicasHTML = (char.tecnicas && char.tecnicas.length > 0)
            ? char.tecnicas.map(t => `<span class="badge border border-info text-info me-1 mb-1" style="font-size:0.6rem; background:transparent;">${t}</span>`).join('')
            : '';

        col.innerHTML = `
            <div class="card h-100 character-card-modern shadow">
                <div class="position-relative overflow-hidden" style="background:#000;">
                    ${images.length > 1 ? `
                        <button class="carousel-btn prev-btn"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg></button>
                        <button class="carousel-btn next-btn"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></button>
                        <div class="image-counter">${currentImgIndex + 1} / ${images.length}</div>
                    ` : ''}
                    <img src="${images[0] || ''}" class="card-img-top char-img" alt="${char.Personaje}" onerror="this.src='https://via.placeholder.com/400x500/1a1a1a/f57c00?text=${char.Personaje}'">
                    <div class="badge bg-warning text-dark position-absolute top-0 end-0 m-2 shadow" style="font-size:0.65rem;">U${char.Universo}</div>
                </div>
                <div class="card-body p-3 d-flex flex-column">
                    <h3 class="h5 text-warning fw-bold mb-1">${char.Personaje}</h3>
                    <p class="text-secondary mb-2" style="font-size:0.7rem;">${char.Raza} · ${char['Planeta de origen']}</p>
                    
                    <p class="small text-light mb-2" style="font-size:0.75rem; line-height: 1.2;">${char.descripcion || ''}</p>
                    
                    <div class="mb-2">
                        <strong style="font-size:0.65rem; color:#aaa; text-transform:uppercase;">Técnicas:</strong><br>
                        ${tecnicasHTML}
                    </div>
                    
                    <div class="mb-3">
                        <strong style="font-size:0.65rem; color:#aaa; text-transform:uppercase;">Transformaciones:</strong><br>
                        ${transformacionesHTML}
                    </div>
                    
                    <div class="stats-section mt-auto pt-2 border-top border-secondary">
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.65rem;"><span style="color:#ff6e40;">Fuerza</span><span>${stats.fuerza}%</span></div>
                        <div class="stat-bar-container"><div class="stat-bar-fill fuerza" style="width: ${stats.fuerza}%"></div></div>
                        
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.65rem;"><span style="color:#ffcc00;">Ki</span><span>${stats.ki}%</span></div>
                        <div class="stat-bar-container"><div class="stat-bar-fill ki" style="width: ${stats.ki}%"></div></div>
                        
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.65rem;"><span style="color:#00e5ff;">Velocidad</span><span>${stats.velocidad}%</span></div>
                        <div class="stat-bar-container"><div class="stat-bar-fill velocidad" style="width: ${stats.velocidad}%"></div></div>
                        
                        <div class="d-flex justify-content-between mb-1" style="font-size:0.65rem;"><span style="color:#ec4899;">Técnica</span><span>${stats.tecnica}%</span></div>
                        <div class="stat-bar-container"><div class="stat-bar-fill tecnica" style="width: ${stats.tecnica}%"></div></div>
                    </div>
                </div>
            </div>
        `;

        // Image carousel logic
        if (images.length > 1) {
            const img = col.querySelector('.char-img');
            const counter = col.querySelector('.image-counter');
            const prev = col.querySelector('.prev-btn');
            const next = col.querySelector('.next-btn');
            const update = () => {
                img.style.opacity = 0;
                setTimeout(() => {
                    img.src = images[currentImgIndex];
                    counter.innerText = `${currentImgIndex + 1} / ${images.length}`;
                    img.style.opacity = 1;
                }, 200);
            };
            prev.onclick = (e) => { e.stopPropagation(); currentImgIndex = (currentImgIndex - 1 + images.length) % images.length; update(); };
            next.onclick = (e) => { e.stopPropagation(); currentImgIndex = (currentImgIndex + 1) % images.length; update(); };
        }
        container.appendChild(col);
    });

    if (window.AOS) window.AOS.refresh();
}

// ═══ SECCIONES ═══
async function showSection(id) {
    showLoader();
    await new Promise(r => setTimeout(r, 400)); // Simulando carga de base de datos

    document.querySelectorAll('.section-content').forEach(s => s.classList.add('d-none'));
    const active = document.getElementById(id);
    if (active) {
        active.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Activar link en navbar
    document.querySelectorAll('.nav-link').forEach(l => {
        const isActive = l.getAttribute('href') === `#${id}`;
        l.classList.toggle('active', isActive);
    });
    
    // Si la pantalla es pequeña y el menu está abierto, ciérralo
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
    }
    
    hideLoader();
}
window.showSection = showSection;

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoader, 3000); // Failsafe para loader

    const api = window.api;
    if (!api) { hideLoader(); return; }

    // Cargar personajes
    api.getCharacters().then(data => {
        allCharacters = data;
        renderCharacters(allCharacters);
        setTimeout(hideLoader, 500);
    }).catch(() => hideLoader());

    // Búsqueda de Personajes
    const search = document.getElementById('searchBarPersonajes');
    if (search) {
        search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allCharacters.filter(c =>
                c.Personaje.toLowerCase().includes(term) ||
                c.Raza.toLowerCase().includes(term) ||
                c.Universo.toLowerCase().includes(term) ||
                (c.transformaciones && c.transformaciones.some(t => t.toLowerCase().includes(term)))
            );
            renderCharacters(filtered);
        });
    }

    // Scroll to Top
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
        });
    }
    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});
