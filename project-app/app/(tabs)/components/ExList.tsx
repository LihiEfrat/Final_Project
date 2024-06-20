
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Dimensions, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import YouTubePlayer from '../YouTubePlayer';
import { useNavigation } from '@react-navigation/native';
const initialData = [
  {
    areaName: 'Back',
    exerciseOp: [
      { id: 1, name: 'fknc', imgUrl: 'https://picsum.photos/200/200', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 2, name: 'dcjnds', imgUrl: 'https://picsum.photos/200/200', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 3, name: 'dckmmnld', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 4, name: 'cdsl', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 5, name: 'cdk', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 6, name: 'cdscs', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 7, name: 'עילכג ', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 8, name: 'גגדדגגד', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
    ],
  },
  {
    areaName: 'Legs',
    exerciseOp: [
      { id: 9, name: 'fknc', imgUrl: 'https://picsum.photos/200/200', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 10, name: 'dcjnds', imgUrl: 'https://picsum.photos/200/200', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
      { id: 11, name: 'dckmmnld', imgUrl: 'https://picsum.photos/200/300', value: 0, vidUrl: 'https://www.youtube.com/embed/xEv9c38IOvs' },
    ],
  },
];

const ExList = ({ setExerciseData }) => {
  const [exerciseData, setExerciseDataState] = useState(initialData);
  const [selectedArea, setSelectedArea] = useState(initialData[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ExerciseItem = ({ item }) => {
    console.log(item);
    const url = 'https://www.youtube.com/watch?v=' + item.videoUrl
    const value=0
    return (
      
        <View style={styles.exerciseItem}>
          <TouchableOpacity
              style={styles.to}
              onPress={() => {
                setSelectedItem(item);
                setModalOpen(true);
              }}
            ></TouchableOpacity>
            {/* Display exercise content */}
            <View style={styles.videoClip}>
                <YouTubePlayer videoUrl={url}/>
            </View>
            <Text style={{ textAlign: 'center', width: 100 }}>{item.title}</Text>
              <View style={styles.buttons}>
                <Button onPress={() => value++} title="+" />
                <Text style={styles.count}>{value}</Text>
                <Button onPress={() => decrementVal(value)} title="-" />
              </View>
        </View>
    );
};

const exerciseManager = () => {
  const URL = process.env.EXPO_PUBLIC_API_URL;

  const navigation = useNavigation();
  const [exerciseData, setExerciseData] = useState([]); // Initialize state for exercise data

  console.log(`http://${URL}:8000/api/exercise/getAll`);
  
  
  }; // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const exercises = exerciseData.flatMap(area => area.exerciseOp.filter(ex => ex.value > 0));
    setExerciseData(exercises);
  }, [exerciseData]);

  // const incrementVal = (areaIndex, exerciseIndex) => {
  //   const newData = [...exerciseData];
  //   newData[areaIndex].exerciseOp[exerciseIndex].value++;
  //   setExerciseDataState(newData);
    const incrementVal = (value) => {
      ;
      value++;
      // setExerciseDataState(newData);
  };

  const decrementVal = (value) => {
    const newData = [...exerciseData];
    if (newData[areaIndex].exerciseOp[exerciseIndex].value > 0) {
      newData[areaIndex].exerciseOp[exerciseIndex].value--;
      setExerciseDataState(newData);
    }
  };
  useEffect(() => {
    // Function to fetch exercise data from API
    const fetchExerciseData = async () => {
        try {
            const response = await fetch(`http://${URL}:8000/api/exercise/getAll/`); // Replace with your API endpoint
            console.log('The response is',response);
            
            const data = await response.json();
            console.log('The response data is',data);
            setExerciseData(data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    };

    // Call the function to fetch exercise data
    fetchExerciseData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={exerciseData}
        keyExtractor={(item) => item.areaName}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.areaButton}
            onPress={() => setSelectedArea(item)}
          >
            <Text style={styles.areaText}>{item.areaName}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.filter}>
        <Text>מיין לפי</Text>
      </View>
      {/* <FlatList
        data={selectedArea.exerciseOp}
        numColumns={2}
        columnWrapperStyle={styles.cls}
        contentContainerStyle={styles.ccs}
        keyExtractor={(item, idx) => item.name + idx}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const areaIndex = exerciseData.findIndex(
            (area) => area.areaName === selectedArea.areaName
          );
          return (
            <TouchableOpacity
              style={styles.to}
              onPress={() => {
                setSelectedItem(item);
                setModalOpen(true);
              }}
            >
              <Image source={{ uri: item.imgUrl }} style={styles.pict} />
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.buttons}>
                <Button onPress={() => incrementVal(areaIndex, index)} title="+" />
                <Text style={styles.count}>{item.value}</Text>
                <Button onPress={() => decrementVal(areaIndex, index)} title="-" />
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
      <FlatList
                    data={exerciseData}
                  numColumns={2}
                  columnWrapperStyle={styles.cls}
                  contentContainerStyle={styles.ccs}
                  keyExtractor={(item, idx) => item.name + idx}
                  showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ExerciseItem item={item} />}
                    // keyExtractor={item => item.id}

                    // numColumns={1} 
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
                <WebView
                  style={styles.webview}
                  source={{ uri: selectedItem.vidUrl }}
                  allowsFullscreenVideo={true}
                />
                <Text style={styles.modalText}>שם התרגיל: {selectedItem.name}</Text>
                <Text style={styles.modalText}>מספר התרגיל: {selectedItem.id}</Text>
                <Text style={styles.modalText}>מספר חזרות: {selectedItem.value}</Text>
                <Button title="סגור" onPress={() => setModalOpen(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    direction: 'rtl',
  },
  areaButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2E4ED',
    flexDirection: 'row',
    height: 50,
    width: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  areaText: {
    textAlign: 'center',
  },
  cls: {
    gap: 10,
    paddingHorizontal: 12,
  },
  ccs: {
    gap: 10,
    paddingBottom: 20,
  },
  to: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2E4ED',
    flex: 1,
    height: 200,
    borderRadius: 20,
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
  },
  count: {
    padding: 4,
    margin: 5,
  },
  itemName: {
    color: '#000',
    paddingTop: 3,
  },
  pict: {
    height: 130,
    width: '100%',
    borderRadius: 10,
  },
  filter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
   
  },
  exerciseItem: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2E4ED',
    // flex: 1,
    height: 200,
    borderRadius: 20,
    margin: 10,
},

videoClip: {
    // width: 150,
    height: 130,
    width: '100%',
    borderRadius: 10,
    // height: 300,
    // backgroundColor: 'lightgray', // Placeholder for video clip
    marginBottom: 5,
},
});