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
Every method of **yahc** allow you to set header of the request. In particular 
every take in input an objet parameter **headers** that is an object with key 
value representation of the header request.

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
default timeout through the constant DEFAULT_TIMEOUT. Remember that the value
of timeout for the request must be expressed in milliseconds (ms).

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

## Querystring
Every method of **yahc** allow you to set querystring of the request. In 
particular every take in input an objet parameter **qs** that is an object with
key value representation of the querystring for the request.

#### Example

```javascript
'use strict';

const HttpClient = require('yahc');

HttpClient.get({
  url: "YOUR URL",
  headers: {},
  // HERE YOUR KEY VALUE PAIRS FOR quesrystring
  qs: {
    q: "yahc"
  },
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
## isJson 
The parameter **isJson** is common for all method of **yahc** and  if setted to 
true the value "Content-type: application/json" will be added to the request 
header and the server body response will be parsed as JSON.  

## Response
When making request you obtain a response from the server. Tha response matches
the requested resource or an error. **yahc** structrude the object response in
three parts:
* **haders** - Contains the headers of the server response
* **body** - Contains the body of the server response
* **statusCode** - Represent the HTTP status code for the server response

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
  isJson: true,
  timeout: timeout
})
.then((response) => {
  // Do something with response
  console.log(response);
  // OUTPUT:
  /*
  { 
    headers: {
      'x-powered-by': 'Express',
      'content-type': 'application/json; charset=utf-8',
      'content-length': '53',
      etag: 'W/"35-qoJ3nLnfyzCPwauBZcdTpQ"',
      date: 'Mon, 03 Oct 2016 00:54:28 GMT',
      connection: 'close'
    },
    body: { message: 'Come up to meet you, tell you I\'m sorry' },
    statusCode: 200
  }
  */
})
.catch((err) => {
  // Do something with error response
  console.error(err); 
});  
``` 

If the server response contain one of the HTTP error (for more info see:
[HTTP ERRORS](https://www.npmjs.com/package/error-types)) **yahc** throw a
ResponseError an object that represent the error and internally contain the 
server response.

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
  isJson: true,
  timeout: timeout
})
.then((response) => {
  // Do something with response
  console.log(response);
})
.catch((err) => {
  // Do something with error response
  console.error(err.response); 
  console.error(err.message);
  // OUTPUT:
  /*
  { 
    headers: {
      'x-powered-by': 'Express',
      'content-type': 'application/json; charset=utf-8',
      'content-length': '53',
      etag: 'W/"35-qoJ3nLnfyzCPwauBZcdTpQ"',
      date: 'Mon, 03 Oct 2016 00:54:28 GMT',
      connection: 'close'
    },
    body: { message: 'Come up to meet you, tell you I\'m sorry' },
    statusCode: 200
  }
  */
});  
```
## Make request
**Yet Another Http Client** allow make http request with simplicity. The 
supported HTTP verbs are:

* **GET** - .get() method
* **POST** - .post() method
* **PUT** - .put() method
* **DELETE** - .delete() method

## GET
HTTP GET request is very simple with **yahc** you just call the method **get**
and set the following parameter:
* **url** - Represent the url / uri of the requested resource
* **headers** - Headers for the request. Object that contain key value for the
headers.
* **qs** - Querystring for the reuqest. Object that contain key value for the
querystring.
* **encType** - Encoding for the request. Only  application/x-www-form-urlencoded
is allowed for get request.
* **isJson** - true / false. Setted true the value "Content-type: application/json"
will be added to the request header and the server body response will be parsed
as JSON.
* **timeout** - Number of milliseconds after that the client return timeout error

#### Example 

```javascript
'use strict';

const HttpClient = require('yahc');

// use timeout to  make request using yahc
HttpClient.get({
  url: "YOUR URL",
  headers: {
    Authorization: "Basic "+ "myUsername:myPassword".toString('base64')
  },
  qs: {
    q: "http client"
  },
  encType: HttpClient.X_WWW_FORM_URLENCODED,
  isJson: true,
  timeout: 7000
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
## POST e PUT
HTTP POST or PUT request is very simple with **yahc** you just call the method 
**post** or **put** and set the following parameter:
* **url** - Represent the url / uri of the requested resource
* **headers** - Headers for the request. Object that contain key value for the
headers.
* **qs** - Querystring for the reuqest. Object that contain key value for the
querystring.
* **encType** - Encoding for the request.
* **isJson** - true / false. Setted true the value "Content-type: application/json"
will be added to the request header and the server body response will be parsed
as JSON.
* **body** - The body for the http request. It's an object that contain key 
value for the body.
* **timeout** - Number of milliseconds after that the client return timeout error

#### Example 

```javascript
'use strict';

const HttpClient = require('yahc');

// use timeout to  make request using yahc
HttpClient.post({
  url: "YOUR URL",
  headers: {
    Authorization: "Basic "+ "myUsername:myPassword".toString('base64')
  },
  qs: {
    q: "http client"
  },
  encType: HttpClient.X_WWW_FORM_URLENCODED,
  isJson: true,
  timeout: 7000,
  body: {
    ping: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
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
## POST e PUT (Upload file)
In case you want to upload one or more file you need to call **post** or **put**
method with encType setted to multipart/form-data and the parameter files that
represent an array of files or files representation that you want to upload on 
th server. Post and put parameter in case of upload:
* **url** - Represent the url / uri of the requested resource
* **headers** - Headers for the request. Object that contain key value for the
headers.
* **qs** - Querystring for the reuqest. Object that contain key value for the
querystring.
* **encType** - Encoding for the request. In case of file upload it have to be
setted to multpart/form-data
* **isJson** - true / false. Setted true the value "Content-type: application/json"
will be added to the request header and the server body response will be parsed
as JSON.
* **body** - The body for the http request. It's an object that contain key 
value for the body.
* **timeout** - Number of milliseconds after that the client return timeout error
* **files** - This parameter represent the list of file you want to upload. It 
is an array and its element must be a Buffer a Readable stream or object with this
form {name: "myFieldName", file: "Buffer or Readable stream}

#### Example

```javascript
let myBody = {
  name: "yahc",
  description: "Yet Another Http Client",
  version: "1.0.0"
};
let uploadFile = fs.createReadStream(__dirname +'YOUR PATH');
HttpClient.post({
  url: "YOUR URL",
  headers: {},
  qs: {},
  encType: HttpClient.ENC_TYPES.MULTIPART_FORM_DATA,
  isJson: true,
  body: myBody,
  timeout: HttpClient.DEFAULT_TIMEOUT,
  files: [uploadFile, uploadFile, {name: "myFile", file: uploadFile}]
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
## DELETE
HTTP DELETE request is very simple with **yahc** you just call the method 
**delete** and set the following parameter:
* **url** - Represent the url / uri of the requested resource
* **headers** - Headers for the request. Object that contain key value for the
headers.
* **qs** - Querystring for the reuqest. Object that contain key value for the
querystring.
* **encType** - Encoding for the request. Only  application/x-www-form-urlencoded
is allowed for get request.
* **isJson** - true / false. Setted true the value "Content-type: application/json"
will be added to the request header and the server body response will be parsed
as JSON.
* **body** - The body for the http request. It's an object that contain key 
value for the body.
* **timeout** - Number of milliseconds after that the client return timeout error

#### Example 

```javascript
'use strict';

const HttpClient = require('yahc');

// use timeout to  make request using yahc
HttpClient.delete({
  url: "YOUR URL",
  headers: {
    Authorization: "Basic "+ "myUsername:myPassword".toString('base64')
  },
  qs: {
    q: "http client"
  },
  encType: HttpClient.X_WWW_FORM_URLENCODED,
  isJson: true,
  body: {
    ping: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
  timeout: 7000
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



