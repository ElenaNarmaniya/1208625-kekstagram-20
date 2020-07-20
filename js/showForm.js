'use strict';

// показ формы редактирования фото
(function () {
  var SCALE_VALUE = '100%'; // размер фото = 100%
  var SCALE_IMAGE_VALUE = 100; // переменная для масштабирования фото
  var effectLevel = window.pin.effectLevel;
  var bodyModalOpen = document.querySelector('body');
  var imgUploadForm = document.querySelector('.img-upload__form'); // большая форма загрузки и редактирования фото на 33 строке
  var uploadFileButton = document.querySelector('#upload-file'); // поле для загрузки изображения с кнопкой Загрузить 37 строка
  var uploadCancelButton = imgUploadForm.querySelector('#upload-cancel'); // кнопка закрытия формы редакт. 68 строка
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay'); // поле для редактирования фото 42 строка
  var textDescription = imgUploadForm.querySelector('.text__description'); // область для ввода комментариев 122 строка
  var scaleImage = window.scale.scaleImage;
  var removeEffect = window.effects.removeEffect;
  var removeClassHidden = window.effects.removeClassHidden;
  var textHashtags = imgUploadForm.querySelector('.text__hashtags'); // инпут для хештегов 121 строка
  var main = document.querySelector('main');

  // функция для подстановки размера фото в % при Изменении размера изображения
  var scaleValue = function (value) {
    document.querySelector('.scale__control--value').value = value; // в инпут поставить указанное значение размера фото в %
  };

  var openPopup = function () {
    formEditImage.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closePopup = function () {
    formEditImage.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  // функция для показа поля редактирования изображения
  var showForm = function () {
    openPopup();
    scaleValue(SCALE_VALUE); // загруженному фото подставить размер 100%
    scaleImage(SCALE_IMAGE_VALUE); // масштабирование фото 1:1
    removeClassHidden(); // показ поля изменения масштаба
    effectLevel.classList.add('hidden'); // при появлении формы скрыть ползунок, т.к. эффект - оригинал
    removeEffect(); // сброс с фото всех эффектов effects__preview--
    uploadCancelButton.addEventListener('click', closeFormCross); // реагирование на кнопку Закрыть
    document.addEventListener('keydown', closeFormKeyCode); // реагирование на Escape
  };

  // реализация закрытия поля для редактирования фото по нажатию на кнопку
  var closeFormCross = function () {
    closePopup();
    imgUploadForm.reset(); // восстанавливаем стандартные значения всем элементам большой формы загрузки и редактирования фото
    uploadCancelButton.removeEventListener('click', closeFormCross); // по клику на кнопку закрытия формы скрываем форму
  };

  // реализация закрытия поля для редактирования фото по нажатию на Escape
  var closeFormKeyCode = function (evt) {
    if (evt.keyCode === 27 && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      closeFormCross(); // кроме случаев, когда курсор в поле ввода хештега или комментания
    }
  };

  // отлов изменений на поле Загрузить
  uploadFileButton.addEventListener('change', showForm);

  // сообщение об удачной отправке формы
  var successSubmitMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.appendChild(success);

    var closeSuccess = function () {
      success.remove();
      document.removeEventListener('keydown', successEscape);
    };

    var successButtonClick = function () {
      closeSuccess();
    };

    var successEscape = function (evt) {
      if (evt.key === 27) {
        closeSuccess();
      }
    };

    success.addEventListener('click', successButtonClick);
    document.addEventListener('keydown', successEscape);
  };

  var onSuccess = function () {
    closePopup();
    imgUploadForm.reset();
    successSubmitMessage();
  };

  // сообщение о неудачной отправке формы
  var onError = function (messageError) {
    var errorWindow = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorWindow.querySelector('.error__title').textContent = messageError;
    main.appendChild(errorWindow);

    var closeError = function () {
      errorWindow.remove();
      document.removeEventListener('keydown', errorEscape);
    };

    var errorButtonClick = function () {
      closeError();
    };

    var errorEscape = function (evt) {
      if (evt.key === 27) {
        closeError();
      }
    };

    errorWindow.addEventListener('click', errorButtonClick);
    document.addEventListener('keydown', errorEscape);

    closePopup();
    imgUploadForm.reset();
  };

  // отправка данных
  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.loadData.post(new FormData(imgUploadForm), onSuccess, onError);
  });

  window.showForm = {
    textHashtags: textHashtags
  };
})();
