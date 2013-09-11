/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var changeBirthday = function () {
        var birthdayInput = document.getElementById("update-birthday-input");
        birthdayInput.style.display = "block";
    }

    WinJS.Namespace.define("UpdateProfileCodeBehind", {
        changeBirthday: changeBirthday
    });
})();