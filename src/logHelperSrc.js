var logHelper = function(prop) {

    var LogUtility = function(prop){
        this.options = prop;
        this.modeOptions = {
            'devDebug': 'LIFE_MODE=DEBUG',
            'fullDevDebug': 'LIFE_MODE=FULL_DEBUG'
        };
        // use ERR as a default level
        this.logLevel = 4;

    };

    LogUtility.prototype.getOptions = function(){
        return JSON.stringify(this.options);
    };

    LogUtility.prototype.messagePush = function messagePush(evt, message){
        var eventName = evt || 'JS Event';

        _paq.push(['trackEvent', eventName, message]);
    };

    LogUtility.prototype.devMode = function devMode(mode){
        var query = window.location.search;

        return query.indexOf(this.modeOptions[mode]) !== -1;
    };

    LogUtility.prototype.getSessionID = function getSessionID(name){
        var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
        if (match) {
            return match[1];
        } else {
            return null;
        }
    };

    LogUtility.prototype.getMessageDebugMode = function(msg, args){
        var message = 'MSG :: [' +
            msg +
            '] ' +
            args;

        return message;
    };
    LogUtility.prototype.getMessageFullDebugMode = function(dateFormated, sessionID, msg, args){
        var message = dateFormated +
            ' | ID :: [' +
            sessionID +
            '] :: MSG :: [' +
            msg +
            '] ' +
            args;

        return message;
    };

    LogUtility.prototype.NODE_Log = function NODE_Log(){
        var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
        var inputArgs = args[0][1] ? args[0][1] : [];

        //display input field, only if it is not empty
        var input = JSON.stringify(inputArgs).length > 2 ?  '| INPUT :: >> ' + JSON.stringify(inputArgs) : '';

        var message = this.getMessageDebugMode(args[0][0], input);
        console.log(message);

    };

    LogUtility.prototype.DOM_Log = function DOM_Log(){
        var args = Array.prototype.slice.call(arguments); //[{ {'0': MSG}, {'1': INPUT} }]
        var date = new Date();
        var dateFormated = date.getTime();
        var sessionID = this.getSessionID('JSESSIONID');
        var inputArgs = args[0][1] ? args[0][1] : [];
        var message;

        //display input field, only if it is not empty
        var input = JSON.stringify(inputArgs).length > 2 ?  '| INPUT :: >> ' + JSON.stringify(inputArgs) : '';

        //output message to browser log tool
        if (this.devMode('fullDevDebug')){
            message = this.getMessageFullDebugMode(dateFormated, sessionID, args[0][0], input);
            console.log(message);
        }

        if (this.devMode('devDebug')){
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

    /// log4cpp kind API
    LogUtility.prototype.buildDomMessage = function(level, tag, args)
    {
        return new Date().getTime()
            + ' | ' + this.getSessionID('JSESSIONID')
            + ' | ' + tag
            + ' | ' + level
            + ' | ' + args;
    }

    LogUtility.prototype.buildNodeMessage = function(level, tag, args)
    {
        return new Date().getTime()
            + ' | ' + tag
            + ' | ' + level
            + ' | ' + args;
    }


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
    LogUtility.prototype.genericLog = function log(msgLevel, msgTag, message){

        // Define the level options
        var levelNames = [
            'CRT',  // 0
            'ERR',  // 1
            'WRN',  // 2
            'INF',  // 3
            'TRC']; // 4

        // process the input args
        var logLevel = 4;

        // TODO: if we have more arguments or message is an object - stringify it
        if (typeof message == 'object')
            message = JSON.stringify(message);

        // log only if current log level is higher than message level
        if (msgLevel <= this.logLevel) {
            // build the final message only when it will be printed
            var logMsg;
            if (this.options && this.options.commonJS)
                logMsg = this.buildNodeMessage(levelNames[msgLevel], msgTag, message);
            else
                logMsg = this.buildDomMessage(levelNames[msgLevel], msgTag, message);
            console.log(logMsg);
        }
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

    return function(prop){
        return new LogUtility(prop);
    }
};
