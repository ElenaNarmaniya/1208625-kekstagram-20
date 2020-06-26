'use strict';

(function () {
// Изменяем масштаб изображения
  var imgUploadOverlay = window.util.imgUploadOverlay;
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
  var SCALE_CHANGE_STEP = 25; // шаг изменения масштаба
  var SCALE_MIN_VALUE = 25; // мин. значение
  var SCALE_MAX_VALUE = 100; // макс. значение
  var scaleContainer = document.querySelector('.scale'); // поле fieldset для Изменения размера изображения
  var scaleControlSmaller = scaleContainer.querySelector('.scale__control--smaller'); // кнопка уменьшить
  var scaleControlBigger = scaleContainer.querySelector('.scale__control--bigger'); // увеличить
  var scaleControlValue = scaleContainer.querySelector('.scale__control--value'); // значение изменения

  var scaleImage = function (value) { // Функция масштабирования изображения
    var newScale = value / 100;
    imgUploadPreview.style.transform = 'scale(' + newScale + ')';
  };

  var getValue = function () { // вернуть значение изменения в %
    var value = parseInt(scaleControlValue.value.replace('%', ''), 10);
    return value;
  };
  var reduceScaleValue = function () {
    var valueScale = getValue(); // значение изменения в %
    if (valueScale > SCALE_MIN_VALUE) { // если оно больше минимального=25
      valueScale = valueScale - SCALE_CHANGE_STEP; // от него отнять шаг=25
    }
    return valueScale;
  };

  var increaseScaleValue = function () {
    var scValue = getValue(); // значение изменения в %
    if (scValue < SCALE_MAX_VALUE) { // если оно меньше максимального=100
      scValue = scValue + SCALE_CHANGE_STEP; // к нему прибавить шаг=25
    }
    return scValue;
  };

  var scaleSmaller = function () { // функция по клику на кнопку уменьшить
    var newValue = reduceScaleValue();
    scaleImage(newValue);
    scaleControlValue.value = newValue + '%';
  };

  var scaleBigger = function () { // функция по клику на кнопку увеличить
    var newValue = increaseScaleValue();
    scaleImage(newValue);
    scaleControlValue.value = newValue + '%';
  };

  scaleControlSmaller.addEventListener('click', scaleSmaller);
  scaleControlBigger.addEventListener('click', scaleBigger);

  window.scale = {
    scaleImage: scaleImage,
    imgUploadPreview: imgUploadPreview
  };
})();
