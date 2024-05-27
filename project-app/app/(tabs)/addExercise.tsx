// Screen2.js

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'; // Import Axios for making HTTP requests

const data = [
    { label: 'כתף', value: '1' },
    { label: 'ברך', value: '2' },
    { label: 'רגל', value: '3' },
    { label: 'גב', value: '4' },
    { label: 'קרסול', value: '5' },
    { label: 'צוואר', value: '6' },
    { label: 'כף יד', value: '7' },
    { label: 'שכמה', value: '8' },
];

const addExercise = () => {
    const [text, setText] = useState("")
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        name: '',
        category: '',
        description: '',
        file: '', 
        approval: '', 
        user: '', 
    });

    const handleSubmit = async () => {
        try {
            // const response = await axios.post('http://your-django-backend-url/create-exercise/', exerciseData);
            const response = await axios.post('http://10.100.102.16:8000/create-exercise/', exerciseData);
            console.log(response.data); // Handle successful response
            // Optionally, reset form fields or show a success message
        } catch (error) {
            console.error('Error:', error); // Handle error
        }
    };

    const handleChange = (field, value) => {
        setExerciseData({
            ...exerciseData,
            [field]: value,
        });
    };

    return (
        <SafeAreaView>       
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}> הוספת תרגיל למאגר</Text>
                <TextInput
                    defaultValue='שם התרגיל'
                    onChangeText={txt => setText(txt)}
                    style={[styles.input, { height: 40 }]}
                />

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    inputSearchStyle={[styles.inputSearchStyle, { textAlign: 'right' }]}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'בחר/י קטגוריה' : '...'}
                    searchPlaceholder="חפש/י..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />

                <TextInput
                    defaultValue='פירוט התרגיל'
                    onChangeText={txt => setText(txt)}
                    multiline={true}
                    style={[styles.input, { height: 100, paddingTop: 10 }]}
                />

                <View style={styles.uploadContainer}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => console.log('Button pressed for uploading file')}
                    >
                        <AntDesign name="upload" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 16 }}>העלאת סרטון תרגיל</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, isChecked && { backgroundColor: '#19a6b8' }]}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        {isChecked && <AntDesign name="check" size={20} color="white" />}
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 16 }}>אישור הורדת התרגיל ותכניו במצב לא מקוון</Text>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={() => console.log('button pressed for saving changes')}>
                    <Text style={{ color: 'white'}}> שמור שינויים </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default addExercise;

const styles = StyleSheet.create({
    titleText: {
        fontSize: 16, 
        textAlign: 'right',
        padding: 15,
    },

    mainContainer: {
        backgroundColor: '#d8f6fa',
        minHeight: '100%',
        paddingBottom: 300,
        textAlign: 'right'
    },

    input: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginHorizontal: 20,
        textAlign: 'right',
        fontSize: 16
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        margin: 20
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    placeholderStyle: {
        fontSize: 16,
    },

    selectedTextStyle: {
        fontSize: 16,
    },
 
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    uploadContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 20,
    },

    uploadButton: {
        backgroundColor: '#19a6b8',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 20,
        marginLeft: 10,
        marginTop: 20,
    },

    checkboxContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 20,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#19a6b8',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 10,
    },

    saveButton: {
        margin: 20,
        backgroundColor: '#19a6b8',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        alignSelf: 'center',
    },
});