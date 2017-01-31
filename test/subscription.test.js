'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Subscription', function () {
  describe('GET /subscribe/customers/{customer_uid}', function () {
    let iamporter;

    beforeEach(function () {
      iamporter = new Iamporter();
    });

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.getSubscription()
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to view a subscription information with non-existent billing key', function () {
      return iamporter.getSubscription('iamporter-test-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/등록된 정보를 찾을 수 없습니다./);
        });
    });

  });
});
