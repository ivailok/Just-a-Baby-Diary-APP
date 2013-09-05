/// <reference path="../../js/sha1.js" />
/// <reference path="../../js/viewModels.js" />

(function () {
    var goToProfileDetailsPage = function (invokeEvent) {
        var vault = new Windows.Security.Credentials.PasswordVault();
        try {
            var credential = vault.findAllByResource("babyDiary");
            WinJS.Navigation.navigate("/pages/detailBabyProfile/detailBabyProfile.html", {
                indexInProfilesList: invokeEvent.detail.itemIndex
            });
        } catch (WinRTError) {
            var messageDialog = new Windows.UI.Popups.MessageDialog("You are currently logged out. Please login first!");
            messageDialog.showAsync();
            WinJS.Navigation.navigate("/pages/login/login.html");
        }
    }

    var goToProfileAddPage = function () {
        //var appBar = document.getElementById("home-app-bar").winControl;
        //if (appBar) {
        //    appBar.hide();
        //}
        WinJS.Navigation.navigate("/pages/addProfile/addProfile.html");
    }

    var goToLoginPage = function () {
        var goToLoginBtn = document.getElementById("go-to-login");
        goToLoginBtn.style.display = "block";
        goToLoginBtn.addEventListener("click", function () {
            WinJS.Navigation.navigate("/pages/login/login.html");
        })
    }

    WinJS.Utilities.markSupportedForProcessing(goToProfileDetailsPage);
    WinJS.Utilities.markSupportedForProcessing(goToProfileAddPage);
    WinJS.Utilities.markSupportedForProcessing(goToLoginPage);
    WinJS.Utilities.requireSupportedForProcessing(goToLoginPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadProfiles: function () {
            ViewModels.Profiles.loadProfiles();
        },

        goToProfileDetailsPage: goToProfileDetailsPage,
        goToProfileAddPage: goToProfileAddPage,
        goToLoginPage: goToLoginPage
    })
})();