/// <reference path="homeCodeBehind.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    "use strict";
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        
        init: function (element, options)
        {
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
            var credential = vault.findAllByResource("login").first();
            if (credential != null)
            {
                // Retrieves the actual userName and password.
                username = credential.current.userName;
                password = vault.retrieve("login", username).password;

                var usernameField = document.getElementById("username");
                var passwordField = document.getElementById("password");
                usernameField.innerText = username;
                passwordField.innerText = password;
            }

            var createButton = document.getElementById("create-new-profile-button");
            createButton.addEventListener("click", function () {
                HomeCodeBehind.goToProfileAddPage();
            });

            var saveToVaultButton = document.getElementById("save-to-vault");
            saveToVaultButton.addEventListener("click", function () {
                var credential = new Windows.Security.Credentials.PasswordCredential("login", "username", "something");
                vault.add(credential);
            });
        }
    });
})();
