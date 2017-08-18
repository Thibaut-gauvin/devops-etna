'use strict'
const Booking = require('../models/booking')

module.exports.listAllBooking = listAllBooking
module.exports.addBooking = addBooking
module.exports.listUniqueBooking = listUniqueBooking
module.exports.editBooking = editBooking
module.exports.deleteBooking = deleteBooking

/**
 * list all booking
 */
function listAllBooking() {
    return new Promise(function (resolve, reject) {
        Booking.find().exec()
            .then(function (bookings) {
                return resolve({ SUCCESS: bookings })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}
/**
 * add a booking with its values
 * @param {*} data 
 */
function addBooking(data) {
    return new Promise(function (resolve, reject) {
        const newBooking = new Booking({
            hotelName: data.hotelName,
            roomNumber: data.roomNumber,
            price: data.price,
            date: new Date(),
            bookedBy: data.bookedBy
        })

        newBooking.save()
            .then(function (booking) {
                return resolve({ CREATED: booking })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}
/**
 * get a booking by its id
 * @param {*} id 
 */
function listUniqueBooking(id) {
    return new Promise(function (resolve, reject) {
        Booking.findById(id).exec()
            .then(function (booking) {
                return resolve({ SUCCESS: booking })
            })
            .catch(function (err) {
                return reject(err)
            })
    })
}

/**
 * edit a booking by its id
 * @param {*} data 
 * @param {*} id
 */
function editBooking(data, id) {
    return new Promise(function (resolve, reject) {
        Booking.findById(id).exec()
            .then(function (booking) {
                booking.hotelName = data.hotelName || booking.hotelName
                booking.roomNumber = data.roomNumber || booking.roomNumber
                booking.price = data.price || booking.price
                booking.date = booking.date + "(edit on " + new Date() + ")"
                booking.bookedBy = data.bookedBy || booking.bookedBy

                booking.save()
                    .then(function (bookingUpdated) {
                        return resolve({ UPDATED: bookingUpdated })
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
 * Delete a specific booking by its id
 * @param {*} id 
 */
function deleteBooking(id) {
    return new Promise(function (resolve, reject) {
         Booking.findById(id).exec()
            .then(function (booking) {
                booking.remove()
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