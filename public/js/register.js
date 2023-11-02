const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const documento = document.getElementById("documento").value;
  const correo = document.getElementById("correo").value;
  const contrasenia = document.getElementById("contrasena").value;

  const datos = {
    nombres,
    apellidos,
    documento,
    correo,
    contrasenia,
  };
  registrarUsuario(datos);
});

function registrarUsuario(datos) {
  // URL del servidor donde se manejará la solicitud
  const url = "http://localhost:3000/registrarusuario";

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
      if (data.status === 200) {
        const response = await fetch(`http://localhost:5500/login`);
        if (response.ok) {
          window.location.href = response.url;
        } else {
          console.error(
            `Error en la solicitud: ${response.status} - ${response.message}`
          );
        }
      } else {
        sessionStorage.setItem("login", false);
        window.alert(data.message);
      }
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

const btnlogin = document.querySelector("#btn-login");

btnlogin.addEventListener("click", async () => {
  try {
    // Realiza una solicitud Fetch al servidor en el puerto 5500
    const response = await fetch(`http://localhost:5500/login`);
    if (response.ok) {
      window.location.href = response.url;
    } else {
      console.error(
        `Error en la solicitud: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
});

async function validarRegistro() {
  if (sessionStorage.getItem("login") == true) {
    try {
      // Realiza una solicitud Fetch al servidor en el puerto 5500
      const response = await fetch(`http://localhost:5500/home`);
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
  }
}

validarRegistro();
