import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import YouTubePlayer from './YouTubePlayer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const URL = process.env.EXPO_PUBLIC_API_URL;

interface Exercise {
  name: string;
  value: number;
  videoUrl: string;
  description: string;
}

interface SummaryData {
  patient_id: number;
  training_name: string;
  exercises: Exercise[];
}

const PatientSummary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pEmail, setEmail] = useState();

  const route = useRoute();
  const navigation = useNavigation();
  const { patientId, userEmail } = route.params;

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const url = `http://${URL}:8000/api/patient-summary/${patientId}/`;
        console.log('Fetching from URL:', url);
        const response = await axios.get(url);
        console.log('Raw response data:', JSON.stringify(response.data, null, 2));
        setEmail(userEmail);
        console.log(pEmail);
        if (response.data.no_plan) {
          setError('אין לך תוכנית עדיין');
          setTimeout(() => {
            navigation.navigate('buttonsPagePatient', { userEmail: userEmail });
          }, 5000);
        } else {
          setSummaryData(response.data);
        }
      } catch (error) {
        console.error('Error fetching summary data:', error.response ? error.response.data : error.message);
        setError('לא קיימת תוכנית אימון אנא קבע פגישה חדשה');
        setTimeout(() => {
          navigation.navigate('buttonsPagePatient', { userEmail: userEmail });
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, [patientId, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('buttonsPagePatient', { userEmail: pEmail })} style={styles.arrow}>
            <Icon name='arrow-back' size={36} color="#1E98D7" />
          </TouchableOpacity>
          <Image source={require('./logo.jpg')} style={styles.logo} />
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.redirectText}>הנך מועבר לדף הבית, אנא תאם פגישה עם מטפל</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!summaryData) {
    return <Text style={styles.error}>No exercise plan available for this patient.</Text>;
  }

  console.log('pEmail', pEmail);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('buttonsPagePatient', { userEmail: pEmail })} style={styles.arrow}>
          <Icon name='arrow-back' size={36} color="#1E98D7" />
        </TouchableOpacity>
        <Image source={require('./logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.title}>התוכנית שלי</Text>
      <Text style={styles.programName}>שם תוכנית: {summaryData.training_name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  programName: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  exerciseContainer: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#C2E4ED',
    borderRadius: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    paddingBottom: 0
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseValue: {
    fontSize: 14,
    marginBottom: 5,
  },
  videoClip: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  redirectText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
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

export default PatientSummary;
