/*
 * iamporter
 *
 * Author:
 * Claud D. Park <posquit0.bj@gmail.com>
 * http://www.posquit0.com
 *
 * MIT License
 */

'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var r = require('request-promise');


var IAMPORT_HOST = 'https://api.iamport.kr';
var IAMPORT_API_KEY = 'imp_apiKey';
var IAMPORT_SECRET = 'ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f';


function checkRequired(requiredList, form) {
  if (_.isEmpty(requiredList)) return true;

  for (var i = 0; i < requiredList.length; i++)
    if (!(requiredList[ i ] in form)) return false;

  return true;
}

function formatPath(path, params) {
  return _.map(path, function (p) {
    return p[ 0 ] === ':' ? params[ p.slice(1) ] : p;
  });
}

/**
 * Creates a client for Iamport REST API.
 *
 */
function Iamporter(options) {
  if (!(this instanceof Iamporter)) {
    return new Iamporter(options);
  }

  if (_.isEmpty(options)) options = {};

  this._options = {
    host: options.host || IAMPORT_HOST,
    apiKey: options.apiKey || IAMPORT_API_KEY,
    secret: options.secret || IAMPORT_SECRET
  };

  this.token = {};
}

Iamporter.prototype._buildUri = function (path) {
  var host = this._options.host;
  return _.join([host].concat(path), '/');
};

Iamporter.prototype._makeRequest = function (spec, form) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    if (!checkRequired(spec.requiredParams, form))
      return reject(new Error('Required parameters: ' + spec.requiredParams));

    if (!checkRequired(spec.requiredBody, form))
      return reject(new Error('Required body: ' + spec.requiredBody));

    var path = formatPath(
      spec.path, _.pick(form, spec.requiredParams)
    );

    var headers = {
      'User-Agent': 'Node.js Iamporter'
    };

    if (_this.hasValidToken())
      headers[ 'Authorization' ] = _this.token.accessToken;

    var queryOptions = {
      uri: _this._buildUri(path),
      method: spec.method,
      headers: headers,
      encoding: 'utf8',
      json: true
    };

    if (spec.method === 'GET')
      queryOptions.qs = form;
    else
      queryOptions.body = form;

    r(queryOptions)
      .then(function (res) {
        var result = {
          code: res.code,
          message: res.message,
          data: res.response
        };
        if (res.code !== 0)
          reject(result);
        else
          resolve(result);
      })
      .catch(function (res) {
        var error = {
          code: res.error.code,
          message: res.error.message,
          data: res.error.response
        };
        reject(error);
      });
  });
};

Iamporter.prototype._updateToken = function () {
  var _this = this;
  return new Promise(function (resolve, reject) {
    if (!_this.hasValidToken()) {
      _this.getToken(
        _this._options.apiKey, _this._options.secret
      ).then(function (result) {
        var token = {
          accessToken: result.data[ 'access_token' ],
          now: result.data[ 'now' ],
          expiredAt: result.data[ 'expired_at' ]
        };
        _this.token = token;
        resolve();
      }).catch(function (err) {
        reject(err);
      });
    }
    else resolve();
  });
};

Iamporter.prototype.hasValidToken = function () {
  if (_.isEmpty(this.token) || !this.token.expiredAt ||
    this.token.expiredAt <= _.floor(_.now() / 1000))
    return false;

  return true;
};

Iamporter.prototype.getToken = function (apiKey, secret) {
  var spec = {
    method: 'POST',
    path: ['users', 'getToken']
  };
  var form = {
    'imp_key': apiKey,
    'imp_secret': secret
  };

  return this._makeRequest(spec, form);
};

/**
 * 아임포트 고유 아이디로 결제 정보 조회
 * @see {@link https://api.iamport.kr/#!/payments/getPaymentByImpUid}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.findByImpUid = function (impUid) {
  var _this = this;
  var spec = {
    method: 'GET',
    path: ['payments', impUid]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec);
    });
};

/**
 * 상점 고유 아이디로 결제 정보 조회
 * @see {@link https://api.iamport.kr/#!/payments/getPaymentByImpUid}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.findByMerchantUid = function (merchantUid) {
  var _this = this;
  var spec = {
    method: 'GET',
    path: ['payments', 'find', merchantUid]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec);
    });
};

/**
 * 결제취소
 * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
 *
 * @param {Object}
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.cancel = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['payments', 'cancel']
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form);
    });
};

/**
 * 결제취소
 * 아임포트 고유 아이디로 결제취소
 * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.cancelByImpUid = function (impUid, form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['payments', 'cancel']
  };
  var _form = _.merge({ 'imp_uid': impUid }, form);

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, _form);
    });
};

/**
 * 결제취소
 * 상점 고유 아이디로 결제취소
 * @see {@link https://api.iamport.kr/#!/payments/cancelPayment}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.cancelByMerchantUid = function (merchantUid, form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['payments', 'cancel']
  };
  var _form = _.merge({ 'merchant_uid': merchantUid }, form);

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, _form);
    });
};

/**
 * 결제예정금액 사전등록
 * @see {@link https://api.iamport.kr/#!/payments.validation/preparePayment}
 *
 * @param {Object}
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.createPreparedPayment = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['payments', 'prepare'],
    requiredBody: [
      'merchant_uid', 'amount'
    ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form);
    });
};

/**
 * 사전등록된 결제정보 조회
 * @see {@link https://api.iamport.kr/#!/payments.validation/getPaymentPrepareByMerchantUid}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.getPreparedPayment = function (merchantUid) {
  var _this = this;
  var spec = {
    method: 'GET',
    path: ['payments', 'prepare', merchantUid]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec);
    });
};

/**
 * 비인증 결제요청
 * @see {@link https://api.iamport.kr/#!/subscribe/onetime}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.payOnetime = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['subscribe', 'payments', 'onetime' ],
    requiredBody: [
      'merchant_uid', 'amount', 'card_number', 'expiry',
      'birth', 'pwd_2digit'
    ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form)
        .then(function (result) {
          if (result.data.status !== 'paid') {
            var error = {
              code: 1,
              message: result.data[ 'fail_reason' ],
              data: result.data
            };
            return Promise.reject(error);
          }
          else return result;
        });
    });
};

/**
 * 비인증 결제요청
 * @see {@link https://api.iamport.kr/#!/subscribe/again}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.paySubscriber = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['subscribe', 'payments', 'again' ],
    requiredBody: [
      'customer_uid', 'merchant_uid', 'amount'
    ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form)
        .then(function (result) {
          if (result.data.status !== 'paid') {
            var error = {
              code: 1,
              message: result.data[ 'fail_reason' ],
              data: result.data
            };
            return Promise.reject(error);
          }
          else return result;
        });
    });
};

/**
 * 해외카드 결제요청
 */
Iamporter.prototype.payForeign = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['subscribe', 'payments', 'foreign' ],
    requiredBody: [
      'merchant_uid', 'amount', 'card_number', 'expiry'
    ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form)
        .then(function (result) {
          if (result.data.status !== 'paid') {
            var error = {
              code: 1,
              message: result.data[ 'fail_reason' ],
              data: result.data
            };
            return Promise.reject(error);
          }
          else return result;
        });
    });
};

/**
 * 구매자에 대해 빌키 발급 및 저장
 * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_save}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.createSubscriber = function (form) {
  var _this = this;
  var spec = {
    method: 'POST',
    path: ['subscribe', 'customers', ':customer_uid' ],
    requiredParams: ['customer_uid'],
    requiredBody: [
      'card_number', 'expiry', 'birth', 'pwd_2digit'
    ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec, form);
    });
};

/**
 * 구매자의 빌키 정보 조회
 * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_view}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.getSubscriber = function (customerUid) {
  var _this = this;
  var spec = {
    method: 'GET',
    path: ['subscribe', 'customers', customerUid ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec);
    });
};

/**
 * 구매자의 빌키 정보 삭제
 * @see {@link https://api.iamport.kr/#!/subscribe.customer/customer_delete}
 *
 * @returns {promise} json 결제 정보
 * @public
 */
Iamporter.prototype.deleteSubscriber = function (customerUid) {
  var _this = this;
  var spec = {
    method: 'DELETE',
    path: ['subscribe', 'customers', customerUid ]
  };

  return _this._updateToken()
    .then(function () {
      return _this._makeRequest(spec);
    });
};

module.exports = {
  createClient: Iamporter
};
