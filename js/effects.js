'use strict';

// Наложение эффекта на изображение
(function () {
  var effectLevel = window.pin.effectLevel;
  var imgUploadPreview = window.scale.imgUploadPreview;
  var photoEffects = document.querySelectorAll('.effects__radio'); // все радио-кнопки с эффектами

  var removeEffect = function () { // Функция сбрасывания эффектов effects__preview--
    var classes = Array.from(imgUploadPreview.classList); // cоздание массива из примененных эффектов к изображению
    for (var u = 0; u < classes.length; u++) {
      if (classes[u].match('effects__preview--')) { // поиск сопоставления названия эффекта эффект, примененному к фото
        imgUploadPreview.classList.remove(classes[u]); // удаление этого эффекта
      }
    }
  };

  var showEffectLevel = function () { // функция показа поля с ползунком
    if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
    }
  };

  var applyEffect = function (style) { // функция добавления стиля фото
    removeEffect(); // удаление предыдущих эффектов
    showEffectLevel(); // показ поля с ползунком
    imgUploadPreview.classList.add(style); // добавление стиля загруженному фото
  };

  var removeClassHidden = function () { // удаление класса hidden  с поля fieldset с ползунком. нужно при переключении эффектов на фото
    effectLevel.classList.remove('hidden');
  };

  var getEffectPreview = function (evt) {
    var evtTarget = evt.target;

    switch (evtTarget.id) {
      case 'effect-none':
        removeEffect();
        removeClassHidden();
        effectLevel.classList.add('hidden');
        imgUploadPreview.classList.add('effects__preview--none');
        break;
      case 'effect-chrome':
        applyEffect('effects__preview--chrome');
        break;
      case 'effect-sepia':
        applyEffect('effects__preview--sepia');
        break;
      case 'effect-marvin':
        applyEffect('effects__preview--marvin');
        break;
      case 'effect-phobos':
        applyEffect('effects__preview--phobos');
        break;
      case 'effect-heat':
        applyEffect('effects__preview--heat');
        break;
    }
  };

  for (var v = 0; v < photoEffects.length; v++) { // добавление эффекта по клику на радио
    photoEffects[v].addEventListener('click', getEffectPreview);
  }

  window.effects = {
    removeEffect: removeEffect,
    removeClassHidden: removeClassHidden
  };
})();
