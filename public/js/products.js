const TITULO_CATEGORIA = {
    "ESMALTE_SEMIPERMANENTE": "Esmaltes",
    "LAMPARA_SEMIPERMANENTE": "Lampara Semipermanente",
    "DRILES": "Driles",
    "OTROS_PRODUCTOS": "Otros Productos",
    "PRODUCTOS": "Productos"
}

const TIPO_CATEGORIA = {
    1: "ESMALTE_SEMIPERMANENTE",
    2: "LAMPARA_SEMIPERMANENTE",
    3: "DRILES",
    4: "OTROS_PRODUCTOS",
}

document.addEventListener("DOMContentLoaded", function() {
    // Esta función se ejecutará una vez que la página se haya cargado completamente
    // Puedes poner tu lógica aquí
    console.log("La página se ha cargado completamente.");

    // Obten el valor de idCategoria desde donde lo estés almacenando, por ejemplo, desde el almacenamiento de sesión
    const idCategoria = sessionStorage.getItem("categoria");

    // Obtiene el nombre de la categoría correspondiente utilizando el objeto TIPO_CATEGORIA
    const nombreCategoria = TIPO_CATEGORIA[idCategoria] || "PRODUCTOS";

    // Establece el título en el elemento HTML
    const tituloElement = document.getElementById('texto-constante');
    tituloElement.textContent = TITULO_CATEGORIA[nombreCategoria];

    // Carga los productos basados en idCategoria
    cargarProductos(idCategoria);
});

async function cargarProductos(idCategoria) {
    if (idCategoria) {
        try {
            // Realiza una solicitud Fetch al servidor en el puerto 5500
            const response = await fetch(`http://localhost:3000/obtenerproductos?categoria=${idCategoria}`);
            console.log(response);
            if (response.ok) {
                // Si la respuesta es exitosa (estado 200 OK), obtén el contenido en formato JSON
                const data = await response.json();
                console.log(data);
                const container = document.getElementById('productos-container');

                data.forEach((producto) => {
                    const imageData = producto.imagen.data; // Supongamos que esto es un array de datos binarios
                    const imageType = producto.imagen.type; // Ajusta esto al tipo de imagen correcto según tus datos
                  
                    const imageBlob = new Blob([new Uint8Array(imageData)], { type: imageType });
                    producto.imageUrl = URL.createObjectURL(imageBlob);

                    const productoElement = document.createElement('div');
                    productoElement.className = 'producto';
                    productoElement.innerHTML = `
                    <div class="contenedor-img" ><img src="${producto.imageUrl}" alt="Producto" /></div>
                    <div class="contenido-producto" >
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p>$${producto.precio}</p>
                    </div>
                    `;
                    container.appendChild(productoElement);
                });
            } else {
                console.error(`Error en la solicitud: ${response.status} - ${response.message}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    } else {
        try {
            // Realiza una solicitud Fetch al servidor en el puerto 3000
            const response = await fetch(`http://localhost:3000/productos`);
            if (response.ok) {
                // Si la respuesta es exitosa (estado 200 OK), obtén el contenido en formato JSON
                const data = await response.json();
                console.log(data);
                const container = document.getElementById('productos-container');

                data.forEach((producto) => {
                    const imageData = producto.imagen.data; // Supongamos que esto es un array de datos binarios
                    const imageType = producto.imagen.type; // Ajusta esto al tipo de imagen correcto según tus datos
                  
                    const imageBlob = new Blob([new Uint8Array(imageData)], { type: imageType });
                    producto.imageUrl = URL.createObjectURL(imageBlob);

                    const productoElement = document.createElement('div');
                    productoElement.className = 'producto';
                    productoElement.innerHTML = `
                    <div class="contenedor-img" ><img src="${producto.imageUrl}" alt="Producto" /></div>
                    <div class="contenido-producto" >
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p>$${producto.precio}</p>
                    </div>
                    `;
                    container.appendChild(productoElement);
                });
            } else {
                console.error(`Error en la solicitud: ${response.status} - ${response.message}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
}