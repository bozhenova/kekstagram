'use strict';

(function () {

  const DEBOUNCE_INTERVAL = 300;
  let lastTimeout;

  window.debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };



})();
