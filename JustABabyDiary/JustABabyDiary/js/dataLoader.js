﻿/// <reference path="userLoginData.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    var getProfiles = function () {
        var sessionKey = UserLoginData.getData().sessionKey;
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyprofiles",
            type: "GET",
            headers: {
                "X-sessionKey": sessionKey
            }
        });
    }

    var addProfile = function (profileModel) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyprofiles",
            type: "POST",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": profileModel.name,
                "birthDay": profileModel.birthDay,
                "gender": profileModel.gender,
                "mother": profileModel.mother,
                "father": profileModel.father,
                "pictureName": profileModel.imgUrl,
                "townOfBirth": profileModel.townOfBirth,
                "birthWeight": profileModel.weight,
                "height": profileModel.height
            })
        });
    }

    var updateProfile = function (oldName, profileModel) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyprofiles?name=" + oldName,
            type: "PUT",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": profileModel.name,
                "birthDay": profileModel.birthDay,
                "gender": profileModel.gender,
                "mother": profileModel.mother,
                "father": profileModel.father,
                "pictureName": profileModel.imgUrl,
                "townOfBirth": profileModel.townOfBirth,
                "birthWeight": profileModel.weight,
                "height": profileModel.height
            })
        });
    }

    var getEvents = function (id) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyevents?babyProfileId=" + id,
            type: "GET",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
            },
        });
    }

    var addEvent = function (id, eventModel) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyevents?babyProfileId=" + id,
            type: "POST",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "title": eventModel.title,
                "date": eventModel.date,
                "description": eventModel.description,
                "pictureNames": eventModel.pictures
            })
        });
    }

    var updateEvent = function (babyProfileId, eventId, eventModel) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyevents/update/" + babyProfileId + "/" + eventId,
            type: "PUT",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "title": eventModel.title,
                "date": eventModel.date,
                "description": eventModel.description,
                "pictureNames": JSON.stringify(eventModel.pictures)
            })
        });
    }

    var addImageToEvent = function (babyProfileId, eventId, imageUrl) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyevents/addpicture/" + babyProfileId + "/" + eventId,
            type: "PUT",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "urlName": imageUrl,
            })
        });
    }

    var removeImageFromEvent = function (babyProfileId, eventId, imageUrl) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyevents/removepicture/" + babyProfileId + "/" + eventId,
            type: "PUT",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "urlName": imageUrl,
            })
        });
    }

    var login = function (username, authCode) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/users/login",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "authCode": authCode
            })
        });
    }

    var logout = function () {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/users/logout",
            type: "PUT",
            headers: {
                "X-sessionKey": UserLoginData.getData().sessionKey
            }
        });
    }

    var register = function (username, nickname, authCode, email) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/users/register",
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "displayName": nickname,
                "authCode": authCode,
                "email": email
            })
        });
    }

    WinJS.Namespace.define("Loader");

    WinJS.Namespace.defineWithParent(Loader, "Users", {
        login: login,
        register: register,
        logout:logout
    });

    WinJS.Namespace.defineWithParent(Loader, "Profiles", {
        getProfiles: getProfiles,
        addProfile: addProfile,
        updateProfile: updateProfile
    });

    WinJS.Namespace.defineWithParent(Loader, "Events", {
        getEvents: getEvents,
        addEvent: addEvent,
        updateEvent: updateEvent,
        addImageToEvent: addImageToEvent,
        removeImageFromEvent: removeImageFromEvent
    });
})();