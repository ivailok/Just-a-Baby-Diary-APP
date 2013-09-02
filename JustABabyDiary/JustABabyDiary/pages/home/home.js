﻿/// <reference path="homeCodeBehind.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    "use strict";
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        init: function (element, options)
        {
            //var vault = new Windows.Security.Credentials.PasswordVault();

            //var username, authCode;

            //try {
            //    var credential = vault.findAllByResource("babyDiary").first();
            //    if (credential != null) {
            //        // Retrieves the actual userName and password.
            //        username = credential.current.userName;
            //        authCode = vault.retrieve("babyDiary", username).password;

            //        if (!UserLoginData.getData()) {
            //            ViewModels.Users.login(username, authCode);
            //        }
            //    }
            //} catch (WinRTError) {
            //    // navigate to login page
                
            //    HomeCodeBehind.goToLoginPage();
            //}

            //HomeCodeBehind.callLoadProfiles();
        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            //if (result === true) {
            //    var element = document.getElementById("no-layout-responsive-message");
            //    element.style.visibility = "collapse";
            //}

            HomeCodeBehind.goToLoginPage();

            //HomeCodeBehind.goToProfileAddPage();

            if (ViewModels.Profiles.profiles.dataSource.list.length === 0) {
                var message = document.getElementById("no-layout-responsive-container");
                message.style.display = "block";
            }

            var createButton = document.getElementById("create-new-profile-button");
            createButton.addEventListener("click", function () {
                HomeCodeBehind.goToProfileAddPage();
            });
        }
    });
})();
