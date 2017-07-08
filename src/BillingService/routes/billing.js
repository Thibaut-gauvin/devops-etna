'use strict'

const express = require('express');
const router = express.Router();
const logic = require('./billing-logic')

/* Billing api routes. */
router.get('/', listBilling)
router.post('/', addBilling)
router.get('/:id', listUniqueBilling)
router.put('/:id', editBilling)
router.delete('/:id', deleteBilling)

/* Logic */
/**
 * List all payements
 * @param {*} req
 * @param {*} res 
 * @param {*} next 
 */
function listBilling(req, res, next) {
  logic.listAllBillings()
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
};

/**
 * Add a new payement
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function addBilling(req, res, next) {
  logic.createBilling(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
};

/**
 * Get a payement by its ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function listUniqueBilling(req, res, next) {
  logic.getBillingById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
};

/**
 * Edit a payement by its ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function editBilling(req, res, next) {
  logic.updateBilling(req.body, req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
};

/**
 * Delete a payement by its ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function deleteBilling(req, res, next) {
  logic.deleteBilling(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
};

module.exports = router;
