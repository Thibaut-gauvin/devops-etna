const mongoose = require('mongoose')
const Billing = require('../models/billing')

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const server = require('../app')

chai.use(chaiHttp)

describe('Billing', function () {

    // CLEAR DB
    beforeEach(function (done) {
        Billing.remove({}, function () {
            done()
        })
    })

    /**
     * GET request on /billing
     */
    describe('/billing', function () {

        it('GET should get all the billings', function (done) {
            chai.request(server)
                .get('/billing')
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('SUCCESS')
                    expect(res.body.SUCCESS).to.be.an('array')
                    done()
                })
        })

        it('POST should create a new billing', function (done) {
            const billing = {
                author: "Hodor",
                hotel: "King's Landing",
                room: 10,
                amount: 99,
                date: ""
            }

            chai.request(server)
                .post('/billing')
                .send(billing)
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('CREATED')
                    expect(res.body.CREATED).to.be.an('object')
                    expect(res.body.CREATED).to.have.property('author')
                    expect(res.body.CREATED).to.have.property('hotel')
                    expect(res.body.CREATED).to.have.property('room')
                    expect(res.body.CREATED).to.have.property('amount')
                    expect(res.body.CREATED).to.have.property('date')
                    done()
                })
        })
    })

    /**
     * POST request on /billing/:id
     */
    describe('/billing/:id', function () {

        it('GET should get a billing by ID', function (done) {
            const billing = new Billing({
                author: "Hodor",
                hotel: "King's Landing",
                room: 10,
                amount: 99,
                date: ""
            })
            billing.save(function (err, response) {
                chai.request(server)
                    .get('/billing/' + response._id)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res).to.be.json
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('SUCCESS')
                        expect(res.body.SUCCESS).to.be.an('object')
                        done()
                    })
            })
        })

        it('PUT should update a billing by ID', function (done) {
            const billing = new Billing({
                author: "Hodor",
                hotel: "King's Landing",
                room: 10,
                amount: 99,
                date: ""
            })
            billing.save(function (err, res) {
                chai.request(server)
                    .put('/billing/' + res._id)
                    .send({
                        author: 'The New Hodor'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res).to.be.json
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('UPDATED')
                        expect(res.body.UPDATED).to.be.an('object')
                        expect(res.body.UPDATED).to.have.property('author')
                        expect(res.body.UPDATED).to.have.property('hotel')
                        expect(res.body.UPDATED).to.have.property('room')
                        expect(res.body.UPDATED).to.have.property('amount')
                        expect(res.body.UPDATED).to.have.property('date')
                        expect(res.body.UPDATED.author).to.equal('The New Hodor')
                        done();
                    });
            })

        })
        
        it('DELETE remove a billing by ID', function (done) {
            const billing = new Billing({
                author: "Hodor",
                hotel: "King's Landing",
                room: 10,
                amount: 99,
                date: ""
            })
            billing.save(function (err, res) {
                chai.request(server)
                    .delete('/billing/' + res._id)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res).to.be.json
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('DELETED')
                        done();
                    });
            })
        })
    })
})