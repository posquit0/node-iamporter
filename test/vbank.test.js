'use strict';

const _ = require('lodash');
const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Vbank', function () {
  let iamporter;

  beforeEach(function () {
    iamporter = new Iamporter();
  });

  describe('POST /vbanks - Iamporter.createVbank()', function () {
    it('should success to issue a virtual account when parameters are valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'vbank_code': '03',
        'vbank_due': Math.floor(Date.now() / 1000) + 5000,
        'vbank_holder': 'PLAT Corp'
      };

      return expect(iamporter.createVbank(data)).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail when some parameters are omitted', function* () {
      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'vbank_code': '03',
        'vbank_due': Math.floor(Date.now() / 1000) + 5000,
        'vbank_holder': 'PLAT Corp'
      };

      for (let key of Object.keys(data)) {
        const omitted = _.omit(data, key);
        yield expect(iamporter.createVbank(omitted)).to.eventually
          .rejectedWith(IamporterError, /파라미터 누락:/);
      }
    });

    it('should fail to issue a virtual account without any contract with banks', function () {
      const data = {
        'merchant_uid': 'iamporter-test-merchant-uid',
        'amount': 5000,
        'vbank_code': '03',
        'vbank_due': Math.floor(Date.now() / 1000) + 5000,
        'vbank_holder': 'PLAT Corp'
      };

      return expect(iamporter.createVbank(data)).to.eventually
        .rejectedWith(IamporterError, /계약이 필요합니다./);
    });
  });
});
