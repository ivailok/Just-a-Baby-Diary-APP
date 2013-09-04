/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detailBabyProfile/detailBabyProfile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {
          
        },

        ready: function (element, options) {
            var currentProfileIndex = options.indexInProfilesList;
            DetailProfileCodeBehind.currentProfileIndex = currentProfileIndex;
            var currProfile = ViewModels.Profiles.profiles.getAt(currentProfileIndex);
            WinJS.Binding.processAll(element, currProfile);
            DetailProfileCodeBehind.loadEvents(currentProfileIndex);
            var events = ViewModels.Events.events;
            WinJS.Binding.processAll(document.getElementById("basicListView"), events);

            var listView = document.getElementById("basicListView").winControl;
            listView.oniteminvoked = function (invokeEvent) {
                WinJS.Navigation.navigate("/pages/detailBabyEvent/detailBabyEventl.html", {
                    indexInProfilesList: currentProfileIndex,
                    indexInEventsList: invokeEvent.detail.itemIndex
                });
            }
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
