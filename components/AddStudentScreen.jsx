import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

const AddStudentScreen = () => {
  const [fontsLoaded] = useFonts({
    'Lexend-Bold': require('./../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-Regular': require('./../assets/fonts/Lexend-Regular.ttf'),
  });

  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image to upload.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      // Show a prompt screen here if needed
  
      const response = await fetch('https://cy7m1ciey5.execute-api.eu-north-1.amazonaws.com/dev/awsgw-sample/test.jpg', {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
          // Add any additional headers here
        },
        body: formData,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized errors here
        } else {
          Alert.alert('Error', 'Failed to upload photo. Please try again.');
        }
      } else {
        Alert.alert('Success', 'Photo uploaded successfully!');
        // You can handle any further actions upon successful upload
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Network Request Failed')) {
        Alert.alert('Error', 'Failed to connect to the server. Please check your internet connection and try again.');
      } else {
        console.error('Error uploading photo:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission denied', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult);
    }
  };



  const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#EDEDED',
      paddingVertical: 5,
      paddingHorizontal: 75,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      width: '50%',
    },
    buttonText: {
      fontFamily: 'Lexend-Bold',
      fontSize: 12,
      color: '#333333',
      textAlign: 'center',
    },
    container: {
      marginHorizontal: 20,
    },
    title: {
      fontFamily: 'Lexend-Bold',
      fontSize: 24,
      color: '#333333',
      marginBottom: 20,
    },
    input: {
      fontFamily: 'Lexend-Regular',
      fontSize: 16,
      color: '#333333',
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    saveButton: {
      backgroundColor: '#EDEDED',
      paddingVertical: 5,
      paddingHorizontal: 75,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      width: '50%',
    }
  });

  return (
    <View>
      <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>Selected Image:</Text>
          <Image source={{ uri: image.uri }} style={styles.image} />
        </View>
      )}

      <Button title="Upload" onPress={handleImageUpload} />
    </View>
  );
};

export default AddStudentScreen;