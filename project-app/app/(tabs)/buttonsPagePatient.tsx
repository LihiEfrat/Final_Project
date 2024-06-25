import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');

const buttonsPagePatient = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('./logo.jpg')}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>דף בית מטופל</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>טיפול חדש</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('patientSummary', { patientId: 1})}>
        <Text style={styles.buttonText}>התוכנית שלי</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>מאגר תרגולים</Text>
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

export default buttonsPagePatient;

