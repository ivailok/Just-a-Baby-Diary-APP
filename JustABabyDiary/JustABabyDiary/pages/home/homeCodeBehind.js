/// <reference path="../../js/sha1.js" />
/// <reference path="../../js/viewModels.js" />

(function () {
    var goToProfileDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/detailBabyProfile/detailBabyProfile.html", {
            indexInProfilesList: invokeEvent.detail.itemIndex
        });
    }

    var goToProfileAddPage = function () {
        //var appBar = document.getElementById("home-app-bar").winControl;
        //if (appBar) {
        //    appBar.hide();
        //}
        WinJS.Navigation.navigate("/pages/addProfile/addProfile.html");
    }

    var goToLoginPage = function () {
        try {
            WinJS.Navigation.navigate("/pages/login/login.html", {});
        }
        catch (WinJSError) {
            console.log();
        }
    }

    WinJS.Utilities.markSupportedForProcessing(goToProfileDetailsPage);
    WinJS.Utilities.markSupportedForProcessing(goToProfileAddPage);
    WinJS.Utilities.markSupportedForProcessing(goToLoginPage);
    WinJS.Utilities.requireSupportedForProcessing(goToLoginPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadProfiles: function () {
            return ViewModels.Profiles.loadProfiles();
        },

        goToProfileDetailsPage: goToProfileDetailsPage,
        goToProfileAddPage: goToProfileAddPage,
        goToLoginPage: goToLoginPage
    })
})();