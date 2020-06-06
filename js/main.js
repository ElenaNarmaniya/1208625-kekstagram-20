'use strict';
var PHOTOS_NUMBERS = 25; // общее кол-во фото в массиве - 25
var COMMENTS_NUMBERS = 2; // кол-во возможных комментариев
var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', 'Руслан'];
var photos = []; // массив из 25 фото с описанием и комментариями
var commentsPhoto = []; // массив для комментариев, элементы - объекты

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var generateComment = function () {
  var comment = {};
  comment.avatar = 'img/' + randomInteger(1, 6) + '.svg';
  comment.message = photosComments[randomInteger(0, photosComments.length - 1)];
  comment.name = authorComments[randomInteger(0, authorComments.length - 1)];
  return comment;
}; // функция создания 1 объект-комментарий
for (var j = 0; j < COMMENTS_NUMBERS; j++) {
  commentsPhoto.push(generateComment());
}
// console.log(commentsPhoto); // выводит массив comments с 2 объектами-комментариями

var generatePhoto = function () {
  var object = {};
  object.url = 'photos/' + randomInteger(1, 25) + '.jpg';
  object.description = photosDescription[randomInteger(0, photosDescription.length - 1)];
  object.likes = randomInteger(15, 200);
  object.comments = commentsPhoto;
  return object;
}; // функция для создания 1 фото с описанием и комментариями
for (var i = 0; i < PHOTOS_NUMBERS; i++) {
  photos.push(generatePhoto());
}
console.log(photos); // временно для наглядности
