import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebaseClass } from "../firebase-config";
import { useState } from "react";


export default function MarkAttendanceScreen() {
  
  const [uri, setUri] = useState(null);

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.cancelled) {
        const { uri } = cameraResp.assets[0];
        const currentDate = new Date();
        const fileName = `${currentDate}` || uri.split("/").pop(); // Set filename to studentId if available, otherwise use default from uri

        // Upload image to Firebase Storage
        const uploadResp = await uploadToFirebaseClass(uri, fileName, (progress) =>
          console.log("Upload progress:", progress)
        );

        // Retrieve download URL from Firebase Storage
        const downloadURL = await uploadResp.downloadUrl;

        // Log download URL to console
        console.log("Download URL:", downloadURL);
        sendToServer(downloadURL);

        // Show success message
        Alert.alert("Success", "Image uploaded successfully");
      }
    } catch (error) {
      console.error("Error taking photo: ", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const sendToServer = async (downloadURL) => {
    try {
      const data = {
        image_url: downloadURL
      };

      // Send POST request to Flask server
      const response = await fetch('http://192.168.0.107:5005/process-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        Alert.alert("Success", "Data sent successfully");
      } else {
        throw new Error("Failed to send data to server");
      }
    } catch (error) {
      console.error("Error sending data to server: ", error);
      Alert.alert("Error", "Failed to send data to server");
    }
  };
  // main UI
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.title}>Mark Attendance for Today</Text>
      <Text style={styles.description}>Mark Attendace of the Students by Uploading the class photo</Text>
      
        <StatusBar style="auto" />
        <Button title="Take Picture"  onPress={takePhoto} style={styles.button} titleStyle={styles.buttonText}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lexend-Bold',
    marginTop: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Lexend-Regular',
    marginTop: 40,
    textAlign: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  },
});