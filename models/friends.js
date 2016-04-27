'use strict';
var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  type:{type:String, default:'', required:true, trime:true},
  phone:{type:String, default:'', required:true, trim:true}
});

var friedsSchema = mongoose.Schema({

  fullname: {type:String, require:true, trim:true, unique:true},
  email: {type:String, trim:true},
  contacts: [contactSchema],
  create_date: {type:Date, default: Date.now}

});


module.exports = mongoose.model('Friends', friedsSchema);
