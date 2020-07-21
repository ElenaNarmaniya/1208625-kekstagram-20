'use strict';

(function () {
  var photos = []; // массив из 25 фото с описанием и комментариями
  var picturesSection = document.querySelector('.pictures'); // Контейнер для изображений от других пользователей - <section class="pictures  container">
  var imgUpload = document.querySelector('.img-upload'); // Поле для загрузки нового изображения на сайт
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // содержимое шаблона
  var fragment = document.createDocumentFragment(); // создание фрагмента
  var socialCommentCount = document.querySelector('.social__comment-count'); // div - Комментарии к изображению
  var commentsLoader = document.querySelector('.comments-loader'); // Кнопка для загрузки новой порции комментариев
  var imageFiltres = document.querySelector('.img-filters'); // section - Фильтрация изображений от других пользователей

  // заполняем фрагмент данными из массива photos
  var renderPicture = function (picture, index) {
    var pictureElement = pictureTemplate.cloneNode(true); //  клонируем содержимое шаблона
    pictureElement.dataset.index = picture.id;
    pictureElement.querySelector('.picture__img').src = picture.url; // вставляем в элемент шаблона фото
    pictureElement.querySelector('.picture__img').alt = picture.description; // вставляем в элемент шаблона описание
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length; // вставляем в элемент шаблона лайки
    pictureElement.querySelector('.picture__likes').textContent = picture.likes; // вставляем в элемент шаблона коммент.
    return pictureElement;
  };

  var clearPicture = function () {
    picturesSection.querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });
  };

  // принимаем данные с сервера, добавляем в массив фото, вставляем в разметку
  window.addEventListener('load', function () {
    window.loadData.upload(function (newPhotos) {
      clearPicture();
      for (var g = 0; g < newPhotos.length; g++) {
        newPhotos[g].id = g;
        fragment.appendChild(renderPicture(newPhotos[g]));
        photos.push(newPhotos[g]);
      }
      picturesSection.insertBefore(fragment, imgUpload);
    });
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    imageFiltres.classList.remove('img-filters--inactive');
  });

  window.createPhotos = {
    picturesSection: picturesSection,
    photos: photos,
    renderPicture: renderPicture,
  };
})();
