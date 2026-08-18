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
    // 1. MICRO-TILT EDITORIAL EN HERO (CON INERCIA Y PAUSA DE FLOTACIÓN)
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

            const moveX = ((x - centerX) / centerX) * 2.5;
            const moveY = ((y - centerY) / centerY) * 2.5;
            const rotateX = ((centerY - y) / centerY) * 1.0;
            const rotateY = ((x - centerX) / centerX) * 1.0;

            heroFrame.style.animationPlayState = "paused";
            heroFrame.style.transition = "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)";
            heroFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            heroImg.style.transform = `scale(1.02) translate(${moveX}px, ${moveY}px)`;
        });

        heroFrame.addEventListener("mouseleave", function () {
            heroFrame.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            heroFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
            heroImg.style.transform = "scale(1) translate(0px, 0px)";
            setTimeout(() => {
                if (heroFrame) heroFrame.style.animationPlayState = "running";
            }, 600);
        });

        heroFrame.addEventListener("click", function () {
            openModal("assets/images/hero/nro38.1.jpg", "Retrato Hiperrealista de Rostro", "Grafito & Carboncillo sobre papel Canson 300g — Formato A3");
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

    // Colección de obras visibles para navegación del Lightbox
    let activeWorksList = [];
    let currentActiveIndex = -1;

    function renderGallery(category) {
        if (!dynamicGalleryGrid || typeof WORKS_DATA === "undefined") return;
        dynamicGalleryGrid.innerHTML = "";

        const filteredWorks = category === "todas" 
            ? WORKS_DATA 
            : WORKS_DATA.filter(work => work.category === category);

        activeWorksList = filteredWorks; // Guardar obras visibles

        filteredWorks.forEach((work, index) => {
            const article = document.createElement("article");
            article.className = "artwork-card filter-trigger reveal-on-scroll";
            article.style.transitionDelay = `${(index % 6) * 0.05}s`;
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

            dynamicGalleryGrid.appendChild(article);
        });

        // Observar las nuevas cards de la galería
        observeRevealElements();
    }

    // ----------------------------------------------------------------------
    // 3. VISOR LIGHTBOX MODAL (#art-modal) CON INSPECCIÓN Y ZOOM
    // ----------------------------------------------------------------------
    const artModal = document.getElementById("art-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalTech = document.getElementById("modal-tech");
    const modalWaBtn = document.getElementById("modal-wa-btn");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    const modalBackdrop = document.querySelector(".modal-backdrop");

    // Control de Zoom y Panning
    let zoomScale = 1;
    let zoomTranslateX = 0;
    let zoomTranslateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialTouchDist = 0;
    let initialTouchScale = 1;
    let lastTapTime = 0;

    function resetLightboxZoom() {
        zoomScale = 1;
        zoomTranslateX = 0;
        zoomTranslateY = 0;
        isDragging = false;
        if (modalImg) {
            modalImg.style.transition = "transform 0.2s ease-out";
            modalImg.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
            modalImg.style.cursor = "zoom-in";
        }
    }

    function updateLightboxTransform(animate = false) {
        if (!modalImg) return;

        if (zoomScale < 1) zoomScale = 1;
        if (zoomScale > 4) zoomScale = 4;

        if (zoomScale === 1) {
            zoomTranslateX = 0;
            zoomTranslateY = 0;
            modalImg.style.cursor = "zoom-in";
        } else {
            modalImg.style.cursor = isDragging ? "grabbing" : "grab";
        }

        modalImg.style.transition = animate ? "transform 0.2s ease-out" : "transform 0.05s ease-out";
        modalImg.style.transform = `translate3d(${zoomTranslateX}px, ${zoomTranslateY}px, 0px) scale(${zoomScale})`;
    }

    if (modalImg) {
        const modalFrame = modalImg.closest(".modal-image-frame") || modalImg.parentElement;

        // Zoom con rueda del mouse (Desktop)
        modalFrame.addEventListener("wheel", (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.25 : -0.25;
            const newScale = Math.min(Math.max(zoomScale + delta, 1), 4);
            if (newScale !== zoomScale) {
                zoomScale = newScale;
                updateLightboxTransform();
            }
        }, { passive: false });

        // Doble clic para acercar o resetear (Desktop)
        modalImg.addEventListener("dblclick", (e) => {
            e.preventDefault();
            if (zoomScale > 1.1) {
                resetLightboxZoom();
            } else {
                zoomScale = 2.5;
                zoomTranslateX = 0;
                zoomTranslateY = 0;
                updateLightboxTransform(true);
            }
        });

        // Arrastrar la imagen al estar ampliada (Desktop)
        modalImg.addEventListener("mousedown", (e) => {
            if (zoomScale > 1) {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX - zoomTranslateX;
                startY = e.clientY - zoomTranslateY;
                modalImg.style.cursor = "grabbing";
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (isDragging && zoomScale > 1) {
                e.preventDefault();
                zoomTranslateX = e.clientX - startX;
                zoomTranslateY = e.clientY - startY;
                updateLightboxTransform();
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

        // Gestos Táctiles (Celular: Pinch-to-zoom, Doble toque y Arrastrar)
        function getTouchDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        modalFrame.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                initialTouchDist = getTouchDistance(e.touches);
                initialTouchScale = zoomScale;
            } else if (e.touches.length === 1) {
                const now = Date.now();
                if (now - lastTapTime < 300) {
                    e.preventDefault();
                    if (zoomScale > 1.1) {
                        resetLightboxZoom();
                    } else {
                        zoomScale = 2.5;
                        zoomTranslateX = 0;
                        zoomTranslateY = 0;
                        updateLightboxTransform(true);
                    }
                } else if (zoomScale > 1) {
                    isDragging = true;
                    startX = e.touches[0].clientX - zoomTranslateX;
                    startY = e.touches[0].clientY - zoomTranslateY;
                }
                lastTapTime = now;
            }
        }, { passive: false });

        modalFrame.addEventListener("touchmove", (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dist = getTouchDistance(e.touches);
                if (initialTouchDist > 0) {
                    const factor = dist / initialTouchDist;
                    zoomScale = Math.min(Math.max(initialTouchScale * factor, 1), 4);
                    updateLightboxTransform();
                }
            } else if (e.touches.length === 1 && isDragging && zoomScale > 1) {
                e.preventDefault();
                zoomTranslateX = e.touches[0].clientX - startX;
                zoomTranslateY = e.touches[0].clientY - startY;
                updateLightboxTransform();
            }
        }, { passive: false });

        modalFrame.addEventListener("touchend", (e) => {
            if (e.touches.length < 2) {
                initialTouchDist = 0;
            }
            if (e.touches.length === 0) {
                isDragging = false;
                if (zoomScale <= 1) {
                    resetLightboxZoom();
                }
            }
        });
    }

    const modalPrevBtn = document.getElementById("modal-prev-btn");
    const modalNextBtn = document.getElementById("modal-next-btn");
    const modalCounter = document.getElementById("modal-counter");

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
        resetLightboxZoom();
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

        if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeModal() {
        if (!artModal) return;
        resetLightboxZoom();
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
            }
        }
    });

    // Soporte para gestos táctiles (Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    if (artModal) {
        const modalFrame = artModal.querySelector(".modal-image-frame");
        if (modalFrame) {
            modalFrame.addEventListener("touchstart", (e) => {
                if (zoomScale === 1 && e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                }
            }, { passive: true });

            modalFrame.addEventListener("touchend", (e) => {
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
