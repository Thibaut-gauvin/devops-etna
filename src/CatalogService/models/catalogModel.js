'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CatalogSchema = new Schema({
    name: {
        type: String,
        Required: 'Hotel name missing'
    },
    address: {
        type: String,
        Required: 'Hotel address missing'
    },
    phoneNumber: {
        type: String,
        Required: 'Hotel phone number missing'
    },
    roomQuantity: {
        type: Number,
        Required: 'Hotel room quantity missing'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Catalogs', CatalogSchema);
