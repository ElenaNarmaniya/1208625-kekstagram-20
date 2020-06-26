'use strict';

// показ формы редактирования фото
(function () {
  var SCALE_VALUE = '100%'; // размер фото = 100%
  var SCALE_IMAGE_VALUE = 100; // переменная для масштабирования фото
  var bodyModalOpen = window.util.bodyModalOpen;
  var imgUploadForm = window.util.imgUploadForm; // большая форма загрузки и редактирования фото на 33 строке
  var uploadFileButton = document.querySelector('#upload-file'); // поле для загрузки изображения с кнопкой Загрузить 37 строка
  var uploadCancelButton = imgUploadForm.querySelector('#upload-cancel'); // кнопка закрытия формы редакт. 68 строка
  var imgUploadOverlay = window.util.imgUploadOverlay; // поле для редактирования фото 42 строка
  var textDescription = imgUploadForm.querySelector('.text__description'); // область для ввода комментариев 122 строка
  var scaleImage = window.scale.scaleImage;
  var removeEffect = window.effects.removeEffect;
  var removeClassHidden = window.effects.removeClassHidden;
  var textHashtags = imgUploadForm.querySelector('.text__hashtags'); // инпут для хештегов 121 строка

  var scaleValue = function (value) { // функция для подстановки размера фото в % при Изменении размера изображения
    document.querySelector('.scale__control--value').value = value; // в инпут поставить указанное значение размера фото в %
  };

  var showForm = function () { // функция для показа поля редактирования изображения
    imgUploadOverlay.classList.remove('hidden'); // показать Форму редактирования изображения
    bodyModalOpen.classList.add('modal-open'); // добавление класса к body
    scaleValue(SCALE_VALUE); // загруженному фото подставить размер 100%
    scaleImage(SCALE_IMAGE_VALUE); // масштабирование фото 1:1
    removeClassHidden(); // показ поля изменения масштаба
    removeEffect(); // сброс с фото всех эффектов effects__preview--
    uploadCancelButton.addEventListener('click', closeFormCross); // реагирование на кнопку Закрыть
    document.addEventListener('keydown', closeFormKeyCode); // реагирование на Escape
  };

  var closeFormCross = function () { // реализация закрытия поля для редактирования фото по нажатию на кнопку
    imgUploadOverlay.classList.add('hidden'); // добавляем класс hidden полю для редакт. фото
    bodyModalOpen.classList.remove('modal-open'); // удалили класс modal-open с body
    imgUploadForm.reset(); // восстанавливаем стандартные значения всем элементам большой формы загрузки и редактирования фото
    uploadCancelButton.removeEventListener('click', closeFormCross); // по клику на кнопку закрытия формы скрываем форму
  };

  var closeFormKeyCode = function (evt) { // реализация закрытия поля для редактирования фото по нажатию на Escape
    if (evt.keyCode === 27 && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      closeFormCross(); // кроме случаев, когда курсор в поле ввода хештега или комментания
    }
  };

  uploadFileButton.addEventListener('change', showForm); // отлов изменений на поле Загрузить

  window.showForm = {
    textHashtags: textHashtags
  };
})();
