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
        }, function (error) {
            var object = JSON.parse(error.responseText);
            var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
            messageDialog.showAsync();
        });
    }

    WinJS.Namespace.define("RegisterCodeBehind", {
        register: register
    });
})();