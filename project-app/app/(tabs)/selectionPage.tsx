import React, { useState } from 'react';
import RegisterToAppTherapist from './therapistRegister';
import RegisterToAppPatient from './patientRegistration';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
          <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
              <Ionicons name="arrow-back" size={35} color="black" />
            </TouchableOpacity>
            <Image
              source={require('./logo.jpg')}
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>רישום לאפליקציה בתור</Text>
            </View>
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
          </SafeAreaView>
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
    height: 93,
    marginBottom: 20,
    marginTop: -400
  },
  titleContainer: {
    width: '110%',
    backgroundColor: '#42B8D5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    position: 'absolute',
    top: 40, 
    left: 20,
    paddingTop: 30,   
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
