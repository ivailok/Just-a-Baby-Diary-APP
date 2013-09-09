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
            var indexInProfilesList = options.indexInProfilesList;
            WinJS.Binding.processAll(element, ViewModels.Events.events.getAt(indexInEventsList));
            var dateChangeBtn = document.getElementById("date-change");
            dateChangeBtn.addEventListener("click", UpdateBabyCodeBehind.showChangeDateInput);

            var updateBtn = document.getElementById("update-event-button");
            
            updateBtn.addEventListener("click", function () {
                var titleInput = document.getElementById("title-input").value;
                var date = document.getElementById("event-date-input").winControl.current;
                var time = document.getElementById("event-time-input").winControl.current;
                var dateInput = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
                var descriptionInput = document.getElementById("description-textarea").value;

                var correctDateFormat = null;

                if (titleInput === "" || titleInput === undefined) {
                    titleInput = null;
                }

                if (document.getElementById("date-input").style.display === "none") {
                    dateInput = null;
                }
                else {
                    correctDateFormat = dateInput.toLocaleDateString() + " " + dateInput.toLocaleTimeString();
                }

                if (dateInput === "" || dateInput === undefined) {
                    dateInput = null;
                }

                if (descriptionInput === "" || descriptionInput === undefined) {
                    descriptionInput = null;
                }

                ViewModels.Events.updateEvent(indexInProfilesList, indexInEventsList, titleInput, correctDateFormat, descriptionInput).then(function () {
                    var messageDialog = new Windows.UI.Popups.MessageDialog("Baby event successfully updated");
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
