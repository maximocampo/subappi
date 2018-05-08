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
const Product = require('./models/Product');
// socket.io events
io.on( "connection", function( socket ){

  socket.on('puja', function(datos){
    console.log('recibi price', datos);
    const newPrice = Number(datos.price) + Number(datos.pujaValue);
    console.log(typeof newPrice);
    Product.findByIdAndUpdate(datos.productId, {currentPrice:newPrice}, {new:true})
    .then(p=>{
      socket.emit('update',{newPrice:p.currentPrice});
    })
    .catch(e=>console.log(e))
    
  });

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
