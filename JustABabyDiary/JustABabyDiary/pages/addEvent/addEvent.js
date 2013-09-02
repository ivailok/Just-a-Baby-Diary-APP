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

            var images = [];
            var createEventButton = document.getElementById("create-event-button");
            createEventButton.addEventListener("click", function () {
                console.log("here");
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

            // TODO: Respond to changes in viewState.
        }
    });
})();
