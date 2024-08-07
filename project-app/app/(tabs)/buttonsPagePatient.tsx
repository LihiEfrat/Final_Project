import React, { useEffect,useState } from 'react';
import { useNavigation, useRoute} from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const buttonsPagePatient = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail } = route.params || {};
  const [patientId, setPatientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPatientId = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://${URL}:8000/api/patient/get-id/`, {
          params: { email: userEmail }
        });
        setPatientId(response.data.id);
      } catch (error) {
        console.error('Error fetching patient ID:', error);
        Alert.alert('Error', 'Failed to fetch patient information');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPatientId();
  }, [userEmail]);

  const openWhatsApp = () => {
    const url = 'https://wa.me/972544204540';
    Linking.openURL(url).catch((err) => Alert.alert('Error', 'Failed to open whatsapp: ' + err));
  };

  // pop up for logout confirmation
  const handleBackPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.arrow}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./logo.jpg')}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>דף בית מטופל</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('patientSummary', { patientId: patientId, userEmail })}>
        <Text style={styles.buttonText}>התוכנית שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openWhatsApp} style={styles.whatsappButton}>
        <Image 
          source={require('./download.png')} 
          style={styles.image} 
          alt="Chat on WhatsApp"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60, 
  },
  logo: {
    width: 250, 
    height: 100, 
    marginBottom: 20, 
  },
  titleContainer: {
    width: '110%',
    backgroundColor: '#42B8D5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#42B8D5',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
    width: width * 0.6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 40, 
    left: 20,
    paddingTop: 30,   
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    left: 20, 
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
});

export default buttonsPagePatient;

