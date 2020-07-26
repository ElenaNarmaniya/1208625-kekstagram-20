'use strict';

// Изменяем масштаб изображения
(function () {
  var SCALE_CHANGE_STEP = 25; // шаг изменения масштаба
  var SCALE_MIN_VALUE = 25; // мин. значение
  var SCALE_MAX_VALUE = 100; // макс. значение
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшить
  var scaleControlBigger = document.querySelector('.scale__control--bigger'); // увеличить
  var scaleControlValue = document.querySelector('.scale__control--value'); // значение изменения

  // Функция масштабирования изображения
  var scaleImage = function (value) {
    var newScale = value / 100;
    imgUploadPreview.style.transform = 'scale(' + newScale + ')';
  };

  // вернуть значение изменения в %
  var getValue = function () {
    return parseInt(scaleControlValue.value.replace('%', ''), 10);
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

  // функция по клику на кнопку уменьшить
  var scaleSmaller = function () {
    var newValue = reduceScaleValue();
    scaleImage(newValue);
    scaleControlValue.value = newValue + '%';
  };

  // функция по клику на кнопку увеличить
  var scaleBigger = function () {
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
