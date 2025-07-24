const Sound = require('react-native-sound');
Sound.setCategory('Playback');
let count = 0;
const repeatCount = 35; // repeat tone
var whoosh = new Sound('incoming.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      whoosh.getDuration() +
      'number of channels: ' +
      whoosh.getNumberOfChannels(),
  );
});
const playRepeat = () => {
  console.log('count', count);
  if (count < repeatCount && count !== 0) {
    count++;
    whoosh.play(success => (success ? playRepeat() : (count = 0)));
  }
};
export const play = () => {
  // Play the sound with an onEnd callback
  count === 0
    ? whoosh.play(success => {
        if (success) {
          count = 1;
          console.log('successfully finished playing', count);
          playRepeat();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      })
    : null;
};
export const stop = () => {
  count = 0;
  whoosh.stop(() => console.log('stopcallback'));
};
