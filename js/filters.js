'use strict';

(function () {
  var DEBOUNCE = 500;
  var TOTAL_PHOTOS = 10; // максимальное количество фото в категории случайные
  var picturesSection = document.querySelector('.pictures');
  var imageFilters = document.querySelector('.img-filters');
  var filtersButtons = imageFilters.querySelectorAll('.img-filters__button');
  var imageFiltersForm = document.querySelector('.img-filters__form');

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

  // устраняем дребезг
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

  var getPhoto = function (array) {
    clearPicture();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.createPhotos.renderPicture(array[i], i));
    }
    window.createPhotos.picturesSection.appendChild(fragment);
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

  var eliminateDebounce = clearDebounce(createPhotosFilter);

  var clickFilterButtons = function (evt) {
    if (!evt.target.classList.contains('img-filters__button--active')) {
      var buttonActive = imageFilters.querySelector('.img-filters__button--active');
      buttonActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
  };

  filtersButtons.forEach(function (item) {
    item.addEventListener('click', clickFilterButtons);
  });

  imageFiltersForm.addEventListener('click', function (evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    eliminateDebounce(evt.target.id);
  });

  window.filters = {
    clearPicture: clearPicture
  };
})();
