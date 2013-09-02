/// <reference path="dataLoader.js" />
/// <reference path="models.js" />
(function () {
    var sampleImg = "http://icons.iconarchive.com/icons/dapino/baby-boy/128/baby-idea-icon.png";

    var profiles = [
        new Models.ProfileModel("", "Baby1", new Date(), "Female", "mother", "father", sampleImg, "town", 3, 50),
        new Models.ProfileModel("", "Baby2", new Date(), "Male", "mother", "father", sampleImg, "town", 4, 52)
    ]

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

    var getEvents = function () {
        return events;
    }

    var addEvent = function (eventModel) {
        events.push(eventModel);
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