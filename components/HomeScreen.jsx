import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddStudentScreen from './AddStudentScreen';
import MarkAttendanceScreen from './MarkAttendanceScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Lexend-Bold': require('./../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-Regular': require('./../assets/fonts/Lexend-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner/placeholder
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to your classroom!</Text>
      <Text style={styles.instructions}>Before you start, make sure all students are in the room.</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Student')}>
        <Text style={styles.buttonText}>Add student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Mark Attendance')}>
        <Text style={styles.buttonText2}>Mark attendance</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Student" component={AddStudentScreen} />
        <Stack.Screen name="Mark Attendance" component={MarkAttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontFamily: 'Lexend-Bold',
    marginTop: 0,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  instructions: {
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
    marginTop: 0,
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  button2: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
  },
  buttonText2: {
    color: '#141414',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
  },
});

export default App;