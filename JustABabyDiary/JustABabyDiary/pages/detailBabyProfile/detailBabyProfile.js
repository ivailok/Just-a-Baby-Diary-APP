/// <reference path="../../js/viewModels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detailBabyProfile/detailBabyProfile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init:function(element, options){
            ViewModels.Event.loadEvents();
        },

        ready: function (element, options) {
            WinJS.Binding.processAll(element,
                  ViewModels.Profiles.profiles.getAt(options.indexInProfilesList));
            var events = ViewModels.Event.events;
            WinJS.Binding.processAll(document.getElementById("basicListView"),events);
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
