import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppHeader from './components/AppHeader';

const Summary = () => {
  // const { programName, exerciseData } = route.params;

  const route = useRoute();
  const { programName, exerciseData } = route.params || {};

  // Filter the exercise data to include only items with value > 0
  const filteredExerciseData = exerciseData.map(area => {
    const filteredExercises = area.exerciseOp.filter(exercise => exercise.value > 0);
    return { ...area, exerciseOp: filteredExercises };
  }).filter(area => area.exerciseOp.length > 0); // Remove areas with no valid exercises

  return (
    <View style={styles.container}>
      <AppHeader/>
      <Text style={styles.title}>סיכום</Text>
      <Text style={styles.programName}>שם התוכנית: {programName}</Text>
      <FlatList
        data={filteredExerciseData}
        keyExtractor={(item) => item.areaName}
        renderItem={({ item }) => (
          <View style={styles.areaContainer}>
            <Text style={styles.areaName}>{item.areaName}</Text>
            {item.exerciseOp.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text>{exercise.name}: {exercise.value}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    direction: 'rtl',
    textAlign: 'right',
    alignItems:'flex-start' // Align text to the right
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    direction: 'rtl',
    textAlign: 'right', 
    // Align text to the right
  },
  programName: {
    fontSize: 18,
    marginBottom: 20,
    direction: 'rtl',
    textAlign: 'right', // Align text to the right
  },
  areaContainer: {
    marginBottom: 20,
    direction: 'rtl',
  },
  areaName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    direction: 'rtl',
    textAlign: 'right', // Align text to the right
  },
  exerciseContainer: {
    marginLeft: 10,
    direction: 'rtl',
    textAlign: 'right', // Align text to the right
  },
});
