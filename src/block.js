const CryptoJS = require('crypto-js')

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return CryptoJS.SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }

    isValidBlockStructure(){
        return typeof this.index === 'number' &&
            typeof this.timestamp === 'number' &&
            typeof this.data === 'object' &&
            typeof this.previousHash === 'string' &&
            typeof this.hash === 'string';
    }
}

module.exports.Block = Block;