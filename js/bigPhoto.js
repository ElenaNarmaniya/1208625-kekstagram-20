'use strict';

(function () {
  var COMMENTS_NUMBER = 5; // количество комментариев при показе = 5
  var picturesSection = window.createPhotos.picturesSection; // Контейнер для изображений от других пользователей - <section class="pictures  container">
  var bodyModalOpen = document.querySelector('body');
  var sectionBigPicture = document.querySelector('.big-picture'); // нашли секцию, в которой будет показ. фото
  var bigPictureImg = sectionBigPicture.querySelector('.big-picture__img'); // находим div с фото, которое должно стать полноразмерным
  var bigPictureSocial = sectionBigPicture.querySelector('.big-picture__social'); // находим div с Информациtq об изображении: Подпись, комментарии, количество лайков
  var socialComments = sectionBigPicture.querySelector('.social__comments'); // список с коммент. к полноэкранному изображению
  var buttonClosePhoto = sectionBigPicture.querySelector('#picture-cancel'); // кнопка - закрыть окно полноэкранного просмотра изображения
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count'); // div - Комментарии к изображению

  var createComment = function (commentnew) { // создаем допол. коммент в разметку, кроме 2 имеющихся
    var newComment = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('img').src = commentnew.avatar;
    newComment.querySelector('img').alt = commentnew.name;
    newComment.querySelector('.social__text').textContent = commentnew.message;
    return newComment;
  };

  var showBigPhoto = function (photo) {
    sectionBigPicture.classList.remove('hidden'); // удаляем класс хидден с секции
    bodyModalOpen.classList.add('modal-open'); // задаем класс Body

    var socialComment = sectionBigPicture.querySelector('.social__comment');
    var count = 0; // счетчик
    // пронумеруем комментарии
    var numberComments = function (actualCount, summaryCount) {
      if (actualCount > summaryCount) {
        actualCount = summaryCount;
      }
      var textCountComments = actualCount + ' из ' + summaryCount + ' комментариев';
      socialCommentCount.textContent = textCountComments;
    };

    bigPictureImg.querySelector('img').src = photo.url; // просмотр фото в полноэкранном размере
    bigPictureSocial.querySelector('.likes-count').textContent = photo.likes; // записали кол-во лайков
    bigPictureSocial.querySelector('.social__caption').textContent = photo.description; // записали описание фото

    var insertComments = function () {
      var number = COMMENTS_NUMBER * count++;
      var countComments = number + COMMENTS_NUMBER;
      var comments = photo.comments.slice(number, countComments);
      var commentsFragment = document.createDocumentFragment();
      for (var i = 0; i < comments.length; i++) {
        commentsFragment.appendChild(createComment(photo.comments[i], socialComment));
      }
      socialComments.appendChild(commentsFragment);
      if ((countComments) >= photo.comments.length) {
        commentsLoader.classList.add('hidden');
      }
      numberComments(countComments, photo.comments.length);
    };
    // загрузка дополнит. комментариев
    commentsLoader.addEventListener('click', numberComments);
    if (photo.comments.length > 0) {
      socialComments.innerHTML = '';
    }
    commentsLoader.classList.remove('hidden');

    insertComments();
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

  var showOnePhoto = function (evt) { // показываем любую фотографию из 25
    var picture = evt.target.closest('.picture');
    if (picture) {
      var index = picture.dataset.index;
      showBigPhoto(window.createPhotos.photos.find(function (p) {
        return p.id === index;
      }));
    }
  };

  var showOnePhotoEnter = function (evt) { // показ любой фотографии по нажатию на Enter
    if (evt.keyCode === 13) {
      showOnePhoto(evt);
    }
  };

  buttonClosePhoto.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closePhotoEscape);
  picturesSection.addEventListener('click', showOnePhoto); // показ любого фото по клику на него
  picturesSection.addEventListener('keydown', showOnePhotoEnter); // показ любого фото по Enter
})();
