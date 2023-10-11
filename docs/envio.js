datos.addEventListener('submit', function (e) {
  e.preventDefault();
  const usuarioInput = document.getElementById('usuario');
  const contrasenaInput = document.getElementById('contrasena');
  const fotoInput = document.getElementById('foto');

  const usuario = usuarioInput.value;
  const contrasena = contrasenaInput.value;

  if (fotoInput.files.length > 0) {
    const fotoFile = fotoInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Image = e.target.result; // La imagen en base64
      console.log('Usuario:', usuario);
      console.log('Contraseña:', contrasena);
      console.log('Imagen en base64:', base64Image);

      const user = {
        usuario,
        contrasena,
        img: base64Image, // Agrega la imagen en base64 al objeto de usuario
      };

      // Envia la solicitud POST al servicio de Express
      fetch("https://proyectomq.alliedg.tk/user", {
         method: "POST",
         headers: {
             'Content-Type': 'application/json', // Indica que estás enviando JSON en el cuerpo
      // //     'Content-Type': 'text/plain',
         },
           body: JSON.stringify(user), // Convierte el objeto a JSON y lo envía en el cuerpo
      // //   body: "Hola Erick hueco",

       //fetch("http://proyectomq.alliedg.tk/enviar_mensaje.php?message=Julio%20Mayen",{
      }).then(response => {
        // Manejar la respuesta aquí si es necesario
        if (response.status === 201) {
          const messageSucceess = document.getElementById("message_success");
          messageSucceess.append("Usuario creado con éxito.")
          console.log('Usuario creado con éxito.');
        } else {
          console.error('Error al crear el usuario.');
        }
      }).catch(error => {
        console.error('Error de red:', error);
      });
    };

    reader.readAsDataURL(fotoFile); // Lee la imagen como una URL de datos en base64
  } else {
    console.log('Usuario:', usuario);
    console.log('Contraseña:', contrasena);
    console.log('No se seleccionó una imagen');
  }
});



  

