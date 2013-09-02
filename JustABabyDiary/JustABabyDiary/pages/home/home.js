﻿/// <reference path="homeCodeBehind.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    "use strict";
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        init: function (element, options) {
            HomeCodeBehind.callLoadProfiles();
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
                var credential = vault.findAllByResource("user-login").first();
                if (credential != null) {
                    // Retrieves the actual userName and password.
                    username = credential.current.userName;
                    authCode = vault.retrieve("user-login", username).password;
                    ViewModels.Users.login(username, authCode);
                    if (ViewModels.Profiles.profiles.dataSource.list.length === 0) {
                        var message = document.getElementById("no-layout-responsive-container");
                        message.style.display = "block";
                    }
                }
            } catch (WinRTError) {
                var listWithProfiles = document.getElementById("profiles-list");
                listWithProfiles.style.display = "none";
                var message = document.getElementById("no-layout-responsive-container");
                message.style.display = "none";
                var loginForm = document.getElementById("login-form");
                loginForm.style.display = "block";

                var loginBtn = document.getElementById("login-button");
                loginBtn.addEventListener("click", HomeCodeBehind.login);

                var showRegisterBtn = document.getElementById("show-register-form-button");
                showRegisterBtn.addEventListener("click", HomeCodeBehind.showRegister);

                var registerBtn = document.getElementById("register-button");
                registerBtn.addEventListener("click", HomeCodeBehind.register);

                var appBar = document.getElementById("home-app-bar");
                if (appBar) {
                    appBar.style.display = "none";
                }
            }


            var createButton = document.getElementById("create-new-profile-button");
            createButton.addEventListener("click", function () {
                HomeCodeBehind.goToProfileAddPage();
            });
        }
    });
})();
