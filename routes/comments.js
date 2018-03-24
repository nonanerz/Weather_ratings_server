const express = require('express')
const Comment = require('../model/comment/model')
const router = express.Router()

router.get('/:id', async function (req, res, next) {
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 5;
    let offset = (page - 1) * limit;

    Comment.find({resource: req.params.id}).limit(limit)
        .skip(offset)
        .then(comments => {
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
