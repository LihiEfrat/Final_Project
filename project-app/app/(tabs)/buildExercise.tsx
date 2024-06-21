


// //..............after gpt...........
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput, Alert } from 'react-native';
// import axios from 'axios';
// import AppHeader from './components/AppHeader';
// import AHeader from  './components/AHeader';
// import Name from './components/Name'; // Import the Name component
// import ExList from './components/ExList';
// import { useNavigation } from '@react-navigation/native';

// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [patients, setPatients] = useState([]); // Replace with actual patient ID
//   const [patientId, setPatientId] = useState(''); // Replace with actual patient ID
//   const [exercises, setExercises] = useState([]);
//   const [exerciseData, setExerciseData] = useState([]);

//   const URL = process.env.EXPO_PUBLIC_API_URL;

//   const navigation = useNavigation();

//   const exerciseManager = async () => {
  
//     try {
//       const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`); // Replace with your API endpoint
//       const data = await response.json();
//       setExercises(data); // Update state with fetched exercise data
//     } catch (error) {
//       console.error('Error fetching exercise data:', error);
//       // Handle errors appropriately (e.g., display error message)
//     }
//   };

//   useEffect(() => {
//     console.log('banana')
//     // Fetch exercises from backend
//     axios.get(`http://${URL}:8000/api/patient/`)
//       .then(response => {
//         console.log("banana", response.data)
//         setPatients(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch exercises');
//       });
//   }, []);




//   const handleTrainingSave = () => {
//     if (!programName || !exerciseData.length) {
//       Alert.alert('Error', 'Please enter a program name and select at least one exercise');
//       return;
//     }
  
//     const trainingData = {
//       training_name: programName,
//       patient_id: patientId,
//       exercises_plan: exerciseData.map(exercise => ({
//         exercise_id: exercise.id, // Use exercise.name as the exercise identifier
//         value: exercise.value,
//       })),
//     };
  
//     console.log('Sending training data:', trainingData);
  
//     axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
//       .then(response => {
//         console.log('Response data:', response.data);
//         Alert.alert('Success', 'Training plan saved successfully');
//         navigation.navigate('Summary');
//       })
//       .catch(error => {
//         console.error('Error response:', error.response);
//         Alert.alert('Error', 'Failed to save training plan');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader/>
//       <AHeader />
//       <Name programName={programName} setProgramName={setProgramName} patient={patientId} setPatientId={setPatientId} />
//       {/* <PatientName patientsNames={programName} setPatientId={setPatientId} /> */}
//       <ExList setExerciseData={setExerciseData} />
//       <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
//         <Text style={styles.buttonText}>שמור</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BuildEx;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     direction: 'rtl',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 15,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: '#42B8D5',
//   },
//   buttonText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//     textAlign: 'right',
//   },
// });


// BuildEx.tsx

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

    console.log('Sending training data:', trainingData);

    axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
      .then(response => {
        console.log('Response data:', response.data);
        Alert.alert('Success', 'Training plan saved successfully');
        navigation.navigate('Summary');
      })
      .catch(error => {
        console.error('Error response:', error.response);
        Alert.alert('Error', 'Failed to save training plan');
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <AHeader />
      <Name programName={programName} setProgramName={setProgramName} patient={patientId} setPatientId={setPatientId} />
      <ExList setExerciseData={setExerciseData} />
      <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
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