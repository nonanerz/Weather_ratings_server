const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const nodeMailer = require('nodemailer')
const emailCredentials = require('../config/index')

router.post('/', function (req, res, next) {
  let transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailCredentials.email,
      pass: emailCredentials.password
    }
  })
  fs.readFile(path.join(__dirname, '../views', 'email.ejs'), 'utf8', (err, data) => {
    if (err) {
      return
    }
    let mailOptions = {
      from: `"Weather Rate" <weather.rate@gmail.com>`,
      to: 'weather.rate@gmail.com, yarmolenko.dany@gmail.com, bulavaeduard@gmail.com',
      subject: 'Contact us',
      text: req.body.comment,
      html: ejs.render(data, {name: req.body.name, email: req.body.email, comment: req.body.comment})
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send('error')
      } else {
        res.json({response: info.response})
      }
    })
  })
})

module.exports = router
