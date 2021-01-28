
const CryptoJS = require('crypto-js')
const { Block } = require('./block.js');
const { Blockchain } = require('./blockchain.js')
const app = require('./httpServer.js');

class Miner {
    constructor(blockchain) {
        this.blockchain = blockchain;
    }

    mineBlock(data) {
        let newBlock = null;
        const previousBlock = this.blockchain.getLatestBlock();
        const index = previousBlock.index + 1;
        const previousHash = previousBlock.hash;
        const timestamp = new Date().getTime() / 1000;
        const difficulty = this.blockchain.getDifficulty();
        let nonce = 0;
        // Infinite while loop until we find valid block
        while(nonce >= 0) {
            const hash = CryptoJS.SHA256(index +
                                         timestamp +
                                         JSON.stringify(data) +
                                         difficulty +
                                         nonce +
                                         previousHash)
            if(this.blockchain.hashMatchesDifficulty(hash, difficulty)){
                newBlock = new Block(index, timestamp, data, difficulty, nonce, previousBlock.hash)
                break;
            }
            nonce += 1;
            // Add exit here if we detect that out time stamp is greater than current percieved time + 60 seconds
        }

        return newBlock;
    }
}

module.exports.Miner = Miner;