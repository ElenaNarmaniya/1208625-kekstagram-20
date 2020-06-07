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
  comment.avatar = 'img/' + createRandom(1, 6) + '.svg';
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
}
picturesSection.insertBefore(fragment, imgUpload); // вставляем
