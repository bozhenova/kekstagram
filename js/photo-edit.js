'use strict';

(function () {
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const effects = document.querySelectorAll('.effects__radio');
  const effectLevel = document.querySelector('.effect-level');
  const effectLevelValue = effectLevel.querySelector('.effect-level__value');
  const effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  const effectLevelLine = effectLevel.querySelector('.effect-level__line');
  const effectLevelLineDepth = effectLevel.querySelector('.effect-level__depth');
  const inputHashtags = document.querySelector(".text__hashtags");
  const inputTextArea = document.querySelector(".text__description");
  let customValidityMessage = "";
  let effectName = 'none';


  effectLevel.classList.add('hidden');
  inputHashtags.addEventListener("change", checkInputHashTag);
  inputTextArea.addEventListener("change", checkTextAreaInput);

  effects.forEach(effect => {
    effect.addEventListener('change', changeEffectHandler);
  })

  effectLevelLine.addEventListener('click', clickHandler);
  effectLevelPin.addEventListener('mousedown', mouseDownHandler);

  let mousedownFired = false;

  function clickHandler(e) {
    e.preventDefault();
    if (mousedownFired) {
      mousedownFired = false;
      return;
    }
    const position = e.offsetX;
    setValue(position);
  }

  function mouseDownHandler(e) {
    e.preventDefault();
    mousedownFired = true;
    let startX = e.clientX;

    function mouseMoveHandler(e) {
      e.preventDefault();
      const shift = startX - e.clientX;
      const position = effectLevelPin.offsetLeft - shift;
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
    const currValue = Math.round(position / effectLevelLine.offsetWidth * 100);
    effectLevelLineDepth.style.width = `${currValue}%`;
    effectLevelValue.setAttribute("value", currValue);
    setEffectValue();
  }

  function setEffectValue() {
    const effectsMap = {
      chrome: {
        minValue: 0,
        maxValue: 1,
        filter: `grayscale`,
        units: ''
      },
      sepia: {
        minValue: 0,
        maxValue: 1,
        filter: `sepia`,
        units: ''
      },
      marvin: {
        minValue: 0,
        maxValue: 100,
        filter: `invert`,
        units: '%'
      },
      phobos: {
        minValue: 0,
        maxValue: 3,
        filter: `blur`,
        units: 'px'
      },
      heat: {
        minValue: 1,
        maxValue: 3,
        filter: `brightness`,
        units: ''
      }
    };

    if (effectName !== 'none') {
      const value = parseInt(effectLevelValue.getAttribute("value"), 10);
      const effect = effectsMap[effectName];
      const effectValue = (effect.maxValue - effect.minValue) / 100 * value + effect.minValue;
      const filter = `${effect.filter}(${effectValue}${effect.units})`;
      imgUploadPreview.style.filter = filter;
    } else {
      imgUploadPreview.style.filter = 'none';
    }
  }

  // TODO: add scrubbing with keyboard

  function changeEffectHandler(e) {
    resetEffects();
    effectName = e.target.value;
    if (effectName === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    imgUploadPreview.classList.add(`effects__preview--${effectName}`);
    setEffectValue();
  }

  function resetEffects() {
    imgUploadPreview.classList.remove(`effects__preview--${effectName}`);
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
    const fieldValue = (inputHashtags.value || '').trim().replace(/\s{2,}/g, ' ');
    inputHashtags.value = fieldValue;
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
