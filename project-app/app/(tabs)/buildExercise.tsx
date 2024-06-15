

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

// //   return (
// //     <View style={styles.container}>
// //       <AppHeader/>
// //       <Header />
// //       <Name programName={programName} setProgramName={setProgramName} />
      
// //       <ExList setExerciseData={setExerciseData} />
// //       <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
// //         <Text style={styles.buttonText}>שמור</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default BuildEx;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     direction: 'rtl',
// //   },
// //   button: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
    
// //     marginTop:15,
// //     paddingVertical: 12,
// //     paddingHorizontal: 32,
// //     borderRadius: 4,
// //     elevation: 3,
// //     backgroundColor: '#42B8D5',
// //     // alignSelf: 'flex-start',
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     lineHeight: 21,
// //     fontWeight: 'bold',
// //     letterSpacing: 0.25,
// //     color: 'white',
// //     textAlign: 'right',
// //   },
// // });

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

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, FlatList, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AppHeader from './components/AppHeader';
import ExList from './components/ExList';

const BuildEx = () => {
  const [programName, setProgramName] = useState('');
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://10.100.102.16:8000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTrainingSave = () => {
    const trainingData = {
      training_name: programName,
      user_id: userId,
      exercises: exerciseData.flatMap(area =>
        area.exerciseOp.filter(ex => ex.value > 0).map(ex => ({
          exercise_id: ex.name,
          value: ex.value
        }))
      ),
    };

    console.log(trainingData);

    axios.post('http://10.100.102.16:8000/api/trainings/', trainingData)
      .then(response => {
        console.log(response.data);
        navigation.navigate('Summary');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <TextInput
        style={styles.input}
        placeholder="Enter Training Name"
        value={programName}
        onChangeText={setProgramName}
      />
      <Picker
        selectedValue={userId}
        onValueChange={(itemValue) => setUserId(itemValue)}
        style={styles.picker}
      >
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.username} value={user.id} />
        ))}
      </Picker>
      <ExList setExerciseData={setExerciseData} />
      <TouchableOpacity style={styles.button} onPress={handleTrainingSave}>
        <Text style={styles.buttonText}>Save</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  picker: {
    height: 50,
    width: 150,
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
