const {ethers } = require("ethers");
const dotenv = require('dotenv').config();

const abifile = require("../artifacts/contracts/loyaltToken.sol/LoyalToken.json")
const abi = abifile.abi;

const provider = new ethers.providers.AlchemyProvider('maticmum',process.env.ALCHEMY_ID);
const wallet = new ethers.Wallet(process.env.T_PRIVATE_KEY,provider)


const mainAccntAddress = '0xa5217E0c08e322A5D26A8652655Fbed1464F1Fa4'
const testAccntAddress = '0x23AE397F1473569A6aC95be7c8C51544Cb834314'
const user1 = '0xaF0f983378773CC5a53914e28395666f198eB4EF'
const user2 = '0x382AB6b94d5890df5eB68B2DD917F9a8F503208F'
const seller1 = '0xA8Df9A94D0A878631e87f228D4137c4A55B18191'
const seller2 = '0x3bd22a759A30Dd4FF32B7a08a35Ef486288aeb61'

const main = async () => {

    const signer = wallet.connect(provider)
    const contract1 = new ethers.Contract(process.env.CONTRACT_ADDRESS_NEW, abi, signer); 


    var balanceOf2 = await contract1.balanceOf(testAccntAddress);
    console.log(`before balanceOf: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(user1);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(user2);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(seller1);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(seller2);
    console.log(`before balanceOf: ${balanceOf3}`); 



    // const r = await contract1.approve(testAccntAddress, 20);
    // console.log(r);

    // var result = await contract1.getAddressDate(user1);
    // result =  result.toHexString()
    // // convert the hex result to a number
    // result = parseInt(result, 16);
    // console.log(result);

    // await decay.wait();
    // console.log("transfering")
    const transferFrom = await contract1.transferFrom(seller1,testAccntAddress, 20 );
    await transferFrom.wait();
    // const transferFrom = await contract1.transfer(testAccntAddress, 55 );
    // await transferFrom.wait();

    var balanceOf2 = await contract1.balanceOf(testAccntAddress);
    console.log(`before balanceOf: ${balanceOf2}`);
    var balanceOf3 = await contract1.balanceOf(user1);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(user2);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(seller1);
    console.log(`before balanceOf: ${balanceOf3}`); 
    var balanceOf3 = await contract1.balanceOf(seller2);
    console.log(`before balanceOf: ${balanceOf3}`); 
}

main();