const urlAPI = "https://www.swapi.tech/api/";

// DOM
const formulario = document.getElementById("formulario");
const datoSelect = document.getElementById("dato");
const idenInput = document.getElementById("iden");
const noencontrado = document.getElementById("noencontrado");
const contenedorResultados = document.getElementById("tarjeta");

// Crear HTML
const crearItem = (label, valor) =>
  `<div class="card-item"><strong>${label}:</strong> <span>${valor}</span></div>`;

// Pintar la tarjeta
const renderizarTarjeta = (props, id, tipo, esCompleto) => {
  const card = document.createElement("div");
  card.classList.add("resultado-tarjeta");
  
  if (esCompleto) {
      card.classList.add("tarjeta-unica");
  }

  const titulo = props.name || props.title || "Sin nombre";
  let infoHTML = "";

  // Mostrar ID
  infoHTML += `<div class="card-item" style="justify-content:center; border-bottom:1px solid #333;">ID: ${id}</div>`;

  switch (tipo) {
    case 'people':
      infoHTML += crearItem('NOMBRE', props.name);
      infoHTML += crearItem('MASA', props.mass);
      infoHTML += crearItem('GÉNERO', props.gender);
      infoHTML += crearItem('ALTURA', props.height);
      break;
case 'films':
      infoHTML += crearItem('DIRECTOR', props.director);
      infoHTML += crearItem('PRODUCTOR', props.producer);
      infoHTML += crearItem('FECHA', props.release_date);
      infoHTML += crearItem('EPISODIO', props.episode_id);
      break;

    case 'planets':
      infoHTML += crearItem('CLIMA', props.climate);
      infoHTML += crearItem('TERRENO', props.terrain);
      infoHTML += crearItem('POBLACIÓN', props.population);
      infoHTML += crearItem('DIÁMETRO', props.diameter);
      break;

    case 'starships':
      infoHTML += crearItem('MODELO', props.model);
      infoHTML += crearItem('TRIPULACIÓN', props.crew);
      infoHTML += crearItem('COSTE', props.cost_in_credits);
      infoHTML += crearItem('PASAJEROS', props.passengers);
      break;

    case 'species':
      infoHTML += crearItem('CLASIFICACIÓN', props.classification);
      infoHTML += crearItem('IDIOMA', props.language);
      infoHTML += crearItem('ALTURA MEDIA', props.average_height);
      infoHTML += crearItem('VIDA MEDIA', props.average_lifespan);
      break;
    default:
      infoHTML += crearItem('INFO', 'Datos no configurados');
  }

  card.innerHTML = `
    <h3 style="text-align:center; color:#fff; border-bottom: 2px solid var(--sw-blue-neon); padding-bottom:10px;">${titulo}</h3>
    ${infoHTML}
  `;

  contenedorResultados.appendChild(card);
};

const gestionarBusqueda = async (e) => {
  e.preventDefault();

  const tipoRecurso = datoSelect.value;
  const idRecurso = idenInput.value.trim();

  noencontrado.textContent = "";
  contenedorResultados.innerHTML = "";
  contenedorResultados.className = "";

  try {
    if (idRecurso) {
      // Por Id
      contenedorResultados.innerHTML = `<p class="loading-text">Buscando ID ${idRecurso}...</p>`;

      const response = await fetch(`${urlAPI}${tipoRecurso}/${idRecurso}`);
      if (!response.ok) throw new Error("No se encontró nada con ese ID.");

      const data = await response.json();

      if (data.result && data.result.properties) {
        renderizarTarjeta(data.result.properties, data.result.uid, tipoRecurso, true);
      } else {
        throw new Error("La estructura de la API no es la esperada.");
      }

    } else {
      // Por páginas
      contenedorResultados.classList.add("grid-container");
      contenedorResultados.innerHTML = `<p class="loading-text">Cargando datos...</p>`;

      const response = await fetch(`${urlAPI}${tipoRecurso}?page=1&limit=20`);
      if (!response.ok) throw new Error("Error de conexión.");

      const data = await response.json();
      const listaBasica = data.results || data.result;

      if (!listaBasica) throw new Error("No hay datos disponibles");
      
      const respuestasDetalladas = await Promise.all(promesas);

      contenedorResultados.innerHTML = "";

      respuestasDetalladas.forEach(itemData => {
        if (itemData && itemData.result && itemData.result.properties) {
          const uid = itemData.result.uid || itemData.result._id;
          renderizarTarjeta(itemData.result.properties, uid, tipoRecurso, false);
        }
      });
    }

  } catch (error) {
    contenedorResultados.innerHTML = "";
    noencontrado.textContent = `Error: ${error.message}`;
  }
};

formulario.addEventListener("submit", gestionarBusqueda);