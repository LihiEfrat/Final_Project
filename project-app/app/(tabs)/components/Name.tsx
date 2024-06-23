

import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Name = ({ programName, setProgramName ,patient,setPatientId}) => {
  return (
    <View style={styles.name}>
 <View style={styles.row}>
        <Text style={styles.title}>שם התוכנית</Text>
      <TextInput
        style={styles.input}
        value={programName}
        onChangeText={setProgramName}
        placeholder="הזן שם תוכנית"
      />
    </View>
    <View style={styles.row}>
       <Text style={styles.title}>זיהוי מטופל</Text>
      
      <TextInput
        style={styles.input}
        value={patient}
        onChangeText={setPatientId}
        placeholder="הזן תעודת זהות מטופל"
      />
</View>
    </View>
  );
};

export default Name;

const styles = StyleSheet.create({
  name: {
    direction: 'rtl',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
