// Screen1.js

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Exercise data
const exerciseData = [
    { id: '1', title: 'Exercise 1', /* Other exercise data */ },
    { id: '2', title: 'Exercise 2', /* Other exercise data */ },
    { id: '3', title: 'Exercise 3', /* Other exercise data */ },
    { id: '4', title: 'Exercise 4', /* Other exercise data */ },
    { id: '5', title: 'Exercise 5', /* Other exercise data */ },
    { id: '6', title: 'Exercise 6', /* Other exercise data */ },
];

// ExerciseItem component to render each exercise
const ExerciseItem = ({ item }) => {
    return (
        <View style={styles.exerciseItem}>
            {/* Display exercise content */}
            <View style={styles.videoClip}></View>
            <Text style={{ textAlign: 'center', width: 100 }}>{item.title}</Text>
        </View>
    );
};


const exerciseManager = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 10}}>
                <Text style={{textAlign: 'right'}}>דף ראשי - מאגר תרגילים</Text>
            </View>

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
                    renderItem={({ item }) => <ExerciseItem item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={3} 
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
        backgroundColor: '#19a6b8',
    },

    titleText: {
        color: 'white',
        fontSize: 30,
        margin: 10,
    },

    addButton: {
        margin: 20,
        backgroundColor: '#19a6b8',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
    },

    sectionTitle: {
        backgroundColor: '#19a6b8',
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
        width: 100,
        height: 100,
        backgroundColor: 'lightgray', // Placeholder for video clip
        marginBottom: 5,
    },
});

