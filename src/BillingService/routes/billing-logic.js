'use strict'

const Billing = require('../models/billing')

/**
 * List all existing billings
 */
function listAllBillings() {
    return new Promise(function (resolve, reject) {
        Billing.find().exec()
            .then(function (billings) {
                return resolve({ SUCCESS: billings })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * Create a new billing
 * @param {*} data 
 */
function createBilling(data) {
    return new Promise(function (resolve, reject) {
        const newBilling = new Billing({
            author: data.author,
            hotel: data.hotel,
            room: data.room,
            date: new Date(),
            amount: data.amount
        })

        newBilling.save()
            .then(function (billing) {
                return resolve({ CREATED: billing })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * Get a unique billing by its id
 * @param {*} id
 */
function getBillingById(id) {
    return new Promise(function (resolve, reject) {
        Billing.findById(id).exec()
            .then(function (billing) {
                return resolve({ SUCCESS: billing })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * Update a specific billing by its id
 * @param {*} data
 * @param {*} id
 */
function updateBilling(data, id) {
    return new Promise(function (resolve, reject) {
        Billing.findById(id).exec()
            .then(function (billing) {
                billing.author = data.author || billing.author
                billing.hotel = data.hotel || billing.hotel
                billing.room = data.room || billing.room
                billing.date = billing.date + '(edited on: ' + new Date() + ')'
                billing.amount = data.amount || billing.amount

                billing.save()
                    .then(function (billingUpdated) {
                        return resolve({ UPDATED: billingUpdated })
                    })
                    .catch(function (err) {
                        return reject(err)
                    })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * Delete a specific billing by its id
 * @param {*} id 
 */
function deleteBilling(id) {
    return new Promise(function (resolve, reject) {
        Billing.findById(id).exec()
            .then(function (billing) {
                billing.remove()
                    .then(function () {
                        return resolve({ DELETED: "Successfully deleted" })
                    })
                    .catch(function (err) {
                        return reject(err)
                    })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

module.exports = {
    listAllBillings,
    createBilling,
    getBillingById,
    updateBilling,
    deleteBilling
}