var chai = require('chai');
const { assert } = require('chai');
var chaiHttp = require('chai-http');

const app = require('../src/httpServer');

chai.use(chaiHttp);

describe('/GET blockchain', function() {
    it('Gets the blockchain', function() {
        chai.request(app).get('/blocks').
            end((_err, res) => {
                assert.equal(res.status, 200);
            });
    });
});