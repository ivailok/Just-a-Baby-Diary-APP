/// <reference path="../../js/viewModels.js" />

(function () {
    var goToProfileDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/detailBabyProfile/detailBabyProfile.html", {
            indexInProfilesList: invokeEvent.detail.itemIndex
        });
    }

    var goToProfileAddPage = function () {
        WinJS.Navigation.navigate("/pages/addProfile/addProfile.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToProfileDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadProfiles: function () {
            ViewModels.Profiles.loadProfiles();
        },

        goToProfileDetailsPage: goToProfileDetailsPage,
        goToProfileAddPage: goToProfileAddPage
    })
})();