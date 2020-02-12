'use strict';

(function () {
  const picturesContainer = document.querySelector('.pictures');
  const uploadFileButton = document.getElementById('upload-file');
  const imgUploadOverlay = document.querySelector(".img-upload__overlay");
  const defaultEffect = document.querySelector('.effects__radio[value="none"]');
  const uploadCancelButton = document.getElementById('upload-cancel');
  window.imgUploadPreview = document.querySelector('.img-upload__preview img');
  const scaleControlValue = document.querySelector('.scale__control--value');

  uploadFileButton.addEventListener('change', window.utils.uploadImage);


  //TODO: add error catching

  uploadCancelButton.addEventListener('click', closeUploadOverlay);

  uploadCancelButton.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      closeUploadOverlay();
    }
  });

  window.openUploadOverlay = function () {
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
    document.removeEventListener('keydown', escPressHandler);
    imgUploadOverlay.removeEventListener('click', clickOverlayHandler);
    resetOverlaySettings();
  }

  function escPressHandler(e) {
    if (e.code === 'Escape' && e.target !== window.inputHashtags && e.target !== window.inputTextArea) {
      closeUploadOverlay();
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

  const form = picturesContainer.querySelector('.img-upload__form');
  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      imgUploadOverlay.classList.add('hidden');
      resetOverlaySettings();
    }, window.utils.errorHandler);
    e.preventDefault();
  });

})();
