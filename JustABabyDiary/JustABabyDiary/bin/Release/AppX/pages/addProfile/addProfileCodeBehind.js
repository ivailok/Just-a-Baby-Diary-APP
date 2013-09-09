/// <reference path="../../js/viewModels.js" />

(function () {
    var goToHomePage = function () {
        WinJS.Navigation.navigate("/pages/home/home.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToHomePage);

    WinJS.Namespace.define("AddProfileCodeBehind", {
        goToHomePage: goToHomePage
    })
})();