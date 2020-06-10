'use strict';
var PHOTOS_NUMBER = 25; // общее кол-во фото в массиве - 25
var COMMENTS_NUMBER = 2; // кол-во возможных комментариев
var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', 'Руслан'];
var photos = []; // массив из 25 фото с описанием и комментариями

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
console.log(photos);

var picturesSection = document.querySelector('.pictures'); // Контейнер для изображений от других пользователей - <section class="pictures  container">
var imgUpload = document.querySelector('.img-upload'); // Поле для загрузки нового изображения на сайт
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // содержимое шаблона
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true); //  клонируем содержимое шаблона
  pictureElement.querySelector('.picture__img').src = picture.url; // вставляем в элемент шаблона фото
  pictureElement.querySelector('.picture__img').alt = picture.description; // вставляем в элемент шаблона описание
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length; // вставляем в элемент шаблона лайки
  pictureElement.querySelector('.picture__likes').textContent = picture.likes; // вставляем в элемент шаблона коммент.
  return pictureElement;
};
var fragment = document.createDocumentFragment();
for (var g = 0; g < photos.length; g++) {
  fragment.appendChild(renderPicture(photos[g]));
} // заполняем фрагмент данными из массива photos
picturesSection.insertBefore(fragment, imgUpload); // вставляем

// показываем фото в полном размере и выводим описание, количество лайков, комментарии
var showBigPhoto = function (photo) {
  var sectionBigPicture = document.querySelector('.big-picture'); // нашли секцию, в которой будет показ. фото
  sectionBigPicture.classList.remove('hidden'); // удаление класса hidden секции показа фото
  var bigPictureImg = sectionBigPicture.querySelector('.big-picture__img'); // находим div с фото, которое должно стать полноразмерным
  var bigPictureSocial = sectionBigPicture.querySelector('.big-picture__social'); // находим div с Информациtq об изображении: Подпись, комментарии, количество лайков
  bigPictureImg.querySelector('img').src = photo.url; // просмотр фото в полноэкранном размере
  bigPictureSocial.querySelector('.likes-count').textContent = photo.likes; // записали кол-во лайков
  bigPictureSocial.querySelector('.comments-count').textContent = photo.comments.length; // записали кол-во комментариев
  bigPictureSocial.querySelector('.social__caption').textContent = photo.description; // записали описание фото
  // работа с массивом комментрариев
  var socialComments = sectionBigPicture.querySelector('.social__comments'); // ul-список Комментариев к изображению
  var socialComment = socialComments.querySelectorAll('.social__comment'); // li-Комментарий к изображению


  for (var k = 0; k < photo.comments.length; k++) { // заполнение каждого li-комментария данными из массива комментариев к 1 фото
    var renderSocialComment = function () {
      socialComment[k].querySelector('img').alt = photo.comments[k].name; // !!!! почему-то пишет не может найти -  undifined
      socialComment[k].querySelector('img').src = photo.comments[k].avatar;
      socialComment[k].querySelector('.social__text').textContent = photo.comments[k].message;
    }
    renderSocialComment();
  }

  var countComments = sectionBigPicture.querySelector('.social__comment-count');
  var loadComments = sectionBigPicture.querySelector('.comments-loader');
  countComments.classList.add('hidden'); // прячем блоки счётчика комментариев и загрузки новых комментариев у любой фотографии
  loadComments.classList.add('hidden');
  var body = document.querySelector('body'); // добавляем на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
  body.classList.add('modal-open');
};
showBigPhoto(photos[0]);
