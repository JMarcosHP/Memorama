function email(){
  cordova.plugins.email.open({
    app: 'mailto',
    to: 'memoramautna@gmail.com',
    cc: '',
    subject: 'Feedback',
    Body: ''
  })
}


// ALERTA PARA SALIR DE LA APP
function salirApp(){
  function onConfirm(buttonIndex){
    if (buttonIndex == 1){
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

// FUNCIONALIDAD BOTÓN DE RETROCESO
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  document.addEventListener("backbutton", onBackKeyDown, false)
}
function onBackKeyDown(e) {
  e.preventDefault()
}



tabla= document.querySelector("#tabla")

/*for (let i = 0; i < highscores.length; i++) {
    tabla.innerHTML += `
    <tr>
    <th>${i}</th>
    <td>${highscores[i].nombre}</td>
    <td>${highscores[i].record}</td>
    <td>${highscores[i].dificultad}</td>
    </tr>`
}*/


window.addEventListener('load', () =>{
  let high = localStorage.getItem('highscores')

  if(high == null){
    highscores = []
  } else {
      highscores = JSON.parse(high) || []
  }

  for (let i = 0; i < highscores.length; i++) {
    tabla.innerHTML += `
    <tr>
      <th>${i}</th>
      <td>${highscores[i].nombre}</td>
      <td>${highscores[i].record}</td>
      <td>${highscores[i].dificultad}</td>
    </tr>`
}
  console.log(highscores)
})
