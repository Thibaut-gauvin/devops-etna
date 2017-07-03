'use strict';

module.exports = function(app) {
    var bookingCtrl = require('../controllers/bookingController');

    app.route('/booking')
        .get(bookingCtrl.list)
        .post(bookingCtrl.create)
    ;

    app.route('/booking/:id')
        .get(bookingCtrl.read)
        .put(bookingCtrl.update)
        .delete(bookingCtrl.delete)
    ;
};
