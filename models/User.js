const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  profilePic:String,
  password: String,
  rating:Number,
  pujas: Number,
  //confirmationCode: String,
  email: {
    type:String,
    required:true
  },
  role: {
    type:String,
    enum:["PRIMARIO","INTERMEDIO","EXPERTO"],
    default:"PRIMARIO"
  },
  status: {
    type: String,
    enum: ["Pending Confirmation", "Active"],
    default: "Pending Confirmation"
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

  module.exports = mongoose.model('User', userSchema);
 