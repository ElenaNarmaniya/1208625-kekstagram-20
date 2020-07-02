'use strict';

(function () {
  //var PHOTOS_NUMBER = 25; // общее кол-во фото в массиве - 25
  //var COMMENTS_NUMBER = 5; // кол-во возможных комментариев
  //var photosDescription = ['голубая лагуна', 'путь к пляжу', 'золотистый пляж', 'красивая девушка', 'смешной рисовый супчик', 'черная скорость', 'клубничка', 'морс', 'привет, самолет', 'обувь', 'путь к морю', 'белый мерседес', 'непонятный салат', 'пушистый подарок', 'гигантские тапки', 'вид из самолета', 'хор', 'раритет', 'тапки с подсветкой', 'наша гостиница с пальмами', 'веганский завтрак', 'красота', 'крабус', 'чей-то концерт', 'хор бегемотов']; // описание 25 фото
  //var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; // 6 комментариев
 // var authorComments = ['Алексей', 'Толик', 'Артем', 'Валера', 'Гена', 'Руслан'];
  var photos = []; // массив из 25 фото с описанием и комментариями
  var picturesSection = document.querySelector('.pictures'); // Контейнер для изображений от других пользователей - <section class="pictures  container">
  var imgUpload = document.querySelector('.img-upload'); // Поле для загрузки нового изображения на сайт
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // содержимое шаблона
  var fragment = document.createDocumentFragment(); // создание фрагмента

  // случайное число от min до (max+1)
  //var createRandom = function (min, max) {
    //var rand = min + Math.random() * (max + 1 - min);
    //return Math.floor(rand);
  //};

  // функция создания 1 объект-комментарий
  //var generateComment = function () {
    //var comment = {};
    //comment.avatar = 'img/avatar-' + createRandom(1, 6) + '.svg';
    //comment.message = photosComments[createRandom(0, photosComments.length - 1)];
   // comment.name = authorComments[createRandom(0, authorComments.length - 1)];
   // return comment;
  //};

  // функция для создания 1 фото с описанием и комментариями
  //var generatePhoto = function () {
   // var object = {};
   //object.url = 'photos/' + createRandom(1, 25) + '.jpg';
   // object.description = photosDescription[createRandom(0, photosDescription.length - 1)];
   // object.likes = createRandom(15, 200);
   // object.comments = []; // массив для комментариев, элементы - объекты
   // for (var j = 0; j < COMMENTS_NUMBER; j++) {
     // object.comments.push(generateComment());
    //}
   // return object;
  //};

  //for (var i = 0; i < PHOTOS_NUMBER; i++) {
    //photos.push(generatePhoto());
  //}

  // заполняем фрагмент данными из массива photos
  var renderPicture = function (picture, index) {
    var pictureElement = pictureTemplate.cloneNode(true); //  клонируем содержимое шаблона
    pictureElement.dataset.index = index;
    pictureElement.querySelector('.picture__img').src = picture.url; // вставляем в элемент шаблона фото
    pictureElement.querySelector('.picture__img').alt = picture.description; // вставляем в элемент шаблона описание
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length; // вставляем в элемент шаблона лайки
    pictureElement.querySelector('.picture__likes').textContent = picture.likes; // вставляем в элемент шаблона коммент.
    return pictureElement;
  };

  window.loadData(function (newPhotos) {
    for (var g = 0; g < newPhotos.length; g++) {
      fragment.appendChild(renderPicture(newPhotos[g], g));
      photos.push(newPhotos[g]);
    }
    picturesSection.insertBefore(fragment, imgUpload);
  });

  window.createPhotos = {
    picturesSection: picturesSection,
    photos: photos
  };
})();
