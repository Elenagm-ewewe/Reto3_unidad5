let personaje = null;


document.getElementById("formulario").addEventListener("submit", function(e){
e.preventDefault();
let error = document.getElementById("error");
let iden = document.getElementById("iden");


if(iden.value === ""){
    error.innerHTML = "Campo vacío";
}else if(!iden.checkValidity()){
    error.innerHTML = "Formato incorrrecto";
}else{

    obtenerPersonaje(iden.value);
    console.log(personaje)
    document.getElementById("tarjeta").innerHTML = `<div class="tarjeta><strong>Nombre</strong><span>${personaje.result.properties}</span></div>`
}


});

async function obtenerPersonaje(id){

try{
        const respuesta = await fetch(`https://www.swapi.tech/api/people/${id}/`)
        personaje = await respuesta.json();
        console.log("Hola desde la funcion")

}catch{
        document.getElementById("noencontrado").textContent = "El personaje no fue encontrado";
    }
    
}