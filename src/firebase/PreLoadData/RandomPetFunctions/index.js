// - Mascotas:
//     name: timestamp
//     created: timestamp
//     updated: timestamp
//     state: en adopcion  perdida  encontrado || nada
//     owner: uid
//     category: string
//     sexo: string
//     description: string
//     ubicacion: obj {
//             longitude: number
//             latitude: number
//                 }
//     photos:[strings]


import { uploadPet } from "../../Pets";
import { getAllPets } from "../../Pets";

import { LoremIpsum } from "lorem-ipsum";
import { Timestamp } from "firebase/firestore";

const randomDescription = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });
  return lorem.generateParagraphs(1);
};

const randomPetName = () => {
  const petNames = [
    "Bella",
    "Lucy",
    "Molly",
    "Daisy",
    "Lola",
    "Maggie",
    "Sophie",
    "Sadie",
    "Chloe",
    "Lily",
    "Zoe",
    "Luna",
    "Pepper",
    "Lady",
    "Mia",
    "Ruby",
    "Sasha",
    "Lulu",
    "Gracie",
    "Layla",
    "Zoey",
    "Lily",
    "Angel",
    "Princess",
    "Emma",
    "Olivia",
    "Ava",
    "Isabella",
    "Sophia",
    "Charlotte",
    "Mia",
    "Amelia",
    "Harper",
    "Evelyn",
    "Abigail",
    "Emily",
    "Elizabeth",
    "Mila",
    "Ella",
    "Avery",
    "Sofia",
    "Camila",
    "Aria",
    "Scarlett",
    "Victoria",
    "Madison",
    "Luna",
    "Grace",
    "Chloe",
    "Penelope",
    "Layla",
    "Riley",
    "Zoey",
    "Nora",
    "Lily",
    "Eleanor",
    "Hannah",
    "Lillian",
    "Addison",
    "Aubrey",
    "Ellie",
    "Stella",
    "Natalie",
    "Zoe",
    "Leah",
    "Hazel",
    "Violet",
    "Aurora",
    "Savannah",
    "Audrey",
    "Brooklyn",
    "Bella",
    "Claire",
    "Skylar",
    "Paisley",
    "Everly",
    "Anna",
    "Caroline",
    "Nova",
    "Genesis",
    "Emilia",
    "Kennedy",
    "Samantha",
  ];
  return petNames[Math.floor(Math.random() * petNames.length)];
};

const randomSex = () => {
  const sex = ["male", "female"];
  return sex[Math.floor(Math.random() * sex.length)];
};

const randomState = () => {
  const state = ["en adopcion", "perdido", "encontrado"];
  return state[Math.floor(Math.random() * state.length)];
};

const randomCategory = () => {
  const category = ["perro", "gato"]; //, "pez", "ave", "reptil"];
  return category[Math.floor(Math.random() * category.length)];
};

const randomCatPhoto = () => {
  return "https://www.randomkittengenerator.com/cats/rotator.php";
};

const randomDogPhoto = () => {
  return "https://www.randomdoggiegenerator.com/randomdoggie.php";
};

// Geo reference for the location of the pet
//-34.927189, -58.018046
//-34.924087, -57.900932
//-34.889108, -57.957046
//-34.963584, -57.953106
//Latitud: -34.889108 a -34.963584
//Longitud: -57.900932 a -58.018046
const randomNumber = (low, up) => {
  return Math.floor(Math.random() * (up - low) + low);
};

const lowestLat = -34.963584;
const highestLat = -34.889108;
const lowestLon = -57.900932;
const highestLon = -58.018046;

const randomLat = () => {
  return randomNumber(lowestLat, highestLat);
};

const randomLon = () => {
  return randomNumber(lowestLon, highestLon);
};

const randomLocation = () => {
  return {
    longitude: randomLat(),
    latitude: randomLon(),
  };
};

// - Mascotas:
//     name: timestamp
//     created: timestamp
//     updated: timestamp
//     state: en adopcion  perdida  encontrado || nada
//     owner: uid
//     category: string
//     sexo: string
//     description: string
//     ubicacion: obj {
//             longitude: number
//             latitude: number
//                 }
//     photos:[strings]

export const randomPet = () => {
  const category = randomCategory();

  return {
    name: randomPetName(),
    created: Timestamp.now(),
    updated: Timestamp.now(),
    state: randomState(),
    owner: "",
    category: category,
    sexo: randomSex(),
    description: randomDescription(),
    ubicacion: randomLocation(),
    photos: [category === "perro" ? randomDogPhoto() : randomCatPhoto()],
  };
};


// Push all products to the database if the collection is empty
export const pushAllPets = async () => {
  const pets = await getAllPets();
  let id = 0;
  let stringId = "";
  if (pets.length < 4) {
    for (let i = 0; i < 200; i++) {
      const pet = randomPet();
      stringId = id.toString();
      id++;
      await uploadPet(pet, stringId);

    }    
  }
}

