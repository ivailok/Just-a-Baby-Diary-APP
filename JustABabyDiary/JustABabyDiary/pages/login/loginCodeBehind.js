/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var login = function () {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var authCode = Crypto.sha1(password);
        authCode = Crypto.sha1(password);
        ViewModels.Users.login(username, authCode).then(function () {
            var vault = Windows.Security.Credentials.PasswordVault();
            var credential = Windows.Security.Credentials.PasswordCredential("babyDiary", username, authCode);
            vault.add(credential);
            goBackToHomePage();
        }, function (error) {
            console.log(error);
            var object = JSON.parse(error.responseText);
            var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
            messageDialog.showAsync();
        });
    }

    var goBackToHomePage = function () {
        WinJS.Navigation.back();
    }

    var goToRegisterPage = function () {
        WinJS.Navigation.navigate("/pages/register/register.html");
    }

    WinJS.Utilities.markSupportedForProcessing(goToRegisterPage);

    WinJS.Namespace.define("LoginCodeBehind", {
        login: login,
        goToRegisterPage: goToRegisterPage
    });
})();