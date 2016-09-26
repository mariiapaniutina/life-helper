define(function (require) {
    'use strict';

    var LogHelper = require('../../lib/logHelper_old');
/*
    var logTemplate = require('src/module_template');
    console.log('logTemplate', logTemplate);
    var tmpl = new logTemplate('123123');
    console.log(tmpl.myProp());
   */
    var logTester = require('../../lib/LogHelper');
    //var LOG_TESTER = new logTester('name', 'test');
    //LOG_TESTER.log('START');

    //DOM elements
    var userNameLbl = document.getElementById('userNameLbl');
    var userLastNameLbl = document.getElementById('userLastNameLbl');
    var updateBttn = document.getElementById('updateUserProfile');
    var userNameInput = document.getElementById('userNameInput');
    var userLastNameInput = document.getElementById('userLastNameInput');

    //setting up helper
    var logHelper = new logTester({siteID: 'MyCustomSideID'});

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
});
