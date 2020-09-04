var bodyParser = require('body-parser');
var express = require('express');

const { Blockchain } = require('./blockchain.js')

const app = express();
app.use(bodyParser.json());

var blockchain = new Blockchain();

app.get('/blocks', (req, res) => {
    res.send(blockchain.getBlockchain());
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

module.exports = app;