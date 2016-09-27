/*******************************************************************************
 * Copyright (c) 2016 Mauro Doganieri - Nicola Del Gobbo
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
 * Mauro Doganieri <mauro.doganieri@gmail.com>
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 ******************************************************************************/

'use strict';

/*!
 * Module dependencies
 */
const co = require('co');
const yahc = require('./yahc');

module.exports = {

  /**
   * @description This object represent all encoding types handled by rest
   * client and specifies how the HTTP request should be encoded.
   * @property {string} X_WWW_FORM_URLENCODED This property indicates
   * to use application/x-www-form-urlencoded as encode type.
   * @property {string} MULTIPART_FORM_DATA This property indicates
   * to use multipart/form-data as encode type.
   */
  ENC_TYPES: yahc.ENC_TYPES,

  /**
   * @description This property represents the max number of seconds in which
   * the client have to receive the response otherwise will throw an error.
   * @public
   */
  DEFAULT_TIMEOUT: yahc.TIMEOUT,

  /**
   * @description This method has the responsibility to handle all GET requests
   * performed by the rest client.
   * @param {object} options Object that contains all parameters for GET method.
   * @param {string} [options.url = null] Url is a string represent the uri of 
   * the request.
   * @param {object} [options.headers = null] Headers is a set of key - value of
   * all HTTP headers present in the request.
   * @param {object} [options.qs = null] Query string is a set of key - value of
   * all query parameter in the request.
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @param {boolean} [options.isJson = true] This parameter adds Content-type
   * application/json header and additionally the response will be automatically
   * parsed as JSON.
   * @param {number} [options.ntries = 1] This parameter represent the number of
   * attempts before to consider the request as failed.
   * @param {number} [options.timeout = 15000] This parameter represent the 
   * number of seconds expressed in millisencods before to consider the request
   * as failed. 
   * @typedef {Promise.<(object|Error)>} Promise
   * @returns Promise The object that represent the server response about the 
   * requested resource(s) in case of resolve, while on reject it return 
   * ResponseError or RestClientError.
   * @public
   */
  get({url = null, 
    headers = null, 
    qs = null, 
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, 
    isJson = true,
    timeout = this.DEFAULT_TIMEOUT, 
    ntries = 1
  }) {
    return co(yahc.GET({
          url: url,
          headers: headers,
          qs: qs,
          encType: encType,
          isJson: isJson,
          timeout: timeout,
          ntries: ntries
        }
      )
    );
  },

  /**
   * @description This method has the responsibility to handle all POST requests
   * performed by the rest client.
   * @param {object} options Object that contains all parameters for POST 
   * method.
   * @param {string} [options.url = null] Url is a string represent the uri of 
   * the requested.
   * @param {object} [options.headers = null] Headers is a set of key - value of
   *  all HTTP headers present in the request.
   * @param {object} [options.qs = null] Query string is a set of key - value of
   * all query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} options.encType = application/x-www-form-urlencoded This
   * parameter is a string represent the encoding type for the request.
   * @param {Array} [options.files = []] Array of files to upload to the server.
   * @param {number} [options.ntries = 1] This parameter represent the number of
   * attempts before to consider the request as failed.
   * @param {number} [options.timeout = 15000] This parameter represent the 
   * number of seconds expressed in millisencods before to consider the request
   * as failed. 
   * @typedef {Promise.<(object|Error)>} Promise
   * @returns Promise The object that represent the server response about the 
   * request in case of resolve, while on reject it return ResponseError or 
   * RestClientError.
   * @public
   */
  post({
    url = null, 
    headers = null, 
    qs = null, 
    body = null, 
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, 
    isJson = true, 
    files =[],
    timeout = this.DEFAULT_TIMEOUT, 
    ntries = 1
  }) {
    return co(yahc.POST({
          url: url,
          headers: headers,
          qs: qs,
          body: body,
          encType: encType,
          isJson: isJson,
          files: files,
          timeout: timeout,
          ntries: ntries
        }
      )
    );
  },
 
  /**
   * @description This method has the responsibility to handle all PUT requests 
   * performed by the rest client.
   * @param {object} options Object that contains all parameters for PUT method.
   * @param {string} [options.url = null] Url is a string represent the uri of 
   * the request.
   * @param {object} [options.headers = null] Headers is a set of key - value of
   * all HTTP headers present in the request.
   * @param {object} [options.qs = null] Query string is a set of key - value of
   * all query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @param {Array} [options.files = []] Array of files to upload to the server.
   * @param {number} [options.ntries = 1] This parameter represent the number of
   * attempts before to consider the request as failed.
   * @param {number} [options.timeout = 15000] This parameter represent the 
   * number of seconds expressed in millisencods before to consider the request
   * as failed. 
   * @typedef {Promise.<(object|Error)>} Promise
   * @returns Promise The object that represent the server response about the 
   * request in case of resolve, while on reject it return ResponseError or 
   * RestClientError.
   * @public
   */
  put({
    url = null, 
    headers = null, 
    qs = null, 
    body = null, 
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, 
    isJson = true, 
    files =[],
    timeout = this.DEFAULT_TIMEOUT, 
    ntries = 1
  }) {
    return co(yahc.PUT({
          url: url,
          headers: headers,
          qs: qs,
          body: body,
          encType: encType,
          isJson: isJson,
          files: files,
          timeout: timeout,
          ntries: ntries
        }
      )
    );
  },
  
  /**
   * @description This method has the responsibility to handle all DELETE 
   * requests performed by the rest client.
   * @param {object} options Object that contains all parameters for PUT method.
   * @param {string} [options.url = null] Url is a string represent the uri of 
   * the request.
   * @param {object} [options.headers = null] Headers is a set of key - value of
   * all HTTP headers present in the request.
   * @param {object} [options.qs = null] Query string is a set of key - value of
   * all query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @param {number} [options.ntries = 1] This parameter represent the number of
   * attempts before to consider the request as failed.
   * @param {number} [options.timeout = 15000] This parameter represent the 
   * number of seconds expressed in millisencods before to consider the request
   * as failed. 
   * @typedef {Promise.<(object|Error)>} Promise
   * @returns Promise The oobject that represent the server response about the 
   * request in case of resolve, while on reject it return ResponseError or 
   * RestClientError.
   * @public
   */
  delete({
    url = null, 
    headers = null, 
    qs = null, 
    body = null,
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED,
    isJson = true,
    timeout = this.DEFAULT_TIMEOUT, 
    ntries = 1
  }) {
    return co(yahc.DELETE({
          url: url,
          headers: headers,
          qs: qs,
          body: body,
          encType: encType,
          isJson: isJson,
          timeout: timeout,
          ntries: ntries 
        }
      )
    );
  }

};