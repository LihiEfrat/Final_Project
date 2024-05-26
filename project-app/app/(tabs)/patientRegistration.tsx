import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, Switch, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function RegisterToAppPatient() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [idPhoto, setIdPhoto] = useState(null);
    const [injury, setInjury] = useState('');
    const [painScale, setPainScale] = useState(50);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [interestedInNotifications, setInterestedInNotifications] = useState(false);
    const [interestedInCalendarSync, setInterestedInCalendarSync] = useState(false);

    const navigation = useNavigation();

    const URL = process.env.EXPO_PUBLIC_API_URL;

    const handleRegisterPress = () => {
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('id', id);
        formData.append('email', email);
        formData.append('phone_number', phoneNumber);
        formData.append('password', password);
        if (idPhoto) {
            formData.append('id_photo', {
                uri: idPhoto.uri,
                name: idPhoto.uri.split('/').pop(),
                type: 'image/jpeg'
            });
        }
        formData.append('injury', injury);
        formData.append('pain_scale', painScale);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('interested_in_notifications', interestedInNotifications);
        formData.append('interested_in_calendar_sync', interestedInCalendarSync);

        axios.post(`http://${URL}:8000/api/register/patient/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                navigation.navigate('buttonsPagePatient');
            })
            .catch(error => {
                console.error('There was an error making the request:', error);
                console.error('Error message:', error.message);
                if (error.response) {
                    console.error('Server responded with status:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                }
            });
    };

    const handleChoosePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setIdPhoto(result.assets[0]);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.heading}> רישום מטופל </Text>
                    <Text style={styles.heading1}> מידע אישי </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="שם פרטי"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="שם משפחה"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="תעודת זהות"
                        value={id}
                        onChangeText={setId}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="מספר טלפון"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="סיסמא"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button title="העלאת תעודת חוגר/משרת מילואים פעיל" onPress={handleChoosePhoto} />
                    <Text style={styles.heading1}> מידע אודות הפציעה </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="פציעות"
                        value={injury}
                        onChangeText={setInjury}
                    />
                    <Text style={styles.heading2}> איך אני מרגיש? </Text>
                    <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="red"
                        value={painScale}
                        onValueChange={setPainScale}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="גובה"
                        value={height}
                        onChangeText={setHeight}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="משקל"
                        value={weight}
                        onChangeText={setWeight}
                    />
                    <Text style={styles.heading1}> התראות מערכת וסנכרון </Text>
                    <Text style={styles.heading2}> מעוניין לקבל עדכונים והתראות: </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        ios_backgroundColor="#3e3e3e"
                        value={interestedInNotifications}
                        onValueChange={setInterestedInNotifications}
                    />
                    <Text style={styles.heading2}> מעוניין לסנכרן מידע עם היומן שלי: </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        ios_backgroundColor="#3e3e3e"
                        value={interestedInCalendarSync}
                        onValueChange={setInterestedInCalendarSync}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
                        <Text style={styles.buttonText}> רישום</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 70,
    },
    card: {
        width: Dimensions.get('window').width - 40,
        backgroundColor: "white",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8
    },
    heading: {
        fontSize: 24,
        marginBottom: 20
    },
    heading1: {
        fontSize: 16,
        marginBottom: 20,
        color: "coral"
    },
    heading2: {
        fontSize: 16,
        marginBottom: 20,
        color: "black"
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 5,
        margin: 10
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    }
});
