'use strict';

module.exports = function(app) {
    var catalogCtrl = require('../controllers/catalogController');

    app.route('/catalogs')
        .get(catalogCtrl.list)
        .post(catalogCtrl.create)
    ;

    app.route('/catalogs/:id')
        .get(catalogCtrl.read)
        .put(catalogCtrl.update)
        .delete(catalogCtrl.delete)
    ;
};
