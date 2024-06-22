import React, { useState } from 'react';
import RegisterToAppTherapist from './therapistRegister';
import RegisterToAppPatient from './patientRegistration';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const PatientRegistration = () => (
  <View style={styles.container}>
    <RegisterToAppPatient />
  </View>
);

const TherapistRegistration = () => (
  <View style={styles.container}>
    <RegisterToAppTherapist />
  </View>
);

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

export default function SelectRegister() {
  return (
    <Stack.Navigator initialRouteName="UserTypeSelection">
      <Stack.Screen name="UserTypeSelection" options={{ headerTitle: '' }}>
        {({ navigation }) => (
          <View style={styles.container}>
            <Image 
              source={require('./logo.jpg')}
              style={styles.logo}
            />
            <Text style={styles.heading}>רישום לאפליקציה בתור</Text>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PatientRegistration')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>מטופל</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('TherapistRegistration')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>מטפל</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="PatientRegistration" component={PatientRegistration} options={{ headerTitle: '' }} />
      <Stack.Screen name="TherapistRegistration" component={TherapistRegistration} options={{ headerTitle: '' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250, 
    height: 100, 
    marginBottom: 20, 
    marginTop: -400
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50, 
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
});
