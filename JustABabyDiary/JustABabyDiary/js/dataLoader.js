/// <reference path="userLoginData.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

(function () {
    var getProfiles = function () {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyprofiles",
            type: "GET",
            headers: {
                "X-sessionKey": "testUsername4oELqBTbMsoGWjFUfohaXFlYmTMKLUtPdYeLzm"
            }
        });
    }

    var addProfile = function (profileModel) {
        return WinJS.xhr({
            url: "http://justababydiarywebapi.apphb.com/api/babyprofiles",
            type: "POST",
            headers: {
                "X-sessionKey": "testUsername4oELqBTbMsoGWjFUfohaXFlYmTMKLUtPdYeLzm",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": profileModel.name,
                "birthDay": profileModel.birthDay.toString(),
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
        addProfile: addProfile
    });
})();