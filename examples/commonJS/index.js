var LogHelper = require('../../lib/LogHelper')();
var logMessaging = new LogHelper({
    commonJS: true
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
