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
  $("#a-iniciarSesion2").click(function(){
    $("#a-registrate").toggleClass("hidden")
    $("#a-iniciarSesion").toggleClass("hidden")
    $("#login-div").toggleClass("hidden")
    $("#signup-div").toggleClass("hidden")
  })  
  $("#a-registrate2").click(function(){
    $("#a-registrate").toggleClass("hidden")
    $("#a-iniciarSesion").toggleClass("hidden")
    $("#login-div").toggleClass("hidden")
    $("#signup-div").toggleClass("hidden")
  })  
  }, false);

  let clockdiv = document.getElementsByClassName('clockdiv')

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
  }

  function initializeClock(div, endtime) {
    var timer = div.childNodes[3];
    var daysSpan = timer.childNodes[1]
    var hoursSpan = timer.childNodes[3]
    var minutesSpan = timer.childNodes[5]
    var secondsSpan = timer.childNodes[7]


    function updateClock() {
      var t = getTimeRemaining(endtime);
    
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
  var timeinterval = setInterval(updateClock, 1000);
  }


for (let i = 0; i < clockdiv.length; i++) {
  const clock = clockdiv[i];

  let time = Number(clock.childNodes[1].value)
  var deadline = new Date(time);
  let now = Date.now()
  if(time > now){
    initializeClock(clock, deadline);
  }else{
    clock.childNodes[3].innerHTML = 'OFERTA FINALIZADA'
  }

  
}

