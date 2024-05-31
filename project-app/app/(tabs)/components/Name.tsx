// import react from 'react';
// import { StyleSheet, Text,View, TextInput} from 'react-native';

// const Name=()=>{
//     return(
//         <View style={styles.name}>
//             <Text style={styles.title}> שם התוכנית</Text>
//             <TextInput style={styles.input}/>
//         </View>
//     )
// }
// export default Name;

// const styles=StyleSheet.create({
//     name:{
//         direction:'rtl',

//             justifyContent:'center',
//             alignItems:'center',
//             flexDirection:'row',
//             // backgroundColor:'white',
//             padding:20,
//         },
    
//     input:{
//         borderWidth:1,
//         padding:8,
//         margin:10,
//         width:200,
        
//     },
// })

import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Name = ({ programName, setProgramName }) => {
  return (
    <View style={styles.name}>
      <Text style={styles.title}>שם התוכנית</Text>
      <TextInput
        style={styles.input}
        value={programName}
        onChangeText={setProgramName}
        placeholder="Enter program name"
      />
    </View>
  );
};

export default Name;

const styles = StyleSheet.create({
  name: {
    direction: 'rtl',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
});
