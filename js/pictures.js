'use strict';

(function () {
  const COMMENTS_STEP = 5;

  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  let socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoaded = bigPicture.querySelector('.comments-loaded');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const loadMore = bigPicture.querySelector('.social__comments-loader');
  const imgFilters = document.querySelector('.img-filters');
  const imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  const filterPopular = document.querySelector('#filter-popular');
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');
  let commentsCounter = 0;
  let comments = [];

  bigPictureCancelButton.addEventListener('click', bigPictureCloseOverlay);
  bigPictureCancelButton.addEventListener('keydown', enterPressHandler);

  function enterPressHandler() {
    if (window.utils.isEnterEvent) {
      bigPictureCloseOverlay();
    }
  }

  function bigPictureCloseOverlay() {
    bigPicture.classList.add('hidden');
    picturesContainer.removeEventListener('click', bigPictureCloseOverlay);
    bigPicture.removeEventListener('click', overlayClickHandler);
    bigPictureCancelButton.removeEventListener('keydown', enterPressHandler);
    document.removeEventListener('keydown', escPressHandler);
    document.body.classList.remove('modal-open');
  }

  function escPressHandler(e) {
    if (window.utils.isEscEvent(e)) {
      bigPictureCloseOverlay();
    }
  }

  function overlayClickHandler(e) {
    e.preventDefault();
    if (e.target === bigPicture) {
      bigPictureCloseOverlay();
    }
  }

  function createPicture(picture) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent =
      picture.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      picture.comments.length;
    pictureElement.addEventListener('click', openBigPicture.bind([], picture));
    return pictureElement;
  }


  function openBigPicture(picture) {
    createBigPicture(picture);
    document.body.classList.add('modal-open');
  }

  function changeButtonColor(element) {
    imgFiltersButton.forEach(button => button.classList.remove('img-filters__button--active'));
    element.classList.add('img-filters__button--active');
  }

  function removePictures() {
    [...picturesContainer.querySelectorAll('.picture')].map(image => image && image.remove());
  }

  function filterRandomHandler(pictures) {
    changeButtonColor(filterRandom);
    removePictures();
    const fragment = document.createDocumentFragment();
    const newArr = pictures.slice().sort(() => Math.random() - 0.5);
    for (let i = 0; i < 10; i++) {
      const picture = createPicture(newArr[i]);
      fragment.append(picture);
    }
    picturesContainer.append(fragment);
  }

  function filterDiscussedHandler(pictures) {
    changeButtonColor(filterDiscussed);
    removePictures();
    const fragment = document.createDocumentFragment();
    const newArr = pictures.slice().sort((a, b) => { return b.comments.length - a.comments.length; });
    for (let i = 0; i < 25; i++) {
      const picture = createPicture(newArr[i]);
      fragment.append(picture);
    }
    picturesContainer.append(fragment);
  }

  function renderPhotos(pictures) {
    changeButtonColor(filterPopular);
    removePictures();
    const fragment = document.createDocumentFragment();
    const newArr = pictures.slice().sort((a, b) => { return b.likes - a.likes; });
    for (let i = 0; i < 25; i++) {
      const picture = createPicture(newArr[i]);
      fragment.append(picture);
    }
    picturesContainer.append(fragment);
  }

  function successHandler(pictures) {
    renderPhotos(pictures);
    imgFilters.classList.remove('img-filters--inactive');

    filterPopular.addEventListener('click', () => window.debounce(renderPhotos.bind({}, ...arguments)));
    filterRandom.addEventListener('click', () => window.debounce(filterRandomHandler.bind({}, ...arguments)));
    filterDiscussed.addEventListener('click', () => window.debounce(filterDiscussedHandler.bind({}, ...arguments)));
  }

  function createBigPicture(picture) {
    commentsContainer.innerHTML = '';
    commentsCounter = 0;
    comments = picture.comments.slice();
    if (comments.length < COMMENTS_STEP) {
      loadMore.classList.add('hidden');
      socialCommentCount.classList.add('hidden');
    }
    else {
      loadMore.classList.remove('hidden');
      socialCommentCount.classList.remove('hidden');
    }
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent =
      picture.likes;
    commentsCount.textContent = `${comments.length}`;
    bigPicture.querySelector('.social__caption').textContent =
      picture.description;

    document.addEventListener('keydown', escPressHandler);
    bigPicture.addEventListener('click', overlayClickHandler);
    bigPicture.classList.remove('hidden');
    showComments(comments);
  }


  function showComments(comments) {
    if (comments.length > 0) {
      const fragment = document.createDocumentFragment();
      const commentsToShow = comments.splice(0, COMMENTS_STEP);
      if (commentsToShow.length < 5) {
        loadMore.classList.add('hidden');
        socialCommentCount.classList.add('hidden');
      }
      commentsCounter += commentsToShow.length;
      commentsToShow.forEach((commentData => {
        let comment = createComment(commentData);
        fragment.append(comment);
      }));
      commentsContainer.append(fragment);
      commentsLoaded.textContent = `${commentsCounter}`;
      loadMore.addEventListener('click', showComments.bind([], comments), { once: true });
    }
  }

  function createComment(comment) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent =
      comment.message;
    return commentElement;
  }

  window.load(successHandler, window.utils.errorHandler);

})();
