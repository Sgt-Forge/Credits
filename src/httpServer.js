var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

const { Blockchain } = require('./blockchain.js');
const { Miner } = require('./miner.js');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

var blockchain = new Blockchain();
var miner = new Miner(blockchain);

app.get('/', (req, res) => {
    var newBlock = miner.mineBlock({'amount': 1});
    blockchain.addBlock(newBlock);
    res.render('index', { blockchain: blockchain.getBlockchain() });
})

app.get('/blocks', (req, res) => {
    res.send(blockchain.getBlockchain());
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

module.exports = app;