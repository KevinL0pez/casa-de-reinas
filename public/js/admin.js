document.addEventListener("DOMContentLoaded", async function () {
  const login = sessionStorage.getItem('login');
  if (login == 'false') {
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
  cargarProductos();
  formNuevoProducto.style.display = "none";
});

async function cargarProductos() {
  try {
    // Realiza una solicitud Fetch al servidor en el puerto 3000
    const response = await fetch(`http://localhost:3000/productos`);
    if (response.ok) {
      // Si la respuesta es exitosa (estado 200 OK), obtén el contenido en formato JSON
      const data = await response.json();
      console.log(data);
      const container = document.getElementById("productos-container");

      data.forEach((producto) => {
        const imageData = producto.imagen.data; // Supongamos que esto es un array de datos binarios
        const imageType = producto.imagen.type; // Ajusta esto al tipo de imagen correcto según tus datos

        const imageBlob = new Blob([new Uint8Array(imageData)], {
          type: imageType,
        });
        producto.imageUrl = URL.createObjectURL(imageBlob);

        const productoElement = document.createElement("div");
        productoElement.className = "producto";
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
      console.error(
        `Error en la solicitud: ${response.status} - ${response.message}`
      );
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

const formulario = document.getElementById("formularioProducto");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").files[0]; // Obtiene la imagen seleccionada
  console.log(imagen);
  // Crea un objeto FormData para enviar los datos y la imagen
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("categoria", categoria);
  formData.append("descripcion", descripcion);
  formData.append("precio", precio);
  formData.append("imagen", imagen);

  // Realiza la solicitud POST al servidor
  try {
    await fetch("http://localhost:3000/guardarproducto", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // La solicitud fue exitosa (código de estado 200)
        return response.json(); // Analizar el cuerpo de la respuesta como JSON
      })
      .then(async (data) => {
        // "data" contiene el mensaje del servidor en formato JSON
        console.log(data);
        if (data.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          sessionStorage.setItem("login", false);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // Resto del código
      })
      .catch((error) => {
        window.alert(error.message);
        console.error("Error en la solicitud:", error);
      });
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.message,
      showConfirmButton: false,
      timer: 1500,
    });
    console.error("Error en la solicitud:", error);
  }
});

const contenedorProductos = document.getElementById("nuevo-producto");

formulario.addEventListener("input", function () {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const imagenInput = document.getElementById("imagen");

  let urlImagen;
  let imagenSeleccionada;
  if (imagenInput.files.length > 0) {
    imagenSeleccionada = imagenInput.files[0];
    urlImagen = URL.createObjectURL(imagenSeleccionada);
  }
  contenedorProductos.innerHTML = "";

  // Crea un nuevo elemento de producto con los valores capturados
  const nuevoProducto = document.createElement("div");
  nuevoProducto.classList.add("producto-nuevo");
  nuevoProducto.innerHTML = `
                      <div class="contenedor-img-nuevo"><img src="${urlImagen}" alt="Producto" /></div>
                      <div class="contenido-producto-nuevo">
                          <h2>${nombre}</h2>
                          <p>${descripcion}</p>
                          <p>$${precio}</p>
                      </div>
                  `;

  // Agrega el nuevo producto al contenedor de productos
  contenedorProductos.appendChild(nuevoProducto);
});

const btnNuevo = document.getElementById("btn-nuevo");
const formNuevoProducto = document.getElementById("form-nuevo-producto");

btnNuevo.addEventListener("click", function () {
  if (
    formNuevoProducto.style.display === "none" ||
    formNuevoProducto.style.display === ""
  ) {
    formNuevoProducto.style.display = "block"; // Mostrar el formulario
  } else {
    formNuevoProducto.style.display = "none"; // Ocultar el formulario
  }
});
