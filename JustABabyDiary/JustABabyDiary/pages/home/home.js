/// <reference path="homeCodeBehind.js" />
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
                    // Retrieves the actual userName and password.
                    username = credential.current.userName;
                    authCode = vault.retrieve("babyDiary", username).password;

                    var data = UserLoginData.getData();
                    if (!data) {
                        ViewModels.Users.login(username, authCode).then(function () {
                            HomeCodeBehind.callLoadProfiles();
                        });
                    }
                }
            } catch (WinRTError) {
                HomeCodeBehind.goToLoginPage();
            }

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
