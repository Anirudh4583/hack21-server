var Web3 = require('web3');
var provider = 'https://rpc-mumbai.maticvigil.com/v1/2555bf83036f32d286cddc96f1d4425e3fe1aecf';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

const data = async ()=>{
    const block = await web3.eth.getBlockNumber();
    console.log('Total Script: '+block);

    web3.eth.accounts.create(web3.utils.randomHex(32));
    
    const accounts = await web3.eth.getAccounts();

    accounts.forEach(async account => {
        const amount = await web3.eth.getBalance(account)
        console.log(`Account: ${account} and Balance : ${amount}`)})
}

data()