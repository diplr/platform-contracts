var IP = artifacts.require('./property/IPRegistry.sol');

contract('IPRegistry', function (accounts) {
    it('should be possible to register intellectual property', function () {
        var ip;
        return IP.deployed().then(function (instance) {
            ip = instance;
            return ip.register(web3.sha3('hash'), 'company', 'name', 'firstName', {
                from: accounts[0]
            });
        }).then(function (tx) {
            return ip.findDocument(web3.sha3('hash'));
        }).then(function (document) {
            assert.equal(document[0], 'company', 'company should have been saved');
            assert.equal(document[1], 'firstName', 'firstName should have been saved');
            assert.equal(document[2], 'name', 'name should have been saved');
            assert.isAtLeast(document[3], 1503784063, 'timestamp should be more previous date');
        });
    });

    it('should not be possible to register intellectual property when it\'s already registered', function () {
        var ip;
        return IP.deployed().then(function (instance) {
            ip = instance;
            return ip.register(web3.sha3('hash2'), 'company', 'name', 'firstName', {
                from: accounts[0]
            });
        }).then(function (tx) {
            return ip.register(web3.sha3('hash2'), 'company', 'name', 'firstName', {
                from: accounts[0]
            }).then(function(_){
                assert.fail('tx should not have succeeded');
            });
        }).catch(function(err){
            assert.isOk('property was not updated, which is ok');
        });
    });
});