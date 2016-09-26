"use strict";

(function() {
    var root = this;

    /* @import myModuleContent */

    if( typeof exports !== 'undefined' ) {
        if( typeof module !== 'undefined' && module.exports ) {
            exports = module.exports = myModuleName;
        }
        exports.myModuleName = myModuleName;
    } else if (typeof define === 'function' && define.amd){
        //AMD
        define([], myModuleName);

    } else {
        //Browser global
        root.myModuleName = myModuleName;
    }

}).call(this);