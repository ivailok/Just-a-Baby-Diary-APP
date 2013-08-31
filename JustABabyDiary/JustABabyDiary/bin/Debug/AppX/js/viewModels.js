/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="dataLayer.js" />

(function () {
    var profiles = new WinJS.Binding.List([]);

    var loadProfiles = function () {
        var profileDTOs = Data.getProfiles();

        var currentCount = profiles.dataSource.list.length
        profiles.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < profileDTOs.length; i++) {
            profiles.push(profileDTOs[i]);
        }
    }

    var events = new WinJS.Binding.List([]);

    var loadEvents = function () {
        var eventDTOs = Data.getProfiles();

        var currentCount = events.dataSource.list.length
        events.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < eventDTOs.length; i++) {
            events.push(eventDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels");

    WinJS.Namespace.defineWithParent(ViewModels, "Profiles", {
        loadProfiles: loadProfiles,
        profiles: profiles,
        addProfile: function (id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height) {
            Data.addProfile(new Models.ProfileModel(id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height));
        }
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Event", {
        loadEvents: loadEvents,
        events: events,
        addEvent: function (id, title, date, description, pictures) {
            Data.addEvent(new Models.ProfileModel(id, title, date, description, pictures));
        }
    });
})();