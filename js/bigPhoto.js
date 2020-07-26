'use strict';

(function () {
  var COMMENTS_NUMBER = 5; // количество комментариев при показе = 5
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
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
  var loadedCommentsCount = 0; // счетчик загруженных комментариев

  var createComment = function (comment, node) { // создаем допол. коммент в разметку, кроме 2 имеющихся
    var newComment = node.cloneNode(true);
    newComment.querySelector('img').src = comment.avatar;
    newComment.querySelector('img').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
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
    var commentNode = document.querySelector('#comment').content.querySelector('.social__comment');
    comments.forEach(function (comment) {
      commentsFragment.appendChild(createComment(comment, commentNode));
    });
    socialComments.appendChild(commentsFragment);
  };


  var closePhoto = function () {
    sectionBigPicture.classList.add('hidden');
    bodyModalOpen.classList.remove('modal-open');

    commentsLoader.removeEventListener('click', handleLoadMoreComments);
    document.removeEventListener('keydown', closePhotoEscape);
    buttonClosePhoto.removeEventListener('click', closePhoto);
  };

  var closePhotoEscape = function (evt) { // функция закрытия фото по нажатию на escape
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      closePhoto();
    }
  };

  var findPhoto = function (id) {
    return window.createPhotos.elements.find(function (photo) {
      return photo.id.toString() === id;
    });
  };

  var showOnePhoto = function (evt) { // показываем любую фотографию из 25
    var picture = evt.target.closest('.picture');
    if (!picture) {
      return;
    }

    showBigPhoto(findPhoto(picture.dataset.index));

    commentsLoader.addEventListener('click', handleLoadMoreComments);
    document.addEventListener('keydown', closePhotoEscape);
    buttonClosePhoto.addEventListener('click', closePhoto);
  };

  var showOnePhotoEnter = function (evt) { // показ любой фотографии по нажатию на Enter
    if (evt.keyCode === ENTER_KEY_CODE) {
      showOnePhoto(evt);
    }
  };

  picturesSection.addEventListener('click', showOnePhoto); // показ любого фото по клику на него
  picturesSection.addEventListener('keydown', showOnePhotoEnter); // показ любого фото по Enter
})();
