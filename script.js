/* ==========================================================================
   INTERACTIVIDAD Y LÓGICA DE LA GALERÍA
   Proyecto: Portafolio de Retratos a Lápiz por Alexis
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------------
    // 1. INICIALIZACIÓN DE CARRUSELES SWIPER
    // ----------------------------------------------------------------------
    
    // Carrusel Principal (Hero)
    const swiperHero = new Swiper(".mySwiper-1", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Carruseles de Galería por Pestañas (Swiper 2)
    const swiperGalleryConfig = {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    };

    // Inicializar carruseles de pestañas
    const swiper1 = new Swiper("#swiper1", swiperGalleryConfig);
    const swiper2 = new Swiper("#swiper2", swiperGalleryConfig);
    const swiper3 = new Swiper("#swiper3", swiperGalleryConfig);

    // Escuchar cambio de pestañas para forzar actualización de dimensiones de Swiper
    const tabInputs = document.querySelectorAll(".tabinput");
    tabInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            const id = input.value;
            const targetSwiperEl = document.getElementById("swiper" + id);
            if (targetSwiperEl && targetSwiperEl.swiper) {
                setTimeout(function () {
                    targetSwiperEl.swiper.update();
                }, 50);
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. VISOR LIGHTBOX MODAL EN ALTA DEFINICIÓN (#art-modal)
    // ----------------------------------------------------------------------
    const artModal = document.getElementById("art-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalTech = document.getElementById("modal-tech");
    const modalWaBtn = document.getElementById("modal-wa-btn");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    const filterTriggers = document.querySelectorAll(".filter-trigger");

    // Función para abrir el modal con los datos de la obra seleccionada
    function openModal(imgSrc, title, tech) {
        if (!artModal || !modalImg) return;

        modalImg.src = imgSrc;
        modalImg.alt = title || "Retrato a lápiz por Alexis";
        
        if (modalTitle) modalTitle.textContent = title || "Obra a Lápiz";
        if (modalTech) modalTech.textContent = tech || "Grafito sobre papel Canson 300g";

        // Actualizar mensaje de WhatsApp dinámico para la obra específica
        if (modalWaBtn) {
            const encodedTitle = encodeURIComponent(title || "esta obra");
            modalWaBtn.href = `https://wa.me/?text=Hola%20Alexis,%20estaba%20viendo%20tu%20web%20y%20me%20interes%C3%B3%20la%20obra%20"${encodedTitle}".%20Quisiera%20consultar%20presupuesto%20para%20un%20encargo%20similar.`;
        }

        artModal.classList.add("active");
        artModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");

        // Enfocar el botón de cierre para accesibilidad por teclado
        if (modalCloseBtn) modalCloseBtn.focus();
    }

    // Función para cerrar el modal
    function closeModal() {
        if (!artModal) return;
        artModal.classList.remove("active");
        artModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }

    // Asignar eventos a cada elemento clickeable de la galería
    filterTriggers.forEach(function (trigger) {
        const handleTrigger = function (e) {
            e.preventDefault();
            const imgEl = trigger.querySelector("img");
            const imgSrc = imgEl ? imgEl.getAttribute("src") : trigger.getAttribute("src");
            const title = trigger.getAttribute("data-title") || trigger.querySelector("h3")?.textContent || "Retrato a Lápiz";
            const tech = trigger.getAttribute("data-tech") || trigger.querySelector("p")?.textContent || "Grafito y carboncillo a mano alzada";

            if (imgSrc) {
                openModal(imgSrc, title, tech);
            }
        };

        trigger.addEventListener("click", handleTrigger);
        
        // Soporte para accesibilidad por teclado (Teclas Enter / Espacio)
        trigger.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                handleTrigger(e);
            }
        });
    });

    // Eventos para cerrar el modal (Botón X, Backdrop o Tecla ESC)
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && artModal && artModal.classList.contains("active")) {
            closeModal();
        }
    });
});
