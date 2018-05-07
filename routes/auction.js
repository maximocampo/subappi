const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});


router.get('/:_id', (req,res,next)=>{
    Product.findById(req.params)
    .then(product=>{
        console.log(product)
        res.render('auction', product)
    })
    .catch(e=>next(e));
});



module.exports = router;