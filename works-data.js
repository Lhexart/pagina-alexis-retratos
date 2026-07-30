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
        title: "Retrato Hiperrealista de Rostro",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/(3).jpg",
        technique: "Grafito & Carboncillo sobre papel Canson 300g",
        format: "Formato A3",
        featured: true
    },
    {
        id: "persona-02",
        title: "Retrato de Lionel Messi",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/(21).jpg",
        technique: "Grafito graduado (2H a 8B)",
        format: "Formato A3",
        featured: true
    },
    {
        id: "persona-03",
        title: "Retrato Individual",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/102.jpg",
        technique: "Grafito sobre papel Canson 300g",
        format: "Formato A4",
        featured: true
    },
    {
        id: "persona-04",
        title: "Mirada en Sombra",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/103.jpg",
        technique: "Estudio de luces y claroscuro en carboncillo",
        format: "Formato A4",
        featured: true
    },
    {
        id: "persona-05",
        title: "Retrato Familiar / Pareja",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/29.jpg",
        technique: "Formato A3 en papel libre de ácido",
        format: "Formato A3",
        featured: true
    },
    {
        id: "persona-06",
        title: "Estudio de Expresión N° 107",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/107.jpg",
        technique: "Grafito fino alzada",
        format: "Formato A4",
        featured: false
    },
    {
        id: "persona-07",
        title: "Contraste Profundo N° 70",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/70.jpg",
        technique: "Carboncillo y esfumado",
        format: "Formato A3",
        featured: false
    },
    {
        id: "persona-08",
        title: "Retrato en Grafito N° 71",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/71.jpg",
        technique: "Grafito puro sobre papel de 300g",
        format: "Formato A4",
        featured: false
    },
    {
        id: "persona-09",
        title: "Expresión Realista N° 91",
        category: "personas",
        categoryLabel: "Personas",
        image: "assets/images/personas/91.jpg",
        technique: "Papel de algodón de textura fina",
        format: "Formato A3",
        featured: false
    },

    // --- CATEGORÍA: MASCOTAS ---
    {
        id: "mascota-01",
        title: "Retrato de Mascota en Pelaje",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/(19).png",
        technique: "Textura de pelaje hiperrealista a grafito",
        format: "Formato A4",
        featured: true
    },
    {
        id: "mascota-02",
        title: "Recuerdo Especial Mascotas",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/58.jpg",
        technique: "Grafito y toques de blanco titanio",
        format: "Formato A4",
        featured: true
    },
    {
        id: "mascota-03",
        title: "Estudio de Trazo Canino",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/56.jpg",
        technique: "Carboncillo fino y esfumado",
        format: "Formato A4",
        featured: false
    },
    {
        id: "mascota-04",
        title: "Detalle de Pelaje N° 64",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/64.jpg",
        technique: "Grafito 4B y 6B",
        format: "Formato A4",
        featured: false
    },
    {
        id: "mascota-05",
        title: "Mirada Animal N° 65",
        category: "mascotas",
        categoryLabel: "Mascotas",
        image: "assets/images/mascotas/65.jpg",
        technique: "Papel Canson 300g",
        format: "Formato A4",
        featured: false
    },

    // --- CATEGORÍA: CUADROS Y OBRAS ORIGINALES ---
    {
        id: "cuadro-01",
        title: "Estudio de Sombras N° 69",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/69.jpg",
        technique: "Grafito puro y carboncillo comprimido",
        format: "Formato A2",
        featured: true
    },
    {
        id: "cuadro-02",
        title: "Composición de Luces N° 75",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/75.jpg",
        technique: "Sombreado a mano alzada",
        format: "Formato A3",
        featured: false
    },
    {
        id: "cuadro-03",
        title: "Obra de Gran Formato N° 88",
        category: "cuadros",
        categoryLabel: "Cuadros & Obras",
        image: "assets/images/personas/88.jpg",
        technique: "Grafito graduado sobre papel especial",
        format: "Formato A2",
        featured: false
    }
];
