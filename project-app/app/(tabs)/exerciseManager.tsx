import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppHeader from './components/AppHeader';
import YouTubePlayer from './YouTubePlayer';


const ExerciseItem = ({ item }) => {
    const url = 'https://www.youtube.com/watch?v=' + item.videoUrl;
    console.log(url);

    return (
        <View style={styles.exerciseItem}>
            {/* Display exercise content */}
            <View style={styles.videoClip}>
                <YouTubePlayer videoUrl={url} />
            </View>
            <Text style={{ textAlign: 'center', width: '100%', marginTop: 10 }}>{item.name}</Text>
            <Text style={{ textAlign: 'center', width: '100%', marginTop: 10 }}>{item.description}</Text>
        </View>
    );
};


const exerciseManager = () => {
    const URL = process.env.EXPO_PUBLIC_API_URL;

    const navigation = useNavigation();
    // Initialize state for exercise data
    const [exerciseData, setExerciseData] = useState([]); 

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredExercises, setFilteredExercises] = useState([]);

    useFocusEffect(
        useCallback(() => {
          const fetchExerciseData = async () => {
            try {
              const response = await fetch(`http://${URL}:8000/api/exercise/getAll/`);
              console.log('The response is', response);
      
              const data = await response.json();

              const sortedData = data.sort((a, b) => b.Eid - a.Eid);
              setExerciseData(sortedData);
              setFilteredExercises(sortedData);
      
              const uniqueCategories = [...new Set(data.map(item => item.category))];
              setCategories(uniqueCategories);
            } catch (error) {
              console.error('Error fetching exercise data:', error);
            }
          };
      
          fetchExerciseData();
        }, [])
      );

    const filterExercises = (category) => {
        setSelectedCategory(category);
        if (category) {
            setFilteredExercises(exerciseData.filter(exercise => exercise.category === category));
        } else {
            setFilteredExercises(exerciseData);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <AppHeader />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>מאגר תרגילים</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addExercise')}>
                <Text style={{ textAlign: 'center', color: 'white' }}>הוספת תרגיל למאגר</Text>
            </TouchableOpacity>

            <FlatList
            data={filteredExercises}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => <ExerciseItem item={item} />}
            keyExtractor={item => item.Eid.toString()}
            ListHeaderComponent={() => (
                <>
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>כל התרגילים</Text>
                </View>
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
                </>
            )}
            />

            
        </SafeAreaView>


    );
};

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
        width: 180,
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
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    videoClip: {
        width: '100%',
        aspectRatio: 17 / 9,
        backgroundColor: 'black',
        marginBottom: 5,
    },

    categoryList: {
        maxHeight: 60,  
        marginVertical: 15,  
      },
      categoryButton: {
        paddingHorizontal: 20,  
        paddingVertical: 12,  
        marginHorizontal: 8, 
        borderRadius: 15,  
        backgroundColor: '#C2E4ED',
        justifyContent: 'center',
        alignItems: 'center', 
        minWidth: 100,
        flexShrink: 0,  
        height: 40,  
      },
      categoryButtonText: {
        color: 'black',
        fontSize: 16,  
        fontWeight: '100',  
      },
});


