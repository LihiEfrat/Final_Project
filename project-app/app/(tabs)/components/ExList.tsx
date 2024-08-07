


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Image, ScrollView } from 'react-native';
import YouTubePlayer from '../YouTubePlayer';
import axios from 'axios';



const ExList = ({ setExerciseData }) => {
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exerciseValues, setExerciseValues] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exerciseImages, setExerciseImages] = useState({});


  const URL = process.env.EXPO_PUBLIC_API_URL;
//icon pull
  const imageLibrary = [
    require('../pictures/1.png'),
    require('../pictures/2.png'),
    require('../pictures/3.png'),
    require('../pictures/4.png'),
    require('../pictures/5.png'),
    require('../pictures/6.png'),
    require('../pictures/7.png'),
    require('../pictures/8.png'),
    require('../pictures/9.png'),

  
  ];
  //random icons 
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageLibrary.length);
    return imageLibrary[randomIndex];
  };
  //get exercises from my_app exercise table
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://${URL}:8000/api/exercise/getAll/`);
        setAllExercises(response.data);
        setFilteredExercises(response.data);
        //set categories
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
  
        // create a mapping of exercise IDs to random images
        const imageMap = {};
        response.data.forEach(exercise => {
          imageMap[exercise.Eid] = getRandomImage();
        });
        setExerciseImages(imageMap);
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

  //handle value change for each exercise
  const handleValueChange = (exerciseId, value) => {
    setExerciseValues(prev => ({
      ...prev,
      [exerciseId]: value
    }));
  };
// filter exercises by category
  const filterExercises = (category) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredExercises(allExercises.filter(exercise => exercise.category === category));
    } else {
      setFilteredExercises(allExercises);
    }
  };
//create exercise item 
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
          <Image source={exerciseImages[item.Eid]} style={styles.exerciseImage} />
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
//summary of chosen exercise in specific point
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
      {/* list of exercises */}
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
         {/* descripiton+video for each exercise */}
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
            
            <Button title="חזור לערוך" onPress={() => setSummaryModalOpen(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: 'rtl',

  },
  categoryList: {
    maxHeight: 60, 
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 15,
    backgroundColor: '#C2E4ED',
    justifyContent: 'center', 
  },
  selectedCategory: {
    backgroundColor: '#42B8D5',
  },
  categoryButtonText: {
    color: 'black',
    fontSize: 16, 
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
          height: 200, 
          marginBottom: 10,
        },
});

export default ExList;