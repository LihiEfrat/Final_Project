


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal } from 'react-native';
// import { WebView } from 'react-native-webview';
// import YouTubePlayer from '../YouTubePlayer';
// import axios from 'axios';

// const ExList = ({ setExerciseData }) => {
//   const [exerciseData, setExerciseDataState] = useState([]);
//   const [exerciseValues, setExerciseValues] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const URL = process.env.EXPO_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`);
//         setExerciseDataState(response.data);
//       } catch (error) {
//         console.error('Error fetching exercise data:', error);
//       }
//     };

//     fetchExercises();
//   }, []);

//   useEffect(() => {
//     const exercisePlan = Object.entries(exerciseValues).map(([id, value]) => ({
//       exercise_id: id,
//       value: value
//     }));
//     setExerciseData(exercisePlan);
//   }, [exerciseValues, setExerciseData]);

//   const handleValueChange = (exerciseId, value) => {
//     setExerciseValues(prev => {
//       const newValues = {
//         ...prev,
//         [exerciseId]: value
//       };
//       console.log('Updated exercise values:', newValues);  // Add this log
//       return newValues;
//     });
//   };

//   const ExerciseItem = ({ item }) => {
//     const url = 'https://www.youtube.com/watch?v=' + item.videoUrl;
//     const value = exerciseValues[item.Eid] || 0;

//     const incrementValue = () => {
//       const newValue = value + 1;
//       handleValueChange(item.Eid, newValue);
//     };

//     const decrementValue = () => {
//       if (value > 0) {
//         const newValue = value - 1;
//         handleValueChange(item.Eid, newValue);
//       }
//     };

//     return (
//       // <View style={styles.exerciseItem}>
//       //   <TouchableOpacity
//       //     style={styles.to}
//       //     onPress={() => {
//       //       setSelectedItem(item);
//       //       setModalOpen(true);
//       //     }}
//       //   >
//       //     <View style={styles.videoClip}>
//       //       <YouTubePlayer videoUrl={url} />
//       //     </View>
//       //     <Text style={{ textAlign: 'center', width: 100 }}>{item.name}</Text>
//       //     <View style={styles.buttons}>
//       //       <Button onPress={incrementValue} title="+" />
//       //       <Text style={styles.count}>{value}</Text>
//       //       <Button onPress={decrementValue} title="-" />
//       //     </View>
//       //   </TouchableOpacity>
//       // </View>
//       <View style={styles.exerciseItem}>
//         <TouchableOpacity
//           style={styles.to}
//           onPress={() => {
//             setSelectedItem(item);
//             setModalOpen(true);
//           }}
//         >
//       {/* <View style={styles.videoClip}>
//         <YouTubePlayer videoUrl={url} />
//       </View> */}
//       <Text style={{ textAlign: 'center', width: 100 }}>{item.name}</Text>
//       <View style={styles.buttons}>
//         <Button onPress={() => handleValueChange(item.Eid, value + 1)} title="+" />
//         <Text style={styles.count}>{value}</Text>
//         <Button onPress={() => handleValueChange(item.Eid, Math.max(0, value - 1))} title="-" />
        
//       </View>
//       </TouchableOpacity>
//     </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={exerciseData}
//         renderItem={({ item }) => <ExerciseItem item={item} />}
//         keyExtractor={item => item.Eid.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.cls}
//         contentContainerStyle={styles.ccs}
//         showsVerticalScrollIndicator={false}
//         extraData={exerciseValues}  // Add this line
//       />

//       <Modal
//         visible={modalOpen}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalOpen(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             {selectedItem && (
//               <>
//                 <View style={styles.videoClip}>
//                 <YouTubePlayer videoUrl={selectedItem.url} />
//                 </View>
//                 <Text style={styles.modalText}>שם התרגיל: {selectedItem.name}</Text>
//                 <Text style={styles.modalText}>מספר התרגיל: {selectedItem.Eid}</Text>
//                 <Text style={styles.modalText}>מספר חזרות: {exerciseValues[selectedItem.Eid] || 0}</Text>
//                 <Button title="סגור" onPress={() => setModalOpen(false)} />
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ExList;
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Image } from 'react-native';
import YouTubePlayer from '../YouTubePlayer';
import axios from 'axios';

const ExList = ({ setExerciseData }) => {
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exerciseValues, setExerciseValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`);
        setAllExercises(response.data);
        setFilteredExercises(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const exercisePlan = Object.entries(exerciseValues).map(([id, value]) => ({
      exercise_id: id,
      value: value
    }));
    setExerciseData(exercisePlan);
  }, [exerciseValues, setExerciseData]);

  const handleValueChange = (exerciseId, value) => {
    setExerciseValues(prev => ({
      ...prev,
      [exerciseId]: value
    }));
  };

  const filterExercises = (category) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredExercises(allExercises.filter(exercise => exercise.category === category));
    } else {
      setFilteredExercises(allExercises);
    }
  };

  const ExerciseItem = ({ item }) => {
    const value = exerciseValues[item.Eid] || 0;
    const url = 'https://www.youtube.com/watch?v=' + item.videoUrl;
    console.log(url);
    return (
      <View style={styles.exerciseItem}>
        <TouchableOpacity
          style={styles.to}
          onPress={() => {
            setSelectedItem(item);
            setModalOpen(true);
          }}
        >
          <Image source={{ uri: item.imgUrl }} style={styles.exerciseImage} />
          <Text style={styles.exerciseName}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <Button onPress={() => handleValueChange(item.Eid, value - 1)} title="-" />
          <Text style={styles.count}>{value}</Text>
          <Button onPress={() => handleValueChange(item.Eid, value + 1)} title="+" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={['All', ...categories]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory
            ]}
            onPress={() => filterExercises(item === 'All' ? null : item)}
          >
            <Text style={styles.categoryButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => <ExerciseItem item={item} />}
        keyExtractor={item => item.Eid.toString()}
        numColumns={2}
        columnWrapperStyle={styles.cls}
        contentContainerStyle={styles.ccs}
        showsVerticalScrollIndicator={false}
        extraData={exerciseValues}
      />
      <Modal
        visible={modalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}
        
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <>
              <View style={styles.videoClip}>
                <YouTubePlayer videoUrl={'https://www.youtube.com/watch?v=' +selectedItem.videoUrl} />
                </View>
                <Text style={styles.modalText}>שם התרגיל: {selectedItem.name}</Text>
                <Text style={styles.modalText}>מספר התרגיל: {selectedItem.Eid}</Text>
                <Text style={styles.modalText}>מספר חזרות: {exerciseValues[selectedItem.Eid] || 0}</Text>
                <Button title="סגור" onPress={() => setModalOpen(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryList: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#C2E4ED',
  },
  selectedCategory: {
    backgroundColor: '#42B8D5',
  },
  categoryButtonText: {
    color: 'black',
  },
  exerciseItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#C2E4ED',
    borderRadius: 10,
    alignItems: 'center',
  },
  to: {
    alignItems: 'center',
  },
  exerciseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  exerciseName: {
    marginTop: 5,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  count: {
    marginHorizontal: 10,
  },
  cls: {
    justifyContent: 'space-between',
  },
  ccs: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    marginVertical: 5,
  },
  videoClip: {
      width: '100%',
      height: 200, // Adjust this value as needed
      marginBottom: 10,
    },
});

export default ExList;
// ... (keep your existing styles)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     direction: 'rtl',
//   },
//   areaButton: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#C2E4ED',
//     flexDirection: 'row',
//     height: 50,
//     width: 100,
//     borderRadius: 20,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
//   areaText: {
//     textAlign: 'center',
//   },
//   cls: {
//     gap: 10,
//     paddingHorizontal: 12,
//   },
//   ccs: {
//     gap: 10,
//     paddingBottom: 20,
//   },
//   to: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#C2E4ED',
//     flex: 1,
//     height: 200,
//     borderRadius: 20,
//     margin: 10,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 6,
//   },
//   count: {
//     padding: 4,
//     margin: 5,
//   },
//   itemName: {
//     color: '#000',
//     paddingTop: 3,
//   },
//   pict: {
//     height: 130,
//     width: '100%',
//     borderRadius: 10,
//   },
//   filter: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 12,
//     marginTop: 15,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   // modalContainer: {
//   //   width: '80%',
//   //   backgroundColor: 'white',
//   //   borderRadius: 20,
   
//   // },
//   exerciseItem: {
//     flex: 1,
//     marginHorizontal: 5,
//     marginBottom: 10,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#C2E4ED',
//     // flex: 1,
//     height: 200,
//     borderRadius: 20,
//     margin: 10,
// },

// // videoClip: {
// //     // width: 150,
// //     height: 130,
// //     width: '100%',
// //     borderRadius: 10,
// //     // height: 300,
// //     // backgroundColor: 'lightgray', // Placeholder for video clip
// //     marginBottom: 5,
// //     marginTop:50
// // },
// videoClip: {
//   width: '100%',
//   height: 200, // Adjust this value as needed
//   marginBottom: 10,
// },
// modalContainer: {
//   width: '90%',
//   backgroundColor: 'white',
//   borderRadius: 20,
//   padding: 20,
//   alignItems: 'center',
// },
// });