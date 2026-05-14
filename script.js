
// DRAGON BALL CENTRAL - MODERN DASHBOARD ENGINE

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

async function initDashboard() {
    // Inicializar navegación y carga de datos
    setupNavigation();
    await loadInitialData();
    
    // Ocultar loader inicial
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 800);
}

async function loadInitialData() {
    try {
        const characters = await window.api.getCharacters();
        const media = await window.api.getMedia();
        const world = await window.api.getWorld();

        renderAll(characters, media, world);
    } catch (error) {
        showError("No se pudieron cargar los datos del multiverso.");
    }
}

function setupNavigation() {
    // El primer render ya está en 'inicio' por defecto
    showSection('inicio');
}

function showSection(sectionId) {
    // Ocultar todas las secciones con transición suave
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        section.classList.add('d-none');
    });

    // Mostrar sección activa
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('d-none');
        // Trigger AOS para re-animar si es necesario
        if (window.AOS) AOS.refresh();
    }

    // Actualizar Sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes(`'${sectionId}'`)) {
            item.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll(characters, media, world) {
    renderCharacters(characters);
    renderMedia(media);
    renderWorld(world);
}

function renderCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    if (!container) return;

    container.innerHTML = characters.map(char => `
        <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up">
            <div class="premium-card">
                <div class="card-image-box">
                    <img src="${char.imagenes[0]}" alt="${char.Personaje}">
                    <div class="position-absolute top-0 start-0 m-3">
                        <span class="badge bg-primary rounded-pill shadow-sm">U${char.Universo}</span>
                    </div>
                </div>
                <div class="card-content">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="mb-0 text-white">${char.Personaje}</h5>
                        <span class="text-muted small">${char.Raza}</span>
                    </div>
                    <p class="text-muted small mb-4 line-clamp-2">${char.descripcion}</p>
                    
                    <div class="stats-group">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="text-muted extra-small">KI LEVEL</span>
                            <span class="text-primary extra-small fw-bold">${char.stats.ki}%</span>
                        </div>
                        <div class="progress mb-3" style="height: 4px; background: rgba(255,255,255,0.05)">
                            <div class="progress-bar bg-primary" style="width: ${char.stats.ki}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMedia(media) {
    const categories = {
        'seriesContainer': { data: media.series, label: 'Series' },
        'mangasContainer': { data: media.mangas, label: 'Manga' },
        'peliculasContainer': { data: media.peliculas, label: 'Film' },
        'videojuegosContainer': { data: media.videojuegos, label: 'Game' }
    };

    Object.entries(categories).forEach(([id, { data, label }]) => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = data.map(item => `
                <div class="col-xl-2 col-lg-3 col-md-4 col-6" data-aos="zoom-in">
                    <div class="premium-card">
                        <div class="card-image-box" style="aspect-ratio: 2/3;">
                            <img src="${item.imagen}" alt="${item.titulo}">
                            <div class="position-absolute bottom-0 start-0 w-100 p-3" style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                                <span class="text-primary fw-bold extra-small">${label}</span>
                                <h6 class="text-white small mb-0 text-truncate">${item.titulo}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    });
}

function renderWorld(world) {
    // Sagas
    const sagasContainer = document.getElementById('sagasContainer');
    if (sagasContainer) {
        sagasContainer.innerHTML = world.sagas.map(saga => `
            <div class="col-md-4" data-aos="fade-up">
                <div class="premium-card p-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                            <i class="bi bi-journal-text text-primary"></i>
                        </div>
                        <h5 class="mb-0 text-white">${saga.era}</h5>
                    </div>
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
                        ${saga.lista.map(item => `
                            <li class="text-muted small d-flex align-items-center">
                                <i class="bi bi-check2-circle text-primary me-2"></i> ${item}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    // Esferas
    const esferasContainer = document.getElementById('esferasContainer');
    if (esferasContainer) {
        esferasContainer.innerHTML = world.esferas.map(esfera => `
            <div class="col-md-4" data-aos="fade-up">
                <div class="premium-card p-4 text-center">
                    <div class="mb-3 display-6">✨</div>
                    <h5 class="text-white mb-2">${esfera.nombre}</h5>
                    <p class="text-muted small mb-3">${esfera.descripcion}</p>
                    <span class="badge bg-${esfera.color} bg-opacity-10 text-${esfera.color} border border-${esfera.color} border-opacity-25">${esfera.dragon}</span>
                </div>
            </div>
        `).join('');
    }

    // Universos (Table)
    const universosContainer = document.getElementById('universosContainer');
    if (universosContainer) {
        universosContainer.innerHTML = `
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DIOS DE LA DESTRUCCIÓN</th>
                        <th>ÁNGEL</th>
                        <th>INFORMACIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    ${world.universos.map(u => `
                        <tr class="${u.highlight ? 'bg-primary bg-opacity-5' : ''}">
                            <td class="fw-bold text-primary">U${u.id}</td>
                            <td class="text-white">${u.dios}</td>
                            <td class="text-white">${u.angel}</td>
                            <td class="text-muted small">${u.info}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Biomas
    const biomasContainer = document.getElementById('biomasContainer');
    if (biomasContainer && world.biomas) {
        biomasContainer.innerHTML = world.biomas.map(bioma => `
            <div class="col-md-4" data-aos="fade-up">
                <div class="premium-card p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <h5 class="text-white mb-0">${bioma.nombre}</h5>
                        <i class="bi bi-geo-alt text-primary"></i>
                    </div>
                    <p class="text-muted small mb-0">${bioma.descripcion}</p>
                    <hr class="border-secondary opacity-10">
                    <span class="text-primary extra-small fw-bold">CLIMA: ${bioma.clima.toUpperCase()}</span>
                </div>
            </div>
        `).join('');
    }
}

function showError(msg) {
    console.error(msg);
    // Podría implementarse un toast o mensaje en UI
}

// Estilos extra inyectados para utilidades rápidas
const style = document.createElement('style');
style.textContent = `
    .extra-small { font-size: 0.65rem; letter-spacing: 0.1em; }
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
