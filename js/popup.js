'use strict';

(function () {
  const picturesContainer = document.querySelector('.pictures');
  const uploadFileButton = document.getElementById('upload-file');
  const imgUploadOverlay = document.querySelector(".img-upload__overlay");
  const effectLevel = document.querySelector('.effect-level');
  const defaultEffect = document.querySelector('.effects__radio[value="none"]');
  const inputHashtags = document.querySelector(".text__hashtags");
  const inputTextArea = document.querySelector(".text__description");
  const uploadCancelButton = document.getElementById('upload-cancel');
  const imgUploadPreview = document.querySelector('.img-upload__preview img');
  const scaleControlValue = document.querySelector('.scale__control--value');

  //upload a default image
  // uploadFileButton.addEventListener('change', openUploadOverlay);


  //upload an image
  uploadFileButton.addEventListener('change', uploadImage);
  function uploadImage() {
    if (this.files && this.files[0]) {
      imgUploadPreview.src = URL.createObjectURL(this.files[0]);
      imgUploadPreview.height = 600;
      imgUploadPreview.onload = () => {
        URL.revokeObjectURL(this.src);
      }
    }
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    imgUploadOverlay.addEventListener('click', clickOverlayHandler);
  }

  //TODO: add error catching

  //FIXME: при загрузке той же фотографии не всплывает окно

  uploadCancelButton.addEventListener('click', closeUploadOverlay);


  uploadCancelButton.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      closeUploadOverlay();
    }
  });

  // function openUploadOverlay() {
  //   imgUploadOverlay.classList.remove('hidden');
  //   document.addEventListener('keydown', escPressHandler);
  //   imgUploadOverlay.addEventListener('click', clickOverlayHandler);
  // }

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
    defaultEffect.checked = true;
  }

  const form = picturesContainer.querySelector('.img-upload__form');
  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      imgUploadOverlay.classList.add('hidden');
      resetOverlaySettings();
    }, errorHandler);
    e.preventDefault();
  });


  function errorHandler(errorMessage) {
    const node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

})();
