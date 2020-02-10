'use strict';

(function () {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document
    .getElementById('picture')
    .content.querySelector('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
  const commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentCounter = bigPicture.querySelector('.social__comment-count');
  const loadMore = bigPicture.querySelector('.social__comments-loader');
  const imgFilters = document.querySelector('.img-filters');
  const imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  const filterPopular = document.getElementById('filter-popular');
  const filterRandom = document.getElementById('filter-random');
  const filterDiscussed = document.getElementById('filter-discussed');


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
    const pictureElement = pictureTemplate.cloneNode(true);
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

  function changeButtonColor(element) {
    imgFiltersButton.forEach(button => button.classList.remove('img-filters__button--active'));
    element.classList.add('img-filters__button--active');
  }

  function removePictures() {
    while (picturesContainer.querySelector('.picture')) {
      picturesContainer.removeChild(picturesContainer.querySelector('.picture'));
    }
  }

  function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  function filterRandomHandler(pictures) {
    changeButtonColor(filterRandom);
    removePictures();
    const fragment = document.createDocumentFragment();
    const newArr = pictures.slice();
    const shuffledPictures = shuffle(newArr);
    for (let i = 0; i < 10; i++) {
      const picture = createPicture(shuffledPictures[i]);
      fragment.appendChild(picture);
    }
    picturesContainer.appendChild(fragment);
  }

  function filterDiscussedHandler(pictures) {
    changeButtonColor(filterDiscussed);
    removePictures();
    const fragment = document.createDocumentFragment();
    const newArr = pictures.slice();
    newArr.sort((a, b) => { return b.comments.length - a.comments.length; });
    for (let i = 0; i < 25; i++) {
      const picture = createPicture(newArr[i]);
      fragment.appendChild(picture);
    }
    picturesContainer.appendChild(fragment);
  }

  function filterPopularHandler(pictures) {
    changeButtonColor(filterPopular);
    removePictures();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 25; i++) {
      const picture = createPicture(pictures[i]);
      fragment.appendChild(picture);
    }
    picturesContainer.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');

    filterPopular.addEventListener('click', filterPopularHandler.bind(pictures, ...arguments));
    filterRandom.addEventListener('click', filterRandomHandler.bind(pictures, ...arguments));
    filterDiscussed.addEventListener('click', filterDiscussedHandler.bind(pictures, ...arguments));
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
      const fragment = document.createDocumentFragment();
      const commentsLength = picture.comments.length;
      for (let i = 0; i < commentsLength; i++) {
        const comment = createComment(picture.comments[i]);
        fragment.appendChild(comment);
      }
      commentsContainer.appendChild(fragment);
    }

    function createComment(comment) {
      const commentElement = commentTemplate.cloneNode(true);
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
    const node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'display: block; z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 15px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(filterPopularHandler, errorHandler);


})();
