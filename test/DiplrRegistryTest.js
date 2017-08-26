var Registry = artifacts.require('./registry/DiplrRegistry.sol');

contract('DiplrRegistry', function (accounts) {
    console.log(accounts[0]);
    it('should not be possible to add a context as non-owner', function () {
        var registry;
        return Registry.deployed().then(function (instance) {
            registry = instance;
            return registry.setAddress(web3.sha3('registry'), accounts[0], {
                from: accounts[1]
            });
        }).catch(function (err) {
            registry.getAddress(web3.sha3('registry')).then(function (_address) {
                assert.equal(_address, 0, "should not have been updated");
            })
        })
    });
    it('should be possible to add a context as owner', function () {
        var registry;
        return Registry.deployed().then(function (instance) {
            registry = instance;
            return registry.setAddress(web3.sha3('registry'), accounts[0], {
                from: accounts[0]
            });
        }).then(function (tx) {
            return registry.getAddress(web3.sha3('registry'));
        }).then(function (_address) {
            assert.equal(_address, accounts[0], "should be updated");
        });
    });
    it('should be possible to change a context as owner', function () {
        var registry;
        return Registry.deployed().then(function (instance) {
            registry = instance;
            return registry.setAddress(web3.sha3('registry'), accounts[0], {
                from: accounts[0]
            });
        }).then(function (tx) {
            registry.setAddress(web3.sha3('registry'), accounts[1], {
                from: accounts[0]
            });
            return registry.getAddress(web3.sha3('registry'));            
        }).then(function (_address) {
            assert.equal(_address, accounts[1], "should be updated");
        });
    });
});