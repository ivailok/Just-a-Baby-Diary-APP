// For an introduction to the Page Control template, see the following documentation:
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
            AddEventCodeBehind.clearImagesList();

            var createEventButton = document.getElementById("create-event-button");
            createEventButton.addEventListener("click", function () {
                var title = document.getElementById("title-input").value;
                var date = document.getElementById("event-date-input").winControl.current;
                var time = document.getElementById("event-time-input").winControl.current;
                var eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                var description = document.getElementById("description-input").value;

                var correctDateFormat = eventDate.toLocaleDateString() + " " + eventDate.toLocaleTimeString();

                AddEventCodeBehind.createEvent(currentProfileIndex, title, correctDateFormat, description, images);
            });

            var loadButton = document.getElementById("image-loader");
            loadButton.addEventListener("click", function () {
                var menu = document.getElementById("picture-menu").winControl;
                menu.show(loadButton);
            });

            var takePicBtn = document.getElementById("take-picture");
            takePicBtn.addEventListener("click", function () {
                var captureUI = new Windows.Media.Capture.CameraCaptureUI();
                captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                    if (capturedItem) {
                        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                        savePicker.commitButtonText = "Save image";
                        savePicker.suggestedFileName = "My image";
                        savePicker.fileTypeChoices.insert("Camera image", [".jpg"]);

                        savePicker.pickSaveFileAsync().then(function (file) {
                            capturedItem.moveAndReplaceAsync(file).then(function () {
                                var fileUrl = URL.createObjectURL(capturedItem);
                                var token = storagePermissions.futureAccessList.add(capturedItem);

                                AddEventCodeBehind.addImage({ "UrlName": fileUrl });
                                images.push({ "UrlName": capturedItem.path });
                            });
                        });
                    }
                    //else {
                    //    document.getElementById("message").innerHTML = "User didn't capture a photo."
                    //}
                });
            })

            var uploadPic = document.getElementById("upload-picture");
            uploadPic.addEventListener("click", function () {
                var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
                filePicker.commitButtonText = "Load pictures";
                filePicker.fileTypeFilter.append(".jpg");
                filePicker.fileTypeFilter.append(".png");
                filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
                filePicker.pickMultipleFilesAsync().then(function (files) {
                    for (var i = 0; i < files.length; i++) {
                        var currentFile = files.getAt(i);
                        if (currentFile) {
                            var fileUrl = URL.createObjectURL(currentFile);
                            var token = storagePermissions.futureAccessList.add(currentFile);

                            AddEventCodeBehind.addImage({ "UrlName": fileUrl });
                            images.push({ "UrlName": currentFile.path });
                        }
                    }
                }, function (error) {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("The selected images failed to load properly.");
                    messageDialog.showAsync();
                });
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
