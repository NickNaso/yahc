# yahc
Yet Another Http Client

**Yet Another Http Client** is a small client side HTTP request library. The 
purpose is to permit to make http request with simplicity.

## Installation
If you want use **yahc** you have to install it. There are two methods to do 
that:

n your package.json add the following item:
```json
"yahc": "version"
```
then digit:
```console
npm install
```
**Example**:
```json
"yahc": "*" for the latest version
"yahc": "1.0.0" for the version 1.0.0
```

**OR**

launch this command:
```console
npm install yahc --save
```
## Simple  use

To start using **yahc** you import it in you project the to make request use one
of its method **.get()**, **.post()**, **put()** or **delete()**. You can
understand that only GET, POST, PUT, DELETE HTTP VERBS are permitted.  

```javascript
'use strict';

const HttpClient = require('yahc');

HttpClient.get({
  url: "YOUR URL",
  headers: {},
  qs: {},
  encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
  isJson: false,
  timeout: HttpClient.DEFAULT_TIMEOUT
})
.then((response) => {
  // Do something with response
  console.log(response);  
})
.catch((err) => {
  // Do something with error response
  console.error(err); 
});  
```

## Headers
Every method of yahc allow you to set header of the request. In particular every
take in input an objet parameter **headers** that is an object with key value
representation of the header request.

#### Example:
```javascript
'use strict';

const HttpClient = require('yahc');

HttpClient.get({
  url: "YOUR URL",
  // HERE YOUR KEY VALUE PAIRS FOR headers
  headers: {
    Authorization: "Basic "+ "myUsername:myPassword".toString('base64')
  },
  qs: {},
  encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
  isJson: false,
  timeout: HttpClient.DEFAULT_TIMEOUT
})
.then((response) => {
  // Do something with response
  console.log(response);  
})
.catch((err) => {
  // Do something with error response
  console.error(err); 
});  
```

