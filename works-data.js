/* ==========================================================================
   CATÁLOGO DE OBRAS Y DATOS ESCALABLES (WORKS_DATA)
   Proyecto: Portafolio de Retratos a Lápiz por Alexis
   Ventaja: Agregar, eliminar o actualizar imágenes requiere solo modificar este archivo.
   ========================================================================== */

const GALLERY_CATEGORIES = [
    { id: "todas", label: "Todas las Obras" },
    { id: "personas", label: "Personas" },
    { id: "mascotas", label: "Mascotas" },
    { id: "cuadros", label: "Cuadros & Obras" }
];

const WORKS_DATA = [
    // --- CATEGORÍA: PERSONAS ---
    {
        id: "persona-01",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/nro56.jpg",
        technique: "Dibujo a grafito",
        format: "70 × 40 cm",
        year: "2021",
        commissioned: false,
        featured: true
    },
    {
        id: "persona-02",
        title: "Messi besando la Copa del Mundo",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/hero/nro89.1.jpg",
        technique: "Dibujo a grafito",
        format: "25 × 35 cm",
        year: "2022",
        commissioned: true,
        note: "El primer dibujo que hice de Messi con la Copa del Mundo.",
        featured: true
    },
    {
        id: "persona-04",
        title: "Messi sosteniendo y besando la Copa del Mundo",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/(21).jpg",
        technique: "Lápiz grafito",
        format: "35 × 35 cm",
        year: "2023",
        commissioned: false,
        featured: true
    },
    {
        id: "persona-05",
        title: "Messi con la Copa América",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/hero/Nro3.1.jpg",
        technique: "Técnica mixta: grafito y color",
        format: "35 × 50 cm",
        year: "2020",
        commissioned: true,
        featured: true
    },
    {
        id: "persona-06",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/nro38.1.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-07",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/70.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-08",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/71.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-09",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/nro91.1.jpg",
        technique: "",
        format: "",
        featured: false
    },

    // --- CATEGORÍA: MASCOTAS ---
    {
        id: "mascota-01",
        title: "Retrato de gato",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/nro8.jpg", 
        technique: "Técnica mixta: carboncillo y lápiz",
        format: "A4",
        year: "2023",
        commissioned: true,
        featured: true
    },
    {
        id: "mascota-02",
        title: "Retrato de perro",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/nro10.jpg",
        technique: "Lápiz carbón",
        format: "35 × 50 cm",
        year: "2022",
        commissioned: true,
        featured: true
    },
    {
        id: "mascota-03",
        title: "Retrato de mascota",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/nro6.jpg",
        technique: "",
        format: "",
        featured: false
    },

    // --- CATEGORÍA: CUADROS Y OBRAS ORIGINALES ---
    {
        id: "cuadro-01",
        title: "Retrato de Lionel Messi",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/58.jpg",
        technique: "Dibujo a grafito",
        format: "25 × 35 cm",
        year: "2020",
        commissioned: true,
        featured: true
    },
    {
        id: "cuadro-03",
        title: "Retrato a lápiz",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/nro91.jpg",
        technique: "",
        format: "",
        featured: false
    },

    // --- OBRAS ADICIONALES ---
    {
        id: "persona-10",
        title: "Messi — Copa Malvinas",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/Messi Copa Malvinas (2026).jpg",
        technique: "Pintura acrílica",
        format: "",
        year: "2026",
        commissioned: false,
        note: "",
        featured: true
    },
    {
        id: "persona-11",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/(2026) 1.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-12",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/(2026) 2.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-13",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/1.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-14",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/2.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-15",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/29.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-16",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/57.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-17",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/89.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-18",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/nro33.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-19",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/nro45.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "persona-20",
        title: "Retrato a lápiz",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/hero/Nro3.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "mascota-04",
        title: "Retrato de mascota",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/3.jpg",
        technique: "",
        format: "",
        featured: false
    },
    {
        id: "mascota-05",
        title: "Retrato de mascota",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/5.jpg",
        technique: "",
        format: "",
        featured: false
    }
];
