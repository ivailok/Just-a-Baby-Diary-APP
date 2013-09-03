/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var ProfileModel = WinJS.Class.define(function (id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height, path) {
        this.id = id;
        this.name = name;
        this.birthDay = birthDay;
        this.gender = gender;
        this.mother = mother;
        this.father = father;
        this.imgUrl = imgUrl;
        this.townOfBirth = townOfBirth;
        this.weight = weight;
        this.height = height;
        this.path = "" || path;
    }, {
        id: "",
        name: "",
        birthDay: new Date(),
        gender: "",
        mother: "",
        father: "",
        imgUrl: "",
        townOfBirth: "",
        weight: 0,
        height: 0,
        path: ""
    })

    var EventModel = WinJS.Class.define(function (id, title, date, description, pictures, path) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.pictures = [];
        if (pictures) {
            this.pictures = pictures;
        }
        this.firstPic = this.pictures[0];
        this.path = "" || path;
    }, {
        id: "",
        title: "",
        date: "",
        description: "",
        firstPic: ""
    })

    var UserLoggedModel = WinJS.Class.define(function (id, nickname, sessionKey) {
        this.id = id;
        this.nickname = nickname;
        this.sessionKey = sessionKey;
    }, {
        id: "",
        nickname: "",
        sessionKey: ""
    })

    WinJS.Namespace.define("Models", {
        ProfileModel: ProfileModel,
        EventModel: EventModel,
        UserLoggedModel: UserLoggedModel
    })
})()