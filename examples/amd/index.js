define(function (require) {
    'use strict';

    var LogHelper = require('../../lib/LogHelper');

    //DOM elements
    var userNameLbl = document.getElementById('userNameLbl');
    var userLastNameLbl = document.getElementById('userLastNameLbl');
    var updateBttn = document.getElementById('updateUserProfile');
    var userNameInput = document.getElementById('userNameInput');
    var userLastNameInput = document.getElementById('userLastNameInput');

    //setting up helper
    var logHelper = new LogHelper({
        siteID: 'AMD_EXAMPLE',
        sessionID: 'ABCD-2343'
    });

    //just to check arguments for logHelper
    logHelper.log(logHelper.getOptions());

    //Some simple Class example
    var User = function(options){
        logHelper.log('User.contstructor :: Enter', options);

        this._profile = {
            name: options.name,
            lastName: options.lastName
        };
    };

    User.prototype.getName = function(){
        logHelper.log('User.getName :: Enter');

        return this._profile.name;
    };

    User.prototype.getLastName = function(){
        logHelper.log('User.getLastName :: Enter');

        return this._profile.lastName;
    };

    User.prototype.updateProfileName = function (name) {
        logHelper.log('User.updateProfileName :: Enter', name);

        this._profile.name = name;
    };

    User.prototype.updateProfileLastName = function (lastName) {
        logHelper.log('User.updateProfileLastName :: Enter', lastName);

        this._profile.lastName = lastName;
    };

    User.prototype.updateProfile = function (options) {
        logHelper.log('User.updateProfile :: Enter', options);

        this.updateProfileName(options.name);
        this.updateProfileLastName(options.lastName);
    };

    User.prototype.displayProfileName = function () {
        logHelper.log('User.displayProfileName :: Enter');

        userNameLbl.innerHTML = this.getName();
        userNameInput.value = '';
    };

    User.prototype.displayProfileLastName = function () {
        logHelper.log('User.displayProfileLastName :: Enter');

        userLastNameLbl.innerHTML = this.getLastName();
        userLastNameInput.value = '';
    };

    User.prototype.displayProfile = function(){
        logHelper.log('User.displayProfile :: Enter');

        this.displayProfileName();
        this.displayProfileLastName();
    };


    //Usage
    var john = new User({
        name: 'John',
        lastName: 'Doe'
    });
    john.displayProfile();

    updateBttn.addEventListener('click', function(){
        logHelper.log('USER_EVENT :: updateBttn.click :: Enter');

        var name = userNameInput.value;
        var lastName = userLastNameInput.value;

        if (name.length > 0 && lastName.length > 0){

            john.updateProfile({
                name: name,
                lastName: lastName
            });

        } else if (name.length > 0){

            john.updateProfileName(name);

        } else if (lastName.length > 0){

            john.updateProfileLastName(lastName);

        } else {

            logHelper.log('updateBttn.click :: No data provided');

        }

        john.displayProfile();
    }, false);


    console.log('--- EXAMPLE OF LOGGING BY TYPE ---');
    //Example of log by type
    logHelper.trace('Test for trace message');
    logHelper.info('Test for info message');
    logHelper.warn('Test for warning message');
    logHelper.error('Test for error message');
    logHelper.crit('Test for critical message');

    // test with objects
    logHelper.crit(logHelper);
    logHelper.crit({'protp1':2,'prop2':'bebebe'});

    // test for Tag X
    logHelper.traceTag('XTAG1', 'Test for trace message');
    logHelper.infoTag('XTAG1', 'Test for info message');
    logHelper.warnTag('XTAG1', 'Test for warning message');
    logHelper.errorTag('XTAG1', 'Test for error message');
    logHelper.critTag('XTAG1', 'Test for critical message');

    // test for USRIN
    logHelper.traceTag('USRIN', 'Test for trace message');
    logHelper.infoTag('USRIN', 'Test for info message');
    logHelper.warnTag('USRIN', 'Test for warning message');
    logHelper.errorTag('USRIN', 'Test for error message');
    logHelper.critTag('USRIN', 'Test for critical message');
});