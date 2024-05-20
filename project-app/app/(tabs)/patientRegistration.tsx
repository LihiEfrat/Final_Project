// import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, Switch,ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';


export default function RegisterToAppPatient() {

    const navigation = useNavigation()

    const handleRegisterPress = () => {
        navigation.navigate('buttonsPagePatient');
    };

  return (
    <ScrollView>
        <View style = {styles.container}>
        <View style = {styles.card}>
            <Text style = {styles.heading}> רישום מטופל </Text>
            <Text style = {styles.heading1}> מידע אישי </Text>
            <TextInput style = {styles.input} placeholder = "שם פרטי" />
            <TextInput style = {styles.input} placeholder = "שם משפחה" />
            <TextInput style = {styles.input} placeholder = "תעודת זהות" />
            <TextInput style = {styles.input} placeholder = "Email" />
            <TextInput style = {styles.input} placeholder = "מספר טלפון" />
            <TextInput style = {styles.input} placeholder = "סיסמא" secureTextEntry/>
            <Button title="העלאת תעודת חוגר/משרת מילואים פעיל" />
            <Text style = {styles.heading1}> מידע אודות הפציעה </Text>
            <TextInput style = {styles.input} placeholder = "פציעות" />
            <Text style = {styles.heading2}> איך אני מרגיש? </Text>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="red"
            />
            <TextInput style = {styles.input} placeholder = "גובה" />
            <TextInput style = {styles.input} placeholder = "משקל" />
            <Text style = {styles.heading1}> התראות מערכת וסנכרון </Text>
            <Text style={styles.heading2}>  מעוניין לקבל עדכונים והתראות: </Text>
            <Switch trackColor={{false: '#767577', true: '#81b0ff'}} ios_backgroundColor="#3e3e3e"/>
            <Text style={styles.heading2}> מעוניין לסנכרן מידע עם היומן שלי:</Text>
            <Switch trackColor={{false: '#767577', true: '#81b0ff'}} ios_backgroundColor="#3e3e3e"/>
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
    heading2: {
        fontSize:16,
        marginBottom:20,
        color: "black"
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
        padding: 8,
        borderRadius:5,
        margin: 10
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    }


});



