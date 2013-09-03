/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    
    var loadImage = function (object) {
        Windows.Storage.StorageFile.getFileFromPathAsync(object.imgUrl).then(function (file) {
            var url = URL.createObjectURL(file);
            return url;
        }, function () {
            return "/images/baby-idea-icon.png";
        })
    }

    WinJS.Namespace.define("ImageLoader", {
        load: loadImage
    })
})();