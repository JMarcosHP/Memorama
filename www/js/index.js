// ALERTA PARA SALIR DE LA APP.
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

// FUNCIONALIDAD DEL BOTÓN DE RETROCESO EN EL DISPOSITIVO PARA SALIR DEL JUEGO.
document.addEventListener("deviceready", onDeviceReady, false)
function onDeviceReady(){
  document.addEventListener("backbutton", onBackKeyDown, false)
}
function onBackKeyDown(e){
  e.preventDefault()
  salirApp()
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