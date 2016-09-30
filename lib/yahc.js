
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
const fs = require('fs-extra');
const request = require('co-request');
const Readable = require('stream').Readable;
const _ = require('underscore');
const RestClientError = require('./errors').RestClientError;
const ResponseError = require('./errors').ResponseError;
const TimeoutError = require('./errors').TimeoutError;


/**
 * @description This function return a collection of status code error based
 * on type of response (INFORMATIONAL - SUCCESS - REDIRECTION - CLIENT_ERROR
 * - SERVER_ERROR).
 * @param {String} responseType String represent response type.
 * @return {Array} Array or collection of status code relative to specified
 * response type.
 * @private
 */
function _getStatusCodeByResponseType (responseType) {
    return _.map(_.values(responseType), (STATUS_CODE) => {
        return STATUS_CODE.CODE;
    });
}

/**
 * @description This function process the server response
 * @param {object} response Represent the response object come from the server.
 * @return {Array} Array or collection of status codes
 * @private
 */
function _handleHTTPResponse (response, statusCodes) {
    if (statusCodes.find(v =>  v === response.statusCode)) {
        return {
            headers: response.headers || {},
            body: response.body || {},
            statusCode: response.statusCode || 500
        };
    } else {
        throw new ResponseError(
            "Sorry rest client encountered an error in response from the server.",
            {
                headers: response.headers || {},
                body: response.body || {},
                statusCode: response.statusCode || 500
            }
        );
    }
}

/**
 * Rest client module
 * @module yahc
 */
module.exports = {
    
    /**
     * @description This property represents the max number of seconds in which
     * the client have to receive the response otherwise will throw an error.
     * @public
     */
    TIMEOUT: 15000,

    /**
     * @description This object represents the sets of HTTP Status code 
     * information found at
     * @see {@link http://www.ietf.org/assignments/http-status-codes/http-status-codes.xml|ietf.org}
     * @property {object} INFORMATIONAL This object represents a sets of 
     * key - value regard status code indicates a provisional response, 
     * consisting only of the Status-Line and optional headers, and is 
     * terminated by an empty line.
     * @property {object} SUCCESS  This object represents a sets of key - value
     * regard status code indicates that the client's request was successfully
     * received, understood, and accepted.
     * @property {object} REDIRECTION This object represents a sets of 
     * key - value regard status code and indicates that further action needs to
     * be taken by the user agent in order to fulfill the request.
     * @property {object} CLIENT_ERROR This object represents a sets of 
     * key - value regard status code and indicates the cases in which the 
     * client seems to have erred. Except when responding to a HEAD request, the
     * server SHOULD include an entity containing an explanation of the error 
     * situation, and whether it is a temporary or permanent condition. These 
     * status codes are applicable to any request method. User agents SHOULD 
     * display any included entity to the user.
     * @property {object} SERVER_ERROR This object represents a sets of 
     * key - value regard status code and indicates cases in which the server is
     * aware that it has erred or is incapable of performing the request. Except
     * when responding to a HEAD request, the server SHOULD include an entity 
     * containing an explanation of the error situation, and whether it is a 
     * temporary or permanent condition.
     * @public
     */
    STATUS_CODE: {
        // This class of status code indicates a provisional response, 
        // consisting only of the Status-Line and optional headers, and is 
        // terminated by an empty line.
        INFORMATIONAL: {
            CONTINUE: {
                CODE: 100,
                NAME: "Continue"
            },
            SWITCHING_PROTOCOLS: {
                CODE: 101,
                NAME: "Switching Protocols"
            },
            PROCESSING: {
                CODE: 102,
                NAME: "Processing (WebDAV)"
            }
        },
        // This class of status code indicates that the client's request was
        // successfully received, understood, and accepted.
        SUCCESS: {
            OK: {
                CODE: 200,
                NAME: "OK"
            },
            CREATED: {
                CODE: 201,
                NAME: "Created"
            },
            ACCEPTED: {
                CODE: 202,
                NAME: "Accepted"
            },
            NON_AUTHORITATIVE_INFORMATION: {
                CODE: 203,
                NAME: "Non-Authoritative Information"
            },
            NO_CONTENT: {
                CODE: 204,
                NAME: "No Content"
            },
            RESET_CONTENT: {
                CODE: 205,
                NAME: "Reset Content"
            },
            PARTIAL_CONTENT: {
                CODE: 206,
                NAME: "Partial Content"
            },
            MULTI_STATUS_WEBDAV: {
                CODE: 207,
                NAME: "Multi-Status (WebDAV)"
            },
            ALREADY_REPORTED_WEBDAV: {
                CODE: 208,
                NAME: "Already Reported (WebDAV)"
            },
            IM_USED: {
                CODE: 226,
                NAME: "IM Used"
            }
        },
        // This class of status code indicates that further action needs to be
        // taken by the user agent in order to fulfill the request.
        REDIRECTION: {
            MULTIPLE_CHOICES: {
                CODE: 300,
                NAME: "Multiple Choices"
            },
            MOVED_PERMANENTLY: {
                CODE: 301,
                NAME: "Moved Permanently"
            },
            FOUND: {
                CODE: 302,
                NAME: "Found"
            },
            SEE_OTHER: {
                CODE: 303,
                NAME: "See Other"
            },
            NOT_MODIFIED: {
                CODE: 304,
                NAME: "Not Modified"
            },
            USE_PROXY: {
                CODE: 305,
                NAME: "Use Proxy"
            },
            UNUSED: {
                CODE: 306,
                NAME: "Unused"
            },
            TEMPORARY_REDIRECT: {
                CODE: 307,
                NAME: "Temporary Redirect"
            },
            PERMANENT_REDIRECT_EXPERIMENTAL: {
                CODE: 308,
                NAME: "Permanent Redirect (experimental)"
            }
        },
        // The 4xx class of status code is intended for cases in which the 
        // client seems to have erred. Except when responding to a HEAD request,
        // the server SHOULD include an entity containing an explanation of the
        // error situation, and whether it is a temporary or permanent 
        // condition. These status codes are applicable to any request method. 
        // User agents SHOULD display any included entity to the user.
        CLIENT_ERROR: {
            BAD_REQUEST: {
                CODE: 400,
                NAME: "Bad Request"
            },
            UNAUTHORIZED: {
                CODE: 401,
                NAME: "Unauthorized"
            },
            PAYMENT_REQUIRED: {
                CODE: 402,
                NAME: "Payment Required"
            },
            FORBIDDEN: {
                CODE: 403,
                NAME: "Forbidden"
            },
            NOT_FOUND: {
                CODE: 404,
                NAME: "Not Found"
            },
            METHOD_NOT_ALLOWED: {
                CODE: 405,
                NAME: "Method Not Allowed"
            },
            NOT_ACCEPTABLE: {
                CODE: 406,
                NAME: "Not Acceptable"
            },
            PROXY_AUTHENTICATION_REQUIRED: {
                CODE: 407,
                NAME: "Proxy Authentication Required"
            },
            REQUEST_TIMEOUT: {
                CODE: 408,
                NAME: "Request Timeout"
            },
            CONFLICT: {
                CODE: 409,
                NAME: "Conflict"
            },
            GONE: {
                CODE: 410,
                NAME: "Gone"
            },
            LENGTH_REQUIRED: {
                CODE: 411,
                NAME: "Length Required"
            },
            PRECONDITION_FAILED: {
                CODE: 412,
                NAME: "Precondition Failed"
            },
            REQUEST_ENTITY_TOO_LARGE: {
                CODE: 413,
                NAME: "Request Entity Too Large"
            },
            REQUEST_URI_TOO_LONG: {
                CODE: 414,
                NAME: "Request-URI Too Long"
            },
            UNSUPPORTED_MEDIA_TYPE: {
                CODE: 415,
                NAME: "Unsupported Media Type"
            },
            REQUESTED_RANGE_NOT_SATISFIABLE: {
                CODE: 416,
                NAME: "Requested Range Not Satisfiable"
            },
            EXPECTATION_FAILED: {
                CODE: 417,
                NAME: "Expectation Failed"
            },
            I_AM_TEAPOT: {
                CODE: 418,
                NAME: "I'm teapot (RFC 2324)"
            },
            ENHANCE_YOUR_CALM: {
                CODE: 420,
                NAME: "Enhance Your Calm (Twitter)"
            },
            UNPROCESSABLE_ENTITY_WEBDAV: {
                CODE: 422,
                NAME: "Unprocessable Entity (WebDAV)"
            },
            LOCKED_WEBDAV: {
                CODE: 423,
                NAME: "Locked (WebDAV)"
            },
            FAILED_DEPENDENCY_WEBDAV: {
                CODE: 424,
                NAME: "Failed Dependency (WebDAV)"
            },
            RESERVED_FOR_WEBDAV: {
                CODE: 425,
                NAME: "Reserved for WebDAV"
            },
            UPGRADE_REQUIRED: {
                CODE: 426,
                NAME: "Upgrade Required"
            },
            PRECONDITION_REQUIRED: {
                CODE: 428,
                NAME: "Precondition Required"
            },
            TOO_MANY_REQUESTS: {
                CODE: 429,
                NAME: "Too Many Requests"
            },
            REQUEST_HEADER_FIELDS_TOO_LARGE: {
                CODE: 431,
                NAME: "Request Header Fields Too Large"
            },
            NO_RESPONSE: {
                CODE: 444,
                NAME: "No Response (Nginx)"
            },
            RETRY_WITH: {
                CODE: 449,
                NAME: "Retry With (Microsoft)"
            },
            BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS: {
                CODE: 450,
                NAME: "Blocked by Windows Parental Controls (Microsoft)"
            },
            UNAVAILABLE_FOR_LEGAL_REASON: {
                CODE: 451,
                NAME: "Unavailable For Legal Reason"
            },
            CLIENT_CLOSED_REQUEST: {
                CODE: 499,
                NAME: "Client Closed Request (Nginx)"
            }
        },
        // Response status codes beginning with the digit "5" indicate cases in
        // which the server is aware that it has erred or is incapable of 
        // performing the request. Except when responding to a HEAD request, the
        // server SHOULD include an entity containing an explanation of the 
        // error situation, and whether it is a temporary or permanent 
        // condition.
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: {
                CODE: 500,
                NAME: "Internal Server Error"
            },
            NOT_IMPLEMENTED: {
                CODE: 501,
                NAME: "Not Implemented"
            },
            BAD_GATEWAY: {
                CODE: 502,
                NAME: "Bad Gateway"
            },
            SERVICE_UNAVAILABLE: {
                CODE: 503,
                NAME: "Service unavailable"
            },
            GATEWAY_TIMEOUT: {
                CODE: 504,
                NAME: "Gateway Timeout"
            },
            HTTP_VERSION_NOT_SUPPORTED: {
                CODE: 505,
                NAME: "HTTP Version Not Supported"
            },
            VARIANT_ALSO_NEGOTIATES: {
                CODE: 506,
                NAME: "Variant Also Negotiates (Experimental)"
            },
            INSUFFICIENT_STORAGE_WEBDAV: {
                CODE: 507,
                NAME: "Insufficient Storage (WebDAV)"
            },
            LOOP_DETECTED_WEBDAV: {
                CODE: 508,
                NAME: "Loop Detected (WebDAV)"
            },
            BANDWIDTH_LIMIT_EXCEEDED: {
                CODE: 509,
                NAME: "Bandwidth Limit Exceeded (Apache)"
            },
            NOT_EXTENDED: {
                CODE: 510,
                NAME: "Not Extended"
            },
            NETWORK_AUTHENTICATION_REQUIRED: {
                CODE: 511,
                NAME: "Network Authentication Required"
            },
            NETWORK_READ_TIMEOUT_ERROR: {
                CODE: 598,
                NAME: "Network read timeout error"
            },
            NETWORK_CONNECT_TIMEOUT_ERROR: {
                CODE: 599,
                NAME: "Network connect timeout error"
            }
        }
    },

    /**
     * @description This method return an array or collection of all 
     * INFORMATIONAL status code.
     * @return {Array} Array or collection of all status code that could be 
     * grouped as INFORMATIONAL.
     * @public
     */
    getInformationalStatusCode() {
        return _getStatusCodeByResponseType(this.STATUS_CODE.INFORMATIONAL);
    },

    /**
     * @description This method return an array or collection of all SUCCESS 
     * status code.
     * @return {Array} Array or collection of all status code that could be 
     * grouped as SUCCESS.
     * @public
     */
    getSuccessStatusCode() {
        return _getStatusCodeByResponseType(this.STATUS_CODE.SUCCESS);

    },

    /**
     * @description This method return an array or collection of all 
     * CLIENT_ERROR status code.
     * @return {Array} Array or collection of all status code that could be 
     * grouped as CLIENT_ERROR.
     * @public
     */
    getClientErrorStatusCode() {
        return _getStatusCodeByResponseType(this.STATUS_CODE.CLIENT_ERROR);
    },

    /**
     * @description This method return an array or collection of all 
     * SERVER_ERROR status code.
     * @return {Array} Array or collection of all status code that could be 
     * grouped as SERVER_ERROR.
     * @public
     */
    getServerErrorStatusCode() {
        return _getStatusCodeByResponseType(this.STATUS_CODE.SERVER_ERROR);
    },

    /**
     * @description This object represent all encoding types handled by rest
     * client and specifies how the HTTP request should be encoded.
     * @property {string} X_WWW_FORM_URLENCODED This property indicates
     * to use application/x-www-form-urlencoded as encode type.
     * @property {string} MULTIPART_FORM_DATA This property indicates
     * to use multipart/form-data as encode type.
     */
    ENC_TYPES: {
        X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",
        MULTIPART_FORM_DATA: "multipart/form-data"
    },
    
    /**
     * @description This method is a generator with the responsibility to handle
     * all GET requests performed by the rest client.
     * @param {object} options Object that contains all parameters for GET 
     * generator method.
     * @param {string} [options.url = null] Url is a string represent the uri of
     * the requested resource.
     * @param {object} [options.headers = null] Headers is a set of key - value 
     * of all HTTP headers present in the request.
     * @param {object} [options.qs = null] Query string is a set of key - value
     * of all query parameter in the request.
     * @param {string} [options.encType = application/x-www-form-urlencoded] 
     * This parameter is a string represent the encoding type for the request.
     * @param {boolean} [options.isJson = true] This parameter adds Content-type
     * application/json header and additionally the response will be 
     * automatically parsed as JSON.
     * @param {number} [options.timeout = 15000] This parameter represent the 
     * number of seconds expressed in millisencods before to consider the 
     * request as failed.
     * @throws {ResponseError}
     * @throws {RestClientError}
     * @return {object} This method return an object that represent the server
     * response about the requested resource.
     */
    * GET({
        url = null,
        headers = null,
        qs = null, 
        encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED, 
        isJson = true,
        timeout = this.TIMEOUT
    }) {
        if (!url) {
            throw new RestClientError("Sorry rest client encountered an error" +
            " in executing request. Url parameter in GET request cannot be" +
            " null.");
        }
        try {
            // Init request options
            let requestOpts = {
                uri: url,
                qs: qs || {},
                method: "GET",
                headers: headers || {},
                json: isJson,
                gzip: true,
                timeout: timeout
            };
            if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED) {
                let response = yield request(requestOpts);
                let statusCodes = [
                    ... this.getInformationalStatusCode(), 
                    ... this.getSuccessStatusCode()
                ];
                return _handleHTTPResponse(response, statusCodes);
            }
            else {
                throw new RestClientError("Sorry rest client encountered an" +
                    " error in executing request. Permitted data types in GET" +
                    " request are: application/x-www-form-urlencoded.");
            }
        } catch (e) {
            if (e.code === 'ETIMEDOUT') {
                throw new TimeoutError(
                    "Sorry rest client ancountered an error in executing" + 
                    " GET request to: " + url +". Server not responding after" +
                    " timeout setted to: " + timeout + "ms.",
                    e
                );
            } else {
                throw e;
            }
        }   
    },

    /**
     * @description This method is a generator with the responsibility to handle
     * all POST requests performed by the rest client.
     * @param {object} options Object that contains all parameters for POST 
     * generator method.
     * @param {string} [options.url = null] Url is a string represent the uri of
     * the requested resource.
     * @param {object} [options.headers = null] Headers is a set of key - value 
     * of all HTTP headers present in the request.
     * @param {object} [options.qs = null] Query string is a set of key - value
     * of all query parameter in the request.
     * @param {object} [options.body = null]
     * @param {string} options.encType = application/x-www-form-urlencoded This
     * parameter is a string represent the encoding type for the request.
     * @param {Array} [options.files = []] Array of files to upload to the 
     * server.
     * @param {number} [options.timeout = 15000] This parameter represent the 
     * number of seconds expressed in millisencods before to consider the 
     * request as failed.
     * @throws {RestClientError}
     * @throws {ResponseError}
     * @return {object} This method return an object that represent the server
     * response about the requested resource.
     */
   * POST({
        url = null,
        headers = null,
        qs = null,
        body = null,
        encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson = true,
        files = [],
        timeout = this.TIMEOUT
    }) {
        if (!url) {
            throw new RestClientError("Sorry rest client encountered an error" +
            " in executing request. Url parameter in POST request cannot be" +
            " null.");
        }
        try {
            // Init request options
            let requestOpts = {
                uri: url,
                qs: qs || {},
                method: "POST",
                headers: headers || {},
                json: isJson,
                gzip: true,
                timeout: timeout
            };
            let response = null;
            let statusCodes = [
                ... this.getInformationalStatusCode(),
                ... this.getSuccessStatusCode()
            ];
            if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && isJson) {
                requestOpts.body = body || {};
                response = yield request(requestOpts);
            } else if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && !isJson) {
                requestOpts.form = body || {};           
                response = yield request(requestOpts); 
            } else if (encType === this.ENC_TYPES.MULTIPART_FORM_DATA) {
                body = body || {};
                for (let file of files) {
                    // let key = _.keys(file)[0];
                    // if (typeof file[key] === "string") {
                    //     body[key] = fs.createReadStream(file[key]);
                    // } else if (Buffer.isBuffer(file[key]) || file[key] instanceof Readable) {
                    //     body[key] = file[key];
                    // }
                    if (typeof file === "string" || Buffer.isBuffer(file) || file instanceof Readable) {
                        console.log('ok');
                    } 
                }
                requestOpts.formData = body;
                response = yield request(requestOpts);
            } else {
                 throw new RestClientError("Sorry rest client encountered an" +
                    " error in executing request. Permitted data types in" +
                    " POST request are: application/x-www-form-urlencoded -" +
                    " multipart/form-data");
            }
            return _handleHTTPResponse(response, statusCodes);
        } catch (e) {
            if (e.code === 'ETIMEDOUT') {
                throw new TimeoutError(
                    "Sorry rest client ancountered an error in executing" + 
                    " POST request to: " + url +". Server not responding after" +
                    " timeout setted to: " + timeout + "ms.",
                    e
                );
            } else {
                throw e;
            }
        }
    },

    /**
     * @description This method is a generator with the responsibility to handle
     * all PUT requests performed by the rest client.
     * @param {object} options Object that contains all parameters for PUT 
     * generator method.
     * @param {string} [options.url = null] Url is a string represent the uri of
     * the requested resource.
     * @param {object} [options.headers = null] Headers is a set of key - value 
     * of all HTTP headers present in the request.
     * @param {object} [options.qs = null] Query string is a set of key - value 
     * of all query parameter in the request.
     * @param {object} [options.body = null]
     * @param {string} [options.encType = application/x-www-form-urlencoded] 
     * This parameter is a string represent the encoding type for the request.
     * @param {Array} [options.files = []] Array of files to upload to the 
     * server.
     * @param {number} [options.timeout = 15000] This parameter represent the 
     * number of seconds expressed in millisencods before to consider the 
     * request as failed.
     * @throws {RestClientError}
     * @throws {ResponseError}
     * @return {object} This method return an object that represent the server
     * response about the requested resource.
     */
    * PUT({
        url = null,
        headers = null,
        qs = null,
        body = null,
        encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson = true,
        files = [],
        timeout = this.TIMEOUT
    }) {
        if (!url) {
            throw new RestClientError("Sorry rest client encountered an error" +
            " in executing request. Url parameter in PUT request cannot be" +
            " null.");
        }
        try {
            // Init request options
            let requestOpts = {
                uri: url,
                qs: qs || {},
                method: "PUT",
                headers: headers || {},
                json: isJson,
                gzip: true,
                timeout: timeout
            };
            let response = null;
            let statusCodes = [
                ... this.getInformationalStatusCode(),
                ... this.getSuccessStatusCode()
            ];
            if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && isJson) {
                requestOpts.body = body || {};
                response = yield request(requestOpts);
            } else if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && !isJson) {
                requestOpts.form = body || {};           
                response = yield request(requestOpts); 
            } else if (encType === this.ENC_TYPES.MULTIPART_FORM_DATA) {
                body = body || {};

                for (let file of files) {
                    // let key = _.keys(file)[0];
                    // if (typeof file[key] === "string") {
                    //     body[key] = fs.createReadStream(file[key]);
                    // } else if (Buffer.isBuffer(file[key]) || file[key] instanceof Readable) {
                    //     body[key] = file[key];
                    // }
                    if (typeof file === "string" || Buffer.isBuffer(file) || file instanceof Readable) {
                        console.log('ok');
                    } 
                }
                requestOpts.formData = body;
                response = yield request(requestOpts);
            } else {
                 throw new RestClientError("Sorry rest client encountered an" +
                    " error in executing request. Permitted data types in" +
                    " PUT request are: application/x-www-form-urlencoded -" +
                    " multipart/form-data");
            }
            return _handleHTTPResponse(response, statusCodes);
        } catch (e) {
            if (e.code === 'ETIMEDOUT') {
                throw new TimeoutError(
                    "Sorry rest client ancountered an error in executing" + 
                    " PUT request to: " + url +". Server not responding after" +
                    " timeout setted to: " + timeout + "ms.",
                    e
                );
            } else {
                throw e;
            }
        }
    },

    * DELETE({
        url = null,
        headers = null,
        qs = null,
        body = null,
        encType = this.ENC_TYPES.X_WWW_FORM_URLENCODED,
        isJson = true,
        timeout = this.TIMEOUT
    }) {
        if (!url) {
            throw new RestClientError("Sorry rest client encountered an error" +
                " in executing request. Url parameter in DELETE request" +
                " cannot be null.");
        }
        try {
            // Init request options
            let requestOpts = {
                uri: url,
                qs: qs || {},
                method: "DELETE",
                headers: headers || {},
                json: isJson,
                timeout: timeout,
                gzip: true
            };
            let response = null;
            let statusCodes = [
                ... this.getInformationalStatusCode(), 
                ... this.getSuccessStatusCode()
            ];
            if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && isJson) {
                requestOpts.body = body || {};
                response = yield request(requestOpts);
            } else if (encType === this.ENC_TYPES.X_WWW_FORM_URLENCODED && !isJson) {
                requestOpts.form = body || {};           
                response = yield request(requestOpts); 
            } 
            else {
                throw new RestClientError("Sorry rest client encountered an" + 
                    " error in executing request. Permitted data types in" +
                    " DELETE request are: application/x-www-form-urlencoded.");
            }
            return _handleHTTPResponse(response, statusCodes);
        } catch (e) {
            throw e;
        }
    }
    
};