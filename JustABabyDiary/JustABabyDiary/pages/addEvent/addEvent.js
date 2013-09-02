﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/addEvent/addEvent.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var currentProfileIndex = options.currentProfileIndex;
            WinJS.Binding.processAll(element, ViewModels.Profiles.profiles.getAt(currentProfileIndex));

            var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;

            var images = [];
            var currentLoadedImagePath;
            var eventImage = document.getElementById("event-image");
            var imageLoader = document.getElementById("image-loader");
            imageLoader.addEventListener("click", function () {
                var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
                filePicker.commitButtonText = "Load image";
                filePicker.fileTypeFilter.append(".jpg");
                filePicker.fileTypeFilter.append(".png");
                filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
                filePicker.pickSingleFileAsync().then(function (file) {
                    var fileUrl = URL.createObjectURL(file);
                    var token = storagePermissions.futureAccessList.add(file);
                    eventImage.src = fileUrl;
                    currentLoadedImagePath = file.path;
                }, function (error) {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("The selected image failed to load properly.");
                    messageDialog.showAsync();
                });
            });

            var imageAttacher = document.getElementById("image-attacher");
            imageAttacher.addEventListener("click", function () {
                AddEventCodeBehind.addImage({ "UrlName": eventImage.src });
                images.push({ "UrlName": currentLoadedImagePath });
            });

            var createEventButton = document.getElementById("create-event-button");
            createEventButton.addEventListener("click", function () {
                var title = document.getElementById("title-input").value;
                var date = document.getElementById("event-date-input").winControl.current;
                var time = document.getElementById("event-time-input").winControl.current;
                var eventDate = new Date(date.getYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                var description = document.getElementById("description-input").value;
                AddEventCodeBehind.createEvent(currentProfileIndex, title, eventDate, description, images);
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            
            // TODO: Respond to changes in viewState
        }
    });
})();
