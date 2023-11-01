const TITULO_CATEGORIA = {
    "ESMALTE_LATIN_GRANDE": "Esmalte Latin Grande",
    "LAMPARA_UV": "Lampara uv 180w",
    "DRI_INALAMBRICO": "Dri Inálambrico",
    "STICKERS": "Stickers",
    "ACEITE_DE_CUTICULA": "Aceite De Cutícula",
    "CORTA_CUTICULA": "Corta Cutícula",
    "PRODUCTOS": "Productos"
}

const TIPO_CATEGORIA = {
    1: "ESMALTE_LATIN_GRANDE",
    2: "LAMPARA_UV",
    3: "DRI_INALAMBRICO",
    4: "STICKERS",
    5: "ACEITE_DE_CUTICULA",
    6: "CORTA_CUTICULA"
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
                const data = await response.json(); // Para JSON
                
                // También puedes obtener el contenido como texto
                // const data = await response.text(); // Para texto
                
                console.log(data);
            } else {
                console.error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    } else {
        try {
            // Realiza una solicitud Fetch al servidor en el puerto 3000
            const response = await fetch(`http://localhost:3000/productos`);
            console.log(response);
            if (response.ok) {
                // Si la respuesta es exitosa (estado 200 OK), obtén el contenido en formato JSON
                const data = await response.json();
        
                // Obtén el contenedor donde deseas mostrar las imágenes
                const imagenesContenedor = document.getElementById('imagenes-contenedor'); // Reemplaza 'imagenes-contenedor' con el ID real de tu contenedor
        
                // Recorre los productos y crea elementos de imagen para cada uno
                data.forEach(producto => {
                    const imageData = producto.imagen.data;
                    const imageType = producto.imagen.type;
        
                    console.log("Está procesando la imagen: " + producto.nombre);
        
                    // Convierte los datos binarios en un Blob
                    const imageBlob = new Blob([new Uint8Array(imageData)], { type: imageType });
        
                    // Crea una URL de objeto para el Blob
                    const imageUrl = URL.createObjectURL(imageBlob);
        
                    // Crea un elemento de imagen
                    const imageElement = document.createElement(`img`);
                    imageElement.src = imageUrl;
        
                    // Agrega el elemento de imagen al contenedor
                    // imagenesContenedor.appendChild(imageElement);
                    console.log(imageElement);
                });
            } else {
                console.error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
}