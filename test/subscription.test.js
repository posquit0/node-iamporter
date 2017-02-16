'use strict';

const _ = require('lodash');
const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Subscription', function () {
  let iamporter;

  beforeEach(function () {
    iamporter = new Iamporter();
  });

  describe('POST /subscribe/customers/{customer_uid} - Iamporter.createSubscription()', function () {
    it('should success to create a billing key with a private credit card');

    it('should fail when given credit card is invalid', function () {
      const data = {
        'customer_uid': 'iamporter-test-customer-uid',
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02',
        'birth': '880220'
      };

      return expect(iamporter.createSubscription(data)).to.eventually
        .rejectedWith(IamporterError, /유효하지않은 카드번호/);
    });

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'customer_uid': 'iamporter-test-customer-uid',
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02',
        'birth': '920220'
      };

      return expect(iamporter.createSubscription(data)).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail when some parameters are omitted', function* () {
      const data = {
        'customer_uid': 'iamporter-test-customer-uid',
        'card_number': '1234-1234-1234-1234',
        'expiry': '2020-02',
        'birth': '920220'
      };

      for (let key of Object.keys(data)) {
        const omitted = _.omit(data, key);
        yield expect(iamporter.createSubscription(omitted)).to.eventually
          .rejectedWith(IamporterError, /파라미터 누락:/);
      }
    });
  });

  describe('GET /subscribe/customers/{customer_uid} - Iamporter.getSubscription()', function () {
    it('should success to view a subscription information when billing key is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return expect(iamporter.getSubscription()).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail to view a subscription information with non-existent billing key', function () {
      return expect(iamporter.getSubscription('iamporter-test-uid')).to.eventually
        .rejectedWith(IamporterError, /등록된 정보를 찾을 수 없습니다./);
    });
  });

  describe('DELETE /subscribe/customers/{customer_uid} - Iamporter.deleteSubscription()', function () {
    it('should success to delete a subscription information when billing key is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return expect(iamporter.deleteSubscription()).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail to delete a non-existent billing key', function () {
      return expect(iamporter.deleteSubscription('iamporter-test-uid')).to.eventually
        .rejectedWith(IamporterError, /등록된 정보를 찾을 수 없습니다./);
    });
  });
});
