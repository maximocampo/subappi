require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require("./helpers/passport");
const session      = require("express-session");
const moduleStream = require('mongoose-model-stream');
const Product = require('./models/Product');
const User = require('./models/User');





mongoose.Promise = Promise;
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

var socket_io    = require( "socket.io" );
// Socket.io
var io           = socket_io();
app.io           = io;

//HELPERS
hbs.registerHelper('checkOwner', (user, product,options)=>{
  if(user._id === product.owner) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// socket.io events


io.on( "connection", function( socket ){
  
  socket.on('puja', async function(datos){
    const newPrice = Number(datos.price) + Number(datos.pujaValue);
    const p = await Product.findByIdAndUpdate(datos.productId, {currentPrice:newPrice, lider:datos.newlider}, {new:true});
    User.findById(p.owner)
      .then(user=>{
        let new_credits = Number(user.creditos) + Number(datos.pujaValue);
        User.findByIdAndUpdate(user._id, {$set:{creditos:new_credits}}, {new:true}).then(user=>{})
      })

    User.findById(p.lider)
      .then(user=>{
        let new_credits = Number(user.creditos) - Number(datos.pujaValue);
        User.findByIdAndUpdate(user._id, {$set: {creditos: new_credits }}, {new:true}).then(user=>{})
        socket.broadcast.emit('update',{p,user})
      })
      

      

  });

  socket.on('follow', function(datos) {
    User.findByIdAndUpdate(datos.userId,{$push:{following:datos.productId}}, {new:true})
    .then(u=>console.log(u))
  });

  socket.on('compra',(datos)=>{
    User.findById(datos.userId)
      .then(user=>{
        console.log(user)
        let new_credits = Number(user.creditos) + Number(datos.c);
        User.findByIdAndUpdate(user._id, {$set:{creditos:new_credits}}, {new:true})
        .then(user=>{
          socket.emit('updatecredits', user)
        })
        .catch(e=>console.log(e))
      })
  })



});

//session
app.use(session({
  secret: "bliss",
  resave: false,
  saveUninitialized: true
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


const api = require('./routes/api');
app.use('/api', api);
const products = require('./routes/products');
app.use('/products',products)
const auction = require('./routes/auction');
app.use('/auction',auction)
const auth = require('./routes/auth');
app.use('/', auth);
const index = require('./routes/index');
app.use('/', index);




module.exports = app;
