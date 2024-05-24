
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
       
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
        <Icon name='arrow-forward-outline' size={36} color="#1E98D7" />
      </TouchableOpacity>
      <Image source={require('../logo.jpg')} style={styles.logo}/>

       
      
     
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    height: 80,
    paddingTop: 14,
     backgroundColor: '#ffff',
    flexDirection: 'row',
    // alignItems: 'strech',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
  
  arrow: {
    padding: 5,
    color:'#1E98D7'
  },
  logo: {
    width: 250,
    height: 70,
    resizeMode: 'contain',
  },
  
});
