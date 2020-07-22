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
  var socialCommentCountContainer = document.querySelector('.social__comment-count');
  var socialCommentShownCount = document.querySelector('.comments-shown-count'); // div - Комментарии к изображению
  var socialCommentCount = document.querySelector('.comments-count'); // div - Комментарии к изображению
  var socialComment = sectionBigPicture.querySelector('.social__comment');

  var loadedCommentsCount = 0; // счетчик загруженных комментариев

  var createComment = function (commentnew) { // создаем допол. коммент в разметку, кроме 2 имеющихся
    var newComment = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('img').src = commentnew.avatar;
    newComment.querySelector('img').alt = commentnew.name;
    newComment.querySelector('.social__text').textContent = commentnew.message;
    return newComment;
  };

  var showBigPhoto = function (photo) {
    loadedCommentsCount = 0; // счетчик

    sectionBigPicture.classList.remove('hidden'); // удаляем класс хидден с секции
    bodyModalOpen.classList.add('modal-open'); // задаем класс Bodу

    // запоминаем открытое фото
    sectionBigPicture.dataset.id = photo.id;

    // очищаем предыдущие комментарии
    socialComments.innerHTML = '';

    bigPictureImg.querySelector('img').src = photo.url; // просмотр фото в полноэкранном размере
    bigPictureSocial.querySelector('.likes-count').textContent = photo.likes; // записали кол-во лайков
    bigPictureSocial.querySelector('.social__caption').textContent = photo.description; // записали описание фото

    commentsLoader.classList.remove('hidden');
    socialCommentCountContainer.classList.remove('hidden');
    loadComments(photo);
  };

  // пронумеруем комментарии
  var setCommentsNumber = function (actualCount, summaryCount) {
    if (actualCount > summaryCount) {
      actualCount = summaryCount;
    }
    socialCommentShownCount.textContent = actualCount;
    socialCommentCount.textContent = summaryCount;
  };

  var handleLoadMoreComments = function () {
    var photo = findPhoto(sectionBigPicture.dataset.id);
    loadComments(photo);
  };

  var loadComments = function (photo) {
    var comments = photo.comments.slice(loadedCommentsCount, loadedCommentsCount + COMMENTS_NUMBER);

    loadedCommentsCount += COMMENTS_NUMBER;
    if (loadedCommentsCount >= photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
    setCommentsNumber(loadedCommentsCount, photo.comments.length);

    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      commentsFragment.appendChild(createComment(photo.comments[i], socialComment));
    }
    socialComments.appendChild(commentsFragment);
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

  var findPhoto = function (id) {
    return window.createPhotos.photos.find(function (p) {
      return p.id.toString() === id;
    });
  };

  var showOnePhoto = function (evt) { // показываем любую фотографию из 25
    var picture = evt.target.closest('.picture');
    if (picture) {
      showBigPhoto(findPhoto(picture.dataset.index));
    }
  };

  var showOnePhotoEnter = function (evt) { // показ любой фотографии по нажатию на Enter
    if (evt.keyCode === 13) {
      showOnePhoto(evt);
    }
  };

  commentsLoader.addEventListener('click', handleLoadMoreComments);
  buttonClosePhoto.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closePhotoEscape);
  picturesSection.addEventListener('click', showOnePhoto); // показ любого фото по клику на него
  picturesSection.addEventListener('keydown', showOnePhotoEnter); // показ любого фото по Enter
})();
