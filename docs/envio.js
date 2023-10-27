


//Ejecuta cuando presiona el boton de Enviar
datos.addEventListener('submit', function (e) {

  e.preventDefault();

  //Obtiene los valores del formulario
  const usuarioInput = document.getElementById('message');
  const fotoInput = document.getElementById('foto');
  const usuario = usuarioInput.value;
  const myToast = document.getElementById("myToast");
  const toastElement = new bootstrap.Toast(myToast, { delay: 3000 })
  const toastText = document.getElementById("toastText");
  let checkbox = document.getElementById("checkbox2");
  const boton = document.getElementById("btnIniciarSesion");

  //Valida texto ingresado
  if (!usuario || usuario === "") {
    if (checkbox.checked) {
      toastText.textContent = "Ingrese Nombre del archivo"
    } else {
      toastText.textContent = "Ingrese Cuerpo del mensaje"
    }
    toastElement.show()
    return
  }


  boton.disabled = true
  if (checkbox.checked) {
    //Valida si enviara Imagen
    if (fotoInput.files.length > 0) {
      const fotoFile = fotoInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        //Obtiene la imagen en base64
        const base64Image = e.target.result;

        const data = {
          message: usuario,
          colaSeleccionada: selectedValue,
          img: base64Image,
        };

        // Envia la solicitud POST al servicio de Express
        fetch("https://proyectomq.alliedg.tk/user", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),

        }).then(response => {
          if (response.status === 201) {
            toastText.textContent = "Imagen enviada"
            toastElement.show()
          } else {
            toastText.textContent = "Error al enviar"
            toastElement.show()
          }
        }).catch(error => {
          toastText.textContent = "Error al enviar: " + error
          toastElement.show()
        }).finally(() => {

          boton.disabled = false
        });
      };

      // Lee la imagen como una URL de datos en base64
      reader.readAsDataURL(fotoFile);
    } else {
      toastText.textContent = "Seleccione una imagen"
      toastElement.show()
    }

  } else {
    //Valida si enviara string
    const data = {
      message: usuario,
      colaSeleccionada: selectedValue,
      img: "",
    };

    // Envia la solicitud POST al servicio de Express
    fetch("https://proyectomq.alliedg.tk/user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => {
      if (response.status === 201) {
        toastText.textContent = "Mensaje enviado"
        toastElement.show()
      } else {
        toastText.textContent = "Error al enviar"
        toastElement.show()
      }
    }).catch(error => {
      toastText.textContent = "Error al enviar: " + error
      toastElement.show()
    }).finally(() => {

      boton.disabled = false
    });
  }
  boton.disabled = false
});

//Obtiene los valores del formulario
var selectElement = document.getElementById("miSeleccion");
var selectedValue = selectElement.value;
const checkbox1 = document.querySelector('.checkbox1');
const checkbox2 = document.querySelector('.checkbox2');
const seccion1 = document.getElementById('seccion1');
const seccion2 = document.getElementById('seccion2');

//Validar el cambio de valor en el select
function myFunction() {
  selectedValue = document.getElementById("miSeleccion").value;
}

//Checkear por defecto Enviar String
function alCargar() {
  miSeleccion.style.display = checkbox2.checked ? 'none' : 'block';
  let checkbox1 = document.querySelector('.checkbox1');
  checkbox1.checked = true
}

//Valida los cambios en los checkboxes
function validarCheckes(numero, checkbox) {
  var inputElement = document.getElementById("message");
  var labelElement = document.querySelector("label[for='message']");
  //Este si enviara String
  if (numero === 1) {
    if (checkbox.checked) {
      miSeleccion.style.display = 'block';
      seccion2.style.display = 'none';
      checkbox2.checked = false;

      selectElement.value = "cola1";
      selectedValue = "cola1"

      labelElement.textContent = "Cuerpo del mensaje";
      inputElement.placeholder = "cuerpo del mensaje";
    } else {
      checkbox.checked = true;
    }
    //Este si enviara imagen
    //Envia la imagen por defecto a la cola2
  } else {
    if (checkbox.checked) {
      seccion2.style.display = checkbox2.checked ? 'block' : 'none';
      miSeleccion.style.display = checkbox2.checked ? 'none' : 'block';
      selectElement.value = "cola2";
      selectedValue = "cola2"

      miSeleccion.style.display = 'none';
      checkbox1.checked = false;

      labelElement.textContent = "Nombre del archivo";
      inputElement.placeholder = "Nombre del archivo";
    } else {
      checkbox.checked = true;

    }
  }
}






