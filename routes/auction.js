const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});


router.get('api/:_id', (req,res,next)=>{
    Product.findById(req.params)
    .then(product=>{
        res.json(product)
    })
    .catch(e=>next(e));
});


router.get('/:_id', (req,res,next)=>{
    Product.findById(req.params)
    .populate('lider')
    .then(product=>{
        res.render('auction', {product,user:req.user})
    })
    .catch(e=>next(e));
});





module.exports = router;