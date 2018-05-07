document.addEventListener('DOMContentLoaded', () => {

console.log('IronGenerator JS imported successfully!');
  function pushBid() {
      fetch(`http://localhost:3000/auction/${id}`)
  }



  document.getElementById("push").addEventListener("click", pushBid())









}, false);
