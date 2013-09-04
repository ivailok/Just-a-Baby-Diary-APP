// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detailBabyEvent/detailBabyEventl.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var indexInEventsList = options.indexInEventsList;
            DetailEventCodeBehind.indexInEventsList = indexInEventsList;
            var indexInProfilesList = options.indexInProfilesList;
            DetailEventCodeBehind.indexInProfilesList = options.indexInProfilesList;
            WinJS.Binding.processAll(element, ViewModels.Events.events.getAt(indexInEventsList));
            ViewModels.Events.loadPictures(indexInEventsList);

            var addPictureBtn = document.getElementById("add-picture");
            addPictureBtn.addEventListener("click", DetailEventCodeBehind.addPicture);

            var removePictureBtn = document.getElementById("remove-picture");
            removePictureBtn.addEventListener("click", DetailEventCodeBehind.removePicture);

            var updateEventBtn = document.getElementById("update-event");
            updateEventBtn.addEventListener("click", function () {
                WinJS.Navigation.navigate("/pages/updateBabyEvent/updateBabyEvent.html", {
                    indexInEventsList: indexInEventsList,
                    indexInProfilesList: indexInProfilesList
                });
            });

            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.addEventListener("datarequested", dataRequested);
            document.getElementById("shareButton").addEventListener("click", showShareUI, false);
        },

        unload: function () {
            var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
            dataTransferManager.removeEventListener("datarequested", dataRequested);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    function dataRequested(e) {
        var request = e.request;

        // Title is required
        var dataPackageTitle = document.getElementById("title").innerText;
        if ((typeof dataPackageTitle === "string") && (dataPackageTitle !== "")) {
            var dataPackageText = document.getElementById("description").innerText;
            if ((typeof dataPackageText === "string") && (dataPackageText !== "")) {
                request.data.properties.title = dataPackageTitle;

                // The description is optional.
                var dataPackageDescription = document.getElementById("date").value;
                if ((typeof dataPackageDescription === "string") && (dataPackageDescription !== "")) {
                    request.data.properties.description = dataPackageDescription;
                }
                request.data.setText(dataPackageText);
            } else {
                request.failWithDisplayText("Enter the text you would like to share and try again.");
            }
        } else {
            request.failWithDisplayText(SdkSample.missingTitleError);
        }
    }

    function showShareUI() {
        Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
    }
})();
