<h1 align="center">
  <a href="https://github.com/posquit0/node-iamporter" title="Iamporter.js">
    <img alt="Iamporter.js" src="https://avatars3.githubusercontent.com/u/11437969" width="180px" height="180px" />
  </a>
  <br />
  Iamporter
</h1>

<p align="center">
  A REST API client for I'mport
</p>

<div align="center">
  <a href="https://circleci.com/gh/posquit0/node-iamporter">
    <img alt="CircleCI" src="https://circleci.com/gh/posquit0/node-iamporter.svg?style=shield" />
  </a>
  <a href="https://coveralls.io/github/posquit0/node-iamporter">
    <img src="https://coveralls.io/repos/github/posquit0/node-iamporter/badge.svg" alt='Coverage Status' />
  </a>
  <a href="https://badge.fury.io/js/iamporter">
    <img alt="npm version" src="https://badge.fury.io/js/iamporter.svg" />
  </a>
  <a href="https://www.npmjs.com/package/iamporter">
    <img alt="npm" src="https://img.shields.io/npm/dt/iamporter.svg" />
  </a>
  <a href="https://david-dm.org/posquit0/node-iamporter">
    <img alt="npm" src="https://img.shields.io/david/posquit0/node-iamporter.svg?style=flat-square" />
  </a>
  <a href="https://opensource.org/licenses/mit-license.php">
    <img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103" />
  </a>
  <a href="https://github.com/ellerbrock/open-source-badge/">
    <img alt="Open Source Love" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" />
  </a>
</div>

<br />

**Iamporter**는 [아임포트](http://iamport.kr/)에서 제공하는 REST API를 쉽게 활용하기 위하여 작성된 Node.js 클라이언트 입니다.

- 아임포트는 국내 PG사와의간편한 연동을 제공하는 서비스입니다.
- 이용 중 발생한 문제에 대하여 책임지지 않습니다.
- 최초 작성은 자동차 렌트 플랫폼 [CARPLAT](https://www.carplat.co.kr)에서 사용하기 위하여 작성되었습니다.

## <a name="features">Features

- Written in ES6 Syntax
- [Promise](http://www.html5rocks.com/ko/tutorials/es6/promises/) Support
- Exception Handling with a custom error class `IamporterError`


## <a name="installation">Installation

```bash
$ npm install iamporter
```


## <a name="specification">Specification

- 모든 API 요청은 Promise를 반환합니다.

### Fulfilled 

- API 요청이 성공적으로 수행된 경우 다음과 같은 형식의 데이터를 반환합니다.

```js
{
  "status": 200, // HTTP STATUS CODE
  "message": "", // 아임포트 API 응답 메시지 혹은 Iamporter 정의 메시지
  "data": {}, // 아임포트 API 응답 데이터
  "raw": {} // 아임포트 API RAW DATA
}
```

### Rejected

- API 요청을 성공적으로 수행하지 못한 경우 항상 `IamporterError` 에러를 반환합니다.

```js
iamporter.paySubscription(...)
  .catch((err) => {
    console.log(err.status); // HTTP STATUS CODE
    console.log(err.message); // 아임포트 API 응답 메시지 혹은 Iamporter 정의 메시지
    console.log(err.data); // 아임포트 API 응답 데이터
    console.log(err.raw); // 아임포트 API RAW DATA
  });
```


## <a name="usage">Usage

### Import & Create an Instance

- `iamporter` 패키지는 `Iamporter`와 `IamporterError` 두 클래스를 제공합니다.

```node
const { Iamporter, IamporterError } = require('iamporter');

// For Testing (테스트용 API KEY와 SECRET 기본 설정)
const iamporter = new Iamporter();

// For Production
const iamporter = new Iamporter({
  apiKey: 'YOUR_API_KEY',
  secret: 'YOUR_SECRET'
});
```

### API Token

- `iamporter`는 API 요청 전에 API 토큰의 유효성을 확인 후 자동 발급/갱신하므로 직접 토큰 API를 호출할 필요가 없습니다.

```node
// 인스턴스 생성 시 설정한 API KEY와 SECRET
iamporter.getToken()
  .then(...)

// 토큰 생성 시 사용될 API KEY와 SECRET 직접 지정
iamporter.getToken('API_KEY', 'SECRET')
  .then(...)
```

### Subscription

- 정기 구독(Subscription)형 서비스 등에 이용할 수 있는 빌링키를 관리합니다.

```node
// 빌링키 생성
iamporter.createSubscription({
  'customer_uid': 'test_uid',
  'card_number': '1234-1234-1234-1234',
  'expiry': '2021-11',
  'birth': '620201',
  'pwd_2digit': '99'
}).then(result => {
  console.log(result);
}).catch(err => {
  if (err instanceof IamporterError)
    // Handle the exception
});

// 빌링키 조회
iamporter.getSubscription('test_uid')
  .then(...)

// 빌링키 삭제
iamporter.deleteSubscription('test_uid')
  .then(...)

// 비인증 결제 (빌링키 이용)
iamporter.paySubscription({
  'customer_uid': 'test_uid',
  'merchant_uid': 'test_billing_key',
  'amount': 50000
}).then(result => {
    console.log(result);
}).catch(err => {
  if (err instanceof IamporterError)
    // Handle the exception
});
```

### Onetime Payment

- 빌링키를 생성하지 않아도 신용카드 정보만으로 간편 결제를 할 수 있습니다.

```node
// Onetime 비인증 결제
iamporter.payOnetime({
  'merchant_uid': 'merchant_1448280088556',
  'amount': 5000,
  'card_number': '1234-1234-1234-1234',
  'expiry': '2021-12',
  'birth': '590912',
  'pwd_2digit': '11'
}).then(result => {
    console.log(result);
}).catch(err => {
  if (err instanceof IamporterError)
    // Handle the exception
});

// 해외카드 비인증 결제
iamporter.payForeign({
  'merchant_uid': 'merchant_1448280088556',
  'amount': 5000,
  'card_number': '1234-1234-1234-1234',
  'expiry': '2021-12',
}).then(result => {
    console.log(result);
}).catch(err => {
  if (err instanceof IamporterError)
    // Handle the exception
});
```

### Cancel the Payment

- 아임포트 고유 아이디 혹은 상점 고유 아이디로 결제 취소가 가능합니다.
- 부분 결제 취소 또한 지원됩니다.

```node
// 아임포트 고유 아이디로 결제 취소
iamporter.cancelByImpUid('imp_448280090638')
  .then(...)

// 상점 고유 아이디로 결제 취소
iamporter.cancelByMerchantUid('merchant_1448280088556')
  .then(...)

// 상점 고유 아이디로 부분 결제 취소
iamporter.cancelByMerchantUid('merchant_1448280088556', {
  'amount': 2500,
  'reason': '예약 변경'
}).then(...)

// 결제 취소 후 계좌 환불
iamporter.cancel({
  'imp_uid': 'imp_448280090638',
  'reason': '제품 상태 불량',
  'refund_holder': '홍길동',
  'refund_bank': '03',
  'refund_account': '056-076923-01-017'
).then(...)
```

### Find the Payments

- 아임포트에서는 아임포트 고유 아이디(ImpUid)와 상점 고유 아이디(MerchantUid)로 결제정보 조회가 가능합니다.

```node
// 아임포트 고유 아이디로 결제정보 조회
iamporter.findByImpUid('imp_448280090638')
  .then(...)

// 상점 고유 아이디로 결제정보 조회
iamporter.findByMerchantUid('merchant_1448280088556')
  .then(...)

// 상점 고유 아이디로 결제정보 목록 조회
iamporter.findAllByMerchantUid('merchant_1448280088556')
  .then(...)

// 결제 상태로 결제정보 목록 조회(status: ['all', 'ready', 'paid', 'cancelled', 'failed'])
iamporter.findAllByStatus('paid')
  .then(...)
```

### Prepared Payment

- 아임포트에서는 결제 건에 대한 사전 정보 등록 및 검증을 할 수 있습니다.

```node
// 결제 예정금액 사전 등록
iamporter.createPreparedPayment({
  'merchant_uid': 'merchant_1448280088556',
  'amount', '128900'
}).then(...)

// 결제 예정금액 조회
iamporter.getPreparedPayment('merchant_1448280088556')
  .then(...)
```

### Certifications

- 아임포트에서는 SMS 본인인증 결과를 조회/삭제할 수 있습니다.

```node
// 아임포트 고유 아이디로 SMS 본인인증 결과 조회
iamporter.getCertification('imp_448280090638')
  .then(...)

// 아임포트 고유 아이디로 SMS 본인인증 결과 삭제
iamporter.deleteCertification('imp_448280090638')
  .then(...)
```

### VBanks

- 아임포트에서는 PG 결제화면 없이 API 만으로 가상계좌 발급이 가능합니다.

```node
// 가상계좌 발급
iamporter.createVbank({
  'merchant_uid': 'merchant_1448280088556',
  'amount': '128900',
  'vbank_code': '03',
  'vbank_due': 1485697047,
  'vbank_holder': 'PLAT Corp'
}).then(...)
```


## <a name="links">Links

- [**아임포트**](http://www.iamport.kr/)
- [**아임포트 API**](https://api.iamport.kr/)
- [**아임포트 관리자**](https://admin.iamport.kr/)
- [**아임포트 매뉴얼**](http://www.iamport.kr/manual/)


## <a name="contact">Contact

If you have any questions, feel free to join me at [`#posquit0` on Freenode](irc://irc.freenode.net/posquit0) and ask away. Click [here](https://kiwiirc.com/client/irc.freenode.net/posquit0) to connect.


## <a name="license">License

- [MIT](https://github.com/posquit0/node-iamporter/blob/master/LICENSE)
