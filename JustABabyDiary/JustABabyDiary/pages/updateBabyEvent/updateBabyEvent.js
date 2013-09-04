/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/updateBabyEvent/updateBabyEvent.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var indexInEventsList = options.indexInEventsList;
            WinJS.Binding.processAll(element, ViewModels.Events.events.getAt(indexInEventsList));
            var dateChangeBtn = document.getElementById("date-change");
            dateChangeBtn.addEventListener("click", UpdateBabyCodeBehind.showChangeDateInput);

            var updateBtn = document.getElementById("update-profile-button");
            var titleInput = document.getElementById("title-input").value;
            var dateInput = document.getElementById("date-input").value;
            var descriptionInput = document.getElementById("description-textarea").value;

            updateBtn.addEventListener("click", function () {
                if (titleInput=="") {
                    titleInput = null;
                }
                if (dateInput=="") {
                    dateInput = null;
                }
                if (descriptionInput=="") {
                    descriptionInput = null;
                }
                ViewModels.Events.updateEvent(indexInEventsList, titleInput, dateInput, descriptionInput);
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
