var Registry = artifacts.require("./registry/DiplrRegistry.sol");
var IPRegistry = artifacts.require("./property/IPRegistry.sol");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(Registry);
    deployer.deploy(IPRegistry);
};