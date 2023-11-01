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