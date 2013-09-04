/// <reference path="../../js/viewModels.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var indexInEventsList = 0;

    var indexInProfilesList = 0;

    var addPicture = function () {
        var currentLoadedImagePath;
            var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
            filePicker.commitButtonText = "Load image";
            filePicker.fileTypeFilter.append(".jpg");
            filePicker.fileTypeFilter.append(".png");
            filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
            filePicker.pickSingleFileAsync().then(function (file) {
                if (file) {
                    var token = storagePermissions.futureAccessList.add(file);
                    currentLoadedImagePath = file.path;
                }
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The selected image failed to load properly.");
                messageDialog.showAsync();
            });
    }

    var removePicture = function () {
        
    }

    var updateEvent = function () {
        WinJS.Navigation.navigate("/pages/updateBabyEvent/updateBabyEvent.html",
            {
                indexInEventsList: indexInEventsList,
                indexInProfilesList: indexInProfilesList
            });
    }

    WinJS.Namespace.define("DetailEventCodeBehind", {
        indexInEventsList: indexInEventsList,
        indexInProfilesList: indexInProfilesList,
        addPicture: addPicture,
        removePicture: removePicture,
        updateEvent: updateEvent
    });
})();