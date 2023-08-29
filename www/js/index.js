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
function onDeviceReady(){
  document.addEventListener("backbutton", onBackKeyDown, false)
}
function onBackKeyDown(e){
  e.preventDefault()
  salirApp()
}