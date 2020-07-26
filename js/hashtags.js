'use strict';

// Валидация хештегов
(function () {
  var MAX_HASHTAGS_AMOUNT = 5; // нельзя указать больше пяти хэш-тегов;
  var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку;
  var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g; // пример хештега
  var textHashtags = window.showForm.textHashtags; // инпут для хештегов 121 строка

  // функция для получения массива из строки-хештега
  var getNewHashtags = function (inputString) {
    return inputString.split(' '); // разбиваем строку-хештег на массив split по пробелу
  };

  // функция для получения сообщения об ошибке
  var pushMessageError = function (message, errMessages) {
    if (errMessages.indexOf(message) === -1) {
      errMessages.push(message);
    }
    return errMessages;
  };

  // функция проверки валидности хештегов и создание массива из сообщений
  var createValidMessage = function (notEmptyHashtags) {
    var valMessages = [];
    if (!notEmptyHashtags.length) {
      return valMessages;
    }
    if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
      pushMessageError('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', valMessages);
    }
    for (var j = 0; j < notEmptyHashtags.length; j++) {
      var hashtag = notEmptyHashtags[j];
      if (!hashtag.startsWith('#')) {
        pushMessageError('Хеш-тег должен начинаться с символа решетки (#).', valMessages);
      } else if (hashtag.length === 1) {
        pushMessageError('Хеш-тег не может состоять из одного символа.', valMessages);
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        pushMessageError('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_LENGTH + ' символов.', valMessages);
      } else if (!hashtag.match(HASHTAG_PATTERN)) {
        pushMessageError('Хеш-тег должен состоять только из букв и цифр.', valMessages);
      } else if (notEmptyHashtags.indexOf(hashtag) !== notEmptyHashtags.lastIndexOf(hashtag)) {
        pushMessageError('Хеш-теги не должны повторяться.', valMessages);
      }
    }
    return valMessages;
  };

  // функция по обработке хештегов, введенных пользователем в инпут
  var createHashtagsKeyup = function () {
    var inputValue = textHashtags.value.toLowerCase(); // берем значение из инпута ввода хештегов заглавными буквамии
    var newHashtags = getNewHashtags(inputValue); // создаем массив из хештега
    var errors = createValidMessage(newHashtags); // создаем массив сообщений об ошибках в каждом хештеге

    if (errors.length !== 0) { // если ошибки в написании есть
      textHashtags.setCustomValidity(errors.join(' \n')); // задать полю сообщения об ошибках
      textHashtags.style.border = '2px solid red'; // красная рамка поля при неверном вводе
      return;
    }
    textHashtags.setCustomValidity('');
    textHashtags.style.border = '';
    textHashtags.removeEventListener('keyup', createHashtagsKeyup);
  };

  // добавляем на инпут обработчик события после ввода хештегов и их обработки на валидность
  textHashtags.addEventListener('keyup', createHashtagsKeyup);
})();
