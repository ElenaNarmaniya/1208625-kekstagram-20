'use strict';
var PHOTOS_NUMBERS = 25; // общее кол-во фото в массиве - 25
var COMMENTS_NUMBERS = 2; // кол-во возможных комментариев
var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', 'Руслан'];
var photos = []; // массив из 25 фото с описанием и комментариями

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

var generatePhoto = function () {
  var object = {};
  object.url = 'photos/' + randomInteger(1, 25) + '.jpg';
  object.description = photosDescription[randomInteger(0, photosDescription.length - 1)];
  object.likes = randomInteger(15, 200);
  object.comments = []; // массив для комментариев, элементы - объекты
  for (var j = 0; j < COMMENTS_NUMBERS; j++) {
    object.comments.push(generateComment());
  }
  return object;
}; // функция для создания 1 фото с описанием и комментариями
for (var i = 0; i < PHOTOS_NUMBERS; i++) {
  photos.push(generatePhoto());
}
// console.log(photos); // временно для наглядности

var makeElement = function (tagName, className) { // функция, создающая элемент с определенным именем тега и  именем класса из разметки
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createPicture = function (anchor) {
  var anchorItem = makeElement('a', 'picture'); // создали ссылку а с классом picture
 
  var pictureItem = makeElement('img', 'picture__img'); // добавляем элементу a нужное изображение.
  pictureItem.src = anchor.url; // адрес изображения
  pictureItem.alt = anchor.description; // описание изображения
  anchorItem.appendChild(pictureItem); // добавка изображения к ссылке а в разметке
 
 var infoItem = makeElement('p', 'picture__info'); // создание р с классом picture__info
  anchorItem.appendChild(infoItem);

 var likesItem = makeElement('span', 'picture__likes'); // добавляем элементу р кол-во лайков.
  likesItem.textContent = anchor.likes; // кол-во лайков к фото
  infoItem.appendChild(likesItem); // добавляем в разметку

var comentsItem = makeElement('span', 'picture__comments'); // добавляем элементу р кол-во комментариев
  omentsItem.textContent = COMMENTS_NUMBERS;
  infoItem.appendChild(comentsItem); // добавляем в разметку

  return anchorItem // возвращаем готовую ссылку
};

var renderPicture = function (goods) { // заполняем template ссылками
 var pictureList = document.getElementById('picture');
  for (var k = 0; k < goods.length; k++) {
   var cardItem = createPicture(goods[i]);
   pictureList.appendChild(cardItem);
  }
};
 
renderPicture(photos); //вызываем функцию с массивом  photos
