var LogHelper = require('../../lib/LogHelper')();
var logMessaging = new LogHelper({
    commonJS: true,
    siteID: 'COMMONJS_EXAMPLE'
});

/*======================================================================================================================
Example
======================================================================================================================*/

logMessaging.log('commonJS/index.js :: START');

var User = function(options){
    logMessaging.log('User.contstructor :: Enter', options);

    this._profile = {
        name: options.name,
        lastName: options.lastName
    };
};

User.prototype.getName = function(){
    logMessaging.log('User.getName :: Enter');

    return this._profile.name;
};

User.prototype.getLastName = function(){
    logMessaging.log('User.getLastName :: Enter');

    return this._profile.lastName;
};

User.prototype.updateProfileName = function (name) {
    logMessaging.log('User.updateProfileName :: Enter', name);

    this._profile.name = name;
};

User.prototype.updateProfileLastName = function (lastName) {
    logMessaging.log('User.updateProfileLastName :: Enter', lastName);

    this._profile.lastName = lastName;
};

User.prototype.updateProfile = function (options) {
    logMessaging.log('User.updateProfile :: Enter', options);

    this.updateProfileName(options.name);
    this.updateProfileLastName(options.lastName);
};

var developer = new User({
    name: 'Developer',
    lastName: 'JS'
});

developer.updateProfile({
    name: 'Engineer',
    lastName: 'JavaScript'
});

console.log('--- EXAMPLE OF LOGGING BY TYPE ---');
//Example of log by type
logMessaging.trace('Test for trace message');
logMessaging.info('Test for info message');
logMessaging.warn('Test for warning message');
logMessaging.error('Test for error message');
logMessaging.crit('Test for critical message');

// test with objects
logMessaging.crit(logMessaging);
logMessaging.crit({'protp1':2,'prop2':'bebebe'});

// test for Tag X
logMessaging.traceTag('XTAG1', 'Test for trace message');
logMessaging.infoTag('XTAG1', 'Test for info message');
logMessaging.warnTag('XTAG1', 'Test for warning message');
logMessaging.errorTag('XTAG1', 'Test for error message');
logMessaging.critTag('XTAG1', 'Test for critical message');

// test for USRIN
logMessaging.traceTag('USRIN', 'Test for trace message');
logMessaging.infoTag('USRIN', 'Test for info message');
logMessaging.warnTag('USRIN', 'Test for warning message');
logMessaging.errorTag('USRIN', 'Test for error message');
logMessaging.critTag('USRIN', 'Test for critical message');