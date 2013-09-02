/// <reference path="../../js/viewModels.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var indexInEventsList = 0;

    var addPicture = function () {

    }

    var removePicture = function () {

    }

    var updateEvent = function () {
        WinJS.Navigation.navigate("/pages/updateBabyEvent/updateBabyEvent.html",
            { indexInEventsList: indexInEventsList });
    }

    WinJS.Namespace.define("DetailEventCodeBehind", {
        indexInEventsList: indexInEventsList,
        addPicture: addPicture,
        removePicture: removePicture,
        updateEvent: updateEvent
    });
})();