/* App Name: life-helper
 Author: Mariia Paniutina <mariia.paniutina@gmail.com> */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        module.exports = new factory();
    } else {
        // Browser global
        root.LIFE = root.LIFE || {};
        root.LIFE.Helpers = root.LIFE.Helpers || {};
        root.LIFE.Helpers.LogHelper = root.LIFE.Helpers.LogHelper || new factory();

        //setting up PIWIK
        root._paq = root._paq || [];
    }
}(this, function (prop) {

    var LogHelper = function(prop){
        this.options = prop;
        this.modeOptions = {
            'devDebug': 'LIFE_MODE=DEBUG',
            'fullDevDebug': 'LIFE_MODE=FULL_DEBUG'
        };
    };

    LogHelper.prototype.getOptions = function(){
        return JSON.stringify(this.options);
    };

    LogHelper.prototype.messagePush = function messagePush(evt, message){
        var eventName = evt || 'JS Event';

        _paq.push(['trackEvent', eventName, message]);
    };

    LogHelper.prototype.devMode = function devMode(mode){
        var query = window.location.search;

        return query.indexOf(this.modeOptions[mode]) !== -1;
    };

    LogHelper.prototype.getSessionID = function getSessionID(name){
        var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) {
            return match[1];
        } else {
            return null;
        }
    };

    LogHelper.prototype.getMessageDebugMode = function(msg, args){
        var message = 'MSG :: [' +
            msg +
            '] ' +
            args;

        return message;
    };
    LogHelper.prototype.getMessageFullDebugMode = function(dateFormated, sessionID, msg, args){
        var message = dateFormated +
            ' | ID :: [' +
            sessionID +
            '] :: MSG :: [' +
            msg +
            '] ' +
            args;

        return message;
    };

    LogHelper.prototype.log = function log(){
        var args = Array.prototype.slice.call(arguments);
        var date = new Date();
        var dateFormated = date.getTime();
        var sessionID = this.getSessionID('JSESSIONID');
        var inputArgs = args.length > 1 ? args.slice(1) : [];
        var message;

        //display input field, only if it is not empty
        var input = JSON.stringify(inputArgs).length > 2 ?  '| INPUT :: >> ' + JSON.stringify(inputArgs) : '';

        //output message to browser log tool
        if (this.devMode('fullDevDebug')){
            message = this.getMessageFullDebugMode(dateFormated, sessionID, args[0], input);
            console.log(message);
        }

        if (this.devMode('devDebug')){
            message = this.getMessageDebugMode(args[0], input);
            console.log(message);
        }



        //push message to PIWIK
        //this.messagePush();
    };

    return LogHelper;

}));