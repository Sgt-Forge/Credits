const CryptoJS = require('crypto-js');
const { assert } = require('chai');

const { Block } = require('../src/block');

describe('Block()', function() {
    it('should create a new Block with data.', function() {
        var newBlock = new Block(0, new Date().getTime() / 1000, {amount: 5});

        var calcHash = CryptoJS.SHA256(newBlock.index + newBlock.timestamp + JSON.stringify(newBlock.data) + newBlock.previousHash).toString();
        assert.equal(calcHash, newBlock.hash);
    });
});

