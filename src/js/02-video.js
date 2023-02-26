import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
const STORAGE_KEY = 'videoplayer-current-time';

const onPlay = function ({ seconds, percent }) {
  if (percent < 1) {
    localStorage.setItem(STORAGE_KEY, seconds);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

player.on('timeupdate', throttle(onPlay, 1000));
const currentTime = localStorage.getItem(STORAGE_KEY);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;
      default:
        // some other error occurred
        break;
    }
  });
