'use strict';

module.exports = function (req, res) {
  req.assert('fullname', 'Informe seu nome').notEmpty();
  if(req.body.email !== ''){
    req.assert('email', 'E-mail inválido.').isEmail();
  }

  var validationErrors = req.validationErrors() || [];

  if(validationErrors.length > 0){
    validationErrors.forEach(function (e) {
      req.flash('erro', e.msg);
    });

    return false;
  }

  return true;

};
