const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});
const Comentario = require('../models/Comment');

router.get('api/:_id', (req,res,next)=>{
    Product.findById(req.params)
    .then(product=>{
        res.json(product)
    })
    .catch(e=>next(e));
});


router.get('/:_id', (req,res,next)=>{
    if(req.user){
        Product.findById(req.params)
        .populate('lider')
        .populate({
            "path":'comment',
            "populate":{path:'userid'}
        })
        .then(product=>{
            res.render('auction', {product,user:req.user})
        })
        .catch(e=>next(e));
    }else{
        res.redirect('/')
    }
    
});

router.post('/:_id/comments/new',(req,res,next) => {
    Comentario.create({
        userid:req.user,
        body: req.body.body
    })
    .then(comentario=>{
        Product.findByIdAndUpdate(req.params,{$push:{comment:comentario}})
        .then(product=>{
            res.redirect('/auction/'+product._id)
        })
        .catch(e=>console.log(e))

       
    })
    .catch(e=>console.log(e))

});









module.exports = router;