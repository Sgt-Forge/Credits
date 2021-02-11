const { assert } = require('chai');

const { Block } = require('../src/block.js')
const { Blockchain } = require('../src/blockchain.js')
const { Miner } = require('../src/miner.js');

describe('Miner()', function() {
    it('should create a new miner with a blockchain', function() {
        let blockchain = new Blockchain();
        let miner = new Miner(blockchain);

        assert.notEqual(miner.blockchain, null);
        assert.equal(miner.blockchain.getLatestBlock().timestamp, 1598818841.736)
    });

    it('should mine and return a new block', function() {
        let blockchain = new Blockchain();
        let miner = new Miner(blockchain);

        assert.equal(blockchain.getLatestBlock().timestamp, 1598818841.736);
        assert.equal(blockchain.getLatestBlock().index, 0);
        const newData = { 'amount': 117 };
        const newBlock = miner.mineBlock(newData);
        blockchain.addBlock(newBlock);
        assert.equal(blockchain.getLatestBlock().index, 1)
        assert.isAbove(blockchain.getLatestBlock().timestamp, 1598818841.736)
    });

    it('should increment nonce to mine new blocks at higher difficulties', function() {
        let blockchain = new Blockchain();
        let miner = new Miner(blockchain);
        for(let i = 0; i < 20; i++){
            const newData = { 'amount': i };
            const newBlock = miner.mineBlock(newData);
            blockchain.addBlock(newBlock);
        }

        assert.isAbove(blockchain.getLatestBlock().nonce, 0);
        assert.isAbove(blockchain.getLatestBlock().difficulty, 0);
    });
});