const express = require('express')
const Resource = require('../model/weather-resource/model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Resource.find({})
        .then(resources => {
            res.json({resources})
        })
        .catch(next)
})

module.exports = router
