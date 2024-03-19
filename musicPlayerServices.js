import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {playListData} from './src/constants/constants';

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}

export async function setupPlayer() {
  let isSetup = false;

  try {
    // Get current track if player is already setup
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch (error) {
    // Get and setup track for the first time (initial launch)
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack() {
  // Play track
  await TrackPlayer.add(playListData);
  //   Play entire playlist then repeat after the last track
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
