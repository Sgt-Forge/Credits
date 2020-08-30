const CryptoJS = require('crypto-js');
const { assert } = require('chai');

const { Block } = require('../src/block');

describe('Block()', function() {
    it('should create a new Block with data.', function() {
        var newBlock = new Block(0, new Date().getTime() / 1000, {amount: 5});

        var calcHash = CryptoJS.SHA256(newBlock.index + newBlock.timestamp + JSON.stringify(newBlock.data) + newBlock.previousHash).toString();
        assert.equal(calcHash, newBlock.hash);
    });

    it('Validate block structure.', function() {
        var block1 = new Block(1, new Date().getTime()/1000, {amount: 10}, '0');
        var block2 = new Block(2, 'invalid date', {amount: 234}, block1.hash);
        var block3 = new Block(3, new Date().getTime()/1000, 500, block2.hash);
        var block4 = new Block(4, new Date().getTime()/1000, {amount: 456}, 123);
        var block5 = new Block(5, new Date().getTime()/1000, {amount: 456}, block1.hash);
        block5.hash = 50000;

        assert.isTrue(block1.isValidBlockStructure());
        assert.isFalse(block2.isValidBlockStructure());
        assert.isFalse(block3.isValidBlockStructure());
        assert.isFalse(block4.isValidBlockStructure());
        assert.isFalse(block5.isValidBlockStructure());
    });
});

