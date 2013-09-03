/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    var loadImage = function (object) {
        Windows.Storage.StorageFile.getFileFromPathAsync(object.path).then(function (file) {
            var url = URL.createObjectURL(file);
            object.imgUrl = url;
        }, function () {
            object.imgUrl = "/images/baby-idea-icon.png";
        })
    }

    var afterLoad = function (array) {
        array.forEach(loadImage);
    }

    var loadSingle = function (single) {
        loadImage(single)
    }

    WinJS.Namespace.define("ImageLoader", {
        load: loadImage,
        afterLoad: afterLoad,
        loadSingle: loadSingle
    })
})();