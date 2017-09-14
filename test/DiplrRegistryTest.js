const Registry = artifacts.require('./registry/DiplrRegistry.sol');
const expect = require('chai').expect;
contract('DiplrRegistry', function (accounts) {

    let registry;

    beforeEach(async function () {
        registry = await Registry.new({
            from: accounts[0]
        });
    });

    it('should not be possible to add a context as non-owner', async function () {

        try {
            await registry.setAddress(web3.sha3('registry'), accounts[0], {
                from: accounts[1]
            });
            assert.fail('tx should not have succeeded');
        } catch (error) {
            assert(
                error.message.indexOf('invalid opcode') >= 0,
                'releaseTokenTransfer should throw an opCode exception.'
            );
        }
    });

    it('should be possible to add a context as owner', async function () {
        await registry.setAddress(web3.sha3('registry2'), accounts[3], {
            from: accounts[0]
        });

        let _address = await registry.getAddress(web3.sha3('registry2'));
        assert.equal(_address, accounts[3], "should be updated");
    });
    it('should be possible to change a context as owner', async function () {

        await registry.setAddress(web3.sha3('registry3'), accounts[0], {
            from: accounts[0]
        });
        await registry.setAddress(web3.sha3('registry3'), accounts[1], {
            from: accounts[0]
        });

        let _address = await registry.getAddress(web3.sha3('registry3'));
        assert.equal(_address, accounts[1], "should be updated");
    });
});