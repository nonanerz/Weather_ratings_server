const express = require('express')
const Rating = require('../model/rating/model')
const router = express.Router()

router.get('/ratings', (req, res, next) => {
    Rating.find({})
        .then(ratings => {
            res.json({ratings})
        })
        .catch(next)
})

module.exports = router
