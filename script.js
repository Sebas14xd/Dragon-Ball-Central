
// Funciones de utilidad
function showLoader() {
    document.getElementById('loader').classList.remove('d-none');
}

function hideLoader() {
    document.getElementById('loader').classList.add('d-none');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navegación SPA
async function showSection(id) {
    showLoader();
    // Pequeño delay para suavidad
    await new Promise(r => setTimeout(r, 400));

    document.querySelectorAll('.section-content').forEach(s => s.classList.add('d-none'));
    
    const active = document.getElementById(id);
    if (active) {
        active.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Animaciones AOS re-init
        AOS.refresh();
    }

    // Cerrar menú móvil si está abierto
    const navbar = document.getElementById('navbarNav');
    if (navbar.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbar).hide();
    }

    hideLoader();
}

// Renderizado de Personajes (Diseño mejorado)
function renderCharacters(characters) {
    const container = document.querySelector('#charactersContainer');
    if (!container) return;

    container.innerHTML = characters.map(c => `
        <div class="col-md-6 col-lg-4" data-aos="zoom-in">
            <div class="card h-100 character-card border-0 shadow-lg">
                <div class="card-img-wrapper">
                    <img src="${c.imagenes[0]}" class="card-img-top" alt="${c.Personaje}" 
                         onerror="this.src='https://via.placeholder.com/400x500/111/f57c00?text=${c.Personaje}'">
                    <div class="character-overlay">
                        <span class="badge bg-warning text-dark">${c.Raza}</span>
                        <span class="badge bg-outline-warning">Universo ${c.Universo}</span>
                    </div>
                </div>
                <div class="card-body bg-dark text-light border-top border-warning border-4">
                    <h3 class="h4 fw-bold text-warning mb-2">${c.Personaje}</h3>
                    <p class="small text-secondary mb-3">${c.descripcion}</p>
                    
                    <div class="stats-box mb-3">
                        ${Object.entries(c.stats).map(([stat, val]) => `
                            <div class="stat-row">
                                <span class="stat-label">${stat.toUpperCase()}</span>
                                <div class="progress bg-secondary" style="height: 6px;">
                                    <div class="progress-bar bg-warning" style="width: ${val}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="mt-auto">
                        <h6 class="text-warning small fw-bold">TÉCNICAS:</h6>
                        <div class="d-flex flex-wrap gap-1">
                            ${c.tecnicas.slice(0, 3).map(t => `<span class="badge bg-dark-secondary border border-warning tiny-badge">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizado de Series/Películas (Diseño tipo Póster)
function renderMedia(data, containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) return;

    container.innerHTML = data.map(item => `
        <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up">
            <div class="media-card card h-100 bg-transparent border-0 shadow">
                <div class="poster-wrapper">
                    <img src="${item.imagen}" class="card-img poster-img" alt="${item.titulo}"
                         onerror="this.src='https://via.placeholder.com/300x450/111/f57c00?text=${item.titulo}'">
                    <div class="poster-info">
                        <h5 class="fw-bold mb-1">${item.titulo}</h5>
                        <p class="x-small mb-0">${item.info || ''}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizado de Sagas
function renderSagas(sagas) {
    const container = document.querySelector('#sagasContainer');
    if (!container) return;

    container.innerHTML = sagas.map(era => `
        <div class="col-md-4" data-aos="fade-right">
            <div class="card bg-dark-secondary border-warning h-100 p-4 saga-card">
                <h4 class="text-warning fw-bold border-bottom border-warning pb-2 mb-3">${era.era}</h4>
                <ul class="list-unstyled text-light">
                    ${era.lista.map(saga => `
                        <li class="mb-2"><i class="bi bi-chevron-right text-warning me-2"></i>${saga}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Renderizado de Esferas
function renderEsferas(esferas) {
    const container = document.querySelector('#esferasContainer');
    if (!container) return;

    container.innerHTML = esferas.map(e => `
        <div class="col-md-6" data-aos="flip-up">
            <div class="card bg-dark-secondary border-${e.color} p-4 h-100 dragonball-card shadow">
                <div class="d-flex align-items-center mb-3">
                    <div class="ball-icon me-3 bg-${e.color}">⭐</div>
                    <h4 class="text-${e.color} fw-bold mb-0">${e.nombre}</h4>
                </div>
                <p class="text-light small mb-2"><strong>Dragón:</strong> ${e.dragon}</p>
                <p class="text-secondary small mb-0">${e.descripcion}</p>
            </div>
        </div>
    `).join('');
}

// Renderizado de Universos
function renderUniversos(universos) {
    const container = document.querySelector('#universosContainer');
    if (!container) return;

    container.innerHTML = `
        <table class="table table-dark table-hover table-bordered border-secondary mt-3">
            <thead class="table-warning text-dark">
                <tr>
                    <th>ID</th>
                    <th>Dios de la Destrucción</th>
                    <th>Ángel</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                ${universos.map(u => `
                    <tr class="${u.highlight ? 'table-active border-warning' : ''}">
                        <td>${u.id}</td>
                        <td class="${u.highlight ? 'text-warning fw-bold' : ''}">${u.dios}</td>
                        <td class="${u.highlight ? 'text-warning fw-bold' : ''}">${u.angel}</td>
                        <td class="small">${u.info}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Evento Inicial
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const api = window.api;
        if (!api) throw new Error("API no cargada");

        // Cargar todo en paralelo para máxima velocidad
        const [characters, media, world] = await Promise.all([
            api.getCharacters(),
            api.getMedia(),
            api.getWorld()
        ]);

        if (characters) renderCharacters(characters);
        
        if (media) {
            if (media.series) renderMedia(media.series, 'seriesContainer');
            if (media.mangas) renderMedia(media.mangas, 'mangasContainer');
            if (media.peliculas) renderMedia(media.peliculas, 'peliculasContainer');
            if (media.videojuegos) renderMedia(media.videojuegos, 'videojuegosContainer');
        }

        if (world) {
            if (world.sagas) renderSagas(world.sagas);
            if (world.esferas) renderEsferas(world.esferas);
            if (world.universos) renderUniversos(world.universos);
        }

    } catch (error) {
        console.error("Error inicializando la página:", error);
    } finally {
        // Aseguramos que el loader desaparezca pase lo que pase
        setTimeout(hideLoader, 800);
    }
});
