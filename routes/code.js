const router = require('express').Router()
const Code = require('../models/code')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const contract = require('../db/eth')
require('dotenv').config()

router.post('/save', auth, (req, res) => {
  try {
    const code = new Code(...req.body)
    const response = await code.save()
    res.status(200).send(response)
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

router.get('/view', (req, res) => {
  try {
    const code = await Code.find()
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

router.get('/view/:ipfs', (req, res) => {
  try {
    const code = await Code.findOne({ ipfsDest: req.params.ipfs })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

router.post('/donate/:ipfs', (req, res) => {
  try {
    const { value } = req.body
    const code = await Code.findOne({ ipfsDest: req.params.ipfs })
    var user = await User.findOne({ public_address: code.ownerAddress })

    var result = await contract.methods.crowdFunding(req.params.ipfs).send({
      from: code.ownerAddress,
      gas: 200000,
      gasPrice: 200000000,
      value: value,
    })

    console.log(result)

    user.fundRaised += value
    result = await user.save()

    res.status(200).send({
      result,
    })
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

router.post('/buy/:ipfs', (req, res) => {
  try {
    const { value, address } = req.body
    const code = await Code.findOne({ ipfsDest: req.params.ipfs })
    var user = await User.findOne({ public_address: code.ownerAddress })

    var result = await contract.methods
      .trade(req.params.ipfs, code.ownerAddress)
      .send({
        from: address,
        gas: 200000,
        gasPrice: 200000000,
        value: value,
      })
    user.fundRaised += value

    result = await user.save()

    res.status(200).send(result)
  } catch (e) {
    res.status(400).send({
      message: e.message,
    })
  }
})

module.exports = router
