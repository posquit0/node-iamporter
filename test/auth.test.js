'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Auth', function () {
  describe('GET /users/getToken - Iamporter.getToken()', function () {
    let iamporter;

    beforeEach(function () {
      iamporter = new Iamporter();
    });

    it('should success to get a new API token with a default API Key and Secret', function () {
      return iamporter.getToken()
        .then((res) => {
          expect(res.data, 'data').to.have.all.keys([
            'access_token', 'now', 'expired_at'
          ]);
        })
        .catch(() => {
          throw new Error('Exception이 발생하면 안되는 테스트입니다.');
        });
    });

    it('should fail to get a new API token with invalid API Key and Secret', function () {
      return expect(iamporter.getToken('InvalidAPIKey', 'InvalidSecret')).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail to get a new API token without API Key and Secret', function () {
      return expect(iamporter.getToken(null, null)).to.eventually
        .rejectedWith(IamporterError, 'imp_key, imp_secret 파라메터가 누락되었습니다.');
    });
  });
});
