'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var STEP = 25;

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
