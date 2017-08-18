process.env.NODE_ENV = 'test'

const mongoose = require("mongoose")
const Hotel = require('../models/catalogModel')

//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()


chai.use(chaiHttp)
//Our parent block
describe('Test unitaire Catalog service', function () {
    beforeEach(function (done) {
        Hotel.remove({}, function (err) {
            done()
        })
    })
    describe('/catalog', function () {
        it('should list ALL Hotels on GET /hotels', function (done) {
            chai.request(server)
                .get('/hotels')
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    done()
                })
        })

        it('should ADD an Hotel on POST /hotel', function (done) {
            const newHotel = {
                name: "King's Landing",
                address: '10 rue des lilas',
                phoneNumber: '06 36 65 65 65',
                roomQuantity: 250,
                createdDate: Date.now()
            }

            chai.request(server)
                .post('/hotel')
                .send(newHotel)
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.a.json
                    res.body.should.be.a('object')
                    res.body.should.have.property("CREATED")
                    res.body.CREATED.should.have.property("name")
                    res.body.CREATED.should.have.property("address")
                    res.body.CREATED.should.have.property("phoneNumber")
                    res.body.CREATED.should.have.property("roomQuantity")
                    res.body.CREATED.should.have.property("createdDate")
                    done()
                })
        })
    })
    describe('/hotel/:id', function () {
        it('GET by ID', function (done) {
            const newHotel = new Hotel({
                name: "King's Landing",
                address: '10 rue des lilas',
                phoneNumber: '06 36 65 65 65',
                roomQuantity: 250,
                createdDate: Date.now()
            })
            newHotel.save(function (err, res) {
                chai.request(server)
                    .get('/hotel/' + res._id)
                    .end(function (err, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property("SUCCESS")
                        res.body.CREATED.should.have.property("name")
                        res.body.CREATED.should.have.property("address")
                        res.body.CREATED.should.have.property("phoneNumber")
                        res.body.CREATED.should.have.property("roomQuantity")
                        res.body.CREATED.should.have.property("createdDate")
                        done()
                    })
            })
        })
        it('PUT by ID', function (done) {
            const newHotel = new Hotel({
                name: "King's Landing",
                address: '10 rue des lilas',
                phoneNumber: '06 36 65 65 65',
                roomQuantity: 250,
                createdDate: Date.now()
            })
            newHotel.save(function (err, res) {
                chai.request(server)
                    .put('/hotel/' + res._id)
                    .send({ name: "CastelBlack" })
                    .end(function (error, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.have.property("UPDATED")
                        res.body.CREATED.should.have.property("name")
                        done()
                    })
            })
        })
        it('DELETE by ID', function (done) {
            const newHotel = new Hotel({
                name: "King's Landing",
                address: '10 rue des lilas',
                phoneNumber: '06 36 65 65 65',
                roomQuantity: 250,
                createdDate: Date.now()
            })
            newHotel.save(function (err, res) {
                chai.request(server)
                    .delete('/hotel/' + res._id)
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
