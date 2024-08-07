import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const URL = process.env.EXPO_PUBLIC_API_URL;

  const handleLogin = () => {
    axios.post(`http://${URL}:8000/api/login/`, {
      email: username,
      password: password
    })
    .then(response => {
      const requestData = JSON.parse(response.config.data);
      const isTherapist = response.data.is_therapist;
      if (isTherapist) {
        // Navigate to therapist screen
        console.log('Logged in as a therapist');
        navigation.navigate('buttonsPageTherapist');
      } else {
        // Navigate to patient screen
        console.log('Logged in as a patient');
        navigation.navigate('buttonsPagePatient', { userEmail: requestData.email });
      }
      onClose(); 
    })
    .catch(error => {
      Alert.alert('Error', 'Email or Password is incorrect, please try again');
    });
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <Text style={styles.title}>התחברות</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="כתובת אימייל"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>התחבר</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
          <Text style={styles.buttonText}>בטל</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginPopup;
