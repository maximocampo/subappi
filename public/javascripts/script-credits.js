let userId = document.getElementById('user-id').value
var socket = io.connect();
document.getElementById('comprar-173').addEventListener('click',()=>{
  socket.emit('compra',{
    userId,
    c: 173
  })
})
document.getElementById('comprar-275').addEventListener('click',()=>{
  socket.emit('compra',{
    userId,
    c: 275
  })
})
document.getElementById('comprar-600').addEventListener('click',()=>{
  socket.emit('compra',{
    userId,
    c: 600
  })
})
document.getElementById('comprar-1000').addEventListener('click',()=>{
  socket.emit('compra',{
    userId,
    c: 1000
  })
})

socket.on('updatecredits',datos=>{
  document.getElementById('tuscreditos').innerHTML = datos.creditos
})