document.addEventListener("DOMContentLoaded", async function() {
  const login = sessionStorage.getItem('login');
  if (login == 'true') {
    try {
        // Realiza una solicitud Fetch al servidor en el puerto 5500
        const response = await fetch(`http://localhost:5500/home`);
        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.error(`Error en la solicitud: ${response.status} - ${response.message}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
  }
});

const registroForm = document.getElementById("inicioSesionForm");

registroForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const correo = document.getElementById("correo").value;
  const contrasenia = document.getElementById("contrasena").value;

  const datos = {
    correo,
    contrasenia,
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
    .then(async (data) => {
      // "data" contiene el mensaje del servidor en formato JSON
      console.log(data);
      if (data.status === 200) {
        sessionStorage.setItem('usuario', JSON.stringify(data.data));
        sessionStorage.setItem('login', true);
        const response = await fetch(`http://localhost:5500/admin`);
        if (response.ok) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.href = response.url;
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
        sessionStorage.setItem('login', false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      // Resto del código
    })
    .catch((error) => {
      window.alert(error.message);
      console.error("Error en la solicitud:", error);
    });
}

const togglePasswordButton = document.getElementById("togglePassword");
const passwordInput = document.getElementById("contrasena");

togglePasswordButton.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

const btnregister = document.querySelector("#btn-register");

btnregister.addEventListener("click", async () => {
  try {
    // Realiza una solicitud Fetch al servidor en el puerto 5500
    const response = await fetch(`http://localhost:5500/register`);
    if (response.ok) {
      window.location.href = response.url;
    } else {
      console.error(
        `Error en la solicitud: ${response.status} - ${response.message}`
      );
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});