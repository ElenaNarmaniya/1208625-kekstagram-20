'use strict';
var PHOTOS_NUMBER = 25; // общее кол-во фото в массиве - 25
var COMMENTS_NUMBER = 5; // кол-во возможных комментариев
var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', 'Руслан'];
var photos = []; // пустой массив для 25 фото с описанием и комментариями
var createRandom = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
var generateComment = function () {
  var comment = {};
  comment.avatar = 'img/avatar-' + createRandom(1, 6) + '.svg';
  comment.message = photosComments[createRandom(0, photosComments.length - 1)];
  comment.name = authorComments[createRandom(0, authorComments.length - 1)];
  return comment;
}; // функция создания 1 объект-комментарий
var generatePhoto = function () {
  var object = {};
  object.url = 'photos/' + createRandom(1, 25) + '.jpg';
  object.description = photosDescription[createRandom(0, photosDescription.length - 1)];
  object.likes = createRandom(15, 200);
  object.comments = []; // массив для комментариев, элементы - объекты
  for (var j = 0; j < COMMENTS_NUMBER; j++) {
    object.comments.push(generateComment());
  }
  return object;
}; // функция для создания 1 фото с описанием и комментариями
for (var i = 0; i < PHOTOS_NUMBER; i++) {
  photos.push(generatePhoto());
}
// console.log(photos);
var bodyModalOpen = document.querySelector('body');
var picturesSection = document.querySelector('.pictures'); // Контейнер для изображений от других пользователей - <section class="pictures  container">
var imgUpload = document.querySelector('.img-upload'); // Поле для загрузки нового изображения на сайт
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // содержимое шаблона
var renderPicture = function (picture, index) {
  var pictureElement = pictureTemplate.cloneNode(true); //  клонируем содержимое шаблона
  pictureElement.dataset.index = index;
  pictureElement.querySelector('.picture__img').src = picture.url; // вставляем в элемент шаблона фото
  pictureElement.querySelector('.picture__img').alt = picture.description; // вставляем в элемент шаблона описание
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length; // вставляем в элемент шаблона лайки
  pictureElement.querySelector('.picture__likes').textContent = picture.likes; // вставляем в элемент шаблона коммент.
  return pictureElement;
};
var fragment = document.createDocumentFragment();
for (var g = 0; g < photos.length; g++) {
  fragment.appendChild(renderPicture(photos[g], g));
} // заполняем фрагмент данными из массива photos
picturesSection.insertBefore(fragment, imgUpload); // вставляем

// показываем фото в полном размере и выводим описание, количество лайков, комментарии
var sectionBigPicture = document.querySelector('.big-picture'); // нашли секцию, в которой будет показ. фото
// var pictureImg = picturesSection.querySelectorAll('.picture__img'); // фото случайного пользователя
var bigPictureImg = sectionBigPicture.querySelector('.big-picture__img'); // находим div с фото, которое должно стать полноразмерным
var bigPictureSocial = sectionBigPicture.querySelector('.big-picture__social'); // находим div с Информациtq об изображении: Подпись, комментарии, количество лайков
var socialComments = sectionBigPicture.querySelector('.social__comments'); // список с коммент. к полноэкранному изображению
// var socialComment = sectionBigPicture.querySelectorAll('.social__comment'); // li-Комментарий к изображению
var buttonClosePhoto = sectionBigPicture.querySelector('#picture-cancel'); // кнопка - закрыть окно полноэкранного просмотра изображения

var createComment = function (commentnew) { // создаем допол. коммент в разметку, кроме 2 имеющихся
  var newComment = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
  newComment.querySelector('img').src = commentnew.avatar;
  newComment.querySelector('img').alt = commentnew.name;
  newComment.querySelector('.social__text').textContent = commentnew.message;
  return newComment;
};

var createFragmentComments = function (comments) { // создаем фрагмент из  дополнит. коммент., к 2 имеющимся
  var part = document.createDocumentFragment();
  for (var b = 0; b < comments.length; b++) {
    var newComments = createComment(comments[b]);
    part.appendChild(newComments);
  }
  return part;
};

var addComments = function (commentsList, commentFragment) { // добавляем фрагмент в список комментариев
  commentsList.innerHTML = '';
  commentsList.appendChild(commentFragment);
};

var showBigPhoto = function (photo) {
  sectionBigPicture.classList.remove('hidden'); // удаляем класс хидден с секции
  bodyModalOpen.classList.add('modal-open'); // задаем класс Body
  var comments = createFragmentComments(photo.comments); // применим функцию "вставляем дополнит. коммент. в разметку, к 2 имеющимся
  bigPictureImg.querySelector('img').src = photo.url; // просмотр фото в полноэкранном размере
  bigPictureSocial.querySelector('.likes-count').textContent = photo.likes; // записали кол-во лайков
  bigPictureSocial.querySelector('.comments-count').textContent = photo.comments.length; // записали кол-во комментариев
  bigPictureSocial.querySelector('.social__caption').textContent = photo.description; // записали описание фото
  addComments(socialComments, comments); // добавить комментарии в список коммент. к полноэкр. изобр.
  sectionBigPicture.querySelector('.social__comment-count').classList.add('hidden'); // прячем блоки счётчика комментариев и загрузки новых комментариев у любой фотографии
  sectionBigPicture.querySelector('.comments-loader').classList.add('hidden');
};

var closePhoto = function () {
  sectionBigPicture.classList.add('hidden');
  bodyModalOpen.classList.remove('modal-open');
};

var closePhotoEscape = function (evt) { // функция закрытия фото по нажатию на escape
  if (evt.keyCode === 27) {
    closePhoto();
  }
};

buttonClosePhoto.addEventListener('click', closePhoto);
document.addEventListener('keydown', closePhotoEscape);

var showOnePhoto = function (evt) { // показываем любую фотографию из 25
  var picture = evt.target.closest('.picture');
  if (picture) {
    var index = picture.dataset.index;
    showBigPhoto(photos[index]);
  }
};

var showOnePhotoEnter = function (evt) { // показ любой фотографии по нажатию на Enter
  if (evt.keyCode === 13) {
    showOnePhoto(evt);
  }
};

picturesSection.addEventListener('click', showOnePhoto); // показ любого фото по клику на него
picturesSection.addEventListener('keydown', showOnePhotoEnter); // показ любого фото по Enter


// 3 задание к 4 лекции
// показ формы редактирования фото
var imgUploadForm = document.querySelector('.img-upload__form'); // большая форма загрузки и редактирования фото на 33 строке
var uploadFileButton = document.querySelector('#upload-file'); // поле для загрузки изображения с кнопкой Загрузить 37 строка
var uploadCancelButton = imgUploadForm.querySelector('#upload-cancel'); // кнопка закрытия формы редакт. 68 строка
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay'); // поле для редактирования фото 42 строка
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img'); // Предварительный просмотр изображения 54 строка
var textDescription = imgUploadForm.querySelector('.text__description'); // область для ввода комментариев 122 строка

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

// работа с ползунком

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

// Изменяем масштаб изображения
var SCALE_VALUE = '100%'; // размер фото = 100%
var SCALE_IMAGE_VALUE = 100; // переменная для масштабирования фото
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

// Наложение эффекта на изображение
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

for (var z = 0; z < photoEffects.length; z++) { // удаление эффекта по клику
  photoEffects[v].removeEventListener('click', getEffectPreview);
}

// Валидация хештегов

var MAX_HASHTAGS_AMOUNT = 5; // нельзя указать больше пяти хэш-тегов;
var MAX_HASHTAG_LENGTH = 20; // максимальная длина одного хэш-тега 20 символов, включая решётку;
var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g; // пример хештега
var textHashtags = imgUploadForm.querySelector('.text__hashtags'); // инпут для хештегов 121 строка

var getNewHashtags = function (inputString) { // функция для получения массива из строки-хештега
  var hashtags = inputString.split(' '); // разбиваем строку-хештег на массив split по пробелу
  return hashtags;
};

var pushMessageError = function (message, errMessages) { // функция для получения сообщения об ошибке
  if (errMessages.indexOf(message) === -1) {
    errMessages.push(message);
  }
  return errMessages;
};

var createValidMessage = function (notEmptyHashtags) { // функция проверки валидности хештегов и создание массива из сообщений
  var valMessages = [];
  if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
    pushMessageError('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', valMessages); // вызов функции с сообщением об ошибке
  }
  for (var j = 0; j < notEmptyHashtags.length; j++) { // проходим циклом по массиву из хештегов
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

var createHashtagsKeyup = function () { // функция по обработке хештегов, введенных пользователем в инпут
  var inputValue = textHashtags.value.toLowerCase(); // берем значение из инпута ввода хештегов заглавными буквамии
  var newHashtags = getNewHashtags(inputValue); // создаем массив из хештега
  var errors = createValidMessage(newHashtags); // создаем массив сообщений об ошибках в каждом хештеге

  if (errors.length !== 0) { // если ошибки в написании есть
    textHashtags.setCustomValidity(errors.join(' \n')); // задать полю сообщения об ошибках
    textHashtags.style.border = '2px solid red'; // красная рамка поля при неверном вводе
  } else {
    textHashtags.setCustomValidity(''); // иначе - в сообщениях об ошибках будет пустая строка
    textHashtags.style.border = '';
  }
};

textHashtags.addEventListener('keyup', createHashtagsKeyup); // добавляем на инпут обработчик события после ввода хештегов и их обработки на валидность
