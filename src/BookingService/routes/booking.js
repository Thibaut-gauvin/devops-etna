'use strict'

const express = require('express')
const router = express.Router()
const logic = require('./booking-logic')

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
