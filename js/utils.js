'use strict';

(function () {
  window.utils = {
    errorHandler:
      function (errorMessage) {
        const node = document.createElement('div');
        node.classList.add('error-message');
        node.style = 'display: block; z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 15px;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '40px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      },
    uploadImage:
      function () {
        const successTemplate = document.getElementById('success').content;
        const messagesTemplate = document.getElementById('messages').content;
        const success = successTemplate.cloneNode(true);
        const messages = messagesTemplate.cloneNode(true);
        document.body.append(messages);
        if (this.files && this.files[0]) {
          //setTimeout emulates large image
          setTimeout(() => {
            const loadingMessage = document.querySelector('.img-upload__message');
            window.imgUploadPreview.src = URL.createObjectURL(this.files[0]);
            window.openUploadOverlay();
            window.imgUploadPreview.height = 600;
            window.imgUploadPreview.onload = () => {
              URL.revokeObjectURL(this.src);
              loadingMessage.remove();
              document.body.append(success);
              const successOverlay = document.querySelector('.success');
              const successButton = document.querySelector('.success__button');
              successButton.addEventListener('click', () => successOverlay.style.display = 'none');
            }
          }, 1000);
        }
      }
  }


})();
