const CryptoJS = require('crypto-js');
const Block = require('./block').Block;

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, new Date().getTime() / 1000, {amount: 0});
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log("[ERROR]: Current block's hash is invalid!");
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                console.log("[ERROR]: Previous block's hash is invalid!");
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;