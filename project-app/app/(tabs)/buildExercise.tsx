

// // import React, { useState } from 'react';
// // import { StyleSheet, Text, View, TouchableOpacity,Alert } from 'react-native';
// // import ExList from './components/ExList';
// // import Header from './components/AHeader';
// // import Name from './components/Name';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import Summary from './Summary'; 
// // import { useNavigation } from '@react-navigation/native';
// // import AppHeader from './components/AppHeader';
// // import axios from 'axios';



// // const Stack = createStackNavigator();

// // const BuildEx = () => {
// //   const [programName, setProgramName] = useState('');
// //   const [exerciseData, setExerciseData] = useState([]);

// //   const handleTrainingSave =()=>{
// //     const trainingData={
// //       name:programName,

// //     };
// //     console.log(trainingData);        

// //         axios.post('http://10.100.102.16:8000/api/save/training/', trainingData)
// //             .then(response => {
// //                 console.log(response.data);
// //                 navigation.navigate('Summary');
// //             })
// //             .catch(error => {
// //                 console.error(error);
// //             });
// //   }
// //   const navigation = useNavigation();

// //   // const handleSave = () => {
// //   //   if (!programName && !exerciseData.length) {
// //   //     Alert.alert('שגיאה', 'נא להזין שם לתוכנית ולבחור לפחות תרגיל אחד');
// //   //   } else if (!programName) {
// //   //     Alert.alert('שגיאה', 'נא לבחור שם לתוכנית');
// //   //   } else if (!exerciseData.length) {
// //   //     Alert.alert('שגיאה', 'נא לבחור לפחות תרגיל אחד');
// //   //   } else {
// //   //     navigation.navigate('Summary', { programName, exerciseData });
// //   //   }
// //   // };

//   return (
//     <View style={styles.container}>
//       <AppHeader/>
//       <Header />
//       <Name programName={programName} setProgramName={setProgramName} />
      
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
    
//     marginTop:15,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: '#42B8D5',
//     // alignSelf: 'flex-start',
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

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import ExList from './components/ExList';
// import Header from './components/AHeader';
// import Name from './components/Name';
// import { useNavigation } from '@react-navigation/native';
// import AppHeader from './components/AppHeader';

// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [exerciseData, setExerciseData] = useState([]);
//   const navigation = useNavigation();

//   // const handleTrainingSave = () => {
   
      
//   //       const trainingData = {
//   //         training_name: programName,
//   //         // Add other data fields if necessary
//   //       };
//   //       console.log(trainingData);
//   //       axios.post('http://10.100.102.16:8000/api/register/training/', trainingData)
//   //       .then(response => {
//   //         console.log(response.data);
//   //         Alert.alert('Success', 'Program saved successfully');
//   //         navigation.navigate('Summary');
//   //       })
//   //       .catch(error => {
//   //         console.error(error);
//   //         Alert.alert('Error', 'There was an error saving the program');
//   //       });  
      
//   //   }




   
//   // };


//   const handleTrainingSave = () => {
//     const trainingData = {
//       training_name: programName,
//     };

//     console.log(trainingData);        

//     axios.post('http://10.100.102.16:8000/api/register/training/', trainingData)
//         .then(response => {
//             console.log(response.data);
//             navigation.navigate('Summary');
//         })
//         .catch(error => {
//             console.error(error);
//         });
// };
//   return (
//     <View style={styles.container}>
//       <AppHeader />
//       <Header />
//       <Name programName={programName} setProgramName={setProgramName} />
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

//before gpt

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput } from 'react-native';
// import axios from 'axios';
// import {Picker} from '@react-native-picker/picker';

// import { useNavigation } from '@react-navigation/native';
// import AppHeader from './components/AppHeader';
// import ExList from './components/ExList';
// import Name from './components/Name';
// const BuildEx = () => {
//   const [programName, setProgramName] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [exerciseData, setExerciseData] = useState([]);
//   const navigation = useNavigation();

//   const URL = process.env.EXPO_PUBLIC_API_URL;

//   useEffect(() => {
//     axios.get(`http://${URL}:8000/api/users/`)
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const handleTrainingSave = () => {
//     const trainingData = {
//       training_name: 'programName',
//       user_id: 1111,
//       patient:1,
//       exercises: exerciseData.flatMap(area =>
//         area.exerciseOp.filter(ex => ex.value > 0).map(ex => ({
//           exercise_id: ex.name,
//           value: ex.value
//         }))
//       ),
//     };

//     console.log(trainingData);
//     console.log(`SENDING build ex`, `http://${URL}:8000/api/register/exercise_plan/`);

//     axios.post(`http://${URL}:8000/api/register/exercise_plan/`, trainingData)
//       .then(response => {
//         console.log(response.data);
//         navigation.navigate('Summary');
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <AppHeader />
//       <Name/>
//       <Picker
//         selectedValue={userId}
//         onValueChange={(itemValue) => setUserId(itemValue)}
//         style={styles.picker}
//       >
//         {users.map((user) => (
//           <Picker.Item key={user.id} label={user.username} value={user.id} />
//         ))}
//       </Picker>
//       <ExList setExerciseData={setExerciseData} />
//       <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
//         <Text style={styles.buttonText}>Save</Text>
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
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     margin: 10,
//     padding: 5,
//   },
//   picker: {
//     height: 50,
//     width: 150,
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


//..............after gpt...........
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AppHeader from './components/AppHeader';
import AHeader from  './components/AHeader';
import Name from './components/Name'; // Import the Name component
import ExList from './components/ExList'; // Import the ExList component

const BuildEx = () => {
  const [programName, setProgramName] = useState('');
  const [patientId, setPatientId] = useState(''); // Replace with actual patient ID
  const [exercises, setExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  // useEffect(() => {
  //   // Fetch exercises from backend
  //   axios.get(`http://${URL}:8000/api/exercises/`)
  //     .then(response => {
  //       setExercises(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       Alert.alert('Error', 'Failed to fetch exercises');
  //     });
  // }, []);


  
  // const handleTrainingSave = () => {
  //   if (!programName || !exerciseData.length) {
  //     Alert.alert('Error', 'Please enter a program name and select at least one exercise');
  //     return;
  //   }
  
  //   // const trainingData = {
  //   //   training_name: programName,
  //   //   patient_id: 1, // Example patient ID
  //   //   exercises_plans: exerciseData.map(exercise => ({
  //   //     exercise: exercise.id, // Use the exercise ID here
  //   //     value: exercise.value,
  //   //   })),
  //   const trainingData = {
  //     training_name: programName,
  //     patient_id: 1, // Example patient ID
  //     exercises_plans: exerciseData.map(exercise => ({
  //       exercise: exercises.find(ex => ex.name === exercise.name).id, // Use the exercise ID here
  //       value: exercise.value,
  //     })),
  //   };
  
  //   console.log('Sending training data:', trainingData); // Add this line to log the trainingData
  
  //   axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
  //     .then(response => {
  //       console.log('Response data:', response.data);
  //       Alert.alert('Success', 'Training plan saved successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error response:', error.response);
  //       Alert.alert('Error', 'Failed to save training plan');
  //     });
  // };

  const handleTrainingSave = () => {
    if (!programName || !exerciseData.length) {
      Alert.alert('Error', 'Please enter a program name and select at least one exercise');
      return;
    }
  
    const trainingData = {
      training_name: programName,
      patient_id: 1, // Example patient ID
      exercises_plans: exerciseData.map(exercise => {
        const matchingExercise = exercises.find(ex => ex.name === exercise.name);
        if (matchingExercise) {
          return {
            exercise: matchingExercise.id,
            value: exercise.value,
          };
        } else {
          console.warn(`No matching Exercise found for ${exercise.name}`);
          return null; // or return an object with default values if needed
        }
      }).filter(Boolean), // Remove null values from the array
    };
  
    console.log('Sending training data:', trainingData);
  
    axios.post(`http://${URL}:8000/api/register/training/`, trainingData)
      .then(response => {
        console.log('Response data:', response.data);
        Alert.alert('Success', 'Training plan saved successfully');
      })
      .catch(error => {
        console.error('Error response:', error.response);
        Alert.alert('Error', 'Failed to save training plan');
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader/>
      <AHeader />
      <Name programName={programName} setProgramName={setProgramName} />
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
