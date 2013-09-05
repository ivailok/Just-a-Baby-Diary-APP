﻿/// <reference path="homeCodeBehind.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    "use strict";
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
      
        init: function () {
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            //if (result === true) {
            //    var element = document.getElementById("no-layout-responsive-message");
            //    element.style.visibility = "collapse";
            //}

            var vault = new Windows.Security.Credentials.PasswordVault();

            var username, authCode;

            try {
                var credential = vault.findAllByResource("babyDiary").first();
                if (credential != null) {
                    var appBar = document.getElementById("app-bar-container");
                    appBar.style.display = "block";

                    var loginFormBtn = document.getElementById("go-to-login");
                    loginFormBtn.style.display = "none";
                    // Retrieves the actual userName and password.
                    username = credential.current.userName;
                    authCode = vault.retrieve("babyDiary", username).password;

                    var data = UserLoginData.getData();
                    if (!data.sessionKey) {
                        ViewModels.Users.login(username, authCode).then(function () {
                            HomeCodeBehind.callLoadProfiles();
                        });
                    }

                    if (ViewModels.Profiles.profiles.dataSource.list.length === 0) {
                        var message = document.getElementById("no-layout-responsive-container");
                        message.style.display = "block";
                    }
                }
            } catch (WinRTError) {
                var appBar = document.getElementById("app-bar-container");
                appBar.style.display = "none";

                var logoutBtn = document.getElementById("log-out-button");
                logoutBtn.style.display = "none";

                HomeCodeBehind.goToLoginPage();
               
            }

            var logOutBtn = document.getElementById("log-out-button");
            logOutBtn.addEventListener("click", function () {
                ViewModels.Users.logout().then(function () {
                    var vault = Windows.Security.Credentials.PasswordVault();
                    var credetential = vault.retrieve("babyDiary", username);
                    vault.remove(credetential);
                    WinJS.Navigation.navigate("/pages/login/login.html");
                }, function (error) {
                    var object = JSON.parse(error.responseText);
                    var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
                    messageDialog.showAsync();
                });
            });
        }

     
    });
})();
