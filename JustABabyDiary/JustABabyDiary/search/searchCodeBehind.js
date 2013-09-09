/// <reference path="../js/viewModels.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var goToDetailEventPage = function (event) {
        var currentIndex=event.detail.itemIndex;
        var evntDetails = ViewModels.Search.searchEvnt.dataSource.list.getAt(currentIndex);
        var allEvents=ViewModels.Events.events;
        for (var i = 0; i < allEvents.length; i++) {
            if (allEvents.dataSource.list.getAt(i).title==evntDetails.title) {
                WinJS.Navigation.navigate("/pages/detailBabyEvent/detailBabyEventl.html", { indexInEventsList: i });
            }
        }
      
    }

    WinJS.Utilities.markSupportedForProcessing(goToDetailEventPage);

    WinJS.Namespace.define("SearchCodeBehind", {
        goToDetailEventPage: goToDetailEventPage
    });
})();