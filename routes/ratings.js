const express = require('express')
const Rating = require('../model/rating/model')
const router = express.Router()

router.get('/:id', async function (req, res, next) {
  Rating.aggregate([
    {
      $match: {'resource': req.params.id, 'city': null}},
    {
      $group: {
        _id: null,
        average_transaction_amount: {
          $avg: '$rating'
        },

        'count': { $sum: 1 }

      }
    }
  ]).then(resources => {
    res.json({resources})
  })
    .catch(next)
})

router.post('/', (req, res, next) => {
  new Rating(req.body)
    .save()
    .then(rating => {
      res.json({rating})
    })
    .catch(next)
})

module.exports = router
