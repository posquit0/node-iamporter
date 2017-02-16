'use strict';

const { expect } = require('chai');
const { Iamporter, IamporterError } = require('../');

describe('Certification', function () {
  let iamporter;

  beforeEach(function () {
    iamporter = new Iamporter();
  });

  describe('GET /certifications/{imp_uid} - Iamporter.getCertification()', function () {
    it('should success to view a SMS certification when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return expect(iamporter.getCertification()).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail to view a SMS certification with non-existent uid', function () {
      return expect(iamporter.getCertification('iamporter-test-imp-uid')).to.be.fulfilled
        .then((res) => {
          expect(res.message, 'res.message').to.equal('인증결과가 존재하지 않습니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });

  describe('DELETE /certifications/{imp_uid} - Iamporter.deleteCertification()', function () {
    it('should success to delete a SMS certification when uid is valid');

    it('should fail when given API token is invalid', function () {
      iamporter.token = 'invalid-token';
      iamporter.expireAt = Math.floor(Date.now() / 1000) + 5000;

      return expect(iamporter.deleteCertification()).to.eventually
        .rejectedWith(IamporterError, '아임포트 API 인증에 실패하였습니다.');
    });

    it('should fail to delete a non-existent SMS certification', function () {
      return expect(iamporter.deleteCertification('iamporter-test-imp-uid')).to.be.fulfilled
        .then((res) => {
          expect(res.message, 'res.message').to.equal('인증결과가 존재하지 않습니다.');
          expect(res.data, 'res.data').to.be.null;
        });
    });
  });
});
