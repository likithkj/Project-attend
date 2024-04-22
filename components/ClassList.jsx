import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

function ClassList() {
  const [attendanceData, setAttendanceData] = useState(null);

  const handleRefresh = async () => {
    try {
      const response = await fetch('http://192.168.0.107:5020/classlist');
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
      <Text style={styles.attendanceText}>Class List</Text>
      {attendanceData && (
        <View style={styles.attendanceContainer}>
          {attendanceData.map((item, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Text style={styles.serialNumber}>{index + 1}</Text>
              <Text style={styles.itemText}>{item[Object.keys(item)[0]]}</Text>
              <Text style={styles.itemText}>{item[Object.keys(item)[1]]}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  attendanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 25,
    paddingTop:10,
  },
  attendanceContainer: {
    marginTop: 20,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
 
  serialNumber: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 17,
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemText: {
    marginRight: 10,
    fontSize: 17,
    
  },
});

export default ClassList;
