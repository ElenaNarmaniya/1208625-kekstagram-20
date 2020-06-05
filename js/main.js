'use strict';
var PHOTOS_NUMBERS = 25; // общее кол-во фото в массиве - 25
var COMMENTS_NUMBERS = 2; // кол-во возможных комментариев
var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', ''];
var photos = []; // массив из 25 фото с описанием и комментариями
var generateComment = function (report, forename) {
  var comment = {};
  comment.avatar = 'img/' + Math.floor(Math.random() * 7 + 1) + '.svg';
  comment.message = report[Math.floor(Math.random() * report.length)];
  comment.name = forename[Math.floor(Math.random() * forename.length)];
  return comment;
}; // функция создания комментария
var generatePhoto = function (arrayPhotos, numberPhotos, desc) {
  var object = {};
  for (var i = 0; i < numberPhotos; i++) {
    object.url = 'photos/' + Math.floor(Math.random() * 26 + 1) + '.jpg';
    object.description = desc[Math.floor(Math.random() * desc.length)];
    object.likes = Math.floor(Math.random() * 201 + 15);
    object.comments = generateComment(photosComments, authorComments);
    arrayPhotos.push(object);
  }
  return arrayPhotos;
}; // функция для создания 25 фото с описанием и комментариями
console.log(generatePhoto(photos, PHOTOS_NUMBERS, photosDescription)); // временно для наглядности
