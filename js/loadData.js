'use strict';

// загрузка данных с сервера
(function () {
  window.loadData = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    });
    xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
    xhr.send();
  };
}());
