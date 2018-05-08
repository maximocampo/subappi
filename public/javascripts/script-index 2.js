document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
    
  $("#a-iniciarSesion").click(function(){
    $("#a-registrate").toggleClass("hidden")
    $("#a-iniciarSesion").toggleClass("hidden")
    $("#login-div").toggleClass("hidden")
    $("#signup-div").toggleClass("hidden")
  })  
  $("#a-registrate").click(function(){
    $("#a-registrate").toggleClass("hidden")
    $("#a-iniciarSesion").toggleClass("hidden")
    $("#login-div").toggleClass("hidden")
    $("#signup-div").toggleClass("hidden")
  })  
  }, false);