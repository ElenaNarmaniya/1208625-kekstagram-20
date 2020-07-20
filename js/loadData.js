'use strict';
// загрузка и отправка данных
(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var sendRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var upload = function (onLoad, onError) {
    var xhr = sendRequest(onLoad, onError);
    xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
    xhr.send();
  };

  var post = function (data, onLoad, onError) {
    var xhr = sendRequest(onLoad, onError);
    xhr.open('POST', 'https://javascript.pages.academy/kekstagram');
    xhr.send(data);
  };

  window.loadData = {
    upload: upload,
    post: post
  };
})();
