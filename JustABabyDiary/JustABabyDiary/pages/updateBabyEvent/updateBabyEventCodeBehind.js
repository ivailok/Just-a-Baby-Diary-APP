/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var showChangeDateInput = function () {
        var dateInput = document.getElementById("date-input");
        dateInput.style.display = "block";
    }

    WinJS.Namespace.define("UpdateBabyCodeBehind", {
        showChangeDateInput: showChangeDateInput
    });
})();