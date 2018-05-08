document.addEventListener('DOMContentLoaded', () => {

console.log('IronGenerator JS imported successfully!');
  



  document.getElementById("push").addEventListener("click", ()=>{
    let id = document.getElementById("product-id").innerHTML
    let currentvalueproduct = 0
    let currentpujavalue = 0
    let suma = 0;
    

    fetch(`/api/${id}`)
      .then(res => {
        if(!res.ok) return console.log(res);
        //console.log(res)
        return res.json();
      })
      .then(product => {
        currentvalueproduct = product.currentPrice
        currentpujavalue = product.puja
        suma = currentvalueproduct + currentpujavalue;
        console.log()
        return  fetch(`/api/${id}`,{
          method:"PATCH",
          body: JSON.stringify({currentPrice:suma}),
          headers:{
            "Content-type":"application/json"
          }
        })
      })
      .then(res => {
        if(!res.ok) return console.log(res);
        //console.log(res)
        return res.json();
      })
      .then(product => {
        console.log(product.currentPrice); 
        document.getElementById('cero').innerHTML = product.currentPrice;
      })
  })









}, false);
