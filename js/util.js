'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form'); // большая форма загрузки и редактирования фото на 33 строке
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay'); // поле для редактирования фото 42 строка
  var bodyModalOpen = document.querySelector('body'); // доступ к  body

  window.util = {
    imgUploadForm: imgUploadForm,
    imgUploadOverlay: imgUploadOverlay,
    bodyModalOpen: bodyModalOpen
  };
})();
