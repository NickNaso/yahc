
/*******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo - Mauro Doganieri 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 * Mauro Doganieri <mauro.doganieri@gmail.com>
 ******************************************************************************/

'use strict';

/*!
 * Module dependencies
 */
const bodyParser = require('body-parser');
const express = require('express');
const formidable = require('formidable');
const fs = require('fs-extra');
const http = require('http');
const HttpClient = require('../');

const port = 9999;
const host = "127.0.0.1";

describe("Test yahc", function () {

  // Set express app to test the rest client
  const app = express();
  app.use(bodyParser.json({inflate: true}));
  app.use(bodyParser.urlencoded({extended: false, inflate: true}));
  app.get("/get", function (req, res) {
    res.send("Come up to meet you, tell you I'm sorry");
  });
  app.get("/get-json", function (req, res) {
    res.status(200).json({message: "Come up to meet you, tell you I'm sorry"});
  });
  app.get("/get-json-error", function (req, res) {
    res.status(400).json({message: "Sorry for the error"});
  });
  app.post("/post", function (req, res) {
    let myBody = req.body || {};
    res.status(201).send(myBody);
  });
  app.post("/post-json", function (req, res) {
    let myBody = req.body || {};
    res.status(201).json(myBody);
  });
  app.post("/post-form-data", function (req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
      res.status(201).json({fields: fields, resources: files});
    });
  });
  app.put("/put", function (req, res) {
    let myBody = req.body || {};
    res.status(200).send(myBody);
  });
  app.put("/put-json", function (req, res) {
    let myBody = req.body || {};
    res.status(200).json(myBody);
  });
  app.put("/put-form-data", function (req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
      res.status(200).json({fields: fields, resources: files});
    });
  });
  app.delete("/delete", function (req, res) {
    let myBody = req.body || {};
    res.status(200).send(myBody);
  });
  app.delete("/delete-json", function (req, res) {
    let myBody = req.body || {};
    res.status(200).json(myBody);
  });
  http.createServer(app).listen(9999, '127.0.0.1');

  it(
    "GET - application/x-www-form-urlencoded", 
    function (done) {
      HttpClient.get({
        url: "http://" + host + ":" + port + "/get",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response.body).toBe("Come up to meet you, tell you I'm sorry");
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "GET - application/x-www-form-urlencoded - dynamic call", 
    function (done) {
      HttpClient['get']({ //jshint ignore:line
        url: "http://" + host + ":" + port + "/get",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response.body).toBe("Come up to meet you, tell you I'm sorry");
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "GET - application/x-www-form-urlencoded - json", 
    function (done) {
      HttpClient.get({
        url: "http://" + host + ":" + port + "/get-json",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: true,
        timeout: 3000
      })
      .then((response) => {
        expect(response.body)
        .toEqual({message: "Come up to meet you, tell you I'm sorry"});
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "GET - application/x-www-form-urlencoded - json with error", 
    function (done) {
      HttpClient.get({
        url: "http://" + host + ":" + port + "/get-json-error",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: true,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response).toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err.response.body).toEqual({message: "Sorry for the error"});
        expect(err.response.statusCode).toEqual(400);
        expect(err.response.headers).not.toBeUndefined();
        done();
      });  
    }
  );

  it(
    "POST - application/x-www-form-urlencoded", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.post({
        url: "http://" + host + ":" + port + "/post",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(201);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "POST - application/x-www-form-urlencoded - dynamic call", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient['post']({ //jshint ignore:line
        url: "http://" + host + ":" + port + "/post",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(201);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "POST - application/x-www-form-urlencoded - json", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.post({
        url: "http://" + host + ":" + port + "/post-json",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response.body).toEqual(myBody);
        expect(response.statusCode).toEqual(201);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "POST - multipart/form-data", 
    function (done) {
       let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      let myBodyCopy = JSON.parse(JSON.stringify(myBody));
      let uploadFile = fs.createReadStream(__dirname +'/upload/upload.txt');
      HttpClient.post({
        url: "http://" + host + ":" + port + "/post-form-data",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.MULTIPART_FORM_DATA,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT,
        files: [uploadFile, uploadFile, {name: "myFile", file: uploadFile}]
      })
      .then((response) => {
        expect(response.body.fields).toEqual(myBodyCopy);
        expect(response.body.resources.myFile.name).toEqual('upload.txt');
        for (let file of response.body.resources.files) {
          expect(file.name).toEqual('upload.txt');
        }
        expect(response.statusCode).toEqual(201);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "PUT - application/x-www-form-urlencoded - dynamic call", 
    function (done) {
        let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient['put']({ //jshint ignore:line
        url: "http://" + host + ":" + port + "/put",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });
    }
  );

  it(
    "PUT - application/x-www-form-urlencoded", 
    function (done) {
        let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.put({
        url: "http://" + host + ":" + port + "/put",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });
    }
  );

  it(
    "PUT -  application/x-www-form-urlencoded - json", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.put({
        url: "http://" + host + ":" + port + "/put-json",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response.body).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "PUT - multipart/form-data", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      let myBodyCopy = JSON.parse(JSON.stringify(myBody));
      let uploadFile = fs.createReadStream(__dirname +'/upload/upload.txt');
      HttpClient.put({
        url: "http://" + host + ":" + port + "/put-form-data",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.MULTIPART_FORM_DATA,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT,
        files: [uploadFile, uploadFile, {name: "myFile", file: uploadFile}]
      })
      .then((response) => {
        expect(response.body.fields).toEqual(myBodyCopy);
        expect(response.body.resources.myFile.name).toEqual('upload.txt');
        for (let file of response.body.resources.files) {
          expect(file.name).toEqual('upload.txt');
        }
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "DELETE - application/x-www-form-urlencoded", 
    function (done) {
       let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.delete({
        url: "http://" + host + ":" + port + "/delete",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "DELETE - application/x-www-form-urlencoded - dynamic call", 
    function (done) {
       let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient['delete']({
        url: "http://" + host + ":" + port + "/delete",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: false,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(JSON.parse(response.body)).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "DELETE - application/x-www-form-urlencoded - json", 
    function (done) {
      let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      HttpClient.delete({
        url: "http://" + host + ":" + port + "/delete-json",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT
      })
      .then((response) => {
        expect(response.body).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

});
