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
   * @description This method is a generator with the responsibility to handle
   * all GET requests performed by the rest client.
   * @param {object} options Object that contains all parameters for GET generator
   * method.
   * @param {string} [options.url = null] Url is a string represent the uri of the
   * requested resource.
   * @param {object} [options.headers = null] Headers is a set of key - value of all
   * HTTP headers present in the request.
   * @param {object} [options.qs = null] Query string is a set of key - value of all
   * query parameter in the request.
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @param {boolean} [options.isJson = true] This parameter adds Content-type
   * application/json header and additionally the response will be automatically
   * parsed as JSON.
   * @throws {ResponseError}
   * @throws {RestClientError}
   * @return {object} This method return an object that represent the server
   * response about the requested resource.
   */
  get({url = null, headers = null, qs = null, 
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, isJson = true}) {
    // TODO
    return co(yahc.POST({

        }
      )
    );
  },

  /**
   * @description This method is a generator with the responsibility to handle
   * all POST requests performed by the rest client.
   * @param {object} options Object that contains all parameters for POST generator
   * method.
   * @param {string} [options.url = null] Url is a string represent the uri of the
   * requested resource.
   * @param {object} [options.headers = null] Headers is a set of key - value of all
   * HTTP headers present in the request.
   * @param {object} [options.qs = null]  Query string is a set of key - value of all
   * query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} options.encType = application/x-www-form-urlencoded This
   * parameter is a string represent the encoding type for the request.
   * @param {Array} [options.files = []] Array of files to upload to the server.
   * @throws {RestClientError}
   * @throws {ResponseError}
   * @return {object} This method return an object that represent the server
   * response about the requested resource.
   */
  post({url = null, headers = null, qs = null, body = null, 
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, isJson = true, files =[]}) {
    // TODO
    return co(yahc.POST({

        }
      )
    );
  },
 
  /**
   * @description This method is a generator with the responsibility to handle
   * all PUT requests performed by the rest client.
   * @param {object} options Object that contains all parameters for PUT generator
   * method.
   * @param {string} [options.url = null] Url is a string represent the uri of the
   * requested resource.
   * @param {object} [options.headers = null] Headers is a set of key - value of all
   * HTTP headers present in the request.
   * @param {object} [options.qs = null]  Query string is a set of key - value of all
   * query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @param {Array} [options.files = []] Array of files to upload to the server.
   * @throws {RestClientError}
   * @throws {ResponseError}
   * @return {object} This method return an object that represent the server
   * response about the requested resource.
   */
  put({url = null, headers = null, qs = null, body = null,
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, isJson = true, files =[]}) {

      return co(yahc.POST({
            url: url,
            headers: headers
          }
        )
      );

  },
  
  /**
   * @description This method is a generator with the responsibility to handle
   * all DELETE requests performed by the rest client.
   * @param {object} options Object that contains all parameters for PUT generator
   * method.
   * @param {string} [options.url = null] Url is a string represent the uri of the
   * requested resource.
   * @param {object} [options.headers = null] Headers is a set of key - value of all
   * HTTP headers present in the request.
   * @param {object} [options.qs = null]  Query string is a set of key - value of all
   * query parameter in the request.
   * @param {object} [options.body = null]
   * @param {string} [options.encType = application/x-www-form-urlencoded] This
   * parameter is a string represent the encoding type for the request.
   * @throws {RestClientError}
   * @throws {ResponseError}
   * @return {object} This method return an object that represent the server
   * response about the requested resource.
   */
  delete({url = null, headers = null, qs = null, body = null,
    encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, isJson = true}) {
    // TODO
    return co(yahc.DELETE({

        }
      )
    );
  }

};