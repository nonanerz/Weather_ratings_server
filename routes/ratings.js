const express = require('express')
const Rating = require('../model/rating/model')
const router = express.Router()

router.get('/', async function (req, res, next) {
  Rating.find({}).then(rating => {
    res.json({rating})
  })
    .catch(next)
})

router.post('/', async function (req, res, next) {
  let rating = await Rating.findOne({'userId': req.body.userId, 'resource': req.body.resource})

  if (rating) {
    Rating.findOneAndUpdate({'userId': req.body.userId, 'resource': req.body.resource}, req.body)
      .then(rating => {
        res.json({rating})
      })
      .catch(next)
  } else {
    new Rating(req.body)
      .save()
      .then(rating => {
        res.json({rating})
      })
      .catch(next)
  }
})

module.exports = router
