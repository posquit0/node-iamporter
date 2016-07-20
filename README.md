<img src="https://avatars3.githubusercontent.com/u/11437969?v=3&s=200" align="left" width="144px" height="144px"/>

### **Iamporter**
> *A REST API client for I'mport*
[![npm version](https://badge.fury.io/js/iamporter.svg)](https://badge.fury.io/js/iamporter)


<br />

[**Iamporter**](https://github.com/iamport/iamport-rest-client-nodejs)는 [아임포트](http://iamport.kr/)에서 제공하는 REST API를 Node.js에서 쉽게 활용하기 위하여 작성된 클라이언트 모듈입니다.

## <a name="installation">Installation

```bash
$ npm install iamporter
```


## <a name="usage">Usage

- 모든 메소드는 [Promise](http://www.html5rocks.com/ko/tutorials/es6/promises/)를 반환

```node
var iamporter = require('iamporter').createClient({
  apiKey: 'YOUR_API_KEY',
  secret: 'YOUR_SECRET'
});

iamporter.createSubscriber({
  'card_number': '1234-1234-1234-1234',
  'expiry': '2021-11',
  'birth': '620201',
  'pwd_2digit': '99'
}).then(function (result) {
  console.log(result);
}).catch(function (error) {
  console.log(error);
});
```


## <a name="todo">To-do
- [x] [POST  /users/getToken](https://api.iamport.kr/#!/authenticate/getToken)
- [x] [GET   /payments/:imp_uid](https://api.iamport.kr/#!/payments/getPaymentByImpUid)
- [x] [GET   /payments/find/:merchant_uid](https://api.iamport.kr/#!/payments/getPaymentByMerchantUid)
- [ ] [GET   /payments/status/:payment_status](https://api.iamport.kr/#!/payments/getPaymentsByStatus)
- [x] [POST  /payments/cancel](https://api.iamport.kr/#!/payments/cancelPayment)
- [ ] [POST  /payments/prepare](https://api.iamport.kr/#!/payments.validation/preparePayment)
- [ ] [GET   /payments/prepare/:merchant_uid](https://api.iamport.kr/#!/payments.validation/getPaymentPrepareByMerchantUid)
- [x] [POST  /subscribe/payments/onetime](https://api.iamport.kr/#!/subscribe/onetime)
- [x] [POST  /subscribe/payments/foreign](https://api.iamport.kr/#!/)
- [x] [POST  /subscribe/payments/again](https://api.iamport.kr/#!/subscribe/again)
- [ ] [POST   /subscribe/payments/schedule](https://api.iamport.kr/#!/subscribe/schedule)
- [ ] [POST   /subscribe/payments/unschedule](https://api.iamport.kr/#!/subscribe/unschedule)
- [x] [DELETE /subscribe/customers/:customer_uid](https://api.iamport.kr/#!/subscribe.customer/customer_delete)
- [x] [GET    /subscribe/customers/:customer_uid](https://api.iamport.kr/#!/subscribe.customer/customer_view)
- [x] [POST   /subscribe/customers/:customer_uid](https://api.iamport.kr/#!/subscribe.customer/customer_save)


## <a name="credit">Credit

[**iamport-node-rest-client-nodejs**](https://github.com/iamport/iamport-rest-client-nodejs)의 코드를 참고하여 다시 작성하였습니다.


## <a name="contact">Contact

If you have any questions, feel free to join me at [`#posquit0` on Freenode](irc://irc.freenode.net/posquit0) and ask away. Click [here](https://kiwiirc.com/client/irc.freenode.net/posquit0) to connect.


## <a name="license">License

- Claud D. Park <posquit0.bj@gmail.com>
- [MIT Liense](https://github.com/posquit0/node-iamporter/blob/master/LICENSE)
