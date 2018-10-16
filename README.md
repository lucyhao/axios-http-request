## axios-http-request

Using axios.create() to cancel request when set params `cancelMultiple: true` (see the example below).

When set `cancelMultiple`, it will cancel the duplicate request unless the request is responsed. Especially for the sumbit feature(we don't want the user request more than once when they click the submit button and such features).

#### How to use:

* step1

```shell
npm install axios-http-request --save
```
* step2

```javascript

import server from 'axios-http-request';

//post request
server.request({
    url: 'http://yourapi',
    method: 'POST',
    data: {
        //your data
    },
    headers: {
        //your headers
    },
    cancelMultiple: true
}).then((res) => {

}).catch((err) => {

})

//get request
server.request({
    url: 'yourapi',
    method: 'GET'
}).then((res) => {
    //res
}).catch((err) => {
    //err
})
```
