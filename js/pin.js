'use strict';

// работа с ползунком
(function () {
  var imgUploadPreview = window.scale.imgUploadPreview;
  var imgUploadOverlay = window.util.imgUploadOverlay;
  var effectLevel = document.querySelector('.effect-level'); // поле fieldset с ползунком
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin'); // кнопка-ползунок
  var effectLevelLine = effectLevel.querySelector('.effect-level__line'); // линия, по которой перемещается ползунок
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth'); // глубина эффекта - насыщенный цвет линии
  var effectLevelValue = effectLevel.querySelector('.effect-level__value'); // числовое значение эффекта

  effectLevelPin.addEventListener('mousedown', function (evt) { // обработчик события при нажатии на ползунок
    evt.preventDefault();

    var lineWidth = effectLevelLine.offsetWidth; // ширина линии, по которой перемещается ползунок
    var startCoords = evt.clientX; // начальная горизонтальная координата=0

    var movePinMouse = function (moveEvt) { // функция для определения положения ползунка
      moveEvt.preventDefault();

      var coords = startCoords - moveEvt.clientX; // startCoords=0 - знач. горизонт. коорд. ползунка при его движении
      var pinCoordX = effectLevelPin.offsetLeft - coords; // коорд. ползунка = знач. горизонт. коорд. ползунка при его движении
      startCoords = moveEvt.clientX; // в начал. координату записали текущую координату положения ползунка
      if (!(pinCoordX < 0 || pinCoordX > lineWidth)) {
        var pinPoint = pinCoordX / effectLevelLine.offsetWidth; // пропорция = значение коорд. ползунка/длину линии
        effectLevelPin.style.left = pinCoordX + 'px'; // значение-отступ слева записали в css, координата в px
        effectLevelValue.value = Math.round(pinPoint * 100); // числовое значение нахождения ползунка
        effectLevelDepth.style.width = pinPoint * 100 + '%'; // глубина эффекта в %
      }
      if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
        imgUploadOverlay.querySelector('.effects__preview--chrome').style.filter = 'grayscale(' + pinPoint + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
        imgUploadOverlay.querySelector('.effects__preview--sepia').style.filter = 'sepia(' + pinPoint + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
        imgUploadOverlay.querySelector('.effects__preview--marvin').style.filter = 'invert(' + pinPoint * 100 + '%' + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
        imgUploadOverlay.querySelector('.effects__preview--phobos').style.filter = 'blur(' + pinPoint * 3 + 'px' + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
        imgUploadOverlay.querySelector('.effects__preview--heat').style.filter = 'brightness(' + pinPoint * 3 + ')';
      }
    };

    var deletePinMouse = function (upEvt) { // функция при отпускании клавиши мыши - удалить обработчики
      upEvt.preventDefault();
      document.removeEventListener('mousemove', movePinMouse);
      document.removeEventListener('mouseup', deletePinMouse);
    };

    document.addEventListener('mousemove', movePinMouse); // при нажатии на кнопку мыши зафиксировать координату ползунка
    document.addEventListener('mouseup', deletePinMouse); // при отпускании мыши - удалить обработчики событий
  });

  var deleteEffect = function (style) { // возврат ползунка на значение по умолчанию
    effectLevelValue.value = 20; // числовое значение ползунка из разметки
    effectLevelDepth.style.width = 20 + '%';
    imgUploadOverlay.querySelector(style).style.filter = '';
  };

  window.pin = {
    effectLevel: effectLevel,
    deleteEffect: deleteEffect
  };
})();
