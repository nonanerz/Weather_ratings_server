const express = require('express')
const Comment = require('../model/comment/model')
const router = express.Router()

router.get('/:id', async function (req, res, next) {
    Comment.find({resource: req.params.id}).then(comments => {
    res.json({comments})
  })
    .catch(next)
})

router.post('/', async function (req, res, next) {
    new Comment(req.body)
      .save()
      .then(comment => {
        res.json({comment})
      })
      .catch(next)
  })

module.exports = router
