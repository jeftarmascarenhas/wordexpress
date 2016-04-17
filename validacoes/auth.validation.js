module.exports =  function (req, res) {
  req.assert('email', 'E-email inválido').isEmail();
  req.assert('password', 'Sua senha deve ter de 6 a 10 caracteres').len(6,10);

  var validationErrors = req.validationErrors() || [];

  if(validationErrors.length > 0){
    validationErrors.forEach(function (e) {
      req.flash('erro', e.msg);
    });
    return false;
  }
    return true;
};
