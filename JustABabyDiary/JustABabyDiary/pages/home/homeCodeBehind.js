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
        var username = document.getElementById("register-username").value;
        var nickname = document.getElementById("nickname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("register-password").value;
        var authCode=Crypto.sha1(password);
        ViewModels.Users.register(username, nickname, authCode, email).then(function () {
            var registerForm = document.getElementById("register-form");
            registerForm.style.display = "none";
            var profilesList = document.getElementById("profiles-list");
            profilesList.style.display = "block"; profilesList.winControl.forceLayout();
            if (ViewModels.Profiles.profiles.dataSource.list.length === 0) {
                var message = document.getElementById("no-layout-responsive-container");
                message.style.display = "block";
            }

            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("user-login", username, authCode);
            vault.add(credential);
        }, function (error) {
            var object = JSON.parse(error.responseText);
            var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
            messageDialog.showAsync();
        });
    }

    var login = function () {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var authCode = Crypto.sha1(password);
        authCode = Crypto.sha1(password);
        ViewModels.Users.login(username, authCode).then(function () {
            var loginForm = document.getElementById("login-form");
            loginForm.style.display = "none";
            var profilesList = document.getElementById("profiles-list");
            profilesList.style.display = "block";
            profilesList.winControl.forceLayout();
            if (ViewModels.Profiles.profiles.dataSource.list.length === 0) {
                var message = document.getElementById("no-layout-responsive-container");
                message.style.display = "block";
            }

            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("user-login", username, authCode);
            vault.add(credential);
        }, function (error) {
            console.log(error);
            var object = JSON.parse(error.responseText);
            var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
            messageDialog.showAsync();
        });
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