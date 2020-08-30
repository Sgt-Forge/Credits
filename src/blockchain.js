const CryptoJS = require('crypto-js');
const Block = require('./block').Block;

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, 0, new Date().getTime() / 1000, "Genesis Block", );
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let creditChain = new Blockchain();
creditChain.addBlock(new Block(1, new Date().getTime() / 1000, {amount: 4}));
creditChain.addBlock(new Block(2, new Date().getTime() / 1000, {amount: 10}));

console.log(JSON.stringify(creditChain, null, 4));