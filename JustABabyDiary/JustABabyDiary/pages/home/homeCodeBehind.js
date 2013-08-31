/// <reference path="../../js/viewModels.js" />

(function () {
    var goToProfileDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/detailBabyProfile/detailBabyProfile.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToProfileDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadProfiles: function () {
            ViewModels.Profiles.loadProfiles();
        },

        goToProfileDetailsPage: goToProfileDetailsPage
    })
})();