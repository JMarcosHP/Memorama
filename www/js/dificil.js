// Al cargar la dificultad inicia el crono.
window.onload = iniciar

// MANDAR EL NOMBRE DEL USUARIO AL JUEGO.
window.addEventListener('load', () => {
  let nombre, arreglo, salidat, datos = []
  arreglo = localStorage.getItem('datos')
  datos = JSON.parse(arreglo)

  for (let i = 0; i < datos.length; i++) {
    //Nombre del usuario que ingresó.
    nombre = JSON.stringify(datos[i].nombreD)
    salidat = document.querySelector("#nombreD")
    salidat.innerHTML = nombre
    console.log(nombre)
  }
})

// FUNCIONALIDAD MEMORIA.
const card = document.querySelectorAll('.cell-dificil')
const front = document.querySelectorAll('.front')
const containerDificil = document.querySelector('.container-memory-dificil')
const score = document.querySelector('.score span')

// Ordena de forma aleatoria las cartas.
function suffleImage() {
  card.forEach(c => {
    const num = [...Array(card.length).keys()]
    const random = Math.floor(Math.random() * card.length)
    c.style.order = num[random]
  })
}
suffleImage()

// ANIMACIÓN AL HACER CLICK EN LAS CARTAS, BLOQUEA CUANDO HAY DOS CARTAS DESCUBIERTAS.
function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show')
    setInterval(() => {
      front[i].classList.remove('show')
    }, 1800);
    card[i].addEventListener('click', () => {
      front[i].classList.add('flip')
      const filppedCard = document.querySelectorAll('.flip')
      if (filppedCard.length == 2) {
        containerDificil.style.pointerEvents ='none'
        setTimeout(() => {
          containerDificil.style.pointerEvents ='all'
        },800);
        match(filppedCard[0], filppedCard[1])
      }
    })
  }
}
clicking()

// COMPARA SI LAS DOS CARTAS SON IGUALES Y LAS MARCA.
function match(cardOne, cardTwo) {
  if (cardOne.dataset.index == cardTwo.dataset.index) {
    cardOne.classList.remove('flip')
    cardTwo.classList.remove('flip')
    cardOne.classList.add('match')
    cardTwo.classList.add('match')
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip')
      cardTwo.classList.remove('flip')
    },700);
  }

  // Cuando todas las cartas están encontradas detiene cronometro, guarda record y manda notificación. 
  let checkingCards = document.querySelectorAll('#check')
  checkingCards = Array.from(checkingCards)
  let check = checkingCards.every(cards =>  cards.classList.contains('match'))
  if (check == true){
    parar()
    recordCronometro()
    setTimeout(() => {
      terminado()
    }, 1000)
  }
}

// FUNCIONALIDAD DEL CRONÓMETRO.
// Variables para la función chronometer().
    // Contador de horas.
let hours = `00`,
    //Contador de minutos.
    minutes = `00`,
    // Contador de segundos.
    seconds = `00`,
    // Imprime los contadores.
    chronometerDisplay = document.querySelector('#data-chronometer'),
    // Llamada al crono.
    chronometerCall

// Función principal del cronometro.
function chronometer() {
  // Inicia incrementando el contador de segundos.
  seconds ++
  if (seconds < 10) seconds = `0` + seconds
  // Si el contador de segundos llega a 59, regresa a 0 e incrementa el contador de minutos.
  if (seconds > 59) {
    seconds = `00`
    minutes ++
      if (minutes < 10) minutes = `0` + minutes
    }
  // Si el contador de minutos llega a 59, regresa a 0 e incrementa el contador de horas.
  if (minutes > 59) {
    minutes = `00`
    hours ++
    if (hours < 10) hours = `0` + hours
    }

  // Imprime los tres contadores en orden y en tiempo real.
  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`
}

// Función para iniciar el crono.
function iniciar() {
  chronometer()
  chronometerCall = setInterval(chronometer, 1000)
}

// Función para detener el crono, se desactivan los botones de pausa y reanudar.
function parar() {
  clearInterval(chronometerCall)
  botonPausa.setAttribute(`disabled`,``)
  botonReanudar.setAttribute(`disabled`, ``)
}

// BOTONES DE CONTROL PARA EL CRONO.
botonReanudar.onclick = (event) => {
  chronometerCall = setInterval(chronometer, 1000)
  event.target.setAttribute(`disabled`,``)
  botonPausa.removeAttribute(`disabled`)
  // Habilita la funcionalidad de las cartas al estar en pausa.
  containerDificil.style.pointerEvents = 'all'
}
botonPausa.onclick = (event) => {
  clearInterval(chronometerCall)
  botonReanudar.removeAttribute(`disabled`)
  event.target.setAttribute(`disabled`,``)
  // Deshabilita la funcionalidad de las cartas al estar en pausa.
  containerDificil.style.pointerEvents = 'none'
}

// DETENER CRONÓMETRO SI LA APP SE VA A SEGUNDO PLANO.
document.addEventListener("pause", onPause, false);
function onPause() {
  clearInterval(chronometerCall)
  containerDificil.style.pointerEvents = 'none'
  document.addEventListener("backbutton", onBackKeyDown, false)

  if ((botonPausa.hasAttribute('disabled') == false) && (botonReanudar.hasAttribute('disabled') == true)) {
    botonPausa.setAttribute(`disabled`,``)
    botonReanudar.setAttribute(`disabled`,``)
} else {
    if ((botonPausa.hasAttribute('disabled') == true) && (botonReanudar.hasAttribute('disabled') == false)) {
      botonPausa.setAttribute(`disabled`,``)
      botonReanudar.setAttribute(`disabled`,``)
    }
  }
}

// REANUDAR CRONÓMETRO CUANDO DEJA DE ESTAR EN SEGUNDO PLANO.
document.addEventListener("resume", onResume, false);
function onResume() {
  chronometerCall = setInterval(chronometer, 1000)
  containerDificil.style.pointerEvents = 'all'
  document.addEventListener("backbutton", onBackKeyDown, false)
  botonPausa.removeAttribute(`disabled`,``)
}

// Envía los records al LOCALSTORAGE para imprimirlos en la tabla de records.
const highscores = JSON.parse(localStorage.getItem('highscores')) || []
function recordCronometro() {
  nombre = document.querySelector('#nombreD').textContent
  record = document.querySelector('#data-chronometer').textContent
  dificultad = document.querySelector('#dificultad').textContent

  const scores = {
    nombre: nombre,
    record: record,
    dificultad: dificultad
    }
  
  // Guarda el score en el localstorage.
  highscores.push(scores)
  localStorage.setItem('highscores', JSON.stringify(highscores))
  console.log(highscores)
}

// FUNCIONALIDAD DE ALERTAS Y BOTONES DEL DISPOSITIVO.
// ALERTA PARA SALIR DEL JUEGO.
function salir() {
  // Pausa momentaneamente el crono al enviar la alerta y bloquea las cartas.
  clearInterval(chronometerCall)
  containerDificil.style.pointerEvents = 'none'

  // Preservar la funcionalidad de los botones durante la alerta de salida.
  if ((botonPausa.hasAttribute('disabled') == false) && (botonReanudar.hasAttribute('disabled') == true)) {
    botonPausa.setAttribute(`disabled`,``)
    botonReanudar.setAttribute(`disabled`,``)
  } else {
    if ((botonPausa.hasAttribute('disabled') == true) && (botonReanudar.hasAttribute('disabled') == false)) {
      botonPausa.setAttribute(`disabled`,``)
      botonReanudar.setAttribute(`disabled`,``)
    }
  }
  
  function onConfirm(buttonIndex) {
    // Si el usuario elige salir, se redirecciona al login.
    if (buttonIndex == 1) {
      location.href = "login.html"
    }
    // Si no elige salir, se reanuda el cronometro y activa los botones de pausa y reanudar.
    else {
      if (buttonIndex == 2){
        chronometerCall = setInterval(chronometer, 1000)
        containerDificil.style.pointerEvents = 'all'
        botonPausa.removeAttribute(`disabled`,``)
      } else {
        chronometerCall = setInterval(chronometer, 1000)
        containerDificil.style.pointerEvents = 'all'
        botonPausa.removeAttribute(`disabled`,``)
      }
    }
  }

  // Manda la confirmación para salir.
  navigator.notification.confirm(
    '¿Está seguro/a de que desea salir?',
    onConfirm,
    'SALIR',
    ['Si', 'No']
  )
}

// CONFIRMACIÓN DE JUEGO TERMINADO.
function terminado() {
  // Bloquea la funcionalidad de las cartas.
  containerDificil.style.pointerEvents = 'none'
  // Si el usuario quiere ver los records, se redirecciona a esa parte.
  function scoreboard(buttonIndex) {
    if (buttonIndex == 1) {
      location.href = "scoreboard.html"
    }
    else {
      // Si el usuario solo elige salir de la dificultad, redirecciona al login.
      if (buttonIndex == 2){
        location.href = "login.html"
      } else {
        // Se mantiene en la dificultad actual.
        if (buttonIndex == 3){
          return
        }
      }
    }
  }

  // Alerta de juego terminado.
  navigator.notification.confirm(
    'Felicidades!!!, ha terminado el juego.',
    scoreboard,
    'JUEGO TERMINADO',
    ['Ver puntuación', 'Nuevo juego', 'Quedarse']
  )
}

// FUNCIONALIDAD BOTÓN DE RETROCESO.
document.addEventListener("deviceready", onDeviceReady, false)
function onDeviceReady(){
  document.addEventListener("backbutton", onBackKeyDown, false)
}
function onBackKeyDown(e) {
  e.preventDefault()
  salir()
}

// SOPORTE PARA El BOTÓN DE CORREO ELECTRÓNICO.
function email(){
  cordova.plugins.email.open({
    app: 'mailto',
    to: 'memoramautna@gmail.com',
    cc: '',
    subject: 'Feedback',
    Body: ''
  })
}