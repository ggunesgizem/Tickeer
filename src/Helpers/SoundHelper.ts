import SoundPlayer from 'react-native-sound-player';

export enum SoundList {
  START_TIMER_321 = 'start_timer_321',
  TIMER_END = 'timer_end',
  TIMER_HALF = 'timer_half',
  TIMER_LAST_TEN = 'timer_last_ten',
}

export const playSound = (sound: SoundList) => {
  return new Promise((res, rej) => {
    SoundPlayer.playSoundFile(sound, 'mp3').then(res).catch(rej);
  });
};
