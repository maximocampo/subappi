const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({dest: './public/uploads'});
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
    req.app.locals.user = req.user;
    User.findById(req.user._id)
    .populate('products')
    .then(user=>{
        res.render('auth/profile', user);
    })
    .catch(e=>next(e))
    
})

router.post('/profile', upload.single('profilePic'), (req,res, next)=>{


    req.body.profilePic = '/uploads/' + req.file.filename;
    //console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body)
    .populate('products')
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
            //console.log(req.body)
            passport.authenticate('local')(req,res,function(){
                res.redirect('/profile');
            });
        })

    });


    module.exports = router;