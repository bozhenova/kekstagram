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

  effects.forEach(effect => {
    effect.addEventListener('change', changeEffectHandler);
  })

  effectLevelLine.addEventListener('click', clickHandler);
  effectLevelPin.addEventListener('mousedown', mouseDownHandler);

  function clickHandler(e) {
    e.preventDefault();
    if (e.offsetX >= 0 && e.offsetX <= effectLevelLine.offsetWidth) {
      effectLevelPin.style.left = e.offsetX + "px";
    }
    var currValue = Math.round(e.offsetX / effectLevelLine.offsetWidth * 100);
    effectLevelLineDepth.style.width = currValue + "%";
    effectLevelValue.setAttribute("value", currValue);
    setEffectValue();
  }

  function mouseDownHandler(e) {
    e.preventDefault();
    var startX = e.clientX;


    function mouseMoveHandler(e) {
      e.preventDefault();
      var shift = startX - e.clientX;
      startX = e.clientX;
      var position = effectLevelPin.offsetLeft - shift;
      if (position >= 0 && position <= effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = position + "px";
      }
      var currValue = Math.round(position / effectLevelLine.offsetWidth * 100);
      effectLevelLineDepth.style.width = currValue + "%";
      effectLevelValue.setAttribute("value", currValue);
      setEffectValue();
    }



    function mouseUpHandler() {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }



  function setEffectValue() {
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
    imgUploadPreview.classList.remove(`effects__preview--${effectName}`);
    effectName = e.target.value;
    if (effectName === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    imgUploadPreview.classList.add(`effects__preview--${effectName}`);
    effectLevelValue.setAttribute("value", 100);
    effectLevelLineDepth.style.width = 100 + "%";
    effectLevelPin.style.left = effectLevelLine.offsetWidth + "px";
    setEffectValue();
  }



})();
