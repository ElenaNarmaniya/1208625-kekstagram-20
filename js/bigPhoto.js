'use strict';

(function () {
  var picturesSection = window.createPhotos.picturesSection; // Контейнер для изображений от других пользователей - <section class="pictures  container">
  var bodyModalOpen = window.util.bodyModalOpen; // доступ к  body
  // показываем фото в полном размере и выводим описание, количество лайков, комментарии
  var sectionBigPicture = document.querySelector('.big-picture'); // нашли секцию, в которой будет показ. фото
  // var pictureImg = picturesSection.querySelectorAll('.picture__img'); // фото случайного пользователя
  var bigPictureImg = sectionBigPicture.querySelector('.big-picture__img'); // находим div с фото, которое должно стать полноразмерным
  var bigPictureSocial = sectionBigPicture.querySelector('.big-picture__social'); // находим div с Информациtq об изображении: Подпись, комментарии, количество лайков
  var socialComments = sectionBigPicture.querySelector('.social__comments'); // список с коммент. к полноэкранному изображению
  // var socialComment = sectionBigPicture.querySelectorAll('.social__comment'); // li-Комментарий к изображению
  var buttonClosePhoto = sectionBigPicture.querySelector('#picture-cancel'); // кнопка - закрыть окно полноэкранного просмотра изображения

  var createComment = function (commentnew) { // создаем допол. коммент в разметку, кроме 2 имеющихся
    var newComment = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
    newComment.querySelector('img').src = commentnew.avatar;
    newComment.querySelector('img').alt = commentnew.name;
    newComment.querySelector('.social__text').textContent = commentnew.message;
    return newComment;
  };

  var createFragmentComments = function (comments) { // создаем фрагмент из  дополнит. коммент., к 2 имеющимся
    var part = document.createDocumentFragment();
    for (var b = 0; b < comments.length; b++) {
      var newComments = createComment(comments[b]);
      part.appendChild(newComments);
    }
    return part;
  };

  var addComments = function (commentsList, commentFragment) { // добавляем фрагмент в список комментариев
    commentsList.innerHTML = '';
    commentsList.appendChild(commentFragment);
  };

  var showBigPhoto = function (photo) {
    sectionBigPicture.classList.remove('hidden'); // удаляем класс хидден с секции
    bodyModalOpen.classList.add('modal-open'); // задаем класс Body
    var comments = createFragmentComments(photo.comments); // применим функцию "вставляем дополнит. коммент. в разметку, к 2 имеющимся
    bigPictureImg.querySelector('img').src = photo.url; // просмотр фото в полноэкранном размере
    bigPictureSocial.querySelector('.likes-count').textContent = photo.likes; // записали кол-во лайков
    bigPictureSocial.querySelector('.comments-count').textContent = photo.comments.length; // записали кол-во комментариев
    bigPictureSocial.querySelector('.social__caption').textContent = photo.description; // записали описание фото
    addComments(socialComments, comments); // добавить комментарии в список коммент. к полноэкр. изобр.
    sectionBigPicture.querySelector('.social__comment-count').classList.add('hidden'); // прячем блоки счётчика комментариев и загрузки новых комментариев у любой фотографии
    sectionBigPicture.querySelector('.comments-loader').classList.add('hidden');
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

  buttonClosePhoto.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closePhotoEscape);

  var showOnePhoto = function (evt) { // показываем любую фотографию из 25
    var picture = evt.target.closest('.picture');
    if (picture) {
      var index = picture.dataset.index;
      showBigPhoto(window.createPhotos.photos[index]);
    }
  };

  var showOnePhotoEnter = function (evt) { // показ любой фотографии по нажатию на Enter
    if (evt.keyCode === 13) {
      showOnePhoto(evt);
    }
  };

  picturesSection.addEventListener('click', showOnePhoto); // показ любого фото по клику на него
  picturesSection.addEventListener('keydown', showOnePhotoEnter); // показ любого фото по Enter
})();
