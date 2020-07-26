'use strict';

// работа с ползунком
(function () {
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectLevel = document.querySelector('.effect-level'); // поле fieldset с ползунком
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin'); // кнопка-ползунок
  var effectLevelLine = effectLevel.querySelector('.effect-level__line'); // линия, по которой перемещается ползунок
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth'); // глубина эффекта - насыщенный цвет линии
  var effectLevelValue = effectLevel.querySelector('.effect-level__value'); // числовое значение эффекта

  // возврат ползунка на значение по умолчанию при смене эффектов для фото
  var deleteEffect = function () {
    effectLevelValue.value = window.effects.DEFAULT_INTENSE; // числовое значение ползунка из разметки
    effectLevelDepth.style.width = window.effects.DEFAULT_INTENSE + '%';
    effectLevelPin.style.left = window.effects.DEFAULT_INTENSE + '%';
    imgUploadOverlay.querySelector('img').style.filter = '';
  };

  // обработчик события при нажатии на ползунок
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var lineWidth = effectLevelLine.offsetWidth; // ширина линии, по которой перемещается ползунок
    var startCoords = evt.clientX; // начальная горизонтальная координата=0

    // функция для определения положения ползунка
    var movePinMouse = function (moveEvt) {
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

      window.effects.setPreviewIntense(pinPoint);
    };

    // функция при отпускании клавиши мыши - удалить обработчики
    var deletePinMouse = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', movePinMouse);
      document.removeEventListener('mouseup', deletePinMouse);
    };

    document.addEventListener('mousemove', movePinMouse); // при нажатии на кнопку мыши зафиксировать координату ползунка
    document.addEventListener('mouseup', deletePinMouse); // при отпускании мыши - удалить обработчики событий
  });

  window.pin = {
    effectLevel: effectLevel,
    deleteEffect: deleteEffect
  };
})();
