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

        };

        LogUtility.prototype.getOptions = function() {
            return JSON.stringify(this.options);
        };

        LogUtility.prototype.messagePush = function messagePush(evt, message) {
            var eventName = evt || 'JS Event';

            _paq.push(['trackEvent', eventName, message]);
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

        LogUtility.prototype.getMessageDebugMode = function(msg, args) {
            var message = 'MSG :: [' +
                msg +
                '] ' +
                args;

            return message;
        };
        LogUtility.prototype.getMessageFullDebugMode = function(dateFormated, sessionID, msg, args) {
            var message = dateFormated +
                ' | ID :: [' +
                sessionID +
                '] :: MSG :: [' +
                msg +
                '] ' +
                args;

            return message;
        };

        LogUtility.prototype.NODE_Log = function NODE_Log() {
            var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
            var inputArgs = args[0][1] ? args[0][1] : [];

            //display input field, only if it is not empty
            var input = JSON.stringify(inputArgs).length > 2 ? '| INPUT :: >> ' + JSON.stringify(inputArgs) : '';

            var message = this.getMessageDebugMode(args[0][0], input);
            console.log(message);

        };

        LogUtility.prototype.DOM_Log = function DOM_Log() {
            var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
            var date = new Date();
            var dateFormated = date.getTime();
            var sessionID = this.getSessionID('JSESSIONID');
            var inputArgs = args[0][1] ? args[0][1] : [];
            var message;

            //display input field, only if it is not empty
            var input = JSON.stringify(inputArgs).length > 2 ? '| INPUT :: >> ' + JSON.stringify(inputArgs) : '';

            //output message to browser log tool
            if (this.devMode('fullDevDebug')) {
                message = this.getMessageFullDebugMode(dateFormated, sessionID, args[0][0], input);
                console.log(message);
            }

            if (this.devMode('devDebug')) {
                message = this.getMessageDebugMode(args[0][0], input);
                console.log(message);
            }

            //push message to PIWIK
            //this.messagePush();
        };

        LogUtility.prototype.log = function() {
            //we will have two methods per supportMode
            this.options && this.options.commonJS ? this.NODE_Log(arguments) : this.DOM_Log(arguments);
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
