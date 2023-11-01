const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreUsuario = document.getElementById("nombreUsuario").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;

  // Puedes hacer lo que desees con los datos ingresados, como enviarlos a un servidor o mostrarlos en una alerta:
  const mensaje = `Nombre de Usuario: ${nombreUsuario}\nCorreo Electrónico: ${correo}\nContraseña: ${contrasena}`;
  alert(mensaje);

  // También puedes restablecer el formulario después de la presentación
  registroForm.reset();
});
