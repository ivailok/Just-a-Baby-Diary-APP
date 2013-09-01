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

    var goToEventDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/detailBabyEvent/detailBabyEventl.html", {
            indexInEventsList: invokeEvent.detail.itemIndex
        });
    }

    var currentProfileIndex = 0;

    var goToUpdateBabyProfilePage = function () {
        var appBar = document.getElementById("detail-profile-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/updateBabyProfile/updateBabyProfile.html", {
            currentProfileIndex: DetailProfileCodeBehind.currentProfileIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToAddBabyEventPage);
    WinJS.Utilities.markSupportedForProcessing(goToUpdateBabyProfilePage);
    WinJS.Utilities.markSupportedForProcessing(goToEventDetailsPage);

    WinJS.Namespace.define("DetailProfileCodeBehind", {
        addEvent: goToAddBabyEventPage,
        updateProfile: goToUpdateBabyProfilePage,
        loadEvents: loadEvents,
        viewEventDetails: goToEventDetailsPage,
        currentProfileIndex: currentProfileIndex
    });
})();