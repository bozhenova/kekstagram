'use strict';

(function () {
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  let scaleValue = parseInt(scaleControlValue.value, 10);
  const MIN_VALUE = 25;
  const MAX_VALUE = 100;
  const STEP = 25;

  scaleControlBigger.addEventListener('click', e => {
    e.preventDefault();
    if (scaleValue < MAX_VALUE) {
      scaleValue += STEP;
    }
    setScale(scaleValue);
  });

  scaleControlSmaller.addEventListener('click', e => {
    e.preventDefault();
    if (scaleValue > MIN_VALUE) {
      scaleValue -= STEP;
    }
    setScale(scaleValue);
  });


  function setScale(value) {
    imgUploadPreview.style.transform = `scale(${value / 100})`;
    setScaleFieldValue(value);
  }

  function setScaleFieldValue(value) {
    scaleControlValue.setAttribute("value", `${value}%`);
  }

})();
