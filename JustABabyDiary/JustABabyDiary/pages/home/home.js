/// <reference path="homeCodeBehind.js" />

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

        }
    });
})();
