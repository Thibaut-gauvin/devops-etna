'use strict';

const express = require('express');
const router = express.Router();
const logic = require('./catalog-logic');

/* GET booking API routes. */
router.get('/hotels', listAllHotels);
router.post('/hotel', addHotel);
router.get('/hotel/:id', listUniqueHotel);
router.put('/hotel/:id', editHotel);
router.delete('/hotel/:id', deleteHotel);

/**
 * get all hotels
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function listAllHotels (req, res, next) {
    logic.listAllHotels()
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err))
}
/**
 * add a new hotel
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function addHotel(req, res, next) {
    req.checkBody('name', 'Name should not be empty').notEmpty();
    req.checkBody('address', 'AdDress should not be empty').notEmpty();
    req.checkBody('phoneNumber', 'Phone number should not be empty').notEmpty();
    req.checkBody('roomQuantity', 'Room quantity not be empty').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        logic.addHotel(req.body)
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err))
    }
}
/**
 * get an hotel by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function listUniqueHotel(req, res, next) {
    logic.listUniqueHotel(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err))
}
/**
 * edit an hotel by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function editHotel(req, res, next) {
    logic.editHotel(req.body, req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err))
}
/**
 * delete an hotel by its id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteHotel (req, res, next) {
    logic.deleteHotel(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err))
}

module.exports = router;
