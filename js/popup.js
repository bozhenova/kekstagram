'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var uploadFileButton = document.getElementById('upload-file');
  var imgUploadOverlay = document.querySelector(".img-upload__overlay");
  var effectLevel = document.querySelector('.effect-level');
  var defaultEffect = document.querySelector('.effects__radio[value="none"]');
  var inputHashtags = document.querySelector(".text__hashtags");
  var inputTextArea = document.querySelector(".text__description");
  var uploadCancelButton = document.getElementById('upload-cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlValue = document.querySelector('.scale__control--value');

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


  //FIXME: при загрузке той же фотографии не всплывает окно

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
    defaultEffect.checked = true;
  }

  var form = picturesContainer.querySelector('.img-upload__form');
  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      imgUploadOverlay.classList.add('hidden');
      resetOverlaySettings();
    }, errorHandler);
    e.preventDefault();
  });


  function errorHandler(errorMessage) {
    var node = document.createElement('div');
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
