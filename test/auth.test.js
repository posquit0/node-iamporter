'use strict';

const { expect } = require('chai');
const { Iamporter } = require('../');

describe('Test', function () {
  it('should success to get a new API token', function (done) {
    const iamporter = new Iamporter();
    iamporter.getToken()
      .then((res) => {
        expect(res.data).to.have.all.keys([
          'access_token', 'now', 'expired_at'
        ]);
        done();
      });
  });
});
