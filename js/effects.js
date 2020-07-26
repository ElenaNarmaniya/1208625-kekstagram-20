'use strict';

// Наложение эффекта на изображение
(function () {
  var DEFAULT_INTENSE = 100;
  var PREVIEW_CLASS_PREFIX = 'effects__preview--';
  var Effects = {
    none: 'none',
    chrome: 'chrome',
    sepia: 'sepia',
    marvin: 'marvin',
    phobos: 'phobos',
    heat: 'heat'
  };

  var effectLevel = window.pin.effectLevel;
  var imgUploadPreview = window.scale.imgUploadPreview;
  var photoEffects = document.querySelectorAll('.effects__radio'); // все радио-кнопки с эффектами

  // Функция сбрасывания эффектов effects__preview--
  var remove = function () {
    var classes = imgUploadPreview.classList;
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].match(PREVIEW_CLASS_PREFIX)) { // поиск сопоставления названия эффекта эффект, примененному к фото
        imgUploadPreview.classList.remove(classes[i]); // удаление этого эффекта
        imgUploadPreview.style.filter = '';
        break;
      }
    }
  };

  // функция добавления стиля фото
  var applyEffect = function (style) {
    remove(); // удаление предыдущих эффектов
    removeClassHidden(); // показ поля с ползунком
    imgUploadPreview.classList.add(PREVIEW_CLASS_PREFIX + style); // добавление стиля загруженному фото
    window.pin.deleteEffect(); // возврат ползунка на значение по умолчанию при смене эффектов
  };

  // удаление класса hidden  с поля fieldset с ползунком. нужно при переключении эффектов на фото
  var removeClassHidden = function () {
    if (effectLevel.classList.contains('hidden')) {
      effectLevel.classList.remove('hidden');
    }
  };

  var setPreview = function (evt) {
    var effect = evt.target.id.replace('effect-', '');

    if (effect === Effects.none) {
      remove();
      effectLevel.classList.add('hidden');
      imgUploadPreview.classList.add(Effects.none.class);
      return;
    }

    applyEffect(Effects[effect]);
  };

  var previewHasClass = function (effect) {
    return imgUploadPreview.classList.contains(PREVIEW_CLASS_PREFIX + effect);
  };

  var setPreviewIntense = function (intense) {
    if (previewHasClass(Effects.chrome)) {
      imgUploadPreview.style.filter = 'grayscale(' + intense + ')';
    } else if (previewHasClass(Effects.sepia)) {
      imgUploadPreview.style.filter = 'sepia(' + intense + ')';
    } else if (previewHasClass(Effects.marvin)) {
      imgUploadPreview.style.filter = 'invert(' + intense * 100 + '%' + ')';
    } else if (previewHasClass(Effects.phobos)) {
      imgUploadPreview.style.filter = 'blur(' + intense * 3 + 'px' + ')';
    } else if (previewHasClass(Effects.heat)) {
      imgUploadPreview.style.filter = 'brightness(' + (2 * intense + 1) + ')';
    }
  };

  // добавление эффекта по клику на радио
  photoEffects.forEach(function (effect) {
    effect.addEventListener('click', setPreview);
  });

  window.effects = {
    DEFAULT_INTENSE: DEFAULT_INTENSE,
    Values: Effects,
    remove: remove,
    setPreviewIntense: setPreviewIntense,
    removeClassHidden: removeClassHidden
  };
})();
