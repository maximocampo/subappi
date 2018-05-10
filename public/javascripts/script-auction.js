let time = Number(document.getElementById('timeofprod').value)
let timeInDate = new Date(Number(time))
console.log(timeInDate)
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

function initializeClock(id, endtime) {
var clock = document.getElementById(id);
var daysSpan = clock.querySelector('.days');
var hoursSpan = clock.querySelector('.hours');
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');

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

var deadline = new Date(time);
initializeClock('clockdiv', deadline);






var socket = io.connect();



document.getElementById("push").addEventListener("click", ()=>{
if(
  document.getElementsByClassName('days')[0].innerHTML === '0'&&
  document.getElementsByClassName('hours')[0].innerHTML === '0' &&
  document.getElementsByClassName('minutes')[0].innerHTML === '0' &&
  document.getElementsByClassName('seconds')[0].innerHTML === '0' ||
  Number(document.getElementById('tuscreditos').innerHTML) <  Number(document.getElementById('pujaValue').value)
){
    return
  }else{
    let productId = document.getElementById("product-id").value;
    let price = document.getElementById('price').innerHTML;
    let pujaValue = document.getElementById('pujaValue').value;
    let newlider = document.getElementById('newlider').value;
    document.getElementById('price').innerHTML = parseInt(price) + parseInt(pujaValue);
    document.getElementById('lider').innerHTML = newlider
    document.getElementById('tuscreditos').innerHTML = Number(document.getElementById('tuscreditos').innerHTML) - Number(document.getElementById('pujaValue').value)
    
    socket.emit('puja', {
      productId,
      pujaValue,
      price,
      newlider});
  }});

document.getElementById('heartBtn').addEventListener('click',function() {

let productId = document.getElementById("product-id").value;
let userId = document.getElementById('newlider').value;

socket.emit('follow',{
  productId,
  userId
})

alert('Ahora sigues este producto');

})


socket.on('update', function(p){
  document.getElementById('price').innerHTML = p.currentPrice
  });
  







