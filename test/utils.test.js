const CryptoJS = require('crypto-js');
const { assert } = require('chai');

const { hexToBinary } = require('../src/utils');

describe('hexToBinary()', function() {
    it('should convert a string of hexadecimal characters to a string of binary characters.', function() {
        const str0 = '0'
        const str1 = 'abcd';
        const str2 = '0123456789abcdef';
        // A random hash from running CryptoJS.SHA256(...)
        const str3 = 'a7200c5e9cd728187060e63523dc63a4f04fe066ec773cc1848bd1c5aa7e4b15';
    
        assert.equal(hexToBinary(str0), '0000');
        assert.notEqual(hexToBinary(str0), '00000');
        assert.equal(hexToBinary(str1), '1010101111001101');
        assert.notEqual(hexToBinary(str1), '01010101111001101');
        assert.notEqual(hexToBinary(str1), '010101011110011010');
        assert.equal(hexToBinary(str2), '0000000100100011010001010110011110001001101010111100110111101111');
        assert.equal(hexToBinary(str3), '1010011100100000000011000101111010011100110101110010100000011000011100000110000011100110001101010010001111011100011000111010010011110000010011111110000001100110111011000111011100111100110000011000010010001011110100011100010110101010011111100100101100010101')

        assert.equal(hexToBinary('zzzz'), null);
    });
});