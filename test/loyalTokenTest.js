// test/LoyalToken.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoyalToken", function () {
  let loyalToken;
  let owner, recipient;

  beforeEach(async function () {
    [owner, recipient] = await ethers.getSigners();

    const LoyalToken = await ethers.getContractFactory("LoyalToken");
    loyalToken = await LoyalToken.deploy();
    await loyalToken.deployed();
  });

  it("should mint tokens to the owner", async function () {
    const balance = await loyalToken.balanceOf(owner.address);
    expect(balance).to.equal(400000000 * 10 ** 18);
  });

  it("should update account with decay", async function () {
    const initialBalance = 1000; // Example initial balance
    await loyalToken.mint(recipient.address, initialBalance);

    const lastTxnDate = await loyalToken.getAddressDate(recipient.address);
    await loyalToken.updateAccountWithDecay(recipient.address);
    const updatedLastTxnDate = await loyalToken.getAddressDate(recipient.address);

    expect(updatedLastTxnDate).to.be.gt(lastTxnDate);
  });

  it("should allow owner to snapshot", async function () {
    await loyalToken.snapshot();
    // You can add assertions or checks here to verify snapshot behavior
  });

  it("should transfer tokens between accounts", async function () {
    const initialBalance = 1000; // Example initial balance
    await loyalToken.mint(recipient.address, initialBalance);

    const senderBalanceBefore = await loyalToken.balanceOf(owner.address);
    const recipientBalanceBefore = await loyalToken.balanceOf(recipient.address);

    const transferAmount = 100; // Example transfer amount
    await loyalToken.transfer(recipient.address, transferAmount);

    const senderBalanceAfter = await loyalToken.balanceOf(owner.address);
    const recipientBalanceAfter = await loyalToken.balanceOf(recipient.address);

    expect(senderBalanceAfter).to.equal(senderBalanceBefore.sub(transferAmount));
    expect(recipientBalanceAfter).to.equal(recipientBalanceBefore.add(transferAmount));
  });

  // Add more tests as needed

});
