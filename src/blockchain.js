const { Block } = require('./block');

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

    isValidNewBlock(previousBlock, newBlock){
        if(previousBlock.index + 1 !== newBlock.index){
            console.log("[ERROR]: Invalid index for new block. Previous index: ", previousBlock.index, " New index: ", newBlock.index);
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash){
            console.log("[ERROR]: Invalid previous hash for new block.")
            return false;
        } else if (newBlock.calculateHash() !== newBlock.hash){
            console.log("[ERROR]: Invalid hash for new block.")
            return false;
        }

        return true;
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