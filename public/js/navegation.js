// Obtén una referencia a los botones del menú desplegable
const dropdownButtons = document.querySelectorAll(".dropdown-content .nav-button");
// Agrega un evento de clic a cada botón del menú desplegable
dropdownButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Redirige a la página correspondiente cuando se hace clic en el botón
        sessionStorage.setItem("categoria", index + 1);
        window.location.href = "products";
    });
});

// Obtén una referencia a los botones del menú
const buttons = document.querySelectorAll("#navpage");
// Define las URLs correspondientes a cada botón
const buttonPages = [
    "home",
    "services",
    "products",
    "contact",
    "login"
];
// Agrega un evento de clic a cada botón del menú desplegable
buttons.forEach((button, index) => {
    button.addEventListener("click", async () => {
        // Redirige a la página correspondiente cuando se hace clic en el botón
        console.log(buttonPages[index]);
        if (buttonPages[index]) {
            try {
                console.log(buttonPages[index]);
                // Realiza una solicitud Fetch al servidor en el puerto 5500
                const response = await fetch(`http://localhost:5500/${buttonPages[index]}`);
                if (response.ok) {
                    sessionStorage.removeItem("categoria");
                    window.location.href = response.url;
                } else {
                    console.error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }
    });
});

// Verifica el valor de 'login' en sessionStorage
const isLoggedIn = sessionStorage.getItem('login') === 'true';

// Obtén referencias a los botones
const loginButton = document.getElementById('loginButton');
const adminButton = document.getElementById('adminButton');
const logoutButton = document.getElementById('logoutButton');

loginButton.addEventListener("click", async () => {
    redireccionar('login');
});

adminButton.addEventListener("click", async () => {
    redireccionar('admin');
});

logoutButton.addEventListener("click", async () => {
    redireccionar('home');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('login');
});

// Oculta o muestra los botones según el estado de inicio de sesión
if (isLoggedIn) {
    loginButton.style.display = 'none';
    adminButton.style.display = 'inline-block'; // Muestra el botón Administrar
    logoutButton.style.display = 'inline-block'; // Muestra el botón Cerrar Sesión
} else {
    // Si no está conectado, asegúrate de mostrar el botón de Iniciar Sesión
    loginButton.style.display = 'inline-block';
    adminButton.style.display = 'none'; // Oculta el botón Administrar
    logoutButton.style.display = 'none'; // Oculta el botón Cerrar Sesión
}

function verificarUsuario() {
    if (!sessionStorage.getItem('usuario')) {
        sessionStorage.setItem('login', false);
    }
}

verificarUsuario();

async function redireccionar(path) {
    try {
        // Realiza una solicitud Fetch al servidor en el puerto 5500
        const response = await fetch(`http://localhost:5500/${path}`);
        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.error(`Error en la solicitud: ${response.status} - ${response.message}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}