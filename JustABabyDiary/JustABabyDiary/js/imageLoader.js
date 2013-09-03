/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var loadProfileImage = function (object) {
        Windows.Storage.StorageFile.getFileFromPathAsync(object.path).then(function (file) {
            var url = URL.createObjectURL(file);
            object.imgUrl = url;
        }, function () {
            object.imgUrl = "/images/baby-idea-icon.png";
        })
    }

    var loadEventImage = function (object) {
        Windows.Storage.StorageFile.getFileFromPathAsync(object.path).then(function (file) {
            var url = URL.createObjectURL(file);
            object.firstPic = url;
        }, function () {
            object.firstPic = "/images/baby-idea-icon.png";
        })
    }

    var afterEventLoad = function (array) {
        array.forEach(loadEventImage);
    }

    var afterProfileLoad = function (array) {
        array.forEach(loadProfileImage);
    }

    var loadSingleProfile = function (single) {
        loadProfileImage(single)
    }

    var loadSingleEvent = function (single) {
        loadEventImage(single);
    }

    WinJS.Namespace.define("ImageLoader", {
        loadProfileImage: loadProfileImage,
        afterProfileLoad: afterProfileLoad,
        loadSingleProfile: loadSingleProfile,

        loadEventImage: loadEventImage,
        afterEventLoad: afterEventLoad,
        loadSingleEvent: loadSingleEvent
    })
})();