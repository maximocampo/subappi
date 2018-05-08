const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require('multer')({dest: './public/pics'});

function checkIfAdmin(req,res,next){
    if(!req.isAuthenticated()) res.redirect('/login');
    if(req.user.role === "ADMIN") return next();
    return res.redirect('/products');
}


// router.get('/:id/edit', (req,res, next)=>{
//     Product.findById(req.params.id)
//     .then(product=>{
//         res.render('products/edit', {product});
//     })
//     .catch(e=>next(e))
// })

// router.post('/:id/edit', (req,res, next)=>{
//     if(req.body.active) req.body.active = true;
//     Product.findByIdAndUpdate(req.params.id, req.body)
//     .then(()=>{
//         res.redirect('/products/admin');
//     })
//     .catch(e=>next(e))
// })



// router.get('/admin', checkIfAdmin,(req,res, next)=>{
//     Promise.all([User.find(), Product.find()])
//     .then(r=>{
//         res.render('products/admin', {users:r[0], products:r[1]});
//     })
//     .catch(e=>next(e));
// })

//router.post('/admin', (req,res)=>{})

// router.post('/:id', (req,res)=>{
//     req.body.user = req.user._id;
//     req.body.product = req.params.id;
//     Comment.create(req.body)
//     .then((comment=>{
//         return Product.findByIdAndUpdate(req.params.id, {$push:{comments:comment}})
//     }))
//     .then(product=>{
//         res.redirect('/products/' + req.params.id);
//     })
//     .catch(e=>next(e));
// });

// router.get('/:id', (req,res)=>{
//     Product.findById(req.params.id)
//     .populate('comments')
//     .populate('user')
//     .then(product=>{
//         res.render('products/detail', {product})
//     })
//     .catch(e=>next(e));
// });

router.get('/', (req,res,next)=>{
    Product.find({active:true})
    .populate('user')
    .then(products=>res.render('products/list', {products}))
    .catch(e=>next(e));
});

router.post('/new', upload.array('image',6),(req,res, next)=>{
    req.body.image = [];
    for(let pic of req.files){
        req.body.image.push('/pics/' + pic.filename);
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

module.exports = router;