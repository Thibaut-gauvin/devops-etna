'use strict';

var mongoose = require('mongoose'),
    Catalogs = require('../models/catalogModel'),
    CatalogShema = mongoose.model('Catalogs');

/** List all catalog */
exports.list = function(req, res) {
    CatalogShema.find({}, function(err, catalog) {
        if (err)
            res.send(err);

        res.json(catalog);
    });
};

/** Create new catalog */
exports.create = function(req, res) {
    var new_hotel = new CatalogShema(req.body);

    new_hotel.save(function(err, catalog) {
        if (err)
            res.send(err);

        res.json(catalog);
    });
};

/** Read given catalog */
exports.read = function(req, res) {
    CatalogShema.findById(req.params.id, function(err, catalog) {
        if (err)
            res.send(err);

        res.json(catalog);
    });
};

/** Update given catalog */
exports.update = function(req, res) {
    CatalogShema.findOneAndUpdate(req.params.id, req.body, { new: false }, function(err, catalog) {
        if (err)
            res.send(err);

        res.json(catalog);
    });
};

/** Delete given catalog */
exports.delete = function(req, res) {
    CatalogShema.remove({
        _id: req.params.id
    }, function(err, catalog) {
        if (err)
            res.send(err);

        res.json({ message: 'Catalog successfully deleted' });
    });
};
