function email(){
  cordova.plugins.email.open({
    app: 'mailto',
    to: 'memoramautna@gmail.com',
    cc: '',
    subject: 'Feedback',
    Body: ''
  })
}


// REANUDAR CRONÓMETRO CUANDO DEJA DE ESTAR EN SEGUNDO PLANO.
document.addEventListener("resume", onResume, false);
function onResume() {
  chronometerCall = setInterval(chronometer, 1000)
  containerDificil.style.pointerEvents = 'all'
  document.addEventListener("backbutton", onBackKeyDown, false)
  botonPausa.removeAttribute(`disabled`,``)
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

// ALERTA PARA SALIR DEL JUEGO
function salir() {
  clearInterval(chronometerCall)
  containerDificil.style.pointerEvents = 'none'

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
    if (buttonIndex == 1) {
      location.href = "login.html"
    }
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

  navigator.notification.confirm(
    '¿Está seguro/a de que desea salir?',
    onConfirm,
    'SALIR',
    ['Si', 'No']
  )
}

// CONFIRMACIÓN DE JUEGO TERMINADO
function terminado() {
  containerDificil.style.pointerEvents = 'none'

  function scoreboard(buttonIndex) {
    if (buttonIndex == 1) {

      location.href = "scoreboard.html"
    }
    else {
      if (buttonIndex == 2){
        location.href = "login.html"
      } else {
        if (buttonIndex == 3){
          return
        }
      }
    }
  }

  navigator.notification.confirm(
    'Felicidades!!!, ha terminado el juego.',
    scoreboard,
    'JUEGO TERMINADO',
    ['Ver puntuación', 'Nuevo juego', 'Quedarse']
  )
}

// MANDAR EL NOMBRE DE USUARIO AL JUEGO
window.addEventListener('load', () => {
  let nombre, arreglo, salidat, datos = []
  arreglo = localStorage.getItem('datos')
  datos = JSON.parse(arreglo)

  for (let i = 0; i < datos.length; i++) {
    //Nombre del usuario que ingreso
    nombre = JSON.stringify(datos[i].nombreDificil)
    salidat = document.querySelector("#nombreDificil")
    salidat.innerHTML = nombre
    console.log(nombre)
  }
});

// FUNCIONALIDAD BOTÓN DE RETROCESO
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
  document.addEventListener("backbutton", onBackKeyDown, false)
}
function onBackKeyDown(e){
  e.preventDefault()
  salir()
}

// FUNCIONALIDAD MEMORIA
const card = document.querySelectorAll('.cell-dificil')
const front = document.querySelectorAll('.front')
const containerDificil = document.querySelector('.container-memory-dificil')
const score = document.querySelector('.score span')

suffleImage()
clicking()
function suffleImage(){
  
  
  card.forEach(c=>{
    
    const num = [...Array(card.length).keys()]
    const random = Math.floor(Math.random()*card.length)
    
    c.style.order = num[random]
  })
}

function clicking(){
  
  for(let i =0; i<card.length; i++){
    
    
    front[i].classList.add('show')
    
    setInterval(() => {
      front[i].classList.remove('show')
    }, 1800);
    
    card[i].addEventListener('click' ,()=>{
      
      front[i].classList.add('flip')
      const filppedCard = document.querySelectorAll('.flip')
      
      if(filppedCard.length == 2){
        containerDificil.style.pointerEvents ='none'
        setTimeout(() => {
          containerDificil.style.pointerEvents ='all'
        }, 800);

        match(filppedCard[0] , filppedCard[1])

      }

    })
  }
}

function match(cardOne , cardTwo){
  if(cardOne.dataset.index == cardTwo.dataset.index){

    cardOne.classList.remove('flip') 
    cardTwo.classList.remove('flip') 

    cardOne.classList.add('match')
    cardTwo.classList.add('match')
    
  }else{
    
    setTimeout(() => {
      
      cardOne.classList.remove('flip') 
      cardTwo.classList.remove('flip') 
    }, 700);
  }
  
  // CHECAR QUE TODAS LAS CARTAS ESTÁN ENCONTRADAS
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

// FUNCIONALIDAD DEL CRONÓMETRO
let hours = `00`,
    minutes = `00`,
    seconds = `00`,
    chronometerDisplay = document.querySelector('#data-chronometer'),
    chronometerCall

window.onload = iniciar
function chronometer() {
  seconds ++
  if (seconds < 10) seconds = `0` + seconds
  if (seconds > 59) {
    seconds = `00`
    minutes ++
      if (minutes < 10) minutes = `0` + minutes
    }

  if (minutes > 59) {
    minutes = `00`
    hours ++

    if (hours < 10) hours = `0` + hours
    }

  chronometerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`
  }

function iniciar() {
  chronometer()
  chronometerCall = setInterval(chronometer, 1000)
}

botonReanudar.onclick = (event) => {
  chronometerCall = setInterval(chronometer, 1000)
  event.target.setAttribute(`disabled`,``)
  botonPausa.removeAttribute(`disabled`)
  containerDificil.style.pointerEvents = 'all'
}

botonPausa.onclick = (event) => {
  clearInterval(chronometerCall)
  botonReanudar.removeAttribute(`disabled`)
  event.target.setAttribute(`disabled`,``)
  containerDificil.style.pointerEvents = 'none'
}

function parar() {
  clearInterval(chronometerCall)
  botonPausa.setAttribute(`disabled`,``)
  botonReanudar.setAttribute(`disabled`, ``)
}

const highscores = JSON.parse(localStorage.getItem('highscores')) || []
function recordCronometro() {
  nombre = document.querySelector('#nombreDificil').textContent
  record = document.querySelector('#data-chronometer').textContent
  dificultad = document.querySelector('#dificultad').textContent

  const scores = {
    nombre: nombre,
    record: record,
    dificultad: dificultad
    }

  highscores.push(scores)
  localStorage.setItem('highscores', JSON.stringify(highscores))
  console.log(highscores)
}
