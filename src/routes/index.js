"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
//token
router.use('/tokens', require('./token'))

module.exports = router