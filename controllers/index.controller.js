var validation = require('../validacoes/auth.validation');
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
	home:function (req, res) {
		req.flash('info', 'Welcome');
		res.render('home/index', { title: 'Express'});
	},

	login: function (req, res) {
		res.render('auth/login');
	},

	authecation: function (req, res) {
		var usuario 			= new User();
		var email 		= req.body.email;
		var password 	= req.body.password;

		if(validation(req, res)){
				User.findOne({'email': req.body.email}, function (err, data) {

					if(err){
						req.flash('erro', 'Erro ao entrar no sistema');
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					}else if(!usuario.validPassword(password, data.password)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					}else{
						req.session.usuario = data;
						res.redirect('/home');
					}

				});
		}else{
			res.redirect('/');
		}


	},

	logout: function (req, res) {
		req.session.destroy();
		res.redirect('/');
	}

};
