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

    var afterProfileLoad = function (array) {
        array.forEach(loadProfileImage);
    }

    var loadSingleProfile = function (single) {
        loadProfileImage(single)
    }

    WinJS.Namespace.define("ImageLoader", {
        loadProfileImage: loadProfileImage,
        afterProfileLoad: afterProfileLoad,
        loadSingleProfile: loadSingleProfile
    })
})();