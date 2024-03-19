import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  //   Skip to Next
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  //   Skip to Previous
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  //   Toggle playback
  const togglePlayback = async (playback: State) => {
    // get current track
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon name="skip-previous" size={40} color="#fff" />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon
          name={playBackState == State.Playing ? 'pause' : 'play-arrow'}
          size={75}
          color="#fff"
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon name="skip-next" size={40} color="#fff" />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
