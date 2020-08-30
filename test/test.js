const expect = require('chai').expect;
const CryptoJS = require('crypto-js')
const Block = require('../src/block').Block;
const Blockchatin = require('../src/blockchain').Blockchain;

describe('Block()', function() {
    it('should create a new Block with data.', function() {
        // 1. Arrange
        var newBlock = new Block(0, new Date().getTime() / 1000, {amount: 5});

        // 2. Act

        // 3. Assert
        calcHash = CryptoJS.SHA256(newBlock.index + newBlock.previousHash + newBlock.timestamp + JSON.stringify(newBlock.data)).toString();
        expect(newBlock.hash).to.be.equal(calcHash);
    });
});