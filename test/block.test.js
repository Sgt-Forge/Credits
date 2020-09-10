const CryptoJS = require('crypto-js');
const { assert } = require('chai');

const { Block } = require('../src/block');

describe('Block()', function() {
    it('should create a new Block with data', function() {
        var newBlock = new Block(0, new Date().getTime() / 1000, {amount: 5}, 123, 456);

        var calcHash = CryptoJS.SHA256(newBlock.index +
                                        newBlock.timestamp +
                                        JSON.stringify(newBlock.data) +
                                        newBlock.previousHash +
                                        123 +
                                        456).toString();
        assert.equal(calcHash, newBlock.hash);
    });

    it('Validate block structure', function() {
        var block1 = new Block(1, new Date().getTime()/1000, {amount: 10}, 0, 0, '0');
        var block2 = new Block(2, 'invalid date', {amount: 234}, 0, 0, block1.hash);
        var block3 = new Block(3, new Date().getTime()/1000, 500, 0, 0, block2.hash);
        var block4 = new Block(4, new Date().getTime()/1000, {amount: 456}, 0, 0, 123);
        var block5 = new Block(5, new Date().getTime()/1000, {amount: 456}, block1.hash);
        block5.hash = 50000;
        var block6 = new Block(1, new Date().getTime()/1000, {amount: 10}, 'invalid difficulty', 0, '0');
        var block7 = new Block(1, new Date().getTime()/1000, {amount: 10}, 0, 'invalid nonce', '0');

        assert.isTrue(block1.isValidBlockStructure());
        assert.isFalse(block2.isValidBlockStructure());
        assert.isFalse(block3.isValidBlockStructure());
        assert.isFalse(block4.isValidBlockStructure());
        assert.isFalse(block5.isValidBlockStructure());
        assert.isFalse(block6.isValidBlockStructure());
        assert.isFalse(block7.isValidBlockStructure());
    });
});

