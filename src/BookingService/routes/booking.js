'use strict'

const express = require('express')
const router = express.Router()
const logic = require('./booking-logic')
var http = require('http');

/* GET booking API routes. */
router.get('/', listAllBooking)
router.post('/', addBooking)
router.get('/:id', listUniqueBooking)
router.put('/:id', editBooking)
router.delete('/:id', deleteBooking)

/**
 * get all booked rooms
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function listAllBooking (req, res, next) {
     /* 200 ok en mode docker swarm */
    var options = {
        host: 'tick-stack.com',
        port: 80,
        path: '/catalog/hotels'
    };

    /* 200 ok en mode docker-compose */
    // var options = {
    //     host: 'catalog_service',
    //     port: 3000,
    //     path: '/catalog/hotels'
    // };

    console.log('bijour la famille !');

    http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    logic.listAllBooking()
  .then((result) => res.status(200).json(result))
  .catch((err) => next(err))
};
/**
 * add a new reservation
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function addBooking (req, res, next) {
  logic.addBooking(req.body)
  .then((result) => res.status(200).json(result))
  .catch((err) => next(err))
};
/**
 * get a booking by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function listUniqueBooking (req, res, next) {
  logic.listUniqueBooking(req.params.id)
  .then((result) => res.status(200).json(result))
  .catch((err) => next(err))
};
/**
 * edit a booking by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function editBooking (req, res, next) {
  logic.editBooking(req.body, req.params.id)
  .then((result) => res.status(200).json(result))
  .catch((err) => next(err))
};
/**
 * delete a booking by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteBooking (req, res, next) {
  logic.deleteBooking(req.params.id)
  .then((result) => res.status(200).json(result))
  .catch((err) => next(err))
};

module.exports = router;
