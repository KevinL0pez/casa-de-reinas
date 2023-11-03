document.addEventListener("DOMContentLoaded", async function () {
  const login = sessionStorage.getItem("login");
  if (login == "false") {
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
  cargarProductos();
  formNuevoProducto.style.display = "none";
  formEditarProducto.style.display = "none";
});

const container = document.getElementById("productos-container");
async function cargarProductos() {
  try {
    // Realiza una solicitud Fetch al servidor en el puerto 3000
    const response = await fetch(`http://localhost:3000/productos`);
    if (response.ok) {
      // Si la respuesta es exitosa (estado 200 OK), obtén el contenido en formato JSON
      const data = await response.json();
      console.log(data);

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
                    <button id="btn-editar-${producto.id}" class="editar" >Editar producto</button>
                    <button id="btn-eliminar-${producto.id}" class="eliminar" >Eliminar producto</button>
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
                      <div class="contenedor-img-nuevo"><img id="nueva-img" src="${urlImagen}" alt="Producto" /></div>
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

// Agrega un controlador de eventos a un contenedor principal que contiene los botones de eliminación
container.addEventListener("click", async (event) => {
  if (event.target.classList.contains("eliminar")) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "¡Deseas eliminar este producto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, quiero elimarlo!",
        cancelButtonText: "¡No, lo quiero conservar!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          console.log(event.target.classList);

          // Obtiene el ID del producto desde el botón
          const buttonId = event.target.id;
          const productId = buttonId.split("-")[2]; // Suponemos que el ID está en el formato "btn-eliminar-{ID}"

          // Realiza una solicitud para eliminar el producto utilizando el ID capturado
          try {
            const response = await fetch(
              `http://localhost:3000/eliminarproducto/${productId}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              // Producto eliminado exitosamente, puedes actualizar la interfaz o recargar la página si es necesario
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado con éxito",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              console.error(
                `Error en la solicitud: ${response.status} - ${response.message}`
              );
            }
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }
        }
      });
  } else if (event.target.classList.contains("editar")) {
    // Obtener el ID del producto a editar a partir del botón
    const productId = event.target.id.split("-")[2];

    // Llamar a la función de edición pasando el ID del producto
    editarProducto(productId);
  }
});

let productEditId;
async function editarProducto(productId) {
  if (
    formEditarProducto.style.display === "none" ||
    formEditarProducto.style.display === ""
  ) {
    formEditarProducto.style.display = "block"; // Mostrar el formulario
  }
  formularioEditarProducto.dispatchEvent(new Event('input'));
  try {
    await fetch(`http://localhost:3000/obtenerproducto/${productId}`, {
      method: "GET",
    })
      .then((response) => {
        // La solicitud fue exitosa (código de estado 200)
        return response.json(); // Analizar el cuerpo de la respuesta como JSON
      })
      .then(async (data) => {

        const nombreInput = document.getElementById("editar-nombre");
        const categoriaInput = document.getElementById("editar-categoria");
        const descripcionInput = document.getElementById("editar-descripcion");
        const precioInput = document.getElementById("editar-precio");

        // Rellenar el formulario con los datos del producto seleccionado
        nombreInput.value = data.data.nombre;
        categoriaInput.value = data.data.categoria; // Ajusta esto según la estructura de tu producto
        descripcionInput.value = data.data.descripcion;
        precioInput.value = data.data.precio;
        productEditId = productId;

      })
      .catch((error) => {
        window.alert(error.message);
        console.error("Error en la solicitud:", error);
      });
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

const formEditarProducto = document.getElementById("form-editar-producto");
const formularioEditarProducto = document.getElementById("formularioEditarProducto");
const contenedorEditarProductos = document.getElementById("editar-producto");

formularioEditarProducto.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("editar-nombre").value;
  const categoria = document.getElementById("editar-categoria").value;
  const descripcion = document.getElementById("editar-descripcion").value;
  const precio = document.getElementById("editar-precio").value;

  const editarproducto = {
    nombre,
    categoria,
    descripcion,
    precio
  }

  const opciones = {
    method: "PUT", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Tipo de contenido
    },
    body: JSON.stringify(editarproducto), // Convierte los datos a formato JSON
  };

  // Realiza la solicitud POST al servidor
  try {
    await fetch(`http://localhost:3000/editarproducto/${productEditId}`, opciones)
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
