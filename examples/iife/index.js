//DOM elements
var userNameLbl = document.getElementById('userNameLbl');
var userLastNameLbl = document.getElementById('userLastNameLbl');
var updateBttn = document.getElementById('updateUserProfile');
var userNameInput = document.getElementById('userNameInput');
var userLastNameInput = document.getElementById('userLastNameInput');

//setting up helper
window.logMessaging = new logHelper()({siteID: 'testem'});

//just to check arguments for logHelper
logMessaging.log(logMessaging.getOptions());


//Some simple Class example
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

User.prototype.displayProfileName = function () {
    logMessaging.log('User.displayProfileName :: Enter');

    userNameLbl.innerHTML = this.getName();
    userNameInput.value = '';
};

User.prototype.displayProfileLastName = function () {
    logMessaging.log('User.displayProfileLastName :: Enter');

    userLastNameLbl.innerHTML = this.getLastName();
    userLastNameInput.value = '';
};

User.prototype.displayProfile = function(){
    logMessaging.log('User.displayProfile :: Enter');

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
    logMessaging.log('USER_EVENT :: updateBttn.click :: Enter');

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

        logMessaging.log('updateBttn.click :: No data provided');

    }

    john.displayProfile();
}, false);