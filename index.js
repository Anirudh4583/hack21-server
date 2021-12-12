const IPFS = require('ipfs-http-client')

async function main () {
  const client = IPFS.create()

  const { cid } = await client.add('Hello world!')

  console.log('Added file contents:', cid)

}

main()