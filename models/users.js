'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({

	fullname:{type:String, default:'', trim:true, required: true},
	email:{type:String, default:'', trim:true, required:true},
	password:{type:String, default:'', required:true},
	create_date: {type: Date, default: Date.now}

});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	
};

module.exports = mongoose.model('User', UserSchema);