
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoginPopup from './LoginPopup'

const { width } = Dimensions.get('window'); 

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleMainButtonPress = () => {
    setModalVisible(true);
  };

  const handleClosePopup = () => {
    setModalVisible(false);
  };

  const handleRegisterPress = () => {
    navigation.navigate('selectionPage');
  };

  return (
    <View style={styles.container}> 
      <Image 
        source={require('./logo.jpg')}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.mainButton} onPress={handleMainButtonPress}>
        <Text style={styles.buttonText}>להתחברות</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>הירשם</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleClosePopup}
      >
        <LoginPopup onClose={handleClosePopup} />
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#42B8D5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logo: {
    width: width,
    height: width,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  mainButton: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#42B8D5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomePage;

