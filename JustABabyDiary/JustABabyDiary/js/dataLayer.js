/// <reference path="dataLoader.js" />
/// <reference path="models.js" />
(function () {
    var sampleImg = "http://icons.iconarchive.com/icons/dapino/baby-boy/128/baby-idea-icon.png";

    var getProfiles = function () {
        //return profiles;

        return Loader.Profiles.getProfiles();
    }

    var addProfile = function (profileModel) {
        //profiles.push(profileModel);

        return Loader.Profiles.addProfile(profileModel);
    }

    var updateProfile = function (oldName, profileModel) {
        return Loader.Profiles.updateProfile(oldName, profileModel);
    }

    var getEvents = function (id) {
        return Loader.Events.getEvents(id);
    }

    var addEvent = function (id, eventModel) {
        return Loader.Events.addEvent(id, eventModel);
    }

    var updateEvent = function (babyProfileId, eventId, eventModel) {
        return Loader.Events.updateEvent(babyProfileId, eventId, eventModel);
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
        addProfile: addProfile,
        updateProfile: updateProfile
    });

    WinJS.Namespace.defineWithParent(Data, "Events", {
        addEvent: addEvent,
        getEvents: getEvents,
        updateEvent: updateEvent
    });

    WinJS.Namespace.defineWithParent(Data, "Users", {
        register: register,
        login: login,
        logout: logout
    });
})()