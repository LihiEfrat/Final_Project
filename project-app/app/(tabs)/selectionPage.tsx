import React, { useState } from 'react';
import RegisterToAppTherapist from './therapistRegister';
import RegisterToAppPatient from './patientRegistration';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const PatientRegistration = () => (
  <View style={styles.container}>
    <RegisterToAppPatient></RegisterToAppPatient>
  </View>
);

const TherapistRegistration = () => (
  <View style={styles.container}>
    <RegisterToAppTherapist></RegisterToAppTherapist>
  </View>
);

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

export default function SelectRegister() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  

  return (
      <Stack.Navigator initialRouteName="UserTypeSelection">
        <Stack.Screen name="UserTypeSelection" options={{ headerTitle: '' }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <Text style={styles.heading}>רישום לאפליקציה</Text>
              <View style={styles.optionContainer}>
                <TouchableOpacity
                  onPress={() => setSelectedOption(1)}
                  style={[styles.button, selectedOption === 1 && styles.selectedButton]}
                >
                  <Text style={[styles.buttonText, selectedOption === 1 && styles.selectedButtonText]}>מטופל</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedOption(2)}
                  style={[styles.button, selectedOption === 2 && styles.selectedButton]}
                >
                  <Text style={[styles.buttonText, selectedOption === 2 && styles.selectedButtonText]}>מטפל</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (selectedOption === 1) {
                    navigation.navigate('PatientRegistration');
                  } else if (selectedOption === 2) {
                    navigation.navigate('TherapistRegistration');
                  }
                }}
                style={styles.registerButton}
              >
                <Text style={styles.buttonText}>רישום</Text>
              </TouchableOpacity>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="PatientRegistration" component={PatientRegistration} options={{ headerTitle: '' }}/>
        <Stack.Screen name="TherapistRegistration" component={TherapistRegistration} options={{ headerTitle: '' }}/>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
});
