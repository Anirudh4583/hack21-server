const express = require('express')
const cors = require('cors')
const user = require('./routes/user')
require('dotenv').config()
require('./db/db.js')

const main = async () => {
  // Get web3
  const Web3 = require('web3')
  var provider =
    'https://rpc-mumbai.maticvigil.com/v1/2555bf83036f32d286cddc96f1d4425e3fe1aecf'

  const web3 = new Web3(provider)

  var abi = [
    {
      constant: false,
      inputs: [
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'tradable',
          type: 'bool',
        },
        {
          internalType: 'uint256',
          name: 'cost',
          type: 'uint256',
        },
      ],
      name: 'addDetails',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'cost',
          type: 'uint256',
        },
      ],
      name: 'changeCost',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bool',
          name: 'openSource',
          type: 'bool',
        },
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
      ],
      name: 'changeOpenSource',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'bool',
          name: 'tradable',
          type: 'bool',
        },
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
      ],
      name: 'changeTradable',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
      ],
      name: 'crowdFunding',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
        {
          internalType: 'address payable',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'trade',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      constant: true,
      inputs: [],
      name: 'deployed',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'details',
      outputs: [
        {
          internalType: 'address payable',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'ipfsDest',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'tradable',
          type: 'bool',
        },
        {
          internalType: 'bool',
          name: 'openSource',
          type: 'bool',
        },
        {
          internalType: 'uint256',
          name: 'cost',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'fundRaised',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ]

  var address = '0x6b159Fa6e71d8a9BF7888cB71D95bC74049faae2'

  const contract = new web3.eth.Contract(abi, address)

  // console.log('contract', contract.methods)

  // const acc = await web3.eth.getAccounts()
  // console.log(acc)

  var res = await contract.methods.addDetails('123', true, 10).send({
    from: '0x431E512D402Af643e105c0694086e6927923d625',
  })
  console.log('res', res)
}

main()

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
