const hre = require('hardhat');

async function main() {
  const SantychuyNFT = await hre.ethers.getContractFactory('SantychuyNFT');
  const santychuyNFT = await SantychuyNFT.deploy();

  await santychuyNFT.deployed();

  console.log('SantychuyNFT deployed to:', santychuyNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
