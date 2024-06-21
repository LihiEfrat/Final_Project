
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Image } from 'react-native';
// import YouTubePlayer from '../YouTubePlayer';
// import axios from 'axios';

// const ExList = ({ setExerciseData }) => {
//   const [allExercises, setAllExercises] = useState([]);
//   const [filteredExercises, setFilteredExercises] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [exerciseValues, setExerciseValues] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const URL = process.env.EXPO_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`);
//         setAllExercises(response.data);
//         setFilteredExercises(response.data);
        
//         // Extract unique categories
//         const uniqueCategories = [...new Set(response.data.map(item => item.category))];
//         setCategories(uniqueCategories);
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
//     setExerciseValues(prev => ({
//       ...prev,
//       [exerciseId]: value
//     }));
//   };

//   const filterExercises = (category) => {
//     setSelectedCategory(category);
//     if (category) {
//       setFilteredExercises(allExercises.filter(exercise => exercise.category === category));
//     } else {
//       setFilteredExercises(allExercises);
//     }
//   };

//   const ExerciseItem = ({ item }) => {
//     const value = exerciseValues[item.Eid] || 0;
//     // const url = 'https://www.youtube.com/watch?v=' + item.videoUrl;
//     // console.log(url);
//     return (
//       <View style={styles.exerciseItem}>
//         <TouchableOpacity
//           style={styles.to}
//           onPress={() => {
//             setSelectedItem(item);
//             setModalOpen(true);
//           }}
//         >
//           <Image source={{ uri: item.imgUrl }} style={styles.exerciseImage} />
//           <Text style={styles.exerciseName}>{item.name}</Text>
//         </TouchableOpacity>
//         <View style={styles.buttons}>
//           <Button onPress={() => handleValueChange(item.Eid, value - 1)} title="-" />
//           <Text style={styles.count}>{value}</Text>
//           <Button onPress={() => handleValueChange(item.Eid, value + 1)} title="+" />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         horizontal
//         data={['All', ...categories]}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.categoryButton,
//               selectedCategory === item && styles.selectedCategory
//             ]}
//             onPress={() => filterExercises(item === 'All' ? null : item)}
//           >
//             <Text style={styles.categoryButtonText}>{item}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item}
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoryList}
//       />
//       <FlatList
//         data={filteredExercises}
//         renderItem={({ item }) => <ExerciseItem item={item} />}
//         keyExtractor={item => item.Eid.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.cls}
//         contentContainerStyle={styles.ccs}
//         showsVerticalScrollIndicator={false}
//         extraData={exerciseValues}
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
//               <View style={styles.videoClip}>
//                 <YouTubePlayer videoUrl={'https://www.youtube.com/watch?v=' +selectedItem.videoUrl} />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   categoryList: {
//     marginBottom: 10,
//   },
//   categoryButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: '#C2E4ED',
//   },
//   selectedCategory: {
//     backgroundColor: '#42B8D5',
    
//   },
//   categoryButtonText: {
//     color: 'black',
//     // height:10,
//   },
//   exerciseItem: {
//     flex: 1,
//     margin: 5,
//     padding: 10,
//     backgroundColor: '#C2E4ED',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   to: {
//     alignItems: 'center',
//   },
//   exerciseImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   exerciseName: {
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   buttons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   count: {
//     marginHorizontal: 10,
//   },
//   cls: {
//     justifyContent: 'space-between',
//   },
//   ccs: {
//     padding: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalText: {
//     marginVertical: 5,
//   },
//   videoClip: {
//       width: '100%',
//       height: 200, // Adjust this value as needed
//       marginBottom: 10,
//     },
// });

// export default ExList;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Image, ScrollView } from 'react-native';
import YouTubePlayer from '../YouTubePlayer';
import axios from 'axios';

const ExList = ({ setExerciseData, onSubmit }) => {
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exerciseValues, setExerciseValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`);
        setAllExercises(response.data);
        setFilteredExercises(response.data);
        
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
          <Button onPress={() => handleValueChange(item.Eid, Math.max(0, value - 1))} title="-" />
          <Text style={styles.count}>{value}</Text>
          <Button onPress={() => handleValueChange(item.Eid, value + 1)} title="+" />
        </View>
      </View>
    );
  };

  const renderSummary = () => {
    const selectedExercises = allExercises.filter(ex => exerciseValues[ex.Eid] > 0);
    return (
      <ScrollView>
        {selectedExercises.map(ex => (
          <View key={ex.Eid} style={styles.summaryItem}>
            <Text>{ex.name}</Text>
            <Text>מספר חזרות: {exerciseValues[ex.Eid]}</Text>
          </View>
        ))}
      </ScrollView>
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
      <Button title="סיכום תרגול" onPress={() => setSummaryModalOpen(true)} />
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
                <Text style={styles.modalText}>תאור: {selectedItem.description}</Text>
                <Text style={styles.modalText}>מספר חזרות: {exerciseValues[selectedItem.Eid] || 0}</Text>
                <Button title="סגור" onPress={() => setModalOpen(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        visible={summaryModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSummaryModalOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>סיכום תרגול</Text>
            {renderSummary()}
            {/* <Button title="שלח תרגול למטופל" onPress={() => {
              setSummaryModalOpen(false);
              onSubmit();
            }} /> */}
            <Button title="חזור לערוך" onPress={() => setSummaryModalOpen(false)} />
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
    maxHeight: 40, // Reduced height for category list
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 15,
    backgroundColor: '#C2E4ED',
    justifyContent: 'center', // Center text vertically
  },
  selectedCategory: {
    backgroundColor: '#42B8D5',
  },
  categoryButtonText: {
    color: 'black',
    fontSize: 12, // Smaller font size
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
    maxHeight: '80%',
  },
  modalText: {
    marginVertical: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  videoClip: {
          width: '100%',
          height: 200, // Adjust this value as needed
          marginBottom: 10,
        },
});

export default ExList;