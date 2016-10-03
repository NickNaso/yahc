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

#### Example

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
Every method of **yahc** allow you to set header of the request. In particular every
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

## encType 
Every method of **yahc** has encType parameter which represent the encoding 
type used by **yahc** to send data to the server. In general there are two
possible choice for **encType**:
* application/x-www-form-urlencoded - GET - POST - PUT - DELETE
* multipart/form-data - POST - PUT

The library expose these value using constant so you can set it using these 
constant as in the example reported below:
#### Example

```javascript
'use strict';

const HttpClient = require('yahc');

// get application/x-www-form-urlencoded
let urlencode = HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED;

// get multipart/form-data
let formdata = HttpClient.ENC_TYPES.MULTIPART_FORM_DATA;

// use urlencode or formdata to make request using yahc
HttpClient.get({
  url: "YOUR URL",
  headers: {},
  qs: {},
  encType: urlencode,
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

## Timeout
Sometimes the server for which you make a request coul be not available so after
some period of times you get a timeout erro the server bot able to give you a 
valid response after the specified time. Default timeout parameter is setted to
15000 ms, but you free to change that value. **yahc** expose the value of 
default timeout through the constant DEFAULT_TIMEOUT. 

#### Example

```javascript
'use strict';

const HttpClient = require('yahc');

// get default timeout
let timeout = HttpClient.DEFAULT_TIMEOUT;

// you can set your preferred timeout in ms
timeout = 5000;

// use timeout to  make request using yahc
HttpClient.get({
  url: "YOUR URL",
  headers: {},
  qs: {},
  encType: urlencode,
  isJson: false,
  timeout: timeout
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
  



