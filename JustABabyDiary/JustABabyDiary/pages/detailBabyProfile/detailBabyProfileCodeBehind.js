/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var goToAddBabyEventPage = function (invokeEvent) {
        var appBar = document.getElementById("detail-profile-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/addEvent/addEvent.html", {
            indexInProfilesList: invokeEvent.detail.itemIndex
        });
    }
    
    var loadEvents = function () {
        ViewModels.Event.loadEvents();
    }

    var goToUpdateBabyProfilePage = function (invokeEvent) {
        var appBar = document.getElementById("detail-profile-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/updateBabyProfile/updateBabyProfile.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToAddBabyEventPage);
    WinJS.Utilities.markSupportedForProcessing(goToUpdateBabyProfilePage);


    WinJS.Namespace.define("DetailProfileCodeBehind", {
        addEvent: goToAddBabyEventPage,
        updateProfile: goToUpdateBabyProfilePage,
        loadEvents:loadEvents
    });
})();