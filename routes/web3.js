const router = require('express').Router()
require('dotenv').config()

router.post('/register', async (req, res) => {
  try {
    res.status(200).send()
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

module.exports = router
