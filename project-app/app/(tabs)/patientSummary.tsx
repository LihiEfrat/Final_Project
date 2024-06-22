import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppHeader from './components/AppHeader';
import axios from 'axios';
import YouTubePlayer from './YouTubePlayer';


const URL = process.env.EXPO_PUBLIC_API_URL;

interface Exercise {
  name: string;
  value: number;
  videoUrl: string;
  description:string
}

interface SummaryData {
  patient_id: number;
  training_name: string;
  exercises: Exercise[];
}

const patientSummary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute();
  const { patientId } = route.params;

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const url = `http://${URL}:8000/api/patient-summary/${patientId}/`;
        console.log('Fetching from URL:', url);
        const response = await axios.get(url);
        console.log('Raw response data:', JSON.stringify(response.data, null, 2));

        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching summary data:', error.response ? error.response.data : error.message);
        setError('Failed to load summary data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, [patientId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!summaryData) {
    return <Text style={styles.error}>No exercise plan available for this patient.</Text>;
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.righttl}>
      <Text style={styles.title}>התוכנית שלי</Text>
      <Text style={styles.programName}>שם תוכנית: {summaryData.training_name}</Text>
      </View>
      <FlatList
        data={summaryData.exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseValue}>מספר חזרות: {item.value}</Text>
            <Text style={styles.exerciseValue}>פירוט: {item.description}</Text>

            <View style={styles.videoClip}>
              <YouTubePlayer videoUrl={'https://www.youtube.com/watch?v=' +item.videoUrl} />
                </View>  
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#ffff',
    direction: 'rtl',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,


  },
  programName: {
    fontSize: 18,
    marginBottom: 10,
    direction: 'rtl',

  },
  righttl:{
    direction: 'rtl',

  },
  exerciseContainer: {
   
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#C2E4ED',
        borderRadius: 10,
        alignItems: 'center',
     
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseValue: {
    fontSize: 14,
  },
  exerciseVideo: {
    fontSize: 14,
    color: 'blue',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  videoClip: {
    width: '100%',
    height: 200, 
    marginBottom: 10,
  },
});

export default patientSummary;