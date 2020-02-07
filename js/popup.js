'use strict';

(function () {

  var uploadFileButton = document.getElementById('upload-file');
  var imgUploadOverlay = document.querySelector(".img-upload__overlay");
  var effectLevel = document.querySelector('.effect-level');
  var inputHashtags = document.querySelector(".text__hashtags");
  var inputTextArea = document.querySelector(".text__description");
  var uploadCancelButton = document.getElementById('upload-cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlValue = document.querySelector('.scale__control--value');

  uploadFileButton.addEventListener('change', openUploadOverlay);

  uploadCancelButton.addEventListener('click', closeUploadOverlay);

  uploadCancelButton.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      closeUploadOverlay();
    }
  });

  function openUploadOverlay() {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    imgUploadOverlay.addEventListener('click', clickOverlayHandler);
  }

  function clickOverlayHandler(e) {
    if (e.target === imgUploadOverlay) {
      closeUploadOverlay();
    }
  }

  function closeUploadOverlay() {
    imgUploadOverlay.classList.add('hidden');
    resetOverlaySettings();
    document.removeEventListener('keydown', escPressHandler);
    imgUploadOverlay.removeEventListener('click', clickOverlayHandler);
  }

  function escPressHandler(e) {
    if (e.code === 'Escape' && e.target !== inputHashtags && e.target !== inputTextArea) {
      closeUploadOverlay();
    }
  }

  function resetOverlaySettings() {
    inputHashtags.value = null;
    inputHashtags.setCustomValidity("");
    inputHashtags.style.outline = '';
    inputTextArea.value = null;
    inputTextArea.setCustomValidity("");
    inputTextArea.style.outline = '';
    imgUploadPreview.style.filter = 'none';
    imgUploadPreview.style.transform = 'scale(1)';
    scaleControlValue.setAttribute("value", "100%");
    effectLevel.classList.add('hidden');
  }


})();
