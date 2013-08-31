/// <reference path="models.js" />
(function () {
    var sampleImg = "http://www.google.bg/imgres?imgurl=&imgrefurl=http%3A%2F%2Fwww.fanpop.com%2Fclubs%2Fsweety-babies%2Fimages%2F25909592%2Ftitle%2Fsweet-baby&h=0&w=0&sz=1&tbnid=g04khntqt4FqIM&tbnh=177&tbnw=284&zoom=1&docid=_zdFQSXlD8SRVM&hl=bg&ei=6dkhUsSPGKTG0QWX-QE&ved=0CAEQsCU";

    var profiles = [
        new Models.ProfileModel("", "Baby1", new Date(), "Female", "mother", "father", sampleImg, "town", 3, 50),
        new Models.ProfileModel("", "Baby2", new Date(), "Male", "mother", "father", sampleImg, "town", 4, 52)
    ]

    var events = [
        new Models.EventModel("", "Title1", new Date(), "desc1", [sampleImg, sampleImg]),
        new Models.EventModel("", "Title2", new Date(), "desc2", [sampleImg, sampleImg]),
    ]

    var getProfiles = function () {
        return profiles;
    }

    var addProfile = function (profileModel) {
        profiles.push(profileModel);
    }

    var getEvents = function () {
        return events;
    }

    var addEvent = function (eventModel) {
        events.push(eventModel);
    }

    WinJS.Namespace.define("Data", {
        getProfiles: getProfiles,
        addProfile: addProfile,
        addEvent: addEvent,
        getEvents: getEvents
    });
})()