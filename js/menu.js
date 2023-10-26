document.addEventListener("click", function(event) {
    var dropdowns = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns[i];
        var button = dropdown.querySelector(".dropdown-btn");
        if (event.target !== button && !dropdown.contains(event.target)) {
            var dropdownContent = dropdown.querySelector(".dropdown-content");
            dropdownContent.style.display = "none";
        }
    }
});

// Obtén una referencia a los botones del menú desplegable
const dropdownButtons = document.querySelectorAll(".dropdown-content .nav-button");

// Define las URLs correspondientes a cada botón
const buttonUrls = [
    "home.html",
    "home.html",
    "home.html",
    "home.html",
    "home.html",
    "home.html",
];

// Agrega un evento de clic a cada botón del menú desplegable
dropdownButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Redirige a la página correspondiente cuando se hace clic en el botón
        window.location.href = buttonUrls[index];
    });
});

// Obtén una referencia a los botones del menú
const buttons = document.querySelectorAll("#navpage");

// Define las URLs correspondientes a cada botón
const buttonPages = [
    "home.html",
    "home.html",
    "home.html"
];

// Agrega un evento de clic a cada botón del menú desplegable
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Redirige a la página correspondiente cuando se hace clic en el botón
        window.location.href = buttonPages[index];
    });
});