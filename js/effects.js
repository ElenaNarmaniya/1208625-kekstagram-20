'use strict';

// Наложение эффекта на изображение
(function () {
  var effectLevel = window.pin.effectLevel;
  var imgUploadPreview = window.scale.imgUploadPreview;
  var photoEffects = document.querySelectorAll('.effects__radio'); // все радио-кнопки с эффектами

  // Функция сбрасывания эффектов effects__preview--
  var removeEffect = function () {
    var classes = Array.from(imgUploadPreview.classList); // cоздание массива из примененных эффектов к изображению
    for (var u = 0; u < classes.length; u++) {
      if (classes[u].match('effects__preview--')) { // поиск сопоставления названия эффекта эффект, примененному к фото
        imgUploadPreview.classList.remove(classes[u]); // удаление этого эффекта
        imgUploadPreview.style.filter = '';
      }
    }
  };

  // функция показа поля с ползунком
  var showEffectLevel = function () { // функция показа поля с ползунком
    if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
    }
  };

  // функция добавления стиля фото
  var applyEffect = function (style) {
    removeEffect(); // удаление предыдущих эффектов
    showEffectLevel(); // показ поля с ползунком
    imgUploadPreview.classList.add(style); // добавление стиля загруженному фото
    window.pin.deleteEffect(); // возврат ползунка на значение по умолчанию при смене эффектов
  };

  // удаление класса hidden  с поля fieldset с ползунком. нужно при переключении эффектов на фото
  var removeClassHidden = function () {
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

  // добавление эффекта по клику на радио
  for (var v = 0; v < photoEffects.length; v++) {
    photoEffects[v].addEventListener('click', getEffectPreview);
  }

  window.effects = {
    removeEffect: removeEffect,
    removeClassHidden: removeClassHidden,
    getEffectPreview: getEffectPreview
  };
})();
