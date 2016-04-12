'use strict';

module.exports = {
	home:function (req, res) {
		res.render('home/index', { title: 'Express' });
	}
}