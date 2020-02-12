'use strict';

(function () {
  const effects = document.querySelectorAll('.effects__radio');
  window.effectLevel = document.querySelector('.effect-level');
  const effectLevelValue = window.effectLevel.querySelector('.effect-level__value');
  const effectLevelPin = window.effectLevel.querySelector('.effect-level__pin');
  const effectLevelLine = window.effectLevel.querySelector('.effect-level__line');
  const effectLevelLineDepth = window.effectLevel.querySelector('.effect-level__depth');
  let effectName = 'none';

  window.effectLevel.classList.add('hidden');

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
      window.imgUploadPreview.style.filter = filter;
    } else {
      window.imgUploadPreview.style.filter = 'none';
    }
  }

  // TODO: add scrubbing with keyboard

  function changeEffectHandler(e) {
    resetEffects();
    effectName = e.target.value;
    if (effectName === 'none') {
      window.effectLevel.classList.add('hidden');
    } else {
      window.effectLevel.classList.remove('hidden');
    }
    window.imgUploadPreview.classList.add(`effects__preview--${effectName}`);
    setEffectValue();
  }

  function resetEffects() {
    window.imgUploadPreview.classList.remove(`effects__preview--${effectName}`);
    effectLevelValue.setAttribute("value", 100);
    effectLevelLineDepth.style.width = "100%";
    effectLevelPin.style.left = "100%";
  }

})();
