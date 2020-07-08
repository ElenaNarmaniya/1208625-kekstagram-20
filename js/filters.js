'use strict';

(function () {

  var imageFilters = document.querySelector('.img-filters');
  var filtersButtons = imageFilters.querySelectorAll('.img-filters__button');
  var imageFiltersForm = document.querySelector('.img-filters__form');

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
    window.debounce.eliminateDebounce(evt.target.id);
  });
})();
