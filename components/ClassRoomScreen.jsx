import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ClassRoomScreen() {
  return (
    <View style={styles.container}>
      <Text>Classroom Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClassRoomScreen;