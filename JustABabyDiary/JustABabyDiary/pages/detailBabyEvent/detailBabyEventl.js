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
            WinJS.Binding.processAll(element, ViewModels.Events.events.getAt(indexInEventsList));
            if (ViewModels.Events.pictures.dataSource.list.length===0) {
                ViewModels.Events.loadPictures(indexInEventsList);
            }

            var addPictureBtn = document.getElementById("add-picture");
            addPictureBtn.addEventListener("click", DetailEventCodeBehind.addPicture);

            var removePictureBtn = document.getElementById("remove-picture");
            removePictureBtn.addEventListener("click", DetailEventCodeBehind.removePicture);

            var updateEventBtn = document.getElementById("update-event");
            updateEventBtn.addEventListener("click", DetailEventCodeBehind.updateEvent);
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
