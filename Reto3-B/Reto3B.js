// Llamar a la api
const url = "https://swapi.dev/api/";
const endpointPeople = "people/";
const endpointFilms = "films/";
const endpointPlanets = "planets/";
const endpointStarships = "Starships/";
const endpointSpecies = "Species/";

// DOM
const formulario = document.getElementById("formulario");
const tipodato = document.getElementById("tipodato");
const iden = document.getElementById("iden");
const noencontrado = document.getElementById("noencontrado");
let personaje = null;

// Eventos
formulario.addEventListener("submit", obtenerPersonaje);

async function obtenerPersonaje(e) {
  e.preventDefault();
  const respuesta = await fetch(`${url}${endpointPeople}${iden.value}/`);
  personaje = await respuesta.json();

  let tipodatoValue = tipodato.value;
  let idenValue = iden.value;
  try {
    if (personaje.result) {
      const tarjeta = document.getElementById("tarjeta");
      const personajeDiv = document.createElement("div");
      personajeDiv.id = "personaje";
      switch (tipodatoValue) {
        case "name":
          obtenerPersonajeName(idenValue);
        
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Id: </strong><span>${personaje.result.properties._id}</span></div>
        `;
          break;
        case "gender":
          obtenerPersonajeGender(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Genero: </strong><span>${personaje.result.properties.gender}</span></div>
        `;
          break;
        case "skin_color":
          obtenerPersonajeSkinColor(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Color de piel: </strong><span>${personaje.result.properties.skin_color}</span></div>
        `;
          break;
        case "hair_color":
          obtenerPersonajeHairColor(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Color de cabello: </strong><span>${personaje.result.properties.hair_color}</span></div>
        `;
          break;
        case "height":
          obtenerPersonajeHeight(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Altura: </strong><span>${personaje.result.properties.height}</span></div>
        `;
          break;
        case "eye_color":
          obtenerPersonajeEyeColor(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Color de los ojos: </strong><span>${personaje.result.properties.eye_color}</span></div>
        `;
          break;
        case "mass":
          obtenerPersonajeMass(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Peso: </strong><span>${personaje.result.properties.mass}</span></div>
        `;
          break;
        case "birth_year":
          obtenerPersonajeBirthYear(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Año de nacimiento: </strong><span>${personaje.result.properties.birth_year}</span></div>
        `;
          break;
        case "homeworld":
          obtenerPersonajeHomeworld(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Planeta natal: </strong><span>${personaje.result.properties.homeworld}</span></div>
        `;
          break;
        case "vehicles":
          obtenerPersonajeVehicles(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Vehículos: </strong><span>${personaje.result.properties.vehicles}</span></div>
        `;
          break;
        case "starships":
          obtenerPersonajeStarships(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Naves: </strong><span>${personaje.result.properties.starships}</span></div>
        `;
          break;
        case "films":
          obtenerPersonajeFilms(idenValue);
          tarjeta.innerHTML = `<div class="tarjeta"><strong>Películas: </strong><span>${personaje.result.properties.films}</span></div>
        `;
          break;
      }

      personajeDiv.appendChild(tarjeta);
      document.body.appendChild(personajeDiv);
    } else {
      noencontrado.textContent = "El personaje no fue encontrado";
    }
    tipodato.value = "";
    iden.value = "";
    noencontrado.textContent = "";
  } catch {
    noencontrado.textContent =
      "Respuestas no exitosas de la API o problemas de conexión.";
  }
}
