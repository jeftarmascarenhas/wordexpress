var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index.controller.js');
var authRouters =  require('../middleware/auth.routers');
/* GET Auth page. */
router.get('/', function(req, res) {
  		Controller.login(req, res);
});
router.post('/', function (req, res)  {
  Controller.authecation(req, res);
});
/* GET home page. */
router.get('/home', authRouters, function (req, res) {
  Controller.home(req, res);
});
router.get('/logout', function (req, res) {
  Controller.logout(req, res);
});


module.exports = router;
