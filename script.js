/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DEL PORTAFOLIO
   Proyecto: Portafolio de Retratos a Lápiz por Alexis
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // 1. MICRO-TILT EDITORIAL EN HERO (Alternativa A)
    // ----------------------------------------------------------------------
    const heroFrame = document.getElementById("hero-artwork-frame");
    const heroImg = document.getElementById("hero-interactive-img");

    if (heroFrame && heroImg) {
        heroFrame.addEventListener("mousemove", function (e) {
            const rect = heroFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = ((x - centerX) / centerX) * 3;
            const moveY = ((y - centerY) / centerY) * 3;
            const rotateX = ((centerY - y) / centerY) * 1.2;
            const rotateY = ((x - centerX) / centerX) * 1.2;

            heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            heroImg.style.transform = `scale(1.025) translate(${moveX}px, ${moveY}px)`;
        });

        heroFrame.addEventListener("mouseleave", function () {
            heroFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
            heroImg.style.transform = "scale(1) translate(0px, 0px)";
        });

        heroFrame.addEventListener("click", function () {
            openModal("assets/images/personas/(3).jpg", "Retrato Hiperrealista de Rostro", "Grafito & Carboncillo sobre papel Canson 300g — Formato A3");
        });
    }

    // ----------------------------------------------------------------------
    // 2. RENDERIZADO Y FILTRADO DINÁMICO DE LA GALERÍA (WORKS_DATA)
    // ----------------------------------------------------------------------
    const categoryFiltersContainer = document.getElementById("category-filters");
    const dynamicGalleryGrid = document.getElementById("dynamic-gallery");
    let currentCategory = "todas";

    function renderCategoryFilters() {
        if (!categoryFiltersContainer || typeof GALLERY_CATEGORIES === "undefined") return;
        categoryFiltersContainer.innerHTML = "";

        GALLERY_CATEGORIES.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `category-btn ${cat.id === currentCategory ? "active" : ""}`;
            btn.setAttribute("type", "button");
            btn.setAttribute("role", "tab");
            btn.setAttribute("aria-selected", cat.id === currentCategory ? "true" : "false");
            btn.textContent = cat.label;

            btn.addEventListener("click", () => {
                currentCategory = cat.id;
                document.querySelectorAll(".category-btn").forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");
                renderGallery(currentCategory);
            });

            categoryFiltersContainer.appendChild(btn);
        });
    }

    function renderGallery(category) {
        if (!dynamicGalleryGrid || typeof WORKS_DATA === "undefined") return;
        dynamicGalleryGrid.innerHTML = "";

        const filteredWorks = category === "todas" 
            ? WORKS_DATA 
            : WORKS_DATA.filter(work => work.category === category);

        filteredWorks.forEach(work => {
            const article = document.createElement("article");
            article.className = "artwork-card filter-trigger";
            article.setAttribute("data-title", work.title);
            article.setAttribute("data-tech", `${work.technique} — ${work.format}`);
            article.setAttribute("role", "button");
            article.setAttribute("tabindex", "0");
            article.setAttribute("aria-label", `Ver ${work.title} en detalle`);

            article.innerHTML = `
                <div class="artwork-image">
                    <img src="${work.image}" alt="${work.title} - Retrato a lápiz por Alexis" loading="lazy">
                    <div class="view-overlay">
                        <span>Ver en detalle</span>
                    </div>
                </div>
                <div class="artwork-info">
                    <h3>${work.title}</h3>
                    <p>${work.technique}</p>
                </div>
            `;

            article.addEventListener("click", () => {
                openModal(work.image, work.title, `${work.technique} — ${work.format}`);
            });

            article.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(work.image, work.title, `${work.technique} — ${work.format}`);
                }
            });

            dynamicGalleryGrid.appendChild(article);
        });
    }

    // ----------------------------------------------------------------------
    // 3. VISOR LIGHTBOX MODAL (#art-modal)
    // ----------------------------------------------------------------------
    const artModal = document.getElementById("art-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalTech = document.getElementById("modal-tech");
    const modalWaBtn = document.getElementById("modal-wa-btn");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    const modalBackdrop = document.querySelector(".modal-backdrop");

    function openModal(imgSrc, title, tech) {
        if (!artModal || !modalImg) return;
        modalImg.src = imgSrc;
        modalImg.alt = title || "Retrato a lápiz por Alexis";

        if (modalTitle) modalTitle.textContent = title || "Obra a Lápiz";
        if (modalTech) modalTech.textContent = tech || "Grafito sobre papel Canson 300g";

        if (modalWaBtn) {
            const encodedTitle = encodeURIComponent(title || "esta obra");
            modalWaBtn.href = `https://wa.me/?text=Hola%20Alexis,%20estaba%20viendo%20tu%20web%20y%20me%20interes%C3%B3%20la%20obra%20"${encodedTitle}".%20Quisiera%20consultar%20presupuesto%20para%20un%20encargo%20similar.`;
        }

        artModal.classList.add("active");
        artModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");

        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
        if (!artModal) return;
        artModal.classList.remove("active");
        artModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && artModal && artModal.classList.contains("active")) {
            closeModal();
        }
    });

    // Inicializar Galería
    renderCategoryFilters();
    renderGallery("todas");
});
