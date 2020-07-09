'use strict';
// устранение дребезга при переключении фильтра списка элементов
(function () {
  var DEBOUNCE = 500;
  var TOTAL_PHOTOS = 10; // максимальное количество фото в категории случайные
  var picturesSection = document.querySelector('.pictures');

  var clearPicture = function () {
    picturesSection.querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });
  };

  var getRandomArray = function (array) {
    return shuffle(array).slice(0, TOTAL_PHOTOS);
  };

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var clearDebounce = function (list) {
    var nullTimeout = null;
    return function () {
      var parameters = arguments;
      if (nullTimeout) {
        window.clearTimeout(nullTimeout);
      }
      nullTimeout = window.setTimeout(function () {
        list.apply(null, parameters);
      }, DEBOUNCE);
    };
  };
  // делаем сортировку фото
  var createPhotosFilter = function (filter) {
    var photosFilter = window.createPhotos.photos.slice();
    switch (filter) {
      case 'filter-random': // случайные
        photosFilter = getRandomArray(photosFilter);
        break;
      case 'filter-discussed': // обсуждаемые
        photosFilter.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      default: break;
    }
    getPhoto(photosFilter);
  };

  var  getPhoto = function (array) {
    clearPicture();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.createPhotos.renderPicture(array[i], i));
    }
    window.createPhotos.picturesSection.appendChild(fragment);
  };

  var eliminateDebounce = clearDebounce(createPhotosFilter);

  window.debounce = {
    eliminateDebounce: eliminateDebounce
  };

})();
