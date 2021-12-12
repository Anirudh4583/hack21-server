const express = require('express')
const cors = require('cors')
const user = require('./routes/user')
require('dotenv').config()
require('./db/db.js')

// const main = async () => {
//   // Get web3
//   const Web3 = require('web3')
//   var provider = 'https://rpc-mumbai.matic.today/'
//   const web3 = new Web3(new Web3.providers.HttpProvider(provider))

//   // Get address
//   const accounts = await web3.eth.getAccounts()
//   console.dir(accounts)
// }

// main()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 2000

app.use('/user', user)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server up at port ${port}`)
})
