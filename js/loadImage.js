'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUploadFile = document.querySelector('.img-upload__start input[type=file]');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  imgUploadFile.addEventListener('change', function () {
    var file = imgUploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgUploadPreview.src = reader.result;
      }); reader.readAsDataURL(file);
    }
  });
})();
