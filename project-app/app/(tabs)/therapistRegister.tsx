import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';


export default function RegisterToAppTherapist() {
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation()

    const handleRegisterPress = () => {
        navigation.navigate('buttonsPageTherapist');
    };

  return (
<ScrollView>
    <View style = {styles.container}>
    <View style = {styles.card}>
        <Text style = {styles.heading}> רישום מטפל </Text>
        <Text style = {styles.heading1}> מידע אישי </Text>
        <TextInput style = {styles.input} placeholder = "שם פרטי" />
        <TextInput style = {styles.input} placeholder = "שם משפחה" />
        <TextInput style = {styles.input} placeholder = "תעודת זהות" />
        <TextInput style = {styles.input} placeholder = "מספר רישיון" />
        <TextInput style = {styles.input} placeholder = "Email" />
        <TextInput style = {styles.input} placeholder = "מספר טלפון" />
        <TextInput style = {styles.input} placeholder = "סיסמא" secureTextEntry/>
        <View style={styles.row}>
            <Text style={styles.heading1}>בעל תעודת מומחה?</Text>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        </View>
        < TouchableOpacity style = { styles.button} onPress={handleRegisterPress}>
            <Text style = {styles.buttonText}> רישום</Text>
        </TouchableOpacity>
    </View>    
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 70, 
    },
    card: {
        width: Dimensions.get('window').width - 40,
        backgroundColor: "white",
        padding:20,
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8
    },
    heading: {
        fontSize:24,
        marginBottom:20
    },
    heading1: {
        fontSize:16,
        marginBottom:20,
        color: "coral"
    },
    input:{
        height:50,
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius:5
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },
    checkbox: {
        margin: 10,
        marginTop:0
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },


});



