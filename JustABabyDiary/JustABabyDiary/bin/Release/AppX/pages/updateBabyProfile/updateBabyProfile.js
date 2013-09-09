// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/updateBabyProfile/updateBabyProfile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var currentProfileIndex = options.currentProfileIndex;
            WinJS.Binding.processAll(element, ViewModels.Profiles.profiles.getAt(currentProfileIndex));
            var birthdayChangeBtn = document.getElementById("birthday-change");
            birthdayChangeBtn.addEventListener("click", UpdateProfileCodeBehind.changeBirthday);

            var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;

            var image = "";

            var imageHolder = document.getElementById("profile-image");

            var imageLoader = document.getElementById("image-loader");
            imageLoader.addEventListener("click", function () {
                var menu = document.getElementById("picture-menu").winControl;
                menu.show(imageLoader);
            });

            var takePicBtn = document.getElementById("take-picture");
            takePicBtn.addEventListener("click", function () {
                var captureUI = new Windows.Media.Capture.CameraCaptureUI();
                captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                    if (capturedItem) {
                        var fileUrl = URL.createObjectURL(capturedItem);
                        var token = storagePermissions.futureAccessList.add(capturedItem);
                        imageHolder.src = fileUrl;
                        image = capturedItem.path;
                    }
                    //else {
                    //    document.getElementById("message").innerHTML = "User didn't capture a photo."
                    //}
                });
            })

            var uploadPic = document.getElementById("upload-picture");
            uploadPic.addEventListener("click", function () {
                var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
                filePicker.commitButtonText = "Load image";
                filePicker.fileTypeFilter.append(".jpg");
                filePicker.fileTypeFilter.append(".png");
                filePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
                filePicker.pickSingleFileAsync().then(function (file) {
                    if (file) {
                        var fileUrl = URL.createObjectURL(file);
                        var token = storagePermissions.futureAccessList.add(file);
                        imageHolder.src = fileUrl;
                        image = file.path;
                    }
                }, function (error) {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("The selected image failed to load properly.");
                    messageDialog.showAsync();
                });
            });

            var updateBtn = document.getElementById("update-profile-button");
            updateBtn.addEventListener("click", function () {
                var name = document.getElementById("name-input").value;
                var date = document.getElementById("birthday-date-input").winControl.current;
                var time = document.getElementById("birthday-time-input").winControl.current;
                var birthDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                var gender = document.getElementById("gender-input").value;
                var mother = document.getElementById("mother-input").value;
                var father = document.getElementById("father-input").value;
                var townOfBirth = document.getElementById("town-input").value;
                var height = parseInt(document.getElementById("height-input").value);
                var weight = parseInt(document.getElementById("weight-input").value);
                var imageUrl = image;

                var correctDateFormat = null;

                if (name === "" || name === undefined) {
                    name = null;
                }

                if (document.getElementById("birthday-input").style.display === "none") {
                    birthDate = null;
                }
                else {
                    correctDateFormat = birthDate.toLocaleDateString() + " " + birthDate.toLocaleTimeString();
                }

                if (birthDate === "" || birthDate === undefined) {
                    birthDate = null;
                }

                if (gender === "" || gender === undefined) {
                    gender = null;
                }

                if (mother === "" || mother === undefined) {
                    mother = null;
                }

                if (father === "" || father === undefined) {
                    father = null;
                }

                if (townOfBirth === "" || townOfBirth === undefined) {
                    townOfBirth = null;
                }

                if (height === undefined || height === NaN) {
                    height = 0;
                }

                if (weight === undefined || weight === NaN) {
                    weight = 0;
                }

                if (imageUrl === "" || imageUrl === undefined) {
                    imageUrl = null;
                }

                ViewModels.Profiles.updateProfile(currentProfileIndex, name, correctDateFormat, gender, mother, father, imageUrl, townOfBirth, weight, height).then(function () {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("Baby profile successfully updated.");
                    messageDialog.showAsync().then(function () {
                        WinJS.Navigation.back();
                    });
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
