'use strict';
var validation = require('../validacoes/friends.js');
var mongoose = require('mongoose');
var Friends = mongoose.model('Friends');

module.exports = {
  index: function (req, res) {
    Friends.find(function (err, data) {

      if(err){
        req.flash('erro', 'Erro ao carregar! ' + err);
        res.render('./friends/index', {data:null});
      }else{

        res.render('./friends/index', {data:data});
        console.log(data);

      }

    });
  },

  create: function (req, res) {
    res.render('./friends/create', {data: new Friends});
  },

  post: function (req, res) {
    if(validation(req, res)){
      var model = new Friends();
      model.fullname = req.body.fullname;
      model.email = req.body.email;
      Friends.findOne({'fullname':model.fullname}, function (err, data) {
        if(err){
          req.flash('erro', 'Nome encontra-se, informe outro');
          res.render('./friends/create', {data: model});
        }else{
          model.save(function (err, data) {
            if(err){
              req.flash('erro', 'Erro ao cadastrar: ' + err);
              res.render('./friends/create', {data: model});
            }else{
              req.flash('info', 'Amigo cadastro com sucesso');
              res.redirect('/amigos');
            }
          });
        }
      });
    }else{
      res.render('./friends/create', {data: req.body});
    }
  },

  retrieve: function (req, res) {
    var query = {_id: req.params.id};
    Friends.findById(query, function (err, data) {
      if(err){
        req.flash('erro', 'Erro ao carregar amigo ' + err);
        res.reder('./friends/index', {data:null});
      }else{
        res.render('./friends/retrieve', {data:data});
      }
    });
  },

  findOne: function (req, res) {
    var query = {_id: req.params.id};
    Friends.findOne(query, function (err, data) {
      if (err) {
        req.flash('erro', 'Erro ao busca o amigo' + err);
        res.redirect('/amigos');
      }else{
        res.render('./friends/edit', {title:'Editar amigos'});
      }
    });
  },
  edit: function (req, res){
    var query = {_id: req.params.id};
    Friends.findById(query, function (err, data) {
      if(err){
        req.flash('erro', 'Registro não foi possível editar!' + err);
        res.redirect('/amigos');
      }else{
        // res.render('/friends/edit', {data:data});
        res.json(data);
      }
    });
  },

  update: function (req, res) {
    if(validation){
    var query = {_id: req.params.id};
    Friends.findById(query, function (err, data) {
      var model = new data ();
      model.fullname = req.body.fullname;
      model.email = req.body.email;
      model.save(function (err) {
        if(err){
          req.flash('erro', 'Erro ao Atualizar' + err);
          res.redirect('/amigos');
        }else{
          req.flash('info', 'Registro atualizado com sucesso.');
          res.redirect('/amigos');
        }
      });
    });
  }else{
    res.render('./friends/edit', {data: req.body});
  }
  },

  delete: function (req, res) {
    var query = {_id: req.params.id};
    Friends.remove(query, function (err, data) {
      if(err){
        req.flash('erro', 'Erro ao remover amigo');
        res.redirect('/amigos');
      }else{
        req.flash('info', 'Amigo excluído com sucesso!');
        res.redirect('/amigos');
      }
    });
  }

};
