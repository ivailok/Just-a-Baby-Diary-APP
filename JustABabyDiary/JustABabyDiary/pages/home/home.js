/// <reference path="homeCodeBehind.js" />
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

            var username, password;

            try {
                var credential = vault.findAllByResource("login").first();
                if (credential != null) {
                    // Retrieves the actual userName and password.
                    username = credential.current.userName;
                    password = vault.retrieve("login", username).password;

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

                var registerBtn = document.getElementById("register-button");
                registerBtn.addEventListener("click", HomeCodeBehind.register);
              
            }


            var createButton = document.getElementById("create-new-profile-button");
            createButton.addEventListener("click", function () {
                HomeCodeBehind.goToProfileAddPage();
            });

            var saveToVaultButton = document.getElementById("save-to-vault");
            
        }
    });
})();
