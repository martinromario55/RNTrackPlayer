import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addTrack, setupPlayer} from './musicPlayerServices';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const setup = async () => {
    // Get the true or false result from setupPlayer Service
    let isSetup = await setupPlayer();

    // If track is available, then add it
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  };

  useEffect(() => {
    setup();
  }, []);

  // If player is not ready, show loading icon
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>App</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
