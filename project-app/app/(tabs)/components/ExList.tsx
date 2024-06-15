

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Dimensions, Image } from 'react-native';
// import { WebView } from 'react-native-webview';

// const initialData = [
//   {
//     areaName: 'Back',
//     exerciseOp: [
//       { id:'1',name: 'fknc', imgUrl: 'https://picsum.photos/200/200', value: 0 ,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       {id:'2', name: 'dcjnds', imgUrl: 'https://picsum.photos/200/200', value: 0 ,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       {id:'3', name: 'dckmmnld', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs' },
//       { id:'4',name: 'cdsl', imgUrl: 'https://picsum.photos/200/300', value: 0 ,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       { id:'5',name: 'cdk', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs' },
//       { id:'6',name: 'cdscs', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs' },
//       {id:'7', name: 'עילכג ', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       { id:'8',name: 'גגדדגגד', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//     ],
//   },
//   {
//     areaName: 'Legs',
//     exerciseOp: [
//       { id:'9',name: 'fknc', imgUrl: 'https://picsum.photos/200/200', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       { id:'10',name: 'dcjnds', imgUrl: 'https://picsum.photos/200/200', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs'},
//       { id:'11',name: 'dckmmnld', imgUrl: 'https://picsum.photos/200/300', value: 0,vidUrl:'https://www.youtube.com/embed/xEv9c38IOvs' },
//     ],
//   },
// ];

// const URL = process.env.EXPO_PUBLIC_API_URL;

// const ExList = ({ setExerciseData }) => {
//   const [exerciseData, setExerciseDataState] = useState(initialData);
//   const [selectedArea, setSelectedArea] = useState(initialData[0]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   // const [exercises, setExercises] = useState([]);
//   const [selectedExercises, setSelectedExercises] = useState({});
//   useEffect(() => {
//     setExerciseData(exerciseData);
//   }, [exerciseData]);

//   const incrementVal = (areaIndex, exerciseIndex) => {
//     const newData = [...exerciseData];
//     newData[areaIndex].exerciseOp[exerciseIndex].value++;
//     setExerciseDataState(newData);
//   };

//   const decrementVal = (areaIndex, exerciseIndex) => {
//     const newData = [...exerciseData];
//     if (newData[areaIndex].exerciseOp[exerciseIndex].value > 0) {
//       newData[areaIndex].exerciseOp[exerciseIndex].value--;
//       setExerciseDataState(newData);
//     }
//   };
//   // const handleValueChange = (exerciseId, value) => {
//   //   setSelectedExercises(prevState => ({
//   //     ...prevState,
//   //     [exerciseId]: value
//   //   }));
//   // };

//   useEffect(() => {
//     const exerciseArray = Object.entries(selectedExercises).map(([id, value]) => ({ id, value }));
//     setExerciseData(exerciseArray);
//   }, [selectedExercises]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         horizontal
//         data={exerciseData}
//         keyExtractor={(item) => item.areaName}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.areaButton}
//             onPress={() => setSelectedArea(item)}
//           >
//             <Text style={styles.areaText}>{item.areaName}</Text>
//           </TouchableOpacity>
//         )}
//         showsHorizontalScrollIndicator={false}
//       />
//       <View style={styles.filter}>
//         <Text>מיין לפי</Text>
//       </View>
//       <FlatList
//         data={selectedArea.exerciseOp}
//         numColumns={2}
//         columnWrapperStyle={styles.cls}
//         contentContainerStyle={styles.ccs}
//         keyExtractor={(item, idx) => item.name + idx}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item, index }) => {
//           const areaIndex = exerciseData.findIndex(
//             (area) => area.areaName === selectedArea.areaName
//           );
//           return (
//             <TouchableOpacity
//               style={styles.to}
//               onPress={() => {
//                 setSelectedItem(item);
//                 setModalOpen(true);
//               }}
//             >
//               <Image source={{ uri: item.imgUrl }} style={styles.pict} />
//               <Text style={styles.itemName}>{item.name}</Text>
//               <View style={styles.buttons}>
//                 <Button onPress={() => incrementVal(areaIndex, index)} title="+" />
//                 <Text style={styles.count}>{item.value}</Text>
//                 <Button onPress={() => decrementVal(areaIndex, index)} title="-" />
//               </View>
//             </TouchableOpacity>
//           );
//         }}
//       />
      
//         <Modal
//         visible={modalOpen}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setModalOpen(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             {selectedItem && (
//               <>
//                 {/* Use WebView to display the YouTube video */}
//                 <WebView
//                   style={styles.webview}
//                   source={{ uri: selectedItem.vidUrl }}
//                   allowsFullscreenVideo={true}
//                 />
//                 <Text style={styles.modalText}>שם התרגיל: {selectedItem.name}</Text>
//                 <Text style={styles.modalText}>מספר התרגיל: {selectedItem.id}</Text>
//                 <Text style={styles.modalText}>מספר חזרות: {selectedItem.value}</Text>
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
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   webview: {
//     width: 150,
//     height: 200,
//     marginBottom: 20,
//   },
// });


//new gpt 
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Modal, Dimensions, Image } from 'react-native';
import { WebView } from 'react-native-webview';

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

  useEffect(() => {
    const exercises = exerciseData.flatMap(area => area.exerciseOp.filter(ex => ex.value > 0));
    setExerciseData(exercises);
  }, [exerciseData]);

  const incrementVal = (areaIndex, exerciseIndex) => {
    const newData = [...exerciseData];
    newData[areaIndex].exerciseOp[exerciseIndex].value++;
    console.log(newData[areaIndex].exerciseOp[exerciseIndex].id);
    setExerciseDataState(newData);
  };

  const decrementVal = (areaIndex, exerciseIndex) => {
    const newData = [...exerciseData];
    if (newData[areaIndex].exerciseOp[exerciseIndex].value > 0) {
      newData[areaIndex].exerciseOp[exerciseIndex].value--;
      setExerciseDataState(newData);
    }
  };

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
      <FlatList
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
   
  }
});