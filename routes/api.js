const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');

const app = require('../app');



router.get('/:id', (req,res,next)=>{
  console.log(req.params.id)
    Product.findById(req.params.id)
    .then(product=>{
        res.json(product)
    })
    .catch(e=>next(e));
});



router.patch('/:id', (req,res,next)=>{
  console.log(req.params.id)
    Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(product=>{
        res.json(product)
    })
    .catch(e=>next(e));
});




module.exports = router;