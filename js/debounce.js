'use strict';
// устранение дребезга при переключении фильтра списка элементов
(function () {
  var DEBOUNCE = 500;
  window.debounce = function (list) {
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
})();

var useFilter = function (filter) {
    var photos = picturesStorage.slice();
    switch (filter) {
      case 'filter-random':
        photos = window.util.getRandomArray(photos);
        break;
      case 'filter-discussed':
        photos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      default: break;
    }
    drewPicture(photos);
  };

  var useFilterDebounce = window.debounce(useFilter);
