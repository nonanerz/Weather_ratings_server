const express = require('express')
const Comment = require('../model/comment/model')
const router = express.Router()

router.get('/:id', async function (req, res, next) {
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 5;
    let offset = (page - 1) * limit;
    let count = await Comment.count({resource: req.params.id})
        .then(count => count)

    Comment.find({resource: req.params.id}).limit(limit)
        .sort({ _id : 'descending'})
        .skip(offset)
        .then(comments => {
            res.json({comments, count})
        })
        .catch(next)
})

router.post('/', async function (req, res, next) {
    let data = req.body
    data['createdAt'] = new Date()
  new Comment(data)
    .save()
    .then(comment => {
      res.json({comment})
    })
    .catch(next)
})

module.exports = router
