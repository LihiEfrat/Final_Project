

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AppHeader from './components/AppHeader';
import AHeader from './components/AHeader';
import Name from './components/Name';
import ExList from './components/ExList';
import { useNavigation } from '@react-navigation/native';

const BuildEx = () => {
  const [programName, setProgramName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  const URL = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();

  const handleTrainingSave = () => {
    if (!programName || !exerciseData.length) {
      Alert.alert('Error', 'Please enter a program name and select at least one exercise');
      return;
    }

    const trainingData = {
      training_name: programName,
      patient_id: patientId,
      exercises_plan: exerciseData,
    };

    console.log('Sending training data:', JSON.stringify(trainingData, null, 2));

    axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
      .then(response => {
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        Alert.alert('Success', 'Training plan saved successfully');
        navigation.navigate('Summary', { patientId: patientId})}) 
      .catch(error => {
        console.error('Error response:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to save training plan');
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      {/* <View style={styles.rtl}> */}
      <AHeader />
      <Name programName={programName} setProgramName={setProgramName} patient={patientId} setPatientId={setPatientId} />
      <ExList setExerciseData={setExerciseData} />
      <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
        <Text style={styles.buttonText}>שמור</Text>
      </TouchableOpacity>
      </View>
    // </View>
  );
};

export default BuildEx;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffff'
  },
  rtl:{
    direction: 'rtl',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#42B8D5',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'right',
  },
});