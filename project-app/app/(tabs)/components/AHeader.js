// import react from 'react';
// import { StyleSheet, Text,View } from 'react-native';

// const Header=()=>{
//     return(
//         <View style={styles.header}>
//             <Text style={styles.title}>בניית תוכנית אימון</Text>
//         </View>
//     )
// }
// export default Header;
// const styles=StyleSheet.create({
//     header:{
//        marginTop:50,
//         heigt: 80,
//         paddingTop:14,
//         backgroundColor:'coral'
//     },
//     title:{
//         textAlign:'center',
//         color:'#fff',
//         fontSize:20,
//         fontWeight:'bold',
//     },
// })
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
   
      
      <Text style={styles.title}>בניית תוכנית אימון</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // marginTop: 50,
    height: 50,
    paddingTop: 14,
    backgroundColor: '#42B8D5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  arrow: {
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  icons:{
    flexDirection:'row',
    alignItems:'stretch'
  }
});
