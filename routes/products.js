const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});
const uploadCloud = require("../helpers/cloudinary");

router.post('/new', uploadCloud.array('image',6),(req,res, next)=>{
    req.body.image = [];
    for(let pic of req.files){
        req.body.image.push(pic.url);
    }
    req.body.user = req.user._id;
    req.body.owner =  req.user._id;
    req.body.currentPrice = 0;
    Product.create(req.body)
    .then(product=>{
        console.log(product);
        req.user.products.push(product._id);
        return User.findByIdAndUpdate(req.user._id, req.user)
    })
    .then(user=>{
        console.log(user)
        res.redirect('/profile')
    })
    .catch(e=>next(e))

});

router.get('/', (req,res,next)=>{
    Product.find({active:true})
    .populate('user')
    .then(products=>res.render('products/list', {products}))
    .catch(e=>next(e));
});

module.exports = router;