import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import YouTubePlayer from './YouTubePlayer';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const URL = process.env.EXPO_PUBLIC_API_URL;

interface Exercise {
  name: string;
  value: number;
  videoUrl: string;
  description: string
}

interface SummaryData {
  patient_id: number;
  training_name: string;
  exercises: Exercise[];
}
//collecting params 
const Summary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute();
  const navigation = useNavigation();
  const { patientId, userEmail } = route.params;
//fatch information from db
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
//if patient dont have plan yet
  if (!summaryData) {
    return <Text style={styles.error}>No exercise plan available for this patient.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Image source={require('./logo.jpg')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('buildExercise')} style={styles.arrow}>
          <Icon name='arrow-back' size={36} color="#1E98D7" />
        </TouchableOpacity>
      </View>
      {/* summary of built plan */}
      <View style={styles.righttl}>
        <Text style={styles.title}>סיכום תרגול</Text>
        <Text style={styles.programName}>מטופל: {userEmail}</Text>
        <Text style={styles.programName}>שם תוכנית: {summaryData.training_name}</Text>
      </View>
      {/* exercise list */}
      <FlatList
        data={summaryData.exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseValue}>מספר חזרות: {item.value}</Text>
            <Text style={styles.exerciseValue}>פירוט: {item.description}</Text>

            <View style={styles.videoClip}>
              <YouTubePlayer videoUrl={'https://www.youtube.com/watch?v=' + item.videoUrl} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffff',
    direction: 'rtl',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'

  },
  programName: {
    fontSize: 18,
    marginBottom: 10,
    direction: 'rtl',
    textAlign: 'center'

  },
  righttl: {
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  arrow: {
    padding: 5,
    color: '#1E98D7',
  },
});

export default Summary;