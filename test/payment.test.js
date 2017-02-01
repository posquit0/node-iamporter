'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Payment', function () {
  let iamporter;

  beforeEach(function () {
    iamporter = new Iamporter();
  });

  describe('GET /payments/{imp_uid}', function () {
    it('should success to find a payment information when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.findByImpUid('iamporter-test-imp-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to find a payment information with non-existent uid', function () {
      return iamporter.findByImpUid('iamporter-test-imp-uid')
        .then((res) => {
          expect(res.message, 'res.message').to.equal('존재하지 않는 결제정보입니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });

  describe('GET /payments/find/{merchant_uid}', function () {
    it('should success to find a payment information when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.findByMerchantUid('iamporter-test-merchant-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to find a payment information with non-existent uid', function () {
      return iamporter.findByImpUid('iamporter-test-merchant-uid')
        .then((res) => {
          expect(res.message, 'res.message').to.equal('존재하지 않는 결제정보입니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });
});

