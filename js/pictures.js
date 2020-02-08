'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document
    .getElementById('picture')
    .content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
  var commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var commentCounter = bigPicture.querySelector('.social__comment-count');
  var loadMore = bigPicture.querySelector('.social__comments-loader');


  bigPictureCancelButton.addEventListener('click', closeBigPictureOverlay);

  bigPictureCancelButton.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      closeBigPictureOverlay();
    }
  });


  function clickOverlayHandler(e) {
    e.preventDefault();
    if (e.target === bigPicture) {
      closeBigPictureOverlay();
    }
  }

  function closeBigPictureOverlay() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    picturesContainer.removeEventListener('click', closeBigPictureOverlay);
    bigPicture.removeEventListener('click', clickOverlayHandler);
  }

  function escPressHandler(e) {
    if (e.code === 'Escape') {
      closeBigPictureOverlay();
    }
  }

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent =
      picture.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      picture.comments.length;
    pictureElement.addEventListener('click', e => {
      e.preventDefault();
      openBigPicture(picture);
      document.body.classList.add('modal-open');
    });
    return pictureElement;
  }



  function successHandler(pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      var picture = createPicture(pictures[i]);
      fragment.appendChild(picture);
    }
    picturesContainer.appendChild(fragment);
  }

  function openBigPicture(picture) {

    createBigPicture(picture);

    function createBigPicture(picture) {
      bigPicture.querySelector('.big-picture__img img').src = picture.url;
      bigPicture.querySelector('.likes-count').textContent =
        picture.likes;
      bigPicture.querySelector('.comments-count').textContent =
        picture.comments.length;
      bigPicture.querySelector('.social__caption').textContent =
        picture.description;
      showComments(picture);
    }

    function showComments(picture) {
      commentsContainer.innerHTML = "";
      var fragment = document.createDocumentFragment();
      var commentsLength = picture.comments.length;
      for (var i = 0; i < commentsLength; i++) {
        var comment = createComment(picture.comments[i]);
        fragment.appendChild(comment);
      }
      commentsContainer.appendChild(fragment);
    }

    function createComment(comment) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__text').textContent =
        comment.message;
      return commentElement;
    }

    //TODO: добавить loadmore и comment counter

    // commentCounter.classList.add('visually-hidden');
    // loadMore.classList.add('visually-hidden');

    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', escPressHandler);
    bigPicture.addEventListener('click', clickOverlayHandler);
  }


  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'display: block; z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 15px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(successHandler, errorHandler);


})();
