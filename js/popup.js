'use strict';

(function () {
  const form = document.querySelector('.img-upload__form');
  const uploadFileButton = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector(".img-upload__overlay");
  const defaultEffect = document.querySelector('.effects__radio[value="none"]');
  const uploadCancelButton = document.querySelector('#upload-cancel');
  window.imgUploadPreview = document.querySelector('.img-upload__preview img');
  const scaleControlValue = document.querySelector('.scale__control--value');

  uploadFileButton.addEventListener('change', window.utils.uploadImage);
  uploadCancelButton.addEventListener('click', overlayCloseHandler);
  uploadCancelButton.addEventListener('keydown', enterPressHandler);

  window.openUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    imgUploadOverlay.addEventListener('click', overlayClickHandler);
  }

  function overlayClickHandler(e) {
    e.preventDefault();
    if (e.target === imgUploadOverlay) {
      overlayCloseHandler();
    }
  }

  function overlayCloseHandler() {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    uploadCancelButton.removeEventListener('keydown', enterPressHandler);
    imgUploadOverlay.removeEventListener('click', overlayClickHandler);
    resetOverlaySettings();
  }

  function enterPressHandler(e) {
    if (window.utils.isEnterEvent(e)) {
      window.overlayCloseHandler();
    }
  }

  function escPressHandler(e) {
    if (window.utils.isEscEvent(e) && e.target !== window.inputHashtags && e.target !== window.inputTextArea) {
      overlayCloseHandler();
    }
  }

  function resetOverlaySettings() {
    uploadFileButton.value = null;
    window.imgUploadPreview.style.filter = 'none';
    window.imgUploadPreview.style.transform = 'scale(1)';
    window.inputHashtags.value = null;
    window.inputHashtags.setCustomValidity("");
    window.inputHashtags.style.outline = '';
    window.inputTextArea.value = null;
    window.inputTextArea.setCustomValidity("");
    window.inputTextArea.style.outline = '';
    scaleControlValue.setAttribute("value", "100%");
    window.effectLevel.classList.add('hidden');
    defaultEffect.checked = true;
  }

  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      imgUploadOverlay.classList.add('hidden');
      resetOverlaySettings();
    }, window.errorHandler);
    e.preventDefault();
  });

})();
