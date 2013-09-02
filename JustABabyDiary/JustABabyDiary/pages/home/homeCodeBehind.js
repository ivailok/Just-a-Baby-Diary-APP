/// <reference path="../../js/sha1.js" />
/// <reference path="../../js/viewModels.js" />

(function () {
    var goToProfileDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/detailBabyProfile/detailBabyProfile.html", {
            indexInProfilesList: invokeEvent.detail.itemIndex
        });
    }

    var goToProfileAddPage = function () {
        var appBar = document.getElementById("home-app-bar").winControl;
        if (appBar) {
            appBar.hide();
        }
        WinJS.Navigation.navigate("/pages/addProfile/addProfile.html");
    }

    var register = function () {
        //TODO:
        var userName = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var authCode=Crypto.sha1(password);
        ViewModels.Users.register();
    }

    var login = function () {
        var userName = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var authCode = Crypto.sha1(password);
        ViewModels.Users.login(username, authCode);
    }

    var showRegister = function () {

        var loginForm = document.getElementById("login-form");
        loginForm.style.display = "none";

        var registerForm = document.getElementById("register-form");
        registerForm.style.display = "block";
    }

    WinJS.Utilities.markSupportedForProcessing(goToProfileDetailsPage);
    WinJS.Utilities.markSupportedForProcessing(goToProfileAddPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadProfiles: function () {
            return ViewModels.Profiles.loadProfiles();
        },

        goToProfileDetailsPage: goToProfileDetailsPage,
        goToProfileAddPage: goToProfileAddPage,
        register: register,
        login: login,
        showRegister:showRegister
    })
})();