const express = require('express')
const Resource = require('../model/weather-resource/model')
const Rating = require('../model/rating/model')
const router = express.Router()

router.get('/:city', async function (req, res, next) {
  let resources = await Resource.find({})
    .then(resources => resources)

  for (let i = 0; i < resources.length; i++) {
    let rating
    if (req.params.city !== 'any') {
      rating = await Rating.aggregate([
        {
          $match: {'resource': resources[i]._id.toString(), 'city': req.params.city}},
        {
          $group: {
            _id: null,
            average_transaction_amount: {
              $avg: '$rating'
            },

            'count': { $sum: 1 }

          }
        }
      ])
    } else {
      rating = await Rating.aggregate([
        {
          $match: {'resource': resources[i]._id.toString()}},
        {
          $group: {
            _id: null,
            average_transaction_amount: {
              $avg: '$rating'
            },

            'count': { $sum: 1 }

          }
        }
      ])
    }

    resources[i].rating = rating
  }

  res.json({resources})
})

module.exports = router
