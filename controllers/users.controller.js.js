'use strict';

var validation = require('../validacoes/users');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var msg = '';

module.exports = {
	index: function (req, res) {
		res.render('./users/index', {lista: msg});
	},

	/**
	 * [Controller responsável pela rota de listar usuários]
	 * @param  {[type]} req [request lista]
	 * @param  {[type]} res [response lista]
	 * @return {[type]}     [retorna o usuário todos os usuários]
	 */
	retrieve: function (req, res) {
		User.find(function (err, data) {
			if(err){
				msg = err
				console.log('Error Find: ', msg);

				res.redirect('/usuarios');

			}else{
				console.log('User find', data);
				res.render('./users/retriave', {title:'Lista de usuários', lista: data});
			}
		});
	},

	create: function (req, res) {
		res.render('./users/create' , {title:'Cadastro de usuário', user: new User()});
	},
	post: function (req, res) {
		if(validation(req, res)){
			var model 		=  new User();
			model.fullname 	= req.body.fullname;
			model.email 	= req.body.email;
			model.password 	= model.generateHash(req.body.password);
			User.findOne({'email': model.email}, function (err, data) {
				if(data){
					req.flash('erro', 'E-mail encontra-se cadastrado, tente outro e-mail');
					res.render('./users/create', {user: req.body})
				}else{
					model.save(function (err, data) {
						if(err){
							msg = err;
							req.flash('erro', 'Error ao Cadastrar:' + erro);
							res.render('./users/create', {user: req.body});
						}else{
							msg = data;
							req.flash('info', 'Usuário cadastrado com sucesso!');
							res.redirect('/usuarios/lista');
						}

					});
				}
			});

		}else{
			res.render('./users/create', {user: req.body});
		}

	},

	findOne: function (req, res, cb) {
		var query = {_id: req.params.id};
		User.findOne(query, function (err, data) {
			if(err){
				msg = err;
				res.redirect('/usuarios');
			}else{
				msg = data
				console.log('usuário listado: ' + msg);
				res.render('./users/profile',  {title:'Perfil do usuário', data:data});
			}
			// res.json(msg);
		});
	},

	edit: function (req, res) {
		if(validation(req, res)){
			var query = {_id: req.params.id};
			User.findById(query, function (err, data) {
				if(err){
					msg = err;
					res.redirect('/usuarios/lista');
				}else{
					res.render('./users/edit', {data: data});
				}
			});

		}else{
			User.findOne(query, function (err, data) {
				if(err){
					req.flash('erro', 'Não foi possível busca o usuário');
					res.redirect('/usuarios/lista');
				}else{
					res.render('./users/edit', {data: data});
				}
			});
		}
	},

	update: function (req, res) {
		var query = {_id: req.params.id};
		var mod = {};

		mod.fullname = req.body.fullname;
		mod.email = req.body.email;
		mod.password = req.body.password;

		User.update(query, mod, function (err, data) {
			if(err){
				msg = err;
				console.log('Error: ' , msg);
			}else{
				msg = data;
				res.redirect('/usuarios/lista');
			}
			// res.json(msg);
		});
	},

	delete: function (req, res) {
		var query = {_id: req.params.id};

		User.remove(query, function (err, data) {
			if(err){
				msg = erro;
				req.flash('error', 'Usuário não pode ser excluído!');
				res.redirect('/usuarios/lista');
			}else{
				req.flash('info', 'Usuário excluído');
				res.redirect('/usuarios/lista');
			}

		});
	}


}
