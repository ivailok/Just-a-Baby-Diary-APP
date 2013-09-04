/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="imageLoader.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="dataLayer.js" />

(function () {
    // profile func
    var profiles = new WinJS.Binding.List([]);

    var loadProfileImage = function (value, index, array) {
        Windows.Storage.StorageFile.getFileFromPathAsync(value.path).then(function (file) {
            var url = URL.createObjectURL(file);
            value.imgUrl = url;
            profiles.dataSource.list.setAt(index, value);
        }, function () {
            value.imgUrl = "/images/baby-idea-icon.png";
            profiles.dataSource.list.setAt(index, value);
        });
    }

    var loadProfiles = function () {
        if (profiles.length != 0) {
            while (profiles.length > 0) {
                profiles.pop();
            }
        }

        Data.Profiles.getProfiles().then(function (request) {
            var object = JSON.parse(request.responseText);
            var profileDTOs = object;
            var currentCount = profiles.dataSource.list.length
            profiles.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < profileDTOs.length; i++) {
                var url = profileDTOs[i].PictureName;

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
                    profileDTOs[i].Height,
                    url);

                profiles.push(newModel);
            }

            if (profileDTOs.length > 0) {
                profiles.forEach(loadProfileImage);
            }
        });
    }

    var addToProfilesBindingArray = function (model) {
        model.path = model.imgUrl;
        model.imgUrl = "#";
        profiles.push(model);
        loadProfileImage(model, profiles.length - 1, profiles.dataSource.list);
    }

    var addProfile = function (id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height) {
        return new WinJS.Promise(function (complete, error) {
            var model = new Models.ProfileModel(id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height);
            Data.Profiles.addProfile(model).then(function (request) {
                model.id = JSON.parse(request.responseText);
                addToProfilesBindingArray(model);
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



    // events of profile func
    var events = new WinJS.Binding.List([]);

    var loadEventImage = function (value, index, array) {
        Windows.Storage.StorageFile.getFileFromPathAsync(value.path).then(function (file) {
            var url = URL.createObjectURL(file);
            value.firstPic = url;
            events.dataSource.list.setAt(index, value);
        }, function () {
            value.firstPic = "/images/baby-idea-icon.png";
            events.dataSource.list.setAt(index, value);
        })
    }

    var loadEvents = function (indexInProfileArray) {
        if (events.length != 0) {
            while (events.length > 0) {
                events.pop();
            }
        }

        Data.Events.getEvents(profiles.dataSource.list.getAt(indexInProfileArray).id).then(function (request) {
            var object = JSON.parse(request.responseText);
            var eventDTOs = object;

            var currentCount = events.dataSource.list.length
            events.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < eventDTOs.length; i++) {
                var model = new Models.EventModel(
                    eventDTOs[i].Id,
                    eventDTOs[i].Title,
                    eventDTOs[i].Date,
                    eventDTOs[i].Description,
                    eventDTOs[i].PictureNames);
                    
                model.path = model.firstPic;
                model.firstPic = "#";

                events.push(model);
            }

            if (eventDTOs.length > 0) {
                events.forEach(loadEventImage);
            }
        });
    }

    var addToEventsBindingArray = function (model) {
        model.path = model.firstPic;
        model.firstPic = "#";
        events.push(model);
        loadEventImage(model, events.length - 1, events.dataSource.list);
    }

    var addEvent = function (indexInProfileArray, id, title, date, description, pictures) {
        return new WinJS.Promise(function (complete, error) {
            var model = new Models.EventModel(id, title, date, description, pictures);
            Data.Events.addEvent(profiles.dataSource.list.getAt(indexInProfileArray).id, model).then(function (request) {
                model.id = JSON.parse(request.responseText);
                addToEventsBindingArray(model);
                var messageDialog = new Windows.UI.Popups.MessageDialog("The event is successfully registered.");
                messageDialog.showAsync().done(function () {
                    complete();
                });
            }, function (error) {
                var messageDialog = new Windows.UI.Popups.MessageDialog("The event is not registered.");
                messageDialog.showAsync().done(function () {
                    error("Try again");
                });
            });
        });
    }

    var updateEvent = function (indexInProfileArray, eventId, title, date, description) {
        Data.Events.updateEvent();

        if (title != null) {

        }
    }


    // pictures of event func
    var pictures = new WinJS.Binding.List([]);

    var loadEventInnerImage = function (value, index, array) {
        Windows.Storage.StorageFile.getFileFromPathAsync(value.path).then(function (file) {
            var url = URL.createObjectURL(file);
            value.url = url;
            pictures.dataSource.list.setAt(index, value);
        }, function () {
            value.url = "/images/baby-idea-icon.png";
            pictures.dataSource.list.setAt(index, value);
        })
    }

    var loadPictures = function (indexOfEventInProfile) {
        if (pictures.length != 0) {
            while (pictures.length > 0) {
                pictures.pop();
            }
        }

        var picturesToPush = events.dataSource.list.getAt(indexOfEventInProfile).pictures;
        for (var i = 0; i < picturesToPush.length; i++) {
            var pictureModel = new Models.EventPictureModel("", picturesToPush[i].UrlName);
            pictures.push(pictureModel);
        }

        pictures.forEach(loadEventInnerImage)
    }



    // user func
    var login = function (username, authCode) {
        return new WinJS.Promise(function (complete, error) {
            Data.Users.login(username, authCode).then(function (request) {
                var user = JSON.parse(request.responseText);
                UserLoginData.setData(new Models.UserLoggedModel(user.Id, user.Nickname, user.SessionKey));
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
                UserLoginData.setData(new Models.UserLoggedModel(user.Id, user.Nickname, user.SessionKey));
                complete();
            }, function (innerError) {
                error(innerError);
            });
        });
    }

    var logout = function () {
        return Data.Users.logout();
    }



    // search events func
    var searchQuery = WinJS.Binding.as({ queryText: ""});

    var filteredEvents = events.createFiltered(function (item) {
        var queryIndexInItemString = item.title.toLowerCase().indexOf(searchQuery.queryText);
            //JSON.stringify(item.title).indexOf(searchQuery.queryText);
        
        var isSelected = queryIndexInItemString > -1;

        return isSelected;
    });

    var changeSearchQuery = function (text) {
        searchQuery.queryText = text;
        events.notifyReload();
    }

    var submitQuery = function (query) {
        searchQuery.queryText = query.queryText;
        events.notifyReload();
    }



    // namespaces
    WinJS.Namespace.define("ViewModels");

    WinJS.Namespace.defineWithParent(ViewModels, "Search", {
        searchEvnt: filteredEvents,
        submitSearchText: changeSearchQuery,
        submitSearchQuery: submitQuery,
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Profiles", {
        loadProfiles: loadProfiles,
        profiles: profiles,
        addProfile: addProfile,
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Events", {
        loadEvents: loadEvents,
        events: events,
        addEvent: addEvent,
        pictures: pictures,
        loadPictures: loadPictures,
        updateEvent: updateEvent,
    });

    WinJS.Namespace.defineWithParent(ViewModels, "Users", {
        login: login,
        register: register,
        logout: logout
    })
})();