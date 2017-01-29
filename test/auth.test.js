'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Auth', function () {
  describe('GET /users/getToken', function () {
    let iamporter;

    before(function () {
      iamporter = new Iamporter();
    });

    it('should success to get a new API token with a default API Key and Secret', function () {
      return iamporter.getToken()
        .then((res) => {
          expect(res.data, 'data').to.have.all.keys([
            'access_token', 'now', 'expired_at'
          ]);
        });
    });

    it('should fail to get a new API token with invalid API Key and Secret', function () {
      return iamporter.getToken('InvalidAPIKey', 'InvalidSecret')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to get a new API token without API Key and Secret', function () {
      return iamporter.getToken(null, null)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('imp_key, imp_secret 파라메터가 누락되었습니다.');
        });
    });
  });
});
