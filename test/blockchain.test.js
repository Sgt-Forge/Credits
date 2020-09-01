const { assert } = require('chai');
const CryptoJS = require('crypto-js');

const { Block } = require('../src/block');
const { Blockchain } = require('../src/blockchain');

describe('Blockchain()', function() {
    it('Create a new blockchain with a genisis block', function() {
        var testChain = new Blockchain();
        assert.equal(testChain.chain.length, 1);
        assert.equal(testChain.chain[0].index, 0);
        assert.equal(testChain.chain[0].data['amount'], 0)
        assert.equal(testChain.chain[0].previousHash, '');
    });

    it('Return latest block', function() {
        var testChain = new Blockchain();
        testChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));

        var latestBlock = testChain.getLatestBlock();
        assert.equal(latestBlock.index, 1);
    });

    it('Add block to blockchain', function() {
        var testChain = new Blockchain();
        testChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));
        testChain.addBlock(new Block(2, new Date().getTime()/1000, {amount: 20}));
        assert.equal(testChain.chain.length, 3);
        assert.equal(testChain.chain[1].index, 1);
        assert.equal(testChain.chain[2].index, 2);
        assert.isAtLeast(testChain.chain[2].timestamp, testChain.chain[1].timestamp);
    });

    it('Validate a new block', function() {
        var testChain = new Blockchain();
        var block1 = new Block(1, new Date().getTime()/1000, {amount: 10}, '0');
        var block2 = new Block(2, new Date().getTime()/1000, {amount: 234}, block1.hash);
        var block3 = new Block(3, new Date().getTime()/1000, {amount: 345}, block2.hash);
        var block4 = new Block(4, new Date().getTime()/1000, {amount: 456}, block3.hash);
        var block5 = new Block(5, new Date().getTime()/1000, {amount: 456}, block4.hash);
        block3.hash = CryptoJS.SHA256('some randome data');
        block5.data = JSON.stringify({amount: 500});
        block5.hash = block3.calculateHash();

        assert.isTrue(testChain.isValidNewBlock(block1, block2));
        assert.isFalse(testChain.isValidNewBlock(block1, block3));
        assert.isFalse(testChain.isValidNewBlock(block3, block4));
        assert.isFalse(testChain.isValidNewBlock(block4, block5));
    });

    it('Validate the blockchain', function() {
        var testChain = new Blockchain();
        var invalidGenisisChain = new Blockchain();
        invalidGenisisChain.chain[0] = new Block(0, new Date().getTime/1000, {amount: 0});
        testChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));
        testChain.addBlock(new Block(2, new Date().getTime()/1000, {amount: 20}));
        invalidGenisisChain.addBlock(new Block(1, new Date().getTime()/1000, {amount: 10}));
        invalidGenisisChain.addBlock(new Block(2, new Date().getTime()/1000, {amount: 20}));

        assert.isFalse(invalidGenisisChain.isChainValid());
        assert.isTrue(testChain.isChainValid());
        testChain.chain[1].data = {amount: 100};
        assert.isFalse(testChain.isChainValid());
        testChain.chain[1].hash = testChain.chain[1].calculateHash();
        assert.isFalse(testChain.isChainValid());
        assert.isFalse(testChain.isChainValid());
    });

    it('Replace the block chain', function() {
        var oldChain = new Blockchain();
        var newChain = new Blockchain();
        var block1 = new Block(1, new Date().getTime()/1000, {amount: 10}, '0');
        var block2 = new Block(2, new Date().getTime()/1000, {amount: 234}, block1.hash);
        var block22 = new Block(2, new Date().getTime()/1000, {amount: 546}, block1.hash);
        var block3 = new Block(3, new Date().getTime()/1000, {amount: 345}, block2.hash);
        oldChain.addBlock(block1);
        oldChain.addBlock(block2);
        newChain.addBlock(block1);
        newChain.addBlock(block22);
        oldChain.replaceChain(newChain);

        assert.equal(oldChain.chain.length, 3);
        newChain.addBlock(block3);
        assert.isAbove(newChain.chain.length, oldChain.chain.length);
        oldChain.replaceChain(newChain);
        assert.equal(oldChain.chain.length, 4);
        assert.equal(JSON.stringify(newChain), JSON.stringify(oldChain));
        assert.equal(oldChain.chain[2].data["amount"], 546);
    });
});