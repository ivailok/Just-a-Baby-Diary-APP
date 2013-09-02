/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="../../js/viewModels.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/addProfile/addProfile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;

            var profileImage = document.getElementById("profile-image");
            var imagePath;

            var loadButton = document.getElementById("image-loader");
            loadButton.addEventListener("click", function () {
                var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
                filePicker.commitButtonText = "Load image";
                filePicker.fileTypeFilter.append(".jpg");
                filePicker.fileTypeFilter.append(".png");
                filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
                filePicker.pickSingleFileAsync().then(function (file) {
                    var fileUrl = URL.createObjectURL(file);
                    var token = storagePermissions.futureAccessList.add(file);
                    profileImage.src = fileUrl;
                    imagePath = file.path;
                }, function (error) {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("The selected image failed to load properly.");
                    messageDialog.showAsync();
                });
            });

            var submitButton = document.getElementById("create-profile-button");
            submitButton.addEventListener("click", function () {
                var name = document.getElementById("name-input").value;
                var date = document.getElementById("birthday-date-input").winControl.current;
                var time = document.getElementById("birthday-time-input").winControl.current;
                var birthDate = new Date(date.getYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                var gender = document.getElementById("gender-input").value;
                var mother = document.getElementById("mother-name-input").value;
                var father = document.getElementById("father-name-input").value;
                var townOfBirth = document.getElementById("town-of-birth-input").value;
                var height = parseInt(document.getElementById("height-input").value);
                var weight = parseInt(document.getElementById("weight-input").value);
                var imageUrl = imagePath;
                ViewModels.Profiles.addProfile("", name, birthDate, gender, mother, father, imageUrl, townOfBirth, weight, height).then(function () {
                    AddProfileCodeBehind.goToHomePage();
                }, function (error) {
                });

            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
