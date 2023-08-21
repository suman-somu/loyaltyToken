const { ethers } = require("hardhat");

async function main() {
  const LoyalToken = await ethers.getContractFactory("LoyalToken");
  console.log("Deploying Token...");
  const token = await LoyalToken.deploy();
  console.log("middle");
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
