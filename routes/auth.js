const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const multer = require("multer");
const uploads = multer({dest: './public/uploads'});
const Product = require("../models/Product");

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
    return res.redirect('/login');
}

router.get('/profile', isNotAuth, (req, res, next)=>{
    User.findById(req.user._id)
    .populate('products')
    .then(user=>{
        res.render('auth/profile', user);
    })
    .catch(e=>next(e))
    
})

router.post('/profile', uploads.single('profilePic'), (req,res, next)=>{
    req.body.profilePic = '/uploads/' + req.file.filename;
    User.findByIdAndUpdate(req.user._id, req.body)
    .then(()=>{
        res.render('auth/profile', req.user);
        req.user.message = "Actualizado";
    })
    .catch(e=>next(e));
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/login');
})

router.get('/login', isAuthenticated,(req,res)=>{
    res.render('auth/login', {error:req.body.error});
})

router.post('/login', 
    passport.authenticate('local'), 
    (req,res)=>{
        res.redirect('/profile');
    })

// router.get('/signup', (req,res)=>{
//     res.render('auth/signup',{error:req.body.error});
// });



router.post('/signup', 
    (req,res)=>{
        User.register(req.body, req.body.password, (err, user) =>{
            if (err) return res.send(err);
            console.log(req.body)
            const authenticate = User.authenticate();
            authenticate(req.body.email, req.body.password, function(err, result) {
                console.log("aqui ando");
                if (err) return res.send(err);
                return res.redirect('/profile');
            })
        })

    });


    module.exports = router;