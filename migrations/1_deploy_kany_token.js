// Make sure the KanyToken contract is included
const KanyToken = artifacts.require("KanyToken");

// THis is an async function, it will accept the Deployer account, the network, and eventual accounts.
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(KanyToken, "KanyToken", "KNT", 18, "500000");
  const kanyToken = await KanyToken.deployed();
};
