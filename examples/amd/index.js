define(function (require) {
    'use strict';

    var LogHelper = require('../../lib/LogHelper');

    //------------------------------------------------------------------------------------------------------------------

    /**
     * All DOM elements are defined here....
     */
    var userNameLbl = document.getElementById('userNameLbl');
    var userLastNameLbl = document.getElementById('userLastNameLbl');
    var updateUserProfile = document.getElementById('updateUserProfile');
    var userNameInput = document.getElementById('userNameInput');
    var userLastNameInput = document.getElementById('userLastNameInput');
    var showLevelLogs = document.getElementById('exampleLevelLogs');
    var showCachedLogs = document.getElementById('showCachedLogs');

    //------------------------------------------------------------------------------------------------------------------
    /**
     * Setting up the LifeHelper
     */

    var logHelper = new LogHelper({
        siteID: 'AMD_EXAMPLE',
        sessionID: 'ABCD-2343'
    });

    //just to check arguments for logHelper
    logHelper.log(logHelper.getOptions());

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Some real-world example
     * @param options
     * @constructor
     */
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

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Handler for logs by level or tag
     */
    var showLogLevelsHandler = function(){
        logHelper.log('showLogLevelshandler :: Enter');

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
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Handler for showing cached logs
     */
    var showCachedLogsHandler = function(){
        logHelper.log('showCachedLogsHandler :: Enter');

        var logs = logHelper.getCache();
        console.log(logs);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Handler for updating user profile data in DOM
     */
    var updateUserProfileHandler = function(){
        logHelper.log('updateUserProfileHandler :: Enter');

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

            logHelper.log('updateUserProfileHandler :: No data provided');

        }

        john.displayProfile();
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Event listeners here
     */
    updateUserProfile.addEventListener('click', function(){
        logHelper.log('USER_EVENT :: updateUserProfile.click :: Enter');

        updateUserProfileHandler();
    }, false);

    showLevelLogs.addEventListener('click', function(){
        logHelper.log('USER_EVENT :: showLevelLogs.click :: Enter');

        showLogLevelsHandler();
    }, false);

    showCachedLogs.addEventListener('click', function(){
        logHelper.log('USER_EVENT :: showCachedLogs.click :: Enter');

        showCachedLogsHandler();
    }, false);

    //------------------------------------------------------------------------------------------------------------------

});