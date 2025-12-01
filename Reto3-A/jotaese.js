let personaje = null;

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  let error = document.getElementById("error");
  let iden = document.getElementById("iden");

  if (iden.value === "") {
    error.innerHTML = "Campo vacío";
  } else if (!iden.checkValidity()) {
    error.innerHTML = "Formato incorrrecto";
  } else {
    obtenerPersonaje(iden.value);
  }
});

async function obtenerPersonaje(id) {
    const respuesta = await fetch(`https://www.swapi.tech/api/people/${id}/`);
    personaje = await respuesta.json();
  try {
    if (personaje.result) {
      const tarjeta = document.getElementById("tarjeta");
      const personajeDiv = document.createElement("div");
      personajeDiv.id = "personaje";
      tarjeta.innerHTML = `<div class="tarjeta"><strong>Nombre: </strong><span>${personaje.result.properties.name}</span></div>
        <div class="tarjeta"><strong>Altura: </strong><span>${personaje.result.properties.height}</span></div>
        <div class="tarjeta"><strong>Peso: </strong><span>${personaje.result.properties.mass}</span></div>
        <div class="tarjeta"><strong>Genero: </strong><span>${personaje.result.properties.gender}</span></div>
        `;
      document.body.appendChild(personajeDiv);
      personajeDiv.appendChild(tarjeta);
    } else {
      document.getElementById("noencontrado").textContent =
        "El personaje no fue encontrado";
    }
  } catch {
    document.getElementById("noencontrado").textContent =
      "Respuestas no exitosas de la API o problemas de conexión.";
  }
}
