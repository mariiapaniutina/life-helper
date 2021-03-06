/* -------------------------------------------------
App Name: life-helper
Author: Mariia Paniutina <mariia.paniutina@gmail.com>
Date: 05-10-2016
Description: logging tool for JS applications----------------------------------------------------
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
------------------------------------------------- */

"use strict";

(function() {
    var root = this;

    var logHelper = function(prop) {

        var LogUtility = function(prop) {
            this.options = prop;
            this.modeOptions = {
                'devDebug': 'LIFE_MODE=DEBUG',
                'fullDevDebug': 'LIFE_MODE=FULL_DEBUG'
            };

            // use ERR as a default level
            this.logLevel = 4;

            this.cacheSize = this.options.cacheSize || 100;
            this.cacheStorage = [];

            //session ID
            this.sessionID = this.options.sessionID || '';

        };

        LogUtility.prototype.getOptions = function() {
            return JSON.stringify(this.options);
        };

        LogUtility.prototype.getFormatedDate = function() {
            var date = new Date();
            var dateFormated = date.getTime();

            return dateFormated;
        };

        LogUtility.prototype.devMode = function devMode(mode) {
            var query = window.location.search;

            return query.indexOf(this.modeOptions[mode]) !== -1;
        };

        LogUtility.prototype.getSessionID = function getSessionID(name) {
            var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
            if (match) {
                return match[1];
            } else {
                return null;
            }
        };

        LogUtility.prototype.getSimpleMsg = function(msg, val, lastPos) {
            var message = '';
            if (msg !== '' && val !== '') {
                if (lastPos) {
                    message = msg + ' :: [' + val + ']';
                } else {
                    message = msg + ' :: [' + val + '] | ';
                }
            } else {
                message = '';
            }

            return message;
        };

        LogUtility.prototype.getSimpleInputMsg = function(inputArgs) {
            var strAgrs = JSON.stringify(inputArgs);
            var message = strAgrs && strAgrs.length > 2 ? ' | INPUT :: >> ' + strAgrs : '';

            return message;
        };

        LogUtility.prototype.getMessageDebugMode = function(msg, args) {
            var message = this.getSimpleMsg('MSG', msg, true) +
                this.getSimpleInputMsg(args);

            return message;
        };

        LogUtility.prototype.getMessageFullDebugMode = function(msg, args) {
            var fDate = this.getFormatedDate();
            var sID = this.sessionID;

            var message = fDate + ' | ' +
                this.getSimpleMsg('ID', sID) +
                this.getSimpleMsg('MSG', msg, true) +
                this.getSimpleInputMsg(args);

            return message;
        };

        LogUtility.prototype.getLevelTagMessageDebugMode = function(level, tag, msg) {

            var message = this.getSimpleMsg('LVL', level) +
                this.getSimpleMsg('TAG', tag) +
                this.getSimpleMsg('MSG', msg, true);

            return message;
        };

        LogUtility.prototype.getLevelTagMessageFullDebugMode = function(level, tag, msg) {
            var fDate = this.getFormatedDate();
            var sID = this.sessionID;

            var message = fDate + ' | ' +
                this.getSimpleMsg('ID', sID) +
                this.getSimpleMsg('LVL', level) +
                this.getSimpleMsg('TAG', tag) +
                this.getSimpleMsg('MSG', msg, true);

            return message;
        };

        LogUtility.prototype.NODE_Log = function NODE_Log() {
            var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
            var inputArgs = args[0][1] ? args[0][1] : [];
            var message = this.getMessageDebugMode(args[0][0], inputArgs);

            //just output message
            console.log(message);

        };

        LogUtility.prototype.DOM_Log = function DOM_Log() {
            var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
            var inputArgs = args[0][1] ? args[0][1] : [];
            var message = this.getMessageDebugMode(args[0][0], inputArgs); //default message will be taken from simple debug mode

            //output message to browser log tool
            if (this.devMode('fullDevDebug')) {
                message = this.getMessageFullDebugMode(args[0][0], inputArgs);
                console.log(message);
            }

            if (this.devMode('devDebug')) {
                message = this.getMessageDebugMode(args[0][0], inputArgs);
                console.log(message);
            }

            //update cache with every log message
            this.cacheUpdate(message);
        };

        LogUtility.prototype.cacheUpdate = function(msg) {
            if (this.cacheStorage.length === this.cacheSize) {
                this.cacheStorage.shift();
            }
            this.cacheStorage.push(msg);
        };

        LogUtility.prototype.getCache = function() {
            return this.cacheStorage;
        };

        LogUtility.prototype.log = function() {
            //we will have two methods per supportMode
            this.options && this.options.commonJS ? this.NODE_Log(arguments) : this.DOM_Log(arguments);
        };

        /**
         * @brief Generic log function is the main entry for every log message.
         *        All the log API will internally use generic with predefined keys
         * @param LogLevel - importance of the message. Can be 'TRC', 'INF', 'WRN', 'ERR', 'CRT'.
         *        TODO: move log level from string to numeric
         * @param Tag - the tag that message relates to. tag value is up to user.
         *              Exmples: 'NET', 'INPUT', 'TRANSACTION', 'SETTINGS', etc
         * @param Message - The actual message that needs to be logged
         * @return void
         */
        LogUtility.prototype.genericLog = function genericLog(msgLevel, msgTag, message) {
            // Define the level options
            var levelNames = [
                'CRT', // 0
                'ERR', // 1
                'WRN', // 2
                'INF', // 3
                'TRC'
            ]; // 4

            // process the input args
            var logLevel = 4;
            var logMsg = this.getLevelTagMessageDebugMode(levelNames[msgLevel], msgTag, message);

            // TODO: if we have more arguments or message is an object - stringify it
            if (typeof message == 'object') {
                message = JSON.stringify(message);
            }

            // log only if current log level is higher than message level
            if (msgLevel <= this.logLevel) {
                if (this.options && this.options.commonJS) {
                    //message for commonJS
                    logMsg = this.getLevelTagMessageDebugMode(levelNames[msgLevel], msgTag, message);
                    console.log(logMsg);
                } else if (this.devMode('fullDevDebug') || this.devMode('devDebug')) {
                    //message for rest DOM
                    if (this.devMode('fullDevDebug')) {
                        logMsg = this.getLevelTagMessageFullDebugMode(levelNames[msgLevel], msgTag, message);
                        console.log(logMsg);
                    }

                    if (this.devMode('devDebug')) {
                        logMsg = this.getLevelTagMessageDebugMode(levelNames[msgLevel], msgTag, message);
                        console.log(logMsg);
                    }
                }
            }

            //update cache with every log message
            this.cacheUpdate(logMsg);
        };


        LogUtility.prototype.trace = function trace(message) {
            this.genericLog(4, '', message);
        };
        LogUtility.prototype.info = function info(message) {
            this.genericLog(3, '', message);
        };
        LogUtility.prototype.warn = function warn(message) {
            this.genericLog(2, '', message);
        };
        LogUtility.prototype.error = function error(message) {
            this.genericLog(1, '', message);
        };
        LogUtility.prototype.crit = function crit(message) {
            this.genericLog(0, '', message);
        };

        LogUtility.prototype.traceTag = function traceTag(tag, message) {
            this.genericLog(4, tag, message);
        };
        LogUtility.prototype.infoTag = function infoTag(tag, message) {
            this.genericLog(3, tag, message);
        };
        LogUtility.prototype.warnTag = function warnTag(tag, message) {
            this.genericLog(2, tag, message);
        };
        LogUtility.prototype.errorTag = function errorTag(tag, message) {
            this.genericLog(1, tag, message);
        };
        LogUtility.prototype.critTag = function critTag(tag, message) {
            this.genericLog(0, tag, message);
        };

        return function(prop) {
            return new LogUtility(prop);
        }
    };


    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = logHelper;
        }
        exports.logHelper = logHelper;
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define([], logHelper);

    } else {
        //Browser global
        root.logHelper = logHelper;
    }

}).call(this);
