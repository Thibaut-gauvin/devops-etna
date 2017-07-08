'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillingSchema = new Schema({
    author: String,
    hotel: String,
    room: Number,
    date: String,
    amount: Number
})

module.exports = mongoose.model('Billing', BillingSchema)