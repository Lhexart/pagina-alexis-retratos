/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DEL PORTAFOLIO
   Proyecto: Portafolio de Retratos a Lápiz por Alexis
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // 0. SISTEMA DE TEMAS CLARO / OSCURO (CON PERSISTENCIA)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const savedTheme = localStorage.getItem("theme") || "dark";

    function setTheme(theme) {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Cambiar a ambiente oscuro");
                themeToggleBtn.setAttribute("title", "Cambiar a ambiente oscuro");
            }
        } else {
            document.documentElement.removeAttribute("data-theme");
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute("aria-label", "Cambiar a ambiente claro");
                themeToggleBtn.setAttribute("title", "Cambiar a ambiente claro");
            }
        }
        localStorage.setItem("theme", theme);
    }

    // Inicializar tema guardado
    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
            const newTheme = currentTheme === "light" ? "dark" : "light";
            setTheme(newTheme);
        });
    }

    // ----------------------------------------------------------------------
    // 1. SLIDESHOW AUTOMÁTICO EN HERO + MICRO-TILT EDITORIAL
    // ----------------------------------------------------------------------

    // Los mejores dibujos para el slideshow del hero
    const HERO_SLIDES = [
        { src: "assets/images/hero/nro38.1.jpg",    title: "Retrato Hiperrealista de Rostro",    tech: "Grafito & Carboncillo sobre papel Canson 300g — Formato A3" },
        { src: "assets/images/hero/nro89.1.jpg",     title: "Retrato de Lionel Messi",            tech: "Grafito graduado (2H a 8B) — Formato A3" },
        { src: "assets/images/personas/nro56.jpg",   title: "Retrato Hiperrealista de Rostro",    tech: "Grafito & Carboncillo sobre papel Canson 300g — Formato A3" },
        { src: "assets/images/hero/nro89.jpg",       title: "Retrato Individual",                 tech: "Grafito sobre papel Canson 300g — Formato A4" },
        { src: "assets/images/hero/Nro3.1.jpg",      title: "Retrato Familiar / Pareja",          tech: "Formato A3 en papel libre de ácido" },
        { src: "assets/images/personas/(21).jpg",    title: "Mirada en Sombra",                   tech: "Estudio de luces y claroscuro en carboncillo — Formato A4" },
        { src: "assets/images/personas/nro91.1.jpg", title: "Expresión Realista",                 tech: "Papel de algodón de textura fina — Formato A3" },
    ];

    const heroFrame = document.getElementById("hero-artwork-frame");
    const heroImg   = document.getElementById("hero-interactive-img");

    if (heroFrame && heroImg) {
        let currentSlide = 0;
        let slideshowTimer = null;
        let isTransitioning = false;

        // Imagen de fondo (sale) — se crea una sola vez
        const heroBgImg = document.createElement("img");
        heroBgImg.className = "hero-bg-img";
        heroBgImg.alt = "";
        heroBgImg.setAttribute("aria-hidden", "true");
        heroBgImg.src = HERO_SLIDES[0].src;
        heroFrame.insertBefore(heroBgImg, heroImg);

        function goToSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const slide = HERO_SLIDES[index];

            // La bg muestra la imagen ACTUAL (la que va a salir)
            heroBgImg.src = heroImg.src;
            heroBgImg.style.opacity = "1";

            // La imagen frontal cambia al nuevo slide y hace fade-in
            heroImg.style.opacity = "0";
            heroImg.src = slide.src;

            heroImg.onload = function () {
                // Pequeño delay para que el navegador pinte la nueva imagen antes del fade
                requestAnimationFrame(() => {
                    heroImg.style.opacity = "1";
                    // La bg desaparece sutilmente detrás
                    setTimeout(() => {
                        heroBgImg.style.opacity = "0";
                        isTransitioning = false;
                    }, 200);
                });
            };

            // Actualizar el click del lightbox para abrir el slide actual
            heroFrame.onclick = function () {
                openModal(slide.src, slide.title, slide.tech);
            };
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % HERO_SLIDES.length;
            goToSlide(currentSlide);
        }

        function startSlideshow() {
            slideshowTimer = setInterval(nextSlide, 4500);
        }

        function stopSlideshow() {
            clearInterval(slideshowTimer);
        }

        // Pausar al hacer hover (para que el usuario pueda apreciar la imagen)
        heroFrame.addEventListener("mouseenter", stopSlideshow);
        heroFrame.addEventListener("mouseleave", function () {
            heroFrame.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            heroFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
            heroImg.style.transform = "scale(1) translate(0px, 0px)";
            setTimeout(() => {
                if (heroFrame) heroFrame.style.animationPlayState = "running";
            }, 600);
            startSlideshow();
        });

        // Micro-tilt al mover el mouse
        heroFrame.addEventListener("mousemove", function (e) {
            const rect = heroFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = ((x - centerX) / centerX) * 2.5;
            const moveY = ((y - centerY) / centerY) * 2.5;
            const rotateX = ((centerY - y) / centerY) * 1.0;
            const rotateY = ((x - centerX) / centerX) * 1.0;

            heroFrame.style.animationPlayState = "paused";
            heroFrame.style.transition = "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)";
            heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            heroImg.style.transform = `scale(1.02) translate(${moveX}px, ${moveY}px)`;
        });

        // Click inicial abre el primer slide
        heroFrame.addEventListener("click", function () {
            openModal(HERO_SLIDES[currentSlide].src, HERO_SLIDES[currentSlide].title, HERO_SLIDES[currentSlide].tech);
        });

        // Arrancar el slideshow
        startSlideshow();
    }

    // ----------------------------------------------------------------------
    // 2. RENDERIZADO Y FILTRADO DINÁMICO DE LA GALERÍA CON CARGA PROGRESIVA
    // ----------------------------------------------------------------------
    const categoryFiltersContainer = document.getElementById("category-filters");
    const dynamicGalleryGrid = document.getElementById("dynamic-gallery");
    const loadMoreContainer = document.getElementById("gallery-load-more-container");
    const loadMoreBtn = document.getElementById("load-more-btn");

    const INITIAL_VISIBLE_COUNT = 9;
    const ITEMS_PER_LOAD = 6;

    let currentCategory = "todas";
    let currentVisibleCount = INITIAL_VISIBLE_COUNT;
    let activeWorksList = [];
    let currentActiveIndex = -1;

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
                if (currentCategory === cat.id) return;
                currentCategory = cat.id;
                document.querySelectorAll(".category-btn").forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");
                currentVisibleCount = INITIAL_VISIBLE_COUNT;
                renderGallery(currentCategory, false);
            });

            categoryFiltersContainer.appendChild(btn);
        });
    }

    function createArtworkCard(work, index, staggerIndex = 0) {
        const article = document.createElement("article");
        article.className = "artwork-card filter-trigger reveal-on-scroll";
        article.style.transitionDelay = `${(staggerIndex % 6) * 0.05}s`;
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
            openModalByIndex(index);
        });

        article.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModalByIndex(index);
            }
        });

        return article;
    }

    function renderGallery(category, append = false) {
        if (!dynamicGalleryGrid || typeof WORKS_DATA === "undefined") return;

        const filteredWorks = category === "todas" 
            ? WORKS_DATA 
            : WORKS_DATA.filter(work => work.category === category);

        activeWorksList = filteredWorks; // Guardar obras filtradas completas para Lightbox

        const totalItems = filteredWorks.length;
        let startIndex = 0;

        if (!append) {
            dynamicGalleryGrid.innerHTML = "";
            currentVisibleCount = Math.min(INITIAL_VISIBLE_COUNT, totalItems);
            startIndex = 0;
        } else {
            startIndex = dynamicGalleryGrid.children.length;
            currentVisibleCount = Math.min(startIndex + ITEMS_PER_LOAD, totalItems);
        }

        for (let i = startIndex; i < currentVisibleCount; i++) {
            const card = createArtworkCard(filteredWorks[i], i, i - startIndex);
            dynamicGalleryGrid.appendChild(card);
        }

        // Control de visibilidad del botón "Ver más obras"
        if (loadMoreContainer) {
            if (currentVisibleCount < totalItems) {
                loadMoreContainer.style.display = "flex";
            } else {
                loadMoreContainer.style.display = "none";
            }
        }

        // Observar las nuevas cards de la galería para animación de entrada
        observeRevealElements();
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            renderGallery(currentCategory, true);
        });
    }

    // ----------------------------------------------------------------------
    // 3. VISOR LIGHTBOX MODAL (#art-modal) — SALA DE EXHIBICIÓN Y ZOOM
    // ----------------------------------------------------------------------
    const artModal = document.getElementById("art-modal");
    const modalImg = document.getElementById("modal-img");
    const modalImageFrame = document.getElementById("modal-image-frame");
    const modalTitle = document.getElementById("modal-title");
    const modalTech = document.getElementById("modal-tech");
    const modalWaBtn = document.getElementById("modal-wa-btn");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");
    const modalCounter = document.getElementById("modal-counter");

    // Controles de Zoom del Toolbar
    const modalZoomInBtn = document.getElementById("modal-zoom-in-btn");
    const modalZoomOutBtn = document.getElementById("modal-zoom-out-btn");
    const modalZoomResetBtn = document.getElementById("modal-zoom-reset-btn");
    const modalZoomLevel = document.getElementById("modal-zoom-level");

    // Estado del Zoom y Panning en Alta Definición
    let zoomScale = 1;
    let zoomTranslateX = 0;
    let zoomTranslateY = 0;
    let baseWidth = 0;
    let baseHeight = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialTouchDist = 0;
    let initialTouchScale = 1;
    let lastTapTime = 0;

    function calculateBaseDimensions() {
        if (!modalImageFrame || !modalImg || !modalImg.naturalWidth) return;
        const frameW = modalImageFrame.clientWidth;
        const frameH = modalImageFrame.clientHeight;
        if (frameW === 0 || frameH === 0) return;

        const padX = window.innerWidth < 768 ? 0.95 : 0.88;
        const padH = window.innerWidth < 768 ? 0.94 : 0.92;

        const maxW = Math.max(80, frameW * padX);
        const maxH = Math.max(80, frameH * padH);

        const imgRatio = modalImg.naturalWidth / modalImg.naturalHeight;
        const boxRatio = maxW / maxH;

        if (imgRatio > boxRatio) {
            baseWidth = Math.min(modalImg.naturalWidth, maxW);
            baseHeight = baseWidth / imgRatio;
        } else {
            baseHeight = Math.min(modalImg.naturalHeight, maxH);
            baseWidth = baseHeight * imgRatio;
        }
    }

    function applyZoom(animate = false) {
        if (!modalImg || !modalImageFrame) return;

        if (baseWidth === 0 || baseHeight === 0) {
            calculateBaseDimensions();
        }

        if (zoomScale <= 1) {
            zoomScale = 1;
            zoomTranslateX = 0;
            zoomTranslateY = 0;
            modalImg.style.cursor = "zoom-in";
            modalImg.style.maxWidth = "88vw";
            modalImg.style.maxHeight = "calc(100vh - 145px)";
            if (baseWidth > 0 && baseHeight > 0) {
                modalImg.style.width = `${Math.round(baseWidth)}px`;
                modalImg.style.height = `${Math.round(baseHeight)}px`;
            } else {
                modalImg.style.width = "auto";
                modalImg.style.height = "auto";
            }
            modalImg.style.transition = animate ? "width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
            modalImg.style.transform = "translate3d(0px, 0px, 0px)";
        } else {
            const frameW = modalImageFrame.clientWidth;
            const frameH = modalImageFrame.clientHeight;

            const currentW = Math.round(baseWidth * zoomScale);
            const currentH = Math.round(baseHeight * zoomScale);

            const maxX = Math.max(0, (currentW - frameW) / 2 + 40);
            const maxY = Math.max(0, (currentH - frameH) / 2 + 40);

            zoomTranslateX = Math.max(-maxX, Math.min(maxX, zoomTranslateX));
            zoomTranslateY = Math.max(-maxY, Math.min(maxY, zoomTranslateY));

            modalImg.style.cursor = isDragging ? "grabbing" : "grab";
            modalImg.style.maxWidth = "none";
            modalImg.style.maxHeight = "none";
            modalImg.style.width = `${currentW}px`;
            modalImg.style.height = `${currentH}px`;
            modalImg.style.transition = animate ? "width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
            modalImg.style.transform = `translate3d(${Math.round(zoomTranslateX)}px, ${Math.round(zoomTranslateY)}px, 0px)`;
        }

        if (modalZoomLevel) {
            modalZoomLevel.textContent = `${Math.round(zoomScale * 100)}%`;
        }
    }

    function applyPanOnly() {
        if (!modalImg || !modalImageFrame || zoomScale <= 1) return;
        const frameW = modalImageFrame.clientWidth;
        const frameH = modalImageFrame.clientHeight;
        const currentW = Math.round(baseWidth * zoomScale);
        const currentH = Math.round(baseHeight * zoomScale);

        const maxX = Math.max(0, (currentW - frameW) / 2 + 40);
        const maxY = Math.max(0, (currentH - frameH) / 2 + 40);

        zoomTranslateX = Math.max(-maxX, Math.min(maxX, zoomTranslateX));
        zoomTranslateY = Math.max(-maxY, Math.min(maxY, zoomTranslateY));

        modalImg.style.transition = "none";
        modalImg.style.transform = `translate3d(${Math.round(zoomTranslateX)}px, ${Math.round(zoomTranslateY)}px, 0px)`;
    }

    function resetLightboxZoom(animate = true) {
        zoomScale = 1;
        zoomTranslateX = 0;
        zoomTranslateY = 0;
        isDragging = false;
        applyZoom(animate);
    }

    function setZoom(newScale, animate = true) {
        const prevScale = zoomScale;
        zoomScale = Math.min(Math.max(newScale, 1), 5);
        if (zoomScale === 1) {
            zoomTranslateX = 0;
            zoomTranslateY = 0;
        } else if (prevScale > 0 && zoomScale !== prevScale) {
            const ratio = zoomScale / prevScale;
            zoomTranslateX *= ratio;
            zoomTranslateY *= ratio;
        }
        applyZoom(animate);
    }

    // Botones de Zoom
    if (modalZoomInBtn) {
        modalZoomInBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            setZoom(zoomScale + 0.6, true);
        });
    }

    if (modalZoomOutBtn) {
        modalZoomOutBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            setZoom(zoomScale - 0.6, true);
        });
    }

    if (modalZoomResetBtn) {
        modalZoomResetBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            resetLightboxZoom(true);
        });
    }

    if (modalImageFrame && modalImg) {
        // Zoom con rueda del mouse (Desktop)
        modalImageFrame.addEventListener("wheel", (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.35 : -0.35;
            setZoom(zoomScale + delta, false);
        }, { passive: false });

        // Doble clic para alternar zoom (Desktop)
        modalImg.addEventListener("dblclick", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (zoomScale > 1.1) {
                resetLightboxZoom(true);
            } else {
                setZoom(2.5, true);
            }
        });

        // Arrastre con Mouse (Desktop)
        modalImg.addEventListener("mousedown", (e) => {
            if (zoomScale > 1) {
                e.preventDefault();
                isDragging = true;
                dragStartX = e.clientX - zoomTranslateX;
                dragStartY = e.clientY - zoomTranslateY;
                modalImg.style.cursor = "grabbing";
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (isDragging && zoomScale > 1) {
                e.preventDefault();
                zoomTranslateX = e.clientX - dragStartX;
                zoomTranslateY = e.clientY - dragStartY;
                applyPanOnly();
            }
        });

        window.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                if (modalImg && zoomScale > 1) {
                    modalImg.style.cursor = "grab";
                }
            }
        });

        // Gestos Táctiles (Mobile: Pinch-to-zoom, Pan y Doble toque)
        function getTouchDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        modalImageFrame.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                initialTouchDist = getTouchDistance(e.touches);
                initialTouchScale = zoomScale;
            } else if (e.touches.length === 1) {
                const now = Date.now();
                if (now - lastTapTime < 320) {
                    // Doble toque
                    e.preventDefault();
                    if (zoomScale > 1.1) {
                        resetLightboxZoom(true);
                    } else {
                        setZoom(2.5, true);
                    }
                } else if (zoomScale > 1) {
                    isDragging = true;
                    dragStartX = e.touches[0].clientX - zoomTranslateX;
                    dragStartY = e.touches[0].clientY - zoomTranslateY;
                }
                lastTapTime = now;
            }
        }, { passive: false });

        modalImageFrame.addEventListener("touchmove", (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dist = getTouchDistance(e.touches);
                if (initialTouchDist > 0) {
                    const factor = dist / initialTouchDist;
                    setZoom(initialTouchScale * factor, false);
                }
            } else if (e.touches.length === 1 && isDragging && zoomScale > 1) {
                e.preventDefault();
                zoomTranslateX = e.touches[0].clientX - dragStartX;
                zoomTranslateY = e.touches[0].clientY - dragStartY;
                applyPanOnly();
            }
        }, { passive: false });

        modalImageFrame.addEventListener("touchend", (e) => {
            if (e.touches.length < 2) {
                initialTouchDist = 0;
            }
            if (e.touches.length === 0) {
                isDragging = false;
                if (zoomScale <= 1) {
                    resetLightboxZoom(false);
                }
            }
        });
    }

    // Reajuste en redimensionado de ventana
    window.addEventListener("resize", () => {
        if (artModal && artModal.classList.contains("active")) {
            calculateBaseDimensions();
            applyZoom(false);
        }
    });

    function updateModalCounter() {
        if (!modalCounter) return;
        if (currentActiveIndex >= 0 && activeWorksList.length > 0) {
            const currentNum = String(currentActiveIndex + 1).padStart(2, "0");
            const totalNum = String(activeWorksList.length).padStart(2, "0");
            modalCounter.textContent = `${currentNum} / ${totalNum}`;
            modalCounter.style.visibility = "visible";
            if (modalPrevBtn) modalPrevBtn.style.visibility = "visible";
            if (modalNextBtn) modalNextBtn.style.visibility = "visible";
        } else {
            modalCounter.style.visibility = "hidden";
            if (modalPrevBtn) modalPrevBtn.style.visibility = "hidden";
            if (modalNextBtn) modalNextBtn.style.visibility = "hidden";
        }
    }

    function openModalByIndex(index) {
        if (index < 0 || index >= activeWorksList.length) return;
        currentActiveIndex = index;
        const work = activeWorksList[index];
        openModal(work.image, work.title, `${work.technique} — ${work.format}`);
    }

    function showNextArtwork() {
        if (activeWorksList.length === 0 || currentActiveIndex < 0) return;
        let nextIndex = currentActiveIndex + 1;
        if (nextIndex >= activeWorksList.length) {
            nextIndex = 0;
        }
        openModalByIndex(nextIndex);
    }

    function showPrevArtwork() {
        if (activeWorksList.length === 0 || currentActiveIndex < 0) return;
        let prevIndex = currentActiveIndex - 1;
        if (prevIndex < 0) {
            prevIndex = activeWorksList.length - 1;
        }
        openModalByIndex(prevIndex);
    }

    if (modalPrevBtn) {
        modalPrevBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            showPrevArtwork();
        });
    }

    if (modalNextBtn) {
        modalNextBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            showNextArtwork();
        });
    }

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

        updateModalCounter();

        artModal.classList.add("active");
        artModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");

        const onImgReady = () => {
            calculateBaseDimensions();
            resetLightboxZoom(false);
        };

        if (modalImg.complete && modalImg.naturalWidth) {
            requestAnimationFrame(onImgReady);
        } else {
            modalImg.onload = onImgReady;
        }

        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
        if (!artModal) return;
        resetLightboxZoom(false);
        currentActiveIndex = -1;
        artModal.classList.remove("active");
        artModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (artModal && artModal.classList.contains("active")) {
            if (e.key === "Escape") {
                closeModal();
            } else if (e.key === "ArrowRight") {
                showNextArtwork();
            } else if (e.key === "ArrowLeft") {
                showPrevArtwork();
            } else if (e.key === "+" || e.key === "=") {
                setZoom(zoomScale + 0.5, true);
            } else if (e.key === "-" || e.key === "_") {
                setZoom(zoomScale - 0.5, true);
            } else if (e.key === "0") {
                resetLightboxZoom(true);
            }
        }
    });

    // Soporte para gestos táctiles de cambio de obra (Swipe) cuando zoomScale === 1
    let touchStartX = 0;
    let touchEndX = 0;

    if (modalImageFrame) {
        modalImageFrame.addEventListener("touchstart", (e) => {
            if (zoomScale === 1 && e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
            }
        }, { passive: true });

        modalImageFrame.addEventListener("touchend", (e) => {
            if (zoomScale === 1 && touchStartX > 0) {
                touchEndX = e.changedTouches[0].clientX;
                const diffX = touchStartX - touchEndX;
                const threshold = 55;
                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        showNextArtwork();
                    } else {
                        showPrevArtwork();
                    }
                }
                touchStartX = 0;
            }
        }, { passive: true });
    }

    // ----------------------------------------------------------------------
    // 4. REVEAL ELEGANTE AL HACER SCROLL (INTERSECTION OBSERVER)
    // ----------------------------------------------------------------------
    let revealObserver = null;

    function initScrollReveal() {
        const revealTargets = document.querySelectorAll(
            ".section-header, .comparison-slider, .process-feature, .step-card, .about-card, .contact-card, .hero-text-side"
        );

        revealTargets.forEach((el) => {
            el.classList.add("reveal-on-scroll");
        });

        if ("IntersectionObserver" in window) {
            const observerOptions = {
                root: null,
                rootMargin: "0px 0px -40px 0px",
                threshold: 0.08
            };

            revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            observeRevealElements();
        } else {
            document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
                el.classList.add("revealed");
            });
        }
    }

    function observeRevealElements() {
        if (!revealObserver) return;
        document.querySelectorAll(".reveal-on-scroll:not(.revealed)").forEach((el) => {
            revealObserver.observe(el);
        });
    }

    // ----------------------------------------------------------------------
    // 5. NAVEGACIÓN MÓVIL ACCESIBLE
    // ----------------------------------------------------------------------
    const menuToggleBtn = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggleBtn && mainNav) {
        menuToggleBtn.addEventListener("click", function () {
            const isOpen = menuToggleBtn.getAttribute("aria-expanded") === "true";
            menuToggleBtn.setAttribute("aria-expanded", !isOpen);
            mainNav.classList.toggle("active", !isOpen);
        });

        const navLinks = mainNav.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", function () {
                menuToggleBtn.setAttribute("aria-expanded", "false");
                mainNav.classList.remove("active");
            });
        });
        
        document.addEventListener("click", function (e) {
            if (!mainNav.contains(e.target) && !menuToggleBtn.contains(e.target) && mainNav.classList.contains("active")) {
                menuToggleBtn.setAttribute("aria-expanded", "false");
                mainNav.classList.remove("active");
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. COMPARADOR DESLIZANTE ANTES / DESPUÉS (SLIDER INTERACTIVO)
    // ----------------------------------------------------------------------
    const beforeAfterSlider = document.getElementById("before-after-slider");
    const sliderAfterLayer = document.getElementById("slider-after-layer");
    const sliderHandle = document.getElementById("slider-handle");

    if (beforeAfterSlider && sliderAfterLayer && sliderHandle) {
        let isResizing = false;

        function setSliderPosition(clientX) {
            const rect = beforeAfterSlider.getBoundingClientRect();
            const offsetX = clientX - rect.left;
            let percentage = (offsetX / rect.width) * 100;

            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            sliderAfterLayer.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        }

        sliderHandle.addEventListener("mousedown", function (e) {
            e.preventDefault();
            isResizing = true;
        });

        window.addEventListener("mouseup", function () {
            isResizing = false;
        });

        window.addEventListener("mousemove", function (e) {
            if (!isResizing) return;
            setSliderPosition(e.clientX);
        });

        sliderHandle.addEventListener("touchstart", function () {
            isResizing = true;
        }, { passive: true });

        window.addEventListener("touchend", function () {
            isResizing = false;
        });

        window.addEventListener("touchmove", function (e) {
            if (!isResizing) return;
            if (e.touches.length > 0) {
                setSliderPosition(e.touches[0].clientX);
            }
        }, { passive: true });

        beforeAfterSlider.addEventListener("click", function (e) {
            if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
                setSliderPosition(e.clientX);
            }
        });
    }

    // Inicializar Microinteracciones & Galería
    initScrollReveal();
    renderCategoryFilters();
    renderGallery("todas");
});
