
/*******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo
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
  app.post("/post", function (req, res) {
    let myBody = req.body || {};
    res.status(200).send(myBody);
  });
  app.post("/post-json", function (req, res) {
    let myBody = req.body || {};
    res.status(200).json(myBody);
  });
  app.post("/post-form-data", function (req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
      console.log("fields => ", fields);
      console.log("files => ", files);
      res.status(200).json({fields: fields, files: files});
    });
  });
  app.put("/put", function (req, res) {

  });
  app.put("/put-json", function (req, res) {

  });
  app.put("/put-form-data", function (req, res) {

  });
  app.delete("/delete", function (req, res) {

  });
  app.delete("/delete-json", function (req, res) {

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
    "POST - multipart/form-data", 
    function (done) {
       let myBody = {
        name: "yahc",
        description: "Yet Another Http Client",
        version: "1.0.0"
      };
      let uploadFile = fs.createReadStream(__dirname +'/upload/upload.txt');
      HttpClient.post({
        url: "http://" + host + ":" + port + "/post-form-data",
        headers: {},
        qs: {},
        encType: HttpClient.ENC_TYPES.MULTIPART_FORM_DATA,
        isJson: true,
        body: myBody,
        timeout: HttpClient.DEFAULT_TIMEOUT,
        files: [uploadFile, {attach: uploadFile}]
      })
      .then((response) => {
        //expect(response.body).toEqual(myBody);
        expect(response.statusCode).toEqual(200);
        expect(response.headers).not.toBeUndefined();
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).toBeUndefined();
        done();
      });  
    }
  );

  it(
    "PUT - application/x-www-form-urlencoded", 
    function (done) {
      done();
    }
  );

  it(
    "PUT -  application/x-www-form-urlencoded - json", 
    function (done) {
      done();
    }
  );

  it(
    "PUT - multipart/form-data", 
    function (done) {
      done();
    }
  );

  it(
    "DELETE - application/x-www-form-urlencoded", 
    function (done) {
      done();
    }
  );

  it(
    "DELETE - application/x-www-form-urlencoded - json", 
    function (done) {
      done();
    }
  );

});
