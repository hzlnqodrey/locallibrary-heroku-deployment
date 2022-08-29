// wiki.js - Wiki route module.

const express = require('express')
const router = express.Router()

// Wiki Home Page route.
router.get('/', (req, res, next) => {
    res.send('Wiki home page')
})

// About page route.
router.get('/about', (req, res) => {
    res.send('About this wiki')
})

module.exports = router