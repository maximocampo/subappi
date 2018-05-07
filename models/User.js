const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username:  {
    type:String,
    required:true
  },
  bio: String,
  profilePic:String,
  password: {
    type:String,
    required:true
  },
  rating: {
    type: Number,
    default:1
  },
  creditos: {
    type:Number,
    default:0
  },
  email: {
    type:String,
    required:true
  },
  products:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
  misgangas:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
  following:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }]
},{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });


  userSchema.plugin(PassportLocalMongoose, {
    usernameField:"email"
  });
  
  module.exports = mongoose.model('User', userSchema);
 