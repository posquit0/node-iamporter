'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Payment', function () {
  let iamporter;

  beforeEach(function () {
    iamporter = new Iamporter();
  });

  describe('GET /payments/{imp_uid} - Iamporter.findByImpUid()', function () {
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

  describe('GET /payments/find/{merchant_uid} - Iamporter.findByMerchantUid()', function () {
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
      return iamporter.findByMerchantUid('iamporter-test-merchant-uid')
        .then((res) => {
          expect(res.message, 'res.message').to.equal('존재하지 않는 결제정보입니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });

  describe('GET /payments/findAll/{merchant_uid}/{payment_status} - Iamporter.findAllByMerchantUid()', function () {
    it('should success to find a list of payment informations when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.findAllByMerchantUid('iamporter-test-merchant-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to find a list of payment informations with non-existent uid', function () {
      return iamporter.findAllByMerchantUid('iamporter-test-merchant-uid')
        .then((res) => {
          expect(res.message, 'res.message').to.equal('존재하지 않는 결제정보입니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });

  describe('GET /payments/status/{payment_status} - Iamporter.findAllByStatus()', function () {
    it('should success to find a list of payment informations when status is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.findAllByStatus()
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to find a list of payment informations with invalid status', function () {
      return iamporter.findAllByStatus('iamporter-test-status')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('지원되지 않는 상태값입니다.');
        });
    });
  });

  describe('POST /payments/prepare - Iamporter.createPreparedPayment()', function () {
    it('should success to create a prepared payment');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 500
      };

      return iamporter.createPreparedPayment(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });
  });

  describe('GET /payments/prepare - Iamporter.getPreparedPayment()', function () {
    it('should success to view a prepared payment information when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.getPreparedPayment()
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to view a prepared payment information with invalid uid', function () {
      return iamporter.getPreparedPayment('iamporter-test-merchant-uid')
        .then((res) => {
          expect(res.message, 'res.message').to.equal('사전등록된 결제정보가 존재하지 않습니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });

  describe('POST /subscribe/payments/onetime - Iamporter.payOnetime()', function () {
    it('should success to pay onetime with a credit-card');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02',
        'birth': '920220'
      };

      return iamporter.payOnetime(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to pay with invalid credit-card information', function () {
      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02',
        'birth': '920220'
      };

      return iamporter.payOnetime(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/유효하지않은 카드번호를 입력하셨습니다./);
        });
    });
  });

  describe('POST /subscribe/payments/again - Iamporter.paySubscription()', function () {
    it('should success to pay with a billing key');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'customer_uid': 'iamporter-test-customer-uid',
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000
      };

      return iamporter.paySubscription(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to pay with invalid billing key', function () {
      const data = {
        'customer_uid': 'iamporter-test-customer-uid',
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000
      };

      return iamporter.paySubscription(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/등록되지 않은 구매자입니다./);
        });
    });
  });

  describe('POST /subscribe/payments/foreign - Iamporter.payForeign()', function () {
    it('should success to pay with a foreign credit-card');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02'
      };

      return iamporter.payForeign(data)
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });
  });

  describe('POST /payments/cancel - Iamporter.cancelByImpUid()', function () {
    it('should success to cancel a payment');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.cancelByImpUid('iamporter-test-imp-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to cancel a payment with non-existent uid', function () {
      return iamporter.cancelByImpUid('iamporter-test-imp-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/취소할 결제건이 존재하지 않습니다./);
        });
    });
  });

  describe('POST /payments/cancel - Iamporter.cancelByMerchantUid()', function () {
    it('should success to cancel a payment');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.cancelByMerchantUid('iamporter-test-merchant-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to cancel a payment with non-existent uid', function () {
      return iamporter.cancelByMerchantUid('iamporter-test-merchant-uid')
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/취소할 결제건이 존재하지 않습니다./);
        });
    });
  });

  describe('POST /payments/cancel - Iamporter.cancel()', function () {
    it('should success to cancel a payment');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return iamporter.cancel()
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.equal('아임포트 API 인증에 실패하였습니다.');
        });
    });

    it('should fail to cancel a payment without any uid', function () {
      return iamporter.cancel()
        .catch((err) => {
          expect(err, 'err').to.be.an.instanceof(IamporterError);
          expect(err.message, 'err.message').to.match(/지정해주셔야합니다./);
        });
    });
  });
});
