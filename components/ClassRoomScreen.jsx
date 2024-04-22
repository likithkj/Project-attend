import {React,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import ClassList from './ClassList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const ClassRoomScreen = ({ navigation }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [fontsLoaded] = useFonts({
    'Lexend-Bold': require('./../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-Regular': require('./../assets/fonts/Lexend-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner/placeholder
  }

  const handleRefresh = async () => {
    try {
      const response = await fetch('http://192.168.0.107:5010/attendance');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setAttendanceData(data);
      console.log('Attendance data:', data); // Log received data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
        <Ionicons name="refresh" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.attendanceText}>Today's Attendance</Text>
      {attendanceData && (
        <View style={styles.attendanceContainer}>
          {attendanceData.map((item, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Text style={styles.serialNumber}>{index + 1}</Text>
              {Object.values(item).map((values, idx) => (
                <View key={idx} style={styles.itemRow}>
                  {values.map((value, i) => (
                    <Text key={i} style={styles.itemText}>{value}</Text>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Class List')}>
        <Text style={styles.buttonText}>Class List</Text>
      </TouchableOpacity>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Classroom" >
        <Stack.Screen name="Classroom" component={ClassRoomScreen} />
        <Stack.Screen name="Class List" component={ClassList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  refreshButton: {
    position: 'absolute',
    top: 20, // Adjust as needed
    right: 20, // Adjust as needed
    zIndex: 1, // Ensure button is above other content
  },
  attendanceText:{
    position: 'absolute',
    top: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 25,
  },
  attendanceContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  attendanceItem: {
    padding: 10,
    marginVertical: 5,
  },
  itemRow: {
    flexDirection: 'row',
  },
  serialNumber: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemText: {
    marginRight: 10,
    fontSize: 15,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
    alignItems:'center',
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginBottom: 10,
    marginTop:50
    
  },
});

export default App;
