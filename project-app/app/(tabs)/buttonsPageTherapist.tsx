import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const buttonsPageTherapist = () => {
  const navigation = useNavigation();

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
        <Ionicons name="arrow-back" size={35} color="#1E98D7" />
      </TouchableOpacity>
      <Image 
        source={require('./logo.jpg')}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>דף בית מטפל</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('exerciseManager')}>
        <Text style={styles.buttonText}>ניהול מאגר תרגילים</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('buildExercise')}>
        <Text style={styles.buttonText}>יצירת תרגול</Text>
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
});

export default buttonsPageTherapist;
