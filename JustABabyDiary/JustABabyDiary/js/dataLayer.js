/// <reference path="dataLoader.js" />
/// <reference path="models.js" />
(function () {
    var sampleImg = "http://icons.iconarchive.com/icons/dapino/baby-boy/128/baby-idea-icon.png";

    var events = [
        new Models.EventModel("", "Title1", new Date(), "desc1", [sampleImg, sampleImg]),
        new Models.EventModel("", "Title2", new Date(), "desc2", [sampleImg, sampleImg]),
    ]

    var getProfiles = function () {
        //return profiles;

        return Loader.Profiles.getProfiles();
    }

    var addProfile = function (profileModel) {
        //profiles.push(profileModel);

        return Loader.Profiles.addProfile(profileModel);
    }

    var getEvents = function (id) {
        return Loader.Events.getEvents(id);
    }

    var addEvent = function (id, eventModel) {
        return Loader.Events.addEvent(id, eventModel);
    }

    var login = function (username, authCode) {
        return Loader.Users.login(username, authCode);
    }

    var register = function (username, nickname, authCode, email) {
        return Loader.Users.register(username, nickname, authCode, email);
    }

    var logout = function () {
        return Loader.Users.logout();
    }

    WinJS.Namespace.define("Data");

    WinJS.Namespace.defineWithParent(Data, "Profiles", {
        getProfiles: getProfiles,
        addProfile: addProfile
    });

    WinJS.Namespace.defineWithParent(Data, "Events", {
        addEvent: addEvent,
        getEvents: getEvents
    });

    WinJS.Namespace.defineWithParent(Data, "Users", {
        register: register,
        login: login,
        logout: logout
    });
})()