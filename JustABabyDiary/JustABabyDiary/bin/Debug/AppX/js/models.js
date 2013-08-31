﻿/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
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
    }, {
        id: "",
        title: "",
        date: "",
        description: ""
    })

    WinJS.Namespace.define("Models", {
        ProfileModel: ProfileModel,
        EventModel: EventModel
    })
})()