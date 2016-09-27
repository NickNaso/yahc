
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
const HttpClient = require('../');

describe("Test yahc", function () {

  // Set express app to test the rest client
  const app = express();
  app
  .use(
    bodyParser
    .json(
      {
        strict: true,
        inflate: true,
        limit: "5mb"
      }
    )
  );
  app
  .use(
    bodyParser
    .urlencoded(
      {
        extended: false,
        inflate: true, 
        limit: "5mb",
        parameterLimit: 1000
      }
    )
  );
  app.get("/get", function (req, res) {

  });
  app.get("/get-json", function (req, res) {

  });
  app.post("/post", function (req, res) {

  });
  app.post("/post-json", function (req, res) {

  });
  app.post("/post-form-data", function (req, res) {

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


  it(
    "GET - application/x-www-form-urlencoded", 
    function (done) {
      done();
    }
  );

  it(
    "GET - application/x-www-form-urlencoded - json", 
    function (done) {
      done();
    }
  );

  it(
    "POST - application/x-www-form-urlencoded", 
    function (done) {
      done();
    }
  );

  it(
    "POST - application/x-www-form-urlencoded - json", 
    function (done) {
      done();
    }
  );

  it(
    "POST - multipart/form-data", 
    function (done) {
      done();
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
