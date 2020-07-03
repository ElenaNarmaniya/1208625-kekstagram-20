'use strict';

(function () {
  var photos = []; // массив из 25 фото с описанием и комментариями
  var picturesSection = document.querySelector('.pictures'); // Контейнер для изображений от других пользователей - <section class="pictures  container">
  var imgUpload = document.querySelector('.img-upload'); // Поле для загрузки нового изображения на сайт
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // содержимое шаблона
  var fragment = document.createDocumentFragment(); // создание фрагмента

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

  // принимаем данные с сервера, добавляем в массив фото, вставляем в разметку
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
