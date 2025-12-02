// Llamar a la api
const url = "https://www.swapi.dev/api/";

// DOM
const formulario = document.getElementById("formulario");
const datoSelect = document.getElementById("dato");
const idenInput = document.getElementById("iden");
const noencontrado = document.getElementById("noencontrado");

// Eventos
formulario.addEventListener("submit", obtenerDato);

async function obtenerDato(e) {
  e.preventDefault();

  // VAriables
  const resourceType = datoSelect.value;
  const resourceId = idenInput.value.trim();
  const tipodatoValue = datoSelect.value;
  const idenValue = idenInput.value;

  // Construcción de la URL:
  const resourceUrl = resourceId
    ? `${url}${resourceType}/${resourceId}`
    : `${url}${resourceType}/`;

  // Limpiar resultados anteriores
  noencontrado.textContent = "";
  tarjetaDiv.innerHTML = "";

  // Llamado a la API
  try {
    const response = await fetch(resourceUrl);
    // Manejo de Errores
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}. Recurso no encontrado.`);
    }
    // Obtener el cuerpo de la respuesta (JSON)
    const data = await response.json();

    // Procesamiento de la Data
    procesarResultado(data, resourceId, resourceType);
  } catch (error) {
    noencontrado.textContent = `\Error: ${error.message || 'Problema de conexión con la API.'}`;
  }
}

function procesarResultado(data, resourceId, resourceType) {
  const tarjetaDiv = document.getElementById("tarjeta");
  tarjetaDiv.innerHTML = "";

  if (data.message === "not found" || !data.result) {
    noencontrado.textContent = `Recurso con ID ${resourceId} no encontrado.`;
    return;
  }

  // Inyección limpia en el DOM
  tarjetaDiv.innerHTML = `
      <div class="card-item"><strong>${tipodatoValue}:</strong> <span>${idenValue}</span></div>
      <div class="card-item"><strong>Nombre:</strong> <span>${data.result.properties.name}</span></div>
      <div class="card-item"><strong>Altura:</strong> <span>${data.result.properties.height} cm</span></div>
      <div class="card-item"><strong>Masa:</strong> <span>${data.result.properties.mass} kg</span></div>
      <div class="card-item"><strong>Género:</strong> <span>${data.result.properties.gender}</span></div>
  `;
}
