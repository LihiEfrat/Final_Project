

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import AppHeader from './components/AppHeader';
// import AHeader from './components/AHeader';
// import Name from './components/Name';
// import ExList from './components/ExList';
// import { useNavigation } from '@react-navigation/native';

// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [patientId, setPatientId] = useState('');
//   const [exerciseData, setExerciseData] = useState([]);

//   const URL = process.env.EXPO_PUBLIC_API_URL;
//   const navigation = useNavigation();

//   const handleTrainingSave = () => {
//     if (!programName || !exerciseData.length) {
//       Alert.alert('Error', 'Please enter a program name and select at least one exercise');
//       return;
//     }

//     const trainingData = {
//       training_name: programName,
//       patient_id: patientId,
//       exercises_plan: exerciseData,
//     };

//     console.log('Sending training data:', JSON.stringify(trainingData, null, 2));

//     axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
//       .then(response => {
//         console.log('Response data:', JSON.stringify(response.data, null, 2));
//         Alert.alert('Success', 'Training plan saved successfully');
//         navigation.navigate('Summary', { patientId: patientId})}) 
//       .catch(error => {
//         console.error('Error response:', error.response ? error.response.data : error.message);
//         Alert.alert('Error', 'Failed to save training plan');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader />
//       {/* <View style={styles.rtl}> */}
//       <AHeader />
//       <Name programName={programName} setProgramName={setProgramName} patient={patientId} setPatientId={setPatientId} />
//       <ExList setExerciseData={setExerciseData} />
//       <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
//         <Text style={styles.buttonText}>שמור</Text>
//       </TouchableOpacity>
//       </View>
//     // </View>
//   );
// };

// export default BuildEx;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#ffff'
//   },
//   rtl:{
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

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import AppHeader from './components/AppHeader';
// import AHeader from './components/AHeader';
// import Name from './components/Name';
// import ExList from './components/ExList';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [patientEmail, setPatientEmail] = useState('');
//   const [patientId, setPatientId] = useState('');
//   const [exerciseData, setExerciseData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const URL = process.env.EXPO_PUBLIC_API_URL;
//   const navigation = useNavigation();
//   const route = useRoute();

//   useEffect(() => {
//     const fetchPatientId = async () => {
//       if (!patientEmail) return;
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`http://${URL}:8000/api/patient/get-id/`, {
//           params: { email: patientEmail }
//         });
//         setPatientId(response.data.id);
//       } catch (error) {
//         console.error('Error fetching patient ID:', error);
//         Alert.alert('Error', 'Failed to fetch patient information');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPatientId();
//   }, [patientEmail]);

//   const handleTrainingSave = () => {
//     if (!programName || !exerciseData.length || !patientId) {
//       Alert.alert('Error', 'Please enter a program name, patient email, and select at least one exercise');
//       return;
//     }

//     const trainingData = {
//       training_name: programName,
//       patient_id: patientId,
//       exercises_plan: exerciseData,
//     };

//     console.log('Sending training data:', JSON.stringify(trainingData, null, 2));

//     axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
//       .then(response => {
//         console.log('Response data:', JSON.stringify(response.data, null, 2));
//         Alert.alert('Success', 'Training plan saved successfully');
//         navigation.navigate('Summary', { patientId: patientId });
//       })
//       .catch(error => {
//         console.error('Error response:', error.response ? error.response.data : error.message);
//         Alert.alert('Error', 'Failed to save training plan');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader />
//       <AHeader />
//       <Name 
//         programName={programName} 
//         setProgramName={setProgramName} 
//         patient={patientEmail} 
//         setPatientEmail={setPatientEmail} 
//       />
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
//     backgroundColor:'#ffff'
//   },
//   rtl:{
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

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import AppHeader from './components/AppHeader';
// import AHeader from './components/AHeader';
// import Name from './components/Name';
// import ExList from './components/ExList';
// import { useNavigation } from '@react-navigation/native';

// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [patientEmail, setPatientEmail] = useState('');
//   const [patientId, setPatientId] = useState('');
//   const [exerciseData, setExerciseData] = useState([]);

//   const URL = process.env.EXPO_PUBLIC_API_URL;
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchPatientId = async () => {
//       if (!patientEmail) return;
//       try {
//         const response = await axios.get(`http://${URL}:8000/api/patient/get-id/`, {
//           params: { email: patientEmail }
//         });
//         setPatientId(response.data.id);
//       } catch (error) {
//         console.error('Error fetching patient ID:', error);
//         Alert.alert('Error', 'Failed to fetch patient information');
//       }
//     };

//     if (patientEmail) {
//       fetchPatientId();
//     }
//   }, [patientEmail]);

//   const handleTrainingSave = () => {
//     if (!programName || !exerciseData.length || !patientId) {
//       Alert.alert('Error', 'Please enter a program name, patient email, and select at least one exercise');
//       return;
//     }

//     const trainingData = {
//       training_name: programName,
//       patient_id: patientId,
//       exercises_plan: exerciseData,
//     };

//     axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
//       .then(response => {
//         Alert.alert('Success', 'Training plan saved successfully');
//         navigation.navigate('Summary', { patientId: patientId });
//       })
//       .catch(error => {
//         console.error('Error response:', error);
//         Alert.alert('Error', 'Failed to save training plan');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader />
//       <AHeader />
//       <Name 
//         programName={programName} 
//         setProgramName={setProgramName}
//         patientEmail={patientEmail}
//         setPatientEmail={setPatientEmail}
//       />
//       <ExList setExerciseData={setExerciseData} />
//       <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
//         <Text style={styles.buttonText}>שמור</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#42B8D5',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     margin: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default BuildEx;

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AppHeader from './components/AppHeader';
import AHeader from './components/AHeader';
import Name from './components/Name';
import ExList from './components/ExList';
import { useNavigation } from '@react-navigation/native';

const BuildEx = () => {
  const [programName, setProgramName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  const URL = process.env.EXPO_PUBLIC_API_URL;
  const navigation = useNavigation();

  const handleTrainingSave = async () => {
    if (!programName || !exerciseData.length || !patientEmail) {
      Alert.alert('Error', 'Please enter a program name, patient email, and select at least one exercise');
      return;
    }

    try {
      // Fetch patient ID
      const patientResponse = await axios.get(`http://${URL}:8000/api/patient/get-id/`, {
        params: { email: patientEmail }
      });
      const patientId = patientResponse.data.id;

      if (!patientId) {
        Alert.alert('Error', 'Invalid patient email. Please check and try again.');
        return;
      }

      const trainingData = {
        training_name: programName,
        patient_id: patientId,
        exercises_plan: exerciseData,
      };

      // Save training plan
      const saveResponse = await axios.post(`http://${URL}:8000/api/register/training/`, trainingData);
      
      Alert.alert('Success', 'Training plan saved successfully');
      navigation.navigate('Summary', { patientId: patientId });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save training plan. Please check the patient email and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <AHeader />
      <Name 
        programName={programName} 
        setProgramName={setProgramName}
        patientEmail={patientEmail}
        setPatientEmail={setPatientEmail}
      />
      <ExList setExerciseData={setExerciseData} />
      <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
        <Text style={styles.buttonText}>שמור</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#42B8D5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuildEx;