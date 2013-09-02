/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="dataLayer.js" />

(function () {
    var profiles = new WinJS.Binding.List([]);

    var loadProfiles = function () {
        Data.Profiles.getProfiles().then(function (request) {
            var object = JSON.parse(request.responseText);
            var profileDTOs = object;
            var currentCount = profiles.dataSource.list.length
            profiles.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < profileDTOs.length; i++) {
                var newModel = new Models.ProfileModel(
                    profileDTOs[i].Id,
                    profileDTOs[i].Name,
                    profileDTOs[i].BirthDay,
                    profileDTOs[i].Gender,
                    profileDTOs[i].Mother,
                    profileDTOs[i].Father,
                    "#",
                    profileDTOs[i].TownOfBirth,
                    profileDTOs[i].BirthWeight,
                    profileDTOs[i].Height);

                profiles.push(newModel);
            }

            // must think how to load images correctly
        });
    }

    var addProfile = function (id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height) {
        return new WinJS.Promise(function (complete, error) {
            Data.Profiles.addProfile(new Models.ProfileModel(id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height)).then(function (request) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The profile is successfully registered.");
                messageDialog.showAsync().done(function () {
                    complete();
                });
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The profile is not registered.");
                messageDialog.showAsync().done(function () {
                    error("Try again");
                });
            });
        });
    }

    var events = new WinJS.Binding.List([]);

    var loadEvents = function () {
        var eventDTOs = Data.Events.getEvents();

        var currentCount = events.dataSource.list.length
        events.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < eventDTOs.length; i++) {
            events.push(eventDTOs[i]);
        }

        if (eventDTOs.length > 0) {
            return true;
        }

        return false;
    }

    var login = function (username, authCode) {
        return new WinJS.Promise(function (complete, error) {
            Data.Users.login(username, authCode).then(function (request) {
                var user = JSON.parse(request.responseText);
                UserLoginData.setData(new Models.UserLoggedModel(
                    {
                        id: user.id,
                        nickname: user.nickname,
                        sessionKey: user.sessionKey,
                    }));
                complete();
            }, function (innerError) {
                error(innerError);
            });
        });
    }

    var register = function (username, nickname, authCode, email) {
        return new WinJS.Promise(function (complete, error) {
            Data.Users.register(username, nickname, authCode, email).then(function (request) {
                var user = JSON.parse(request.responseText);
                UserLoginData.setData(new Models.UserLoggedModel(
                    {
                        id: user.id,
                        nickname: user.nickname,
                        sessionKey: user.sessionKey,
                    }));
                complete();
            }, function (innerError) {
                error(innerError);
            });
        });
    }

    var logout = function () {
        Data.Users.logout();
    }

    WinJS.Namespace.define("ViewModels");

    WinJS.Namespace.defineWithParent(ViewModels, "Profiles", {
        loadProfiles: loadProfiles,
        profiles: profiles,
        addProfile: addProfile
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Events", {
        loadEvents: loadEvents,
        events: events,
        addEvent: function (id, title, date, description, pictures) {
            Data.Events.addEvent(new Models.EventModel(id, title, date, description, pictures));
        }
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Users", {
        login: login,
        register: register,
        logout:logout
    })
})();