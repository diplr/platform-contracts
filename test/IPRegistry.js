const IP = artifacts.require('./property/IPRegistry.sol');
const expect = require('chai').expect;


contract('IPRegistry', function (accounts) {

    let ip;

    beforeEach(async function () {
        ip = await IP.new({
            from: accounts[0]
        });
    });

    it('should be possible to register intellectual property', async function () {

        await ip.register(web3.sha3('hash'), 'company', 'name', 'firstName', {
            from: accounts[0]
        });

        let document = await ip.findDocument(web3.sha3('hash'));
        assert.equal(document[0], 'company', 'company should have been saved');
        assert.equal(document[1], 'firstName', 'firstName should have been saved');
        assert.equal(document[2], 'name', 'name should have been saved');
        assert.isAtLeast(document[3], 1503784063, 'timestamp should be more previous date');
    });

    it('should not be possible to register intellectual property when it\'s already registered', async function () {
        let ip = await IP.deployed();
        await ip.register(web3.sha3('hash2'), 'company', 'name', 'firstName', {
            from: accounts[0]
        });
        try {
            await ip.register(web3.sha3('hash2'), 'another_company', 'name', 'firstName', {
                from: accounts[0]
            });
            assert.fail('this should never be reached');
        } catch (error) {
            assert(
                error.message.indexOf('invalid opcode') >= 0,
                'releaseTokenTransfer should throw an opCode exception.'
            );
        }
    });
});