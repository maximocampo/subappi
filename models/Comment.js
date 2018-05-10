const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commenttSchema = new Schema({
  username: String,
  body: String 
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


  module.exports  = mongoose.model('Comment', commentSchema);
