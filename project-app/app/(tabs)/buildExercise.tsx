

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert } from 'react-native';
import ExList from './components/ExList';
import Header from './components/AHeader';
import Name from './components/Name';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Summary from './Summary';
import { useNavigation } from '@react-navigation/native';
import AppHeader from './components/AppHeader';



const Stack = createStackNavigator();

const BuildEx = () => {
  const [programName, setProgramName] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  const navigation = useNavigation();

  const handleSave = () => {
    if (!programName && !exerciseData.length) {
      Alert.alert('שגיאה', 'נא להזין שם לתוכנית ולבחור לפחות תרגיל אחד');
    } else if (!programName) {
      Alert.alert('שגיאה', 'נא לבחור שם לתוכנית');
    } else if (!exerciseData.length) {
      Alert.alert('שגיאה', 'נא לבחור לפחות תרגיל אחד');
    } else {
      navigation.navigate('Summary', { programName, exerciseData });
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader/>
      <Header />
      <Name programName={programName} setProgramName={setProgramName} />
      <ExList setExerciseData={setExerciseData} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>שמור</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuildEx;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: 'rtl',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    
    marginTop:15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#42B8D5',
    // alignSelf: 'flex-start',
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

