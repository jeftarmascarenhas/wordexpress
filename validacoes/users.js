var url = require('url');
module.exports = function (req, res) {
  var createUrl = url.parse(req.url).pathname == '/usuarios/cadastro';
  var updateUrl = !createUrl;

  req.assert('fullname', '- Informe seu nome.').notEmpty();

  if(updateUrl){
    req.assert('email', '- E-mail inválido').isEmail();
    req.assert('password', '- Informe senha de 6 a 10 caracteres').len(6,10);
  }
  var validationErrors = req.validationErrors() || [];

  if(req.body.password != req.body.confirm_password){
    validationErrors.push({msg: '- Senhas diferentes.'});
  }
  if(validationErrors.length > 0){
    validationErrors.forEach(function (e) {
      req.flash('erro', e.msg);
    });
    return false;
  }else{
    return true;
  }


};
