function email(){
  cordova.plugins.email.open({
    app: 'mailto',
    to: 'memoramautna@gmail.com',
    cc: '',
    subject: 'Feedback',
    Body: ''
  })
}

// OCULTAR TECLADO AL DAR ENTER.
document.addEventListener("keypress", onGoKeyDown, false);
function onGoKeyDown(e) {
    console.log(e);
    if(e.srcElement.localName == 'input') {
        if (e.keyCode === 13 || e.keyCode === 10) {
            e.preventDefault();
            hideKeyboard();
        }
    }
}

let hideKeyboard = function() {
  document.activeElement.blur();
  let inputs = document.querySelectorAll('input');
  for(let i=0; i < inputs.length; i++) {
    inputs[i].blur();
  }
}

// ALERTA PARA SALIR DE LA APP
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

// BLOQQUEAR BOTÓN DE RETROCESO
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e) {
  e.preventDefault();
}

// localStorage de la app
var datos = []

var nombre = document.querySelector("#nombre")
// FUNCIONALIDAD LOGIN
function Pfacil() {
  if ((nombre.value != "")) {
    location.href = "facil.html"

    var nombreF = {
      nombreF: nombre.value
    }
    datos.push(nombreF)
    console.log(nombreF)
    for (let i = 0; i < datos.length; i++) {

      // tabla.innerHTML += `
      // <tr>
      //     <t h>${i}</th>
      //     <td>${datos[i].nombre}</td>
      // </tr>`
    }
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

window.addEventListener('load', () => {
  var validarLS = localStorage.getItem('datos')
  if (validarLS == null) {
    datos = []
  } else {
    datos = JSON.parse(validarLS)
  }

});

function Pmedio() {
  if ((nombre.value != "")) {
    location.href = "normal.html"
    var nombreNormal = {
      nombreNormal: nombre.value
    }
    datos.push(nombreNormal)
    console.log(nombreNormal)
    for (let i = 0; i < datos.length; i++) {

      // tabla.innerHTML += `
      // <tr>
      //     <t h>${i}</th>
      //     <td>${datos[i].nombre}</td>
      // </tr>`
    }
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

function Pdificil() {
  if ((nombre.value != "")) {
    location.href = "dificil.html"
    var nombreDificil = {
      nombreDificil: nombre.value
    }
    datos.push(nombreDificil)
    console.log(nombreDificil)
    for (let i = 0; i < datos.length; i++) {

      // tabla.innerHTML += `
      // <tr>
      //     <t h>${i}</th>
      //     <td>${datos[i].nombre}</td>
      // </tr>`
    }
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}

function Pextremo() {
  if ((nombre.value != "")) {
    location.href = "extremo.html"
    var nombreExtremo = {
      nombreExtremo: nombre.value
    }
    datos.push(nombreExtremo)
    console.log(nombreExtremo)
    for (let i = 0; i < datos.length; i++) {

      // tabla.innerHTML += `
      // <tr>
      //     <t h>${i}</th>
      //     <td>${datos[i].nombre}</td>
      // </tr>`
    }
    nombre.value = ""
  }
  localStorage.setItem("datos", JSON.stringify(datos))
}