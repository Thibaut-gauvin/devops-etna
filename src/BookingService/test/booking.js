process.env.NODE_ENV = 'test'

const mongoose = require("mongoose")
const Booking = require('../models/booking')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()


chai.use(chaiHttp)
//Our parent block
describe('Test unitaire Booking.io', function () {
    beforeEach(function (done) {
        Booking.remove({}, function (err) {
            done()
        })
    })
    describe('/booking', function () {
        it('should list ALL Bookins on GET /booking', function (done) {
            chai.request(server)
                .get('/booking')
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    done()
                })
        })

        it('should ADD a booking on POST /booking', function (done) {
            const newBooking = {
                hotelName: "La Team des Hodors",
                roomNumber: 207,
                price: 3546,
                date: new Date(),
                bookedBy: "Hodor"
            }
            chai.request(server)
                .post('/booking')
                .send(newBooking)
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.a.json
                    res.body.should.be.a('object')
                    res.body.should.have.property("CREATED")
                    res.body.CREATED.should.have.property("hotelName")
                    res.body.CREATED.should.have.property("roomNumber")
                    res.body.CREATED.should.have.property("price")
                    res.body.CREATED.should.have.property("bookedBy")
                    done()
                })
        })
    })
    describe('/booking/:id', function () {
        it('GET by ID', function (done) {
            const newBooking = new Booking({
                hotelName: "La Team des Hodors",
                roomNumber: 207,
                price: 3546,
                date: new Date(),
                bookedBy: "Hodor"
            })
            newBooking.save(function (err, res) {
                chai.request(server)
                    .get('/booking/' + res._id)
                    .end(function (err, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property("SUCCESS")
                        res.body.SUCCESS.should.have.property("hotelName")
                        res.body.SUCCESS.should.have.property("roomNumber")
                        res.body.SUCCESS.should.have.property("price")
                        res.body.SUCCESS.should.have.property("bookedBy")
                        done()
                    })
            })
        })
        it('PUT by ID', function (done) {
            const newBooking = new Booking({
                hotelName: "La Team des Hodors",
                roomNumber: 207,
                price: 3546,
                date: new Date(),
                bookedBy: "Hodor"
            })
            newBooking.save(function (err, res) {
                chai.request(server)
                    .put('/booking/' + res._id)
                    .send({ hotelName: "La team des hodors sans Aurel le lacheur" })
                    .end(function (error, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.have.property("UPDATED")
                        res.body.UPDATED.should.have.property("hotelName")
                        done()
                    })
            })
        })
        it('DELETE by ID', function (done) {
            const newBooking = new Booking({
                hotelName: "La Team des Hodors",
                roomNumber: 207,
                price: 3546,
                date: new Date(),
                bookedBy: "Hodor"
            })
            newBooking.save(function (err, res) {
                chai.request(server)
                    .delete('/booking/' + res._id)
                    .end(function (error, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property("DELETED")
                        done()
                    })
            })
        })
    })
})
