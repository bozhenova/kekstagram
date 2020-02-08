'use strict';

(function () {

  window.save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      var errorMessage = document.querySelector('.error-message');
      if (xhr.status === 200) {
        if (errorMessage) {
          document.body.removeChild(errorMessage);
        }
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;

        default:
          onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

})();
