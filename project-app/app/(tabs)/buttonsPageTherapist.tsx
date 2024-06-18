import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const buttonsPageTherapist = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('exerciseManager')}>
        <Text style={styles.buttonText}>ניהול מאגר תרגילים</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('buildExercise')}>
        <Text style={styles.buttonText}>יצירת תרגול</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3E5FC', // Light blue background color
    padding: 20,
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
    width: width * 0.6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 40, 
    left: 20,
    paddingTop: 30,   
  },
});

export default buttonsPageTherapist;
