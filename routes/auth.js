const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({dest: './public/uploads'});
const Product = require("../models/Product");
const uploadCloud = require("../helpers/cloudinary");



router.get('/credits', (req, res, next)=>{
    res.render('../views/credits',req.user);
})

function isAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return next();
}

function isAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return next();
}

function isNotAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

function homeAuth(req,res,next){
    if(req.isAuthenticated()){
        Product.find().populate('lider').then(product=>{
            return res.render('auth/index-auth', {
                product,
                user:req.user
            })
        }) 
    }else{
        Product.find().populate('lider').then(product=>{
            return res.render('index', {product})
        })
    }
        
}

router.get('/', homeAuth);

// 

router.get('/profile', isNotAuth, (req, res, next)=>{
    User.findById(req.user._id)
    .populate('products')
    .populate('following')
    .then(user=>{
        res.render('auth/profile', user);
    })
    .catch(e=>next(e))
    
})

router.post('/profile', uploadCloud.single('profilePic'), (req,res, next)=>{


    req.body.profilePic = req.file.url;
    //console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body)
    .then((body)=>{
        //console.log(body);
        res.redirect('/profile');
        //user.message = "Actualizado";
    })
    .catch(e=>next(e));
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
})


router.post('/login', passport.authenticate('local',{
    successRedirect: '/profile'
}))


router.post('/signup', 
    (req,res)=>{
        User.register(req.body, req.body.password, (err, user) =>{
            if (err) return res.send(err);
            console.log(req.body)
            passport.authenticate('local')(req,res,function(){
                res.redirect('/profile');
            });
        })

    });


module.exports = router