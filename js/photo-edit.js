'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var effects = document.querySelectorAll('.effects__radio');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelLineDepth = effectLevel.querySelector('.effect-level__depth');
  var effectName = 'none';
  var inputHashtags = document.querySelector(".text__hashtags");
  var inputTextArea = document.querySelector(".text__description");
  var customValidityMessage = "";

  var effectsMap = {
    chrome: {
      minValue: 0,
      maxValue: 1,
    },
    sepia: {
      minValue: 0,
      maxValue: 1,
    },
    marvin: {
      minValue: 0,
      maxValue: 100,
    },
    phobos: {
      minValue: 0,
      maxValue: 3,
    },
    heat: {
      minValue: 1,
      maxValue: 3,
    },
    none: {
      minValue: 0,
      maxValue: 0,
    }
  };

  effectLevel.classList.add('hidden');
  inputHashtags.addEventListener("change", checkInputHashTag);
  inputTextArea.addEventListener("change", checkTextAreaInput);

  effects.forEach(effect => {
    effect.addEventListener('change', changeEffectHandler);
  })


  effectLevelLine.addEventListener('click', clickHandler);
  effectLevelPin.addEventListener('mousedown', mouseDownHandler);

  var mousedownFired = false;

  function clickHandler(e) {
    e.preventDefault();
    if (mousedownFired) {
      mousedownFired = false;
      return;
    }
    var position = e.offsetX;
    setValue(position);
  }

  function mouseDownHandler(e) {
    e.preventDefault();
    mousedownFired = true;
    var startX = e.clientX;

    function mouseMoveHandler(e) {
      e.preventDefault();
      var shift = startX - e.clientX;
      var position = effectLevelPin.offsetLeft - shift;
      startX = e.clientX;
      setValue(position);
    }

    function mouseUpHandler(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  function setValue(position) {
    if (position >= 0 && position <= effectLevelLine.offsetWidth) {
      effectLevelPin.style.left = `${position}px`;
    }
    var currValue = Math.round(position / effectLevelLine.offsetWidth * 100);
    effectLevelLineDepth.style.width = `${currValue}%`;
    effectLevelValue.setAttribute("value", currValue);
    updateEffectValue();
  }

  function updateEffectValue() {
    var effect = effectsMap[effectName];
    var value = parseInt(effectLevelValue.getAttribute("value"), 10);
    var effectValue = (effect.maxValue - effect.minValue) / 100 * value + effect.minValue;
    switch (effectName) {
      case 'chrome':
        imgUploadPreview.style.filter = `grayscale(${effectValue})`;
        break;
      case 'sepia':
        imgUploadPreview.style.filter = `sepia(${effectValue})`;
        break;
      case 'marvin':
        imgUploadPreview.style.filter = `invert(${effectValue}%)`;
        break;
      case 'phobos':
        imgUploadPreview.style.filter = `blur(${effectValue}px)`;
        break;
      case 'heat':
        imgUploadPreview.style.filter = `brightness(${effectValue})`;
        break;
      default:
        imgUploadPreview.style.filter = 'none';
    }
  }

  function changeEffectHandler(e) {
    resetEffects();
    effectName = e.target.value;
    if (effectName === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    imgUploadPreview.classList.add(`effects__preview--${effectName}`);
    updateEffectValue();
  }

  function resetEffects() {
    if (effectName !== 'none') {
      imgUploadPreview.classList.remove(`effects__preview--${effectName}`);
    }
    effectLevelValue.setAttribute("value", 100);
    effectLevelLineDepth.style.width = "100%";
    effectLevelPin.style.left = "100%";

  }

  function checkTextAreaInput() {
    if (inputTextArea.value.length > 140) {
      inputTextArea.setCustomValidity("Длина комментария не может составлять больше 140 символов");
      inputTextArea.style.outline = '2px solid red';
    } else {
      inputTextArea.setCustomValidity("");
      inputTextArea.style.outline = '';
    }

  }

  function checkInputHashTag() {
    var fieldValue = (inputHashtags.value || '').trim().replace(/\s{2,}/g, ' ');
    inputHashtags.value = fieldValue;
    if (fieldValue) {
      var arrInputHashtag = fieldValue.split(" ");
      if (arrInputHashtag.length > 5) {
        customValidityMessage =
          "Количество хеш-тегов не должно превышать 5";
      }
      arrInputHashtag.forEach(element => {
        if (element.length >= 1 && element[0] !== "#") {
          customValidityMessage =
            "Хэш-тег должен начинаться с символа #";
        } else if (element.length < 2) {
          customValidityMessage =
            "Длина Хеш-тега не должна быть меньше 2 символов";
        } else if (element.length > 20) {
          customValidityMessage =
            "Длина Хеш-тега не должна превышать 20 символов";
        } else if (element.split('#').length > 2) {
          customValidityMessage = 'Хэш-теги должны разделяться пробелами';
        } else if (arrInputHashtag.filter(item => item === element).length > 1) {
          inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        }
      });
    } else {
      customValidityMessage = "";
    }
    checkValidity(inputHashtags);
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
