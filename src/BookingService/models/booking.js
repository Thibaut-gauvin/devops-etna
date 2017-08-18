'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    hotelName: String,
    roomNumber: Number,
    price: Number,
    date: String,
    bookedBy: String
})

module.exports = mongoose.model('booking', BookingSchema)