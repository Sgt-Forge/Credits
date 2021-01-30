const CryptoJS = require('crypto-js')

class Block {
    constructor(index, timestamp, data, difficulty, nonce, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return CryptoJS.SHA256(this.index.toString() +
                                this.timestamp.toString() +
                                JSON.stringify(this.data) +
                                this.difficulty.toString() +
                                this.nonce.toString() +
                                this.previousHash).toString();
    }

    isValidBlockStructure(){
        return typeof this.index === 'number' &&
            typeof this.timestamp === 'number' &&
            typeof this.data === 'object' &&
            typeof this.previousHash === 'string' &&
            typeof this.difficulty === 'number' &&
            typeof this.nonce === 'number' &&
            typeof this.hash === 'string';
    }
}

module.exports.Block = Block;