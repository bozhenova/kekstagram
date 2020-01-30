'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document
    .getElementById('picture')
    .content.querySelector('.picture');

  var bigPicture = document.querySelector('.big-picture');
  var commentTemplate = document.getElementById('comment').content.querySelector('.social__comment');
  var commentsContainer = bigPicture.querySelector('.social__comments');

  var commentCounter = bigPicture.querySelector('.social__comment-count');
  var loadMore = bigPicture.querySelector('.social__comments-loader');

  var photos = 25;

  var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptionsArray = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;

  var pictures = picturesGeneration();

  commentCounter.classList.add('visually-hidden');
  loadMore.classList.add('visually-hidden');

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function commentsGeneration(commentsCount) {
    var comments = [];
    for (var i = 0; i < commentsCount; i++) {
      var comment = commentsArray[getRandomNum(0, commentsArray.length - 1)];
      comments.push(comment);
    }
    return comments;
  }

  function picturesGeneration() {
    var pictures = [];
    for (var i = 1; i <= photos; i++) {
      var numberOfComments = getRandomNum(MIN_COMMENTS, MAX_COMMENTS);
      var picture = {
        url: `photos/${i}.jpg`,
        likes: getRandomNum(15, 200),
        comments: commentsGeneration(numberOfComments),
        description:
          descriptionsArray[getRandomNum(0, descriptionsArray.length - 1)]
      };
      pictures.push(picture);
    }
    return pictures;
  }

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent =
      picture.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      picture.comments.length;
    return pictureElement;
  }

  function createComment(picture) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = "img/avatar-" +
      getRandomNum(1, 6) + ".svg";
    commentElement.querySelector('.social__text').textContent =
      picture.comments[0];
    return commentElement;
  }

  function showPictures() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var picture = createPicture(pictures[i]);
      fragment.appendChild(picture);
    }
    picturesContainer.appendChild(fragment);
  }

  function showComments() {
    var fragment = document.createDocumentFragment();
    var commentsLength = pictures[0].comments.length;
    for (var i = 0; i < commentsLength; i++) {
      var comment = createComment(pictures[i]);
      fragment.appendChild(comment);
    }
    commentsContainer.appendChild(fragment);
  }

  function createBigPicture(pictures) {
    bigPicture.querySelector('.big-picture__img img').src = pictures[0].url;
    bigPicture.querySelector('.likes-count').textContent =
      pictures[0].likes;
    bigPicture.querySelector('.comments-count').textContent =
      pictures[0].comments.length;
    bigPicture.querySelector('.social__caption').textContent =
      pictures[0].description;
    showComments();
  }

  showPictures();
  createBigPicture(pictures);
  bigPicture.classList.remove('hidden');
})();
