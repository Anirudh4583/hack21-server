const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
require('dotenv').config()

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    const result = await user.save()
    res.status(200).send(result)
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })

    if (!user) throw new Error('No User Found')
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) throw new Error('Wrong Email/Password')

    const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET)

    res.status(200).send({
      token,
      user,
    })

    res.status(200).send({
      token,
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
})

module.exports = router
