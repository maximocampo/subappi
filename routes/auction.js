const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});


router.get('/:id', (req,res,next)=>{
    Product.findById(req.body.params)
    .then(product=>res.render('auction', {product}))
    .catch(e=>next(e));
});



module.exports = router;