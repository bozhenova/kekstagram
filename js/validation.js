'use strict';

(function () {
  let customValidityMessage = "";
  window.inputHashtags = document.querySelector(".text__hashtags");
  window.inputTextArea = document.querySelector(".text__description");
  window.inputHashtags.addEventListener("change", checkInputHashTag);
  window.inputTextArea.addEventListener("change", checkTextAreaInput);

  function checkTextAreaInput() {
    if (window.inputTextArea.value.length > 140) {
      window.inputTextArea.setCustomValidity("Длина комментария не может составлять больше 140 символов");
      window.inputTextArea.style.outline = '2px solid red';
    } else {
      window.inputTextArea.setCustomValidity("");
      window.inputTextArea.style.outline = '';
    }

  }

  function checkInputHashTag() {
    const fieldValue = (window.inputHashtags.value || '').trim().replace(/\s{2,}/g, ' ');
    window.inputHashtags.value = fieldValue;
    customValidityMessage = "";
    if (fieldValue) {
      const arrInputHashtag = fieldValue.split(" ");
      if (arrInputHashtag.length > 5) {
        customValidityMessage =
          "Количество хеш-тегов не должно превышать 5";
      }
      arrInputHashtag.forEach(element => {
        if (element.length < 2) {
          customValidityMessage =
            "Длина Хеш-тега не должна быть меньше 2 символов";
        }
        if (element[0] !== "#") {
          customValidityMessage =
            "Хэш-тег должен начинаться с символа #";
        }
        if (arrInputHashtag.filter(item => item.toLowerCase() === element.toLowerCase()).length > 1) {
          customValidityMessage = 'Один и тот же хэш-тег не может быть использован дважды';
        }
        if (element.length > 20) {
          customValidityMessage =
            "Длина Хеш-тега не должна превышать 20 символов";
        }
        if (element.split('#').length > 2) {
          customValidityMessage = 'Хэш-теги должны разделяться пробелами';
        }
      });
    }
    checkValidity(window.inputHashtags);
  }

  function checkValidity(element) {
    if (customValidityMessage) {
      element.style.outline = '2px solid red';
      element.setCustomValidity(customValidityMessage);
    } else {
      element.setCustomValidity("");
      element.style.outline = '';
    }
  }

})();
