
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

/**
 * Class representing an error thrown in case of error response
 * @class
 */
class ResponseError extends Error {
  /**
   * Create a ResponseError
   * @param {string} message Error message for response
   * @param {object} [response = null] Object represent server response
   * @constructor
   */
  constructor(message, response = null) {
    super(message);
    this.name = 'ResponseError';
    this.response = response;
  }
}
/**
 * Response error module
 * @module errors/ResponseError
 */
module.exports = ResponseError;