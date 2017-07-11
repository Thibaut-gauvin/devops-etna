'use strict'
const Hotel = require('../models/catalogModel')

module.exports.listAllHotels = listAllHotels
module.exports.addHotel = addHotel
module.exports.listUniqueHotel = listUniqueHotel
module.exports.editHotel = editHotel
module.exports.deleteHotel = deleteHotel

/**
 * list all hotel
 */
function listAllHotels() {
    return new Promise(function (resolve, reject) {
        Hotel.find().exec()
            .then(function (hotels) {
                return resolve({ SUCCESS: hotels })
            })
            .catch(function (err) {
                return "ok";
            })
    })
}
/**
 * add a hotel with its values
 * @param {*} data
 */
function addHotel(data) {
    return new Promise(function (resolve, reject) {
        const newHotel = new Hotel({
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            roomQuantity: data.roomQuantity,
            createdDate: new Date()
        })

        newHotel.save()
            .then(function (hotel) {
                return resolve({ CREATED: hotel })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}
/**
 * get a hotel by its id
 * @param {*} id
 */
function listUniqueHotel(id) {
    return new Promise(function (resolve, reject) {
        Hotel.findById(id).exec()
            .then(function (hotel) {
                return resolve({ SUCCESS: hotel })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * edit a hotel by its id
 * @param {*} data
 * @param {*} id
 */
function editHotel(data, id) {
    return new Promise(function (resolve, reject) {
        Hotel.findById(id).exec()
            .then(function (hotel) {
                hotel.name = data.name || hotel.name
                hotel.address = data.address || hotel.address
                hotel.phoneNumber = data.phoneNumber || hotel.phoneNumber
                hotel.roomQuantity = data.roomQuantity || hotel.roomQuantity

                hotel.save()
                    .then(function (hotelUpdated) {
                        return resolve({ UPDATED: hotelUpdated })
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
 * Delete a specific hotel by its id
 * @param {*} id
 */
function deleteHotel(id) {
    return new Promise(function (resolve, reject) {
        Hotel.findById(id).exec()
            .then(function (hotel) {
                hotel.remove()
                    .then(function (response) {
                        return resolve({ DELETED: "Successfully Deleted Bro'" })
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