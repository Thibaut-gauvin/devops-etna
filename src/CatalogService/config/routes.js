'use strict';

module.exports = function(app) {
    var catalogCtrl = require('../controllers/catalogController');

    app.route('/')
        .get(function(req, res) {
            res.send("Welcome to the Catalog MicroService");
        })
    ;

    app.route('/catalog')
        .get(catalogCtrl.list)
        .post(catalogCtrl.create)
    ;

    app.route('/catalog/:id')
        .get(catalogCtrl.read)
        .put(catalogCtrl.update)
        .delete(catalogCtrl.delete)
    ;
};
