/// <reference path="../../js/dataLayer.js" />
/// <reference path="../../js/viewModels.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var goBackToProfile = function () {
        WinJS.Navigation.back();
    }

    var createEvent = function (currentProfileIndex, title, eventDate, description, images) {
        ViewModels.Events.addEvent(currentProfileIndex, new Models.EventModel("", title, eventDate, description, images)).then(function () {
            goBackToProfile();
        }, function (error) {
            var object = JSON.parse(error.responseText);
            var messageDialog = new Windows.UI.Popups.MessageDialog(object.Message);
            messageDialog.showAsync();
        });
    }

    WinJS.Namespace.define("AddEventCodeBehind", {
        createEvent: createEvent
    });
})();