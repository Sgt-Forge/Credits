const expect = require('chai').expect;
const assert = require('chai').assert;
const CryptoJS = require('crypto-js');
const { Blockchain } = require('../src/blockchain');
const Block = require('../src/block').Block;
const Blockchatin = require('../src/blockchain').Blockchain;

describe('Block()', function() {
    it('should create a new Block with data.', function() {
        // 1. Arrange
        var newBlock = new Block(0, new Date().getTime() / 1000, {amount: 5});

        // 2. Act

        // 3. Assert
        calcHash = CryptoJS.SHA256(newBlock.index + newBlock.timestamp + JSON.stringify(newBlock.data) + newBlock.previousHash).toString();
        expect(newBlock.hash).to.be.equal(calcHash);
    });
});

describe('Blockchain()', function() {
    it('Create a new blockchain with a genisis block.', function() {
        var testChain = new Blockchain();
        assert.equal(testChain.chain.length, 1);
        assert.equal(testChain.chain[0].index, 0);
        assert.equal(testChain.chain[0].data['amount'], 0)
        assert.equal(testChain.chain[0].previousHash, '');
    });

    it('Add block to blockchain.', function() {
        var testChain = new Blockchain();
        testChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));
        testChain.addBlock(new Block(2, new Date().getTime()/1000, {amount: 20}));
        assert.equal(testChain.chain.length, 3);
        assert.equal(testChain.chain[1].index, 1);
        assert.equal(testChain.chain[2].index, 2);
        assert.isAtLeast(testChain.chain[2].timestamp, testChain.chain[1].timestamp);
    });

    it('Validate the blockchain.', function() {
        var testChain = new Blockchain();
        testChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));
        testChain.addBlock(new Block(2, new Date().getTime()/1000, {amount: 20}));

        assert.isTrue(testChain.isChainValid());
        testChain.chain[1].data = {amount: 100};
        assert.isFalse(testChain.isChainValid());
    });
});