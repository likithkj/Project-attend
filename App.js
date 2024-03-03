import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import ClassRoomScreen from './components/ClassRoomScreen';
import ProfileScreen from './components/ProfileScreen';
import { loadFonts } from './fonts';
import { FontAwesome5 } from '@expo/vector-icons';

// Create a stack navigator

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: {
            fontFamily: 'Lexend-Regular',
            fontSize: 10,
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarActiveTintColor: '#141414',
          tabBarInactiveTintColor: '#737373',
          tabBarStyle: {
            height: 70,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Classroom"
          component={ClassRoomScreen}
          options={{
            title: 'Classroom',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="users" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;