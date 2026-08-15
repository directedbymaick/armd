/* Showreel home - lecture au clic (preload=none : rien ne se
   telecharge tant que l'utilisateur ne lance pas la video). */
(function () {
  var frame = document.querySelector('[data-showreel]');
  if (!frame) return;

  var video = frame.querySelector('video');
  var button = frame.querySelector('.showreel__play');
  if (!video || !button) return;

  function toggle() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  video.addEventListener('play', function () {
    frame.classList.add('is-playing');
  });
  video.addEventListener('pause', function () {
    frame.classList.remove('is-playing');
  });

  frame.addEventListener('click', toggle);
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    toggle();
  });
})();
