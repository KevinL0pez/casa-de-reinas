const registroForm = document.getElementById("inicioSesionForm");

registroForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasenia = document.getElementById("contrasena").value;

  const datos = {
    correo,
    contrasenia
  };
  iniciarSesion(datos);
});

function iniciarSesion(datos) {
  // URL del servidor donde se manejará la solicitud
  const url = "http://localhost:3000/iniciarsesion";

  // Configura la solicitud POST
  const opciones = {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Tipo de contenido
    },
    body: JSON.stringify(datos), // Convierte los datos a formato JSON
  };

  // Realiza la solicitud POST
  fetch(url, opciones)
  .then((response) => {
    // La solicitud fue exitosa (código de estado 200)
    return response.json(); // Analizar el cuerpo de la respuesta como JSON
  })
  .then((data) => {
    // "data" contiene el mensaje del servidor en formato JSON
    console.log(data);
    window.alert( data.message );
    // Resto del código
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
}