'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var msg = '';

module.exports = {
	index: function (req, res) {
		res.render('./users/index', {lista: msg});
	},

	create: function (req, res) {
		res.render('./users/create' , {title:'Cadastro de usuário'});
	},	
	post: function (req, res) {
		var model 		=  new User();

		model.fullname 	= req.body.fullname;
		model.email 	= req.body.email;		
		model.password 	= model.generateHash(req.body.password);
		
		
		model.save(function (err, data) {
			if(err){
				msg = err;
				console.log('Error: ' , msg);
				req.flash('erro' , 'Erro ao cadastrar: ' + msg);
				res.redirect('/usuarios');
			}else{
				msg = data;
				// req.flash('info', 'Flash is back!')
				// res.redirect('/usuarios/lista');
			}
				res.json(msg);

		});

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

				req.flash('erro', 'Erro ao buscar usuários: ' +  msg);
				res.redirect('/usuarios');

			}else{
				console.log('User find', data);
				res.render('./users/retriave', {title:'Lista de usuários', lista: data});
			}
		});
	},

	findOne: function (req, res, cb) {
		var query = {_id: req.params.id};
		User.findOne(query, function (err, data) {
			if(err){
				msg = err;
				console.log('Erro ao lista usuário: ' + msg);
				req.flash('erro', 'Erro ao visualizar usuário' + err);
				res.redirect('/usuarios');
			}else{
				msg = data
				console.log('usuário listado: ' + msg);
				res.render('./users/profile',  {title:'Perfil do usuário', data:data});
			}
			// res.json(msg);
		});
	},

	update: function (req, res) {
		var query = {_id: req.params.id};
		var mod = req.body;
		User.update(query, function (err, data) {
			if(err){
				msg = err;
				console.log('Error: ' , msg);
			}
				msg = data;
			res.render('./users/edit', {title:'Edita usuário', data: data});
		});	
	},

	delete: function (req, res) {
		var query = {_id: req.params.id};

		User.remove(query, function (err, data) {
			if(err){
				console.log('Error ao deletar: ' + err);
				req.flash('erro', 'Erro ao deletar: ' + err);
				res.redirect('/usuarios/lista');
			}else{
				msg = data;
				console.log('Sucess ao deletar usuário: ' + msg);
				req.flash('info', 'Usuário deletado com sucesso.');
				res.redirect('/usuarios/lista');
			}

			// res.json(data);

		});
	}


}