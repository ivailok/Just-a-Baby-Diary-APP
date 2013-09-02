/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var ProfileModel = WinJS.Class.define(function (id, name, birthDay, gender, mother, father, imgUrl, townOfBirth, weight, height) {
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
    })

    var EventModel = WinJS.Class.define(function (id, title, date, description, pictures) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.pictures = [];
        this.pictures = pictures;
        this.firstPic = pictures[0];
    }, {
        id: "",
        title: "",
        date: "",
        description: "",
        firstPic:""
    })

    var UserLoggedModel = WinJS.Class.define(function (id, nickname, sessionKey, email) {
        this.id = id;
        this.nickname = nickname;
        this.sessionKey = sessionKey;
        this.email = email;
    }, {
        id: "",
        nickname: "",
        sessionKey: "",
        email: "",
    })

    WinJS.Namespace.define("Models", {
        ProfileModel: ProfileModel,
        EventModel: EventModel,
        UserLoggedModel: UserLoggedModel
    })
})()