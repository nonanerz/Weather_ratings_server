const express = require('express')
const Resource = require('../model/weather-resource/model')
const Rating = require('../model/rating/model')
const Comment = require('../model/comment/model')
const router = express.Router()

router.get('/:city', async function (req, res, next) {
  let resources = await Resource.find({})
    .then(resources => resources)


  for (let i = 0; i < resources.length; i++) {
    let rating
      let count
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
        count = await Comment.count({resource: resources[i]._id})
            .then(count => count)
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
        count = await Comment.count({resource: resources[i]._id})
            .then(count => count)
    }

    resources[i].rating = rating
    resources[i].commentsCount = count
  }

  res.json({resources})
})

router.get('/:city/:id', async function (req, res, next) {
  let resource = await Resource.findOne({_id: req.params.id})
    .then(resource => resource)

  let rating
  if (req.params.city !== 'any') {
    rating = await Rating.aggregate([
      {
        $match: {'resource': resource._id.toString(), 'city': req.params.city}},
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
        $match: {'resource': resource._id.toString()}},
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

  resource.rating = rating

  res.json({resource})
})

module.exports = router
