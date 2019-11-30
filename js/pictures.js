'use strict';

(function() {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var commentCounter = bigPicture.querySelector('.social__comment-count');
  var loadMore = bigPicture.querySelector('.social__comments-loader');
  commentCounter.classList.add('visually-hidden');
  loadMore.classList.add('visually-hidden');

  var pictures = 3;
  var picturesArray = [];
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

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
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
    for (var i = 1; i <= pictures; i++) {
      var picture = {
        url: `photos/${i}.jpg`,
        likes: getRandomNum(15, 200),
        comments: commentsGeneration(getRandomNum(MIN_COMMENTS, MAX_COMMENTS)),
        description:
          descriptionsArray[getRandomNum(0, descriptionsArray.length - 1)]
      };
      picturesArray.push(picture);
    }
    return picturesArray;
  }

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent =
      picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent =
      picture.comments.length;
    return pictureElement;
  }

  function addPictures() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(createPicture(picturesGeneration()[i]));
    }
    picturesContainer.appendChild(fragment);
  }

  function bigPictureGeneration(pictureElement) {
    bigPicture.querySelector('.big-picture__img').src = pictureElement[0].url;
    bigPicture.querySelector('.likes-count').textContent =
      pictureElement[0].likes;
    bigPicture.querySelector('.comments-count').textContent =
      pictureElement[0].comments;
    bigPicture.querySelector('.social__caption').textContent =
      pictureElement[0].description;

    return bigPictureElement;
  }

  addPictures();
  bigPicture.classList.remove('hidden');
  bigPictureGeneration();
})();
