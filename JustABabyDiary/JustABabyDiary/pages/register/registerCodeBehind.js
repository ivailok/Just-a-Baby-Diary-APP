﻿/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var register = function () {
        var username = document.getElementById("register-username").value;
        var nickname = document.getElementById("nickname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("register-password").value;
        var authCode = Crypto.sha1(password);
        ViewModels.Users.register(username, nickname, authCode, email).then(function () {
            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("babyDiary", username, authCode);
            vault.add(credential);
            var messageDialog = new Windows.UI.Popups.MessageDialog("User created and logged in successfully!");
            messageDialog.showAsync().then(goBackToHomePage);
        }, function (error) {
            if (error.responseText) {
                var object = JSON.parse(error.responseText);
                var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
                messageDialog.showAsync();
            }
            else {
                var message = new Windows.UI.Popups.MessageDialog("Unable to get data. Check your internet connection.");
                message.showAsync();
            }
        });
    }

    var goBackToHomePage = function () {
        HomeCodeBehind.callLoadProfiles();
        WinJS.Navigation.back(2).then(function () {
            if (ViewModels.Profiles.profiles.dataSource.list.length == 0) {
                document.getElementById("no-layout-responsive-message").style.display = "block";
            }
        });
    }

    WinJS.Namespace.define("RegisterCodeBehind", {
        register: register
    });
})();