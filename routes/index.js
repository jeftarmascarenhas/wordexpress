'use strict';

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/index.controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  		Controller.home(req, res)
});

module.exports = router;
