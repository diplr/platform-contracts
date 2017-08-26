var Ownable = artifacts.require("./ownership/Ownable.sol");
var Registry = artifacts.require("./registry/DiplrRegistry.sol");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(Ownable);
    deployer.link(Ownable, Registry);
    deployer.deploy(Registry);
};