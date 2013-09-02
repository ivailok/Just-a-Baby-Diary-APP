/// <reference path="models.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var logged = {};

    var setData = function (value) {
        logged = value;
    }

    var getData = function () {
        return logged;
    }

    WinJS.Namespace.define("UserLoginData", {
        getData: getData,
        setData: setData
    });
})();