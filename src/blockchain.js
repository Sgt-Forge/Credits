const { Block } = require('./block');

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        var genesis = new Block(0, 1598818841.736, {amount: 0});
        genesis.hash = genesis.calculateHash();

        return genesis;
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    getBlockchain(){
        return this.chain;
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
        const isValidGenesis = (newGenesis) => {
            var isValid = JSON.stringify(newGenesis) === JSON.stringify(this.createGenesisBlock());
            return isValid;
        };

        if(!isValidGenesis(this.chain[0])){
            return false;
        }
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

    replaceChain(newChain){
        if(newChain.isChainValid() && newChain.chain.length > this.chain.length){
            console.log("[LOG]: Received a valid new chain. Replacing current blockchain with new blockchain.");
            this.chain = newChain.chain;
        } else {
            console.log("[LOG]: Received a new invalid blockchain.")
        }
    }
}

module.exports.Blockchain = Blockchain;