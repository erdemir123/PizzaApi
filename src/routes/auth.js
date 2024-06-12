"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const auth = require('../controllers/auth')

// URL: /users

router.post("/login",auth.login)
router.post("/logout",auth.logout)


/* ------------------------------------------------------- */
module.exports = router
