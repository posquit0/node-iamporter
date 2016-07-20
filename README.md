<img src="https://avatars3.githubusercontent.com/u/11437969?v=3&s=200" align="left" width="128px" height="128px"/>

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

```


## <a name="credit">Credit

[**iamport-node-rest-client-nodejs**](https://github.com/iamport/iamport-rest-client-nodejs)의 코드를 참고하여 다시 작성하였습니다.


## <a name="contact">Contact

If you have any questions, feel free to join me at [`#posquit0` on Freenode](irc://irc.freenode.net/posquit0) and ask away. Click [here](https://kiwiirc.com/client/irc.freenode.net/posquit0) to connect.


## <a name="license">License

- Claud D. Park <posquit0.bj@gmail.com>
- [MIT Liense](https://github.com/posquit0/node-iamporter/blob/master/LICENSE)
