// SOPORTE LOCALSTORAGE DE LA APP.
let datos = []
let nombre = document.querySelector("#nombre")

// FUNCIONALIDAD LOGIN.
function Facil() {
  // Valida si el input no está vacío.
  if ((nombre.value != "")) {
    location.href = "facil.html"
    let nombreF = {
      nombreF: nombre.value
    }
    datos.push(nombreF)
    console.log(nombreF)
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

// LIMPIA EL NOMBRE DEL LOCALSTORAGE AL RECARGAR LA PÁGINA.
window.addEventListener('load', () => {
  let validarLS = localStorage.getItem('datos')
  if (validarLS == null) {
    datos = []
  } else {
    datos = JSON.parse(validarLS)
  }
})

// LOGIN DIFICULTAD NORMAL.
function Normal() {
  // Valida si el input no está vacío.
  if ((nombre.value != "")) {
    location.href = "normal.html"
    let nombreN = {
      nombreN: nombre.value
    }
    datos.push(nombreN)
    console.log(nombreN)
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

// LOGIN DIFICULTAD DIFÍCIL.
function Dificil() {
  // Valida si el input no está vacío.
  if ((nombre.value != "")) {
    location.href = "dificil.html"
    let nombreD = {
      nombreD: nombre.value
    }
    datos.push(nombreD)
    console.log(nombreD)
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

// LOGIN DIFICULTAD EXTREMO.
function Extremo() {
  // Valida si el input no está vacío.
  if ((nombre.value != "")) {
    location.href = "extremo.html"
    let nombreE = {
      nombreE: nombre.value
    }
    datos.push(nombreE)
    console.log(nombreE)
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

// OCULTAR TECLADO AL PRESIONAR ENTER EN EL DISPOSITIVO.
document.addEventListener("keypress", onGoKeyDown, false);
let hideKeyboard = function() {
  document.activeElement.blur();
  let inputs = document.querySelectorAll('input');
  for(let i=0; i < inputs.length; i++) {
    inputs[i].blur();
  }
}
function onGoKeyDown(e) {
    console.log(e);
    if(e.srcElement.localName == 'input') {
        if (e.keyCode === 13 || e.keyCode === 10) {
            e.preventDefault();
            hideKeyboard();
        }
    }
}

// ALERTA PARA SALIR DE LA APP.
function salirApp() {
  function onConfirm(buttonIndex) {
    if (buttonIndex == 1) {
      navigator.app.exitApp()
    }
    else {
      return
    }
  }

  navigator.notification.confirm(
    '¿Está seguro/a de que desea salir de la app?',
    onConfirm,
    'SALIR',
    ['Si', 'No']
  )
}

// BLOQQUEAR BOTÓN DE RETROCESO EN EL DISPOSITIVO.
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e) {
  e.preventDefault();
}

// SOPORTE PARA EL BOTÓN DE CORREO ELECTRÓNICO.
function email(){
  cordova.plugins.email.open({
    app: 'mailto',
    to: 'memoramautna@gmail.com',
    cc: '',
    subject: 'Feedback',
    Body: ''
  })
}