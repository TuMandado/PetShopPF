// - Productos:
//     created: timestamp
//     updated: timestamp
//     title: string
//     price: number
//     stock: number
//     info: string
//     animalCategory: [strings]
//     category: [strings]
//     subcategory: [strings]
//     opiniones: [obj] {
//             user: uid
//             comment: string
//             rating: number
//             timestamp: timestamp
//                 }

const randomPrice = () => {
  return randomNumber(1, 100);
};

const randomAnimalCategory = () => {
  const categories = ["perro", "gato", "pez", "ave", "reptil"];
  return categories[randomNumber(0, categories.length)];
};

// Perros -> animalCategory
//      Alimentos -> category
//              Secos -> subcategory
//              Húmedos -> subcategory
//              Medicados -> subcategory
//              Naturales -> subcategory
//              Necesidades Especiales -> subcategory
//      Snacks -> category
//              Galletitas Secas -> subcategory
//              Huesos y Cueros -> subcategory
//              Dental -> subcategory
//      Accesorios -> category
//              Juguetes -> subcategory
//              Transportadoras -> subcategory
//              Elementos para auto y viaje -> subcategory
//              Comederos y Bebederos -> subcategory
//              Elementos de Paseo -> subcategory
//              Camas y mantas -> subcategory
//              Cuchas, puertas y caniles -> subcategory
//              Ropa -> subcategory
//              Entrenamiento y comportamiento -> subcategory
//      Estética e Higiene -> category
//              Paños y Pañales -> subcategory
//              Cepillos, Guantes y Cardinas -> subcategory
//              Cuidado Dental -> subcategory
//              Shampoo y Acondicionadores -> subcategory
//              Cortauñas -> subcategory
//              Lociones y Colonias -> subcategory
//      Salud -> category
//              Antiparasitarios -> subcategory
//              Antipulgas y Garrapatas -> subcategory
//              Pipetas y Vacunas -> subcategory
//              Medicamentos -> subcategory

// Gatos -> animalCategory 
//      Alimentos -> category
//              Secos -> subcategory
//              Húmedos -> subcategory
//              Medicados -> subcategory
//              Necesidades Especiales -> subcategory
//              Snacks -> category
//      Accesorios -> category
//              Juguetes -> subcategory
//              Rascadores -> subcategory
//              Comederos y Bebederos -> subcategory
//              Camas y mantas -> subcategory
//              Traspordadoras -> subcategory
//              Collares -> subcategory
//              Comportamiento -> subcategory
//      Estética e Higiene -> category
//              Piedras y Arena -> subcategory
//              Literas y palitas -> subcategory
//              Cepillos, Guantes y Cardinas -> subcategory
//              Shampoo y Acondicionador -> subcategory
//              Lociones y Colonias -> subcategory
//      Salud -> category
//              Antiparasitarios -> subcategory
//              Antipulgas y Garrapatas -> subcategory

// Peces -> animalCategory 
//      Alimentos -> category
//              Agua fria -> subcategory
//              Agua tropical -> subcategory
//      Accesorios -> category
//              Peceras y acuarios -> subcategory
//              Aireadores, Filtros, Bombas y Calefactores -> subcategory
//              Iluminación, Adornos y Piedras -> subcategory
//              Cuidados del Agua -> subcategory

// Aves -> animalCategory 
//      Accesorios -> category
//              Comederos y Bebederos -> subcategory
//              Jaulas y Nidos -> subcategory
//              Juguetes -> subcategory
//      Semillas y Alimentos -> category
//              Semillas y alimentos -> subcategory
//      Medicamentos -> category
//              Medicamentos -> subcategory

// Reptiles -> animalCategory 
//      Alimentos -> category
//      Accesorios de Habitat -> category
//      Higiene -> category

// Roedores -> animalCategory
//      Alimentos -> category
//      Habitats, Conejeras y Hamsteras -> category
//      Higiene -> category
//      Juguetes y Accesorios de Habitat -> category