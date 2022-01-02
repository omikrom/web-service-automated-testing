var test = require('../testfunc.js');
var expect = require('chai').expect;


describe('Test', function() {
    it('should return 3', function() {
        expect(test(1, 2)).to.equal(3);
    })
});
