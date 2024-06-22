
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from './components/AppHeader';
import YouTubePlayer from './YouTubePlayer';
// 
// Exercise data
const exerciseData = [
    { id: '1', title: 'Exercise 1', url: 'https://www.yout'/* Other exercise data */ },
    { id: '2', title: 'Exercise 2', url: 'https://www.youtube.com/watch?v=9EhHFemc8WQ'/* Other exercise data */ },
    { id: '3', title: 'Exercise 3', url: 'https://www.youtube.com/watch?v=9EhHFemc8WQ'/* Other exercise data */ },
    { id: '4', title: 'Exercise 4', url: 'https://www.youtube.com/watch?v=9EhHFemc8WQ'/* Other exercise data */ },
    { id: '5', title: 'Exercise 5', url: 'https://www.youtube.com/watch?v=9EhHFemc8WQ'/* Other exercise data */ },
    { id: '6', title: 'Exercise 6', url: 'https://www.youtube.com/watch?v=9EhHFemc8WQ'/* Other exercise data */ },
];

// ExerciseItem component to render each exercise
const ExerciseItem = ({ item }) => {
    console.log(item);
    const url = 'https://www.youtube.com/watch?v=' + item.videoUrl
    return (
        <View style={styles.exerciseItem}>
            {/* Display exercise content */}
            <View style={styles.videoClip}>
                <YouTubePlayer videoUrl={url}/>
            </View>
            <Text style={{ textAlign: 'center', width: 100 }}>{item.title}</Text>
        </View>
    );
};


const exerciseManager = () => {
    const URL = process.env.EXPO_PUBLIC_API_URL;

    const navigation = useNavigation();
    const [exerciseData, setExerciseData] = useState([]); // Initialize state for exercise data

    console.log(`http://${URL}:8000/api/exercise/getAll`);
    
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
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <SafeAreaView style={{flex: 1, direction: 'rtl', backgroundColor:'white'}}>
            <AppHeader/>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>מאגר תרגילים</Text>
            </View>
               
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addExercise')}>
                <Text style={{ textAlign: 'center', color: 'white' }}>הוספת תרגיל למאגר</Text>
            </TouchableOpacity>

            <ScrollView style={{ flex: 1 }}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>כל התרגילים</Text>
                </View>

                {/* Exercise List */}
                <FlatList
                    data={exerciseData}
                    contentContainerStyle={styles.ccs}
                    renderItem={({ item }) => <ExerciseItem item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={1} 
                />

            </ScrollView>
        </SafeAreaView>
    );
}

export default exerciseManager;

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42B8D5',

    },

    titleText: {
        color: 'white',
        fontSize: 30,
        margin: 10,
    },

    addButton: {
        margin: 20,
        backgroundColor: '#42B8D5',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
    },

    sectionTitle: {
        backgroundColor: '#42B8D5',
        padding: 5,
    },

    sectionTitleText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        alignItems: 'center',
    },

    exerciseItem: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
    },

    videoClip: {
        width: 300,
        // height: 300,
        backgroundColor: 'lightgray', // Placeholder for video clip
        marginBottom: 5,
    },
    cls: {
        gap: 10,
        paddingHorizontal: 12,
      },
      ccs: {
        gap: 10,
        paddingBottom: 20,
      },
    exerciseItem: {
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        flex: 1,
        margin: 5,
    },
    exerciseImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
        borderRadius: 8,
        // backgroundColor: '#d3d3d3', // Placeholder color if the image doesn't load
    },
});

