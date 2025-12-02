// DOM
const formulario = document.getElementById("formulario");
const idenInput = document.getElementById("iden");
const errorSpan = document.getElementById("error");
const noEncontradoP = document.getElementById("noencontrado");
const tarjetaDiv = document.getElementById("tarjeta");

// 2. Event Listener para el formulario
formulario.addEventListener("submit", function (e) {
    // Prevenir el envío por defecto del formulario
    e.preventDefault();

    // Limpiar mensajes anteriores
    errorSpan.textContent = "";
    noEncontradoP.textContent = "";
    tarjetaDiv.innerHTML = "";

    // Validar el input usando la expresión regular (1 o 2 dígitos)
    const regex = /^\d{1,2}$/;
    
    if (idenInput.value === "") {
        errorSpan.textContent = "El ID es obligatorio.";
        return;
    }
    
    if (!regex.test(idenInput.value)) {
        errorSpan.textContent = "El ID debe ser un número de 1 o 2 dígitos.";
        return;
    }

    // Si la validación pasa, intentamos obtener el personaje
    obtenerPersonaje(idenInput.value);
});

// Función Asíncrona para la llamada a la API
async function obtenerPersonaje(id) {
    const API_URL = `https://www.swapi.tech/api/people/${id}/`;

    try {
        // Realizar la petición GET
        const respuesta = await fetch(API_URL);

        // Manejo de Errores
        if (!respuesta.ok) {
            // Ejemplo: 404 Not Found, 500 Server Error
            throw new Error(`Error HTTP: ${respuesta.status}. Personaje no encontrado o API no disponible.`);
        }
        
        // Obtener la respuesta
        const personaje = await respuesta.json();

        // Manejo de la Respuesta de la API
        if (personaje.message === "not found" || !personaje.result) {
            noEncontradoP.textContent = `Personaje con ID ${id} no encontrado.`;
            return;
        }

        // Inyección limpia en el DOM
        mostrarPersonaje(personaje.result.properties);

    } catch (error) {
        console.error("Fallo en la obtención del personaje:", error);
        noEncontradoP.textContent = `Error: ${error.message || 'Problema de conexión con la API.'}`;
    }
}

// 4. Función para mostrar la información del personaje
function mostrarPersonaje(propiedades) {
    tarjetaDiv.innerHTML = `
        <div class="card-item"><strong>Nombre:</strong> <span>${propiedades.name}</span></div>
        <div class="card-item"><strong>Altura:</strong> <span>${propiedades.height} cm</span></div>
        <div class="card-item"><strong>Masa:</strong> <span>${propiedades.mass} kg</span></div>
        <div class="card-item"><strong>Género:</strong> <span>${propiedades.gender}</span></div>
    `;
}