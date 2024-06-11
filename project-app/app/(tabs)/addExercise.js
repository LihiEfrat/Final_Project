// Screen2.js

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'; // Import Axios for making HTTP requests
import * as ImagePicker from 'expo-image-picker';

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
    // const [text, setText] = useState("")
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        name: '',
        category: '',
        description: '',
        file: null, // Add file to state
        approval: false, 
        // user: '', 
    });

    const URL = process.env.EXPO_PUBLIC_API_URL;

    // the function will access the properties og the video file from exerciseData.file 
    // and include them in the FormData object when uploading the video to the Django server. 
    const handleSubmit = async () => {
        try {
            if (!exerciseData.file || !exerciseData.file.uri) {
                console.error('Video file information missing');
                return;
            }

            // Create form data for the video upload
            const formData = new FormData();
            formData.append('file', {
                uri: exerciseData.file.uri,
                name: exerciseData.file.name,
                type: exerciseData.file.type
            });
            formData.append('title', exerciseData.name);
            formData.append('description', exerciseData.description);
            formData.append('category', exerciseData.category);

            // Upload the video to the Django server
            const uploadResponse = await axios.post(`http://${URL}:8000/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Extract the video ID from the upload response
            const { video_id } = uploadResponse.data;
 
            // Then send other data to the server
            const response = await axios.post(`http://${URL}:8000/api/create-exercise/`, { ...exerciseData, videoId: video_id });
            
            console.log(response.data); // Handle successful response
            // Optionally, reset form fields or show a success message
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // Handle error
        }
    };

    // when a user selects a video file using expo-image-picker, 
    // the function will update the exerciseData state with the selected video file. 
    const handleChange = (field, value) => {
        console.log('handleChange called with:', field, value);
        console.log('Selected video:', value);

        if (field === 'file') {
          // Handle the selected video file
          const videoFile = {
            uri: value.uri,
            type: value.type,
            name: value.fileName || `video_${Date.now()}.${value.type.split('/')[1]}`,
          };
      
        setExerciseData(prevState => {
            const updatedState = {
                ...prevState,
                [field]: field === 'file' ? videoFile : value,
            };
            console.log('Updated exerciseData:', updatedState);
            return updatedState;
        });
        }else {
            setExerciseData(prevState => {
              const updatedState = {
                ...prevState,
                [field]: value,
              };
              console.log('Updated exerciseData:', updatedState);
              return updatedState;
            });
          }
        };
    
    



    const handleFilePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access camera roll denied');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: false,
        });
      
        if (!result.cancelled) {
          handleChange('file', result);
        }
      };

    

    return (
        <SafeAreaView>       
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}> הוספת תרגיל למאגר</Text>
                <TextInput
                    placeholder='שם התרגיל'
                    value={exerciseData.name}
                    onChangeText={(text) => handleChange('name', text)}
                    style={[styles.input, { height: 40 }]}
                />

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
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
                    onChange={(item) => {
                        setValue(item.value);
                        handleChange('category', item.label); // Update category in exerciseData
                        setIsFocus(false);
                    }}
                />

                <TextInput
                    placeholder='פירוט התרגיל'
                    value={exerciseData.description}
                    onChangeText={(text) => handleChange('description', text)}
                    multiline={true}
                    style={[styles.input, { height: 100, paddingTop: 10 }]}
                />

                <View style={styles.uploadContainer}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        // onPress={() => console.log('Button pressed for uploading file')}
                        onPress={handleFilePick}

                    >
                        <AntDesign name="upload" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 16 }}>העלאת סרטון תרגיל</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, exerciseData.approval && { backgroundColor: '#19a6b8' }]}
                        onPress={() => handleChange('approval', !exerciseData.approval)}
                    >
                        {exerciseData.approval && <AntDesign name="check" size={20} color="white" />}

                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 16 }}>אישור הורדת התרגיל ותכניו במצב לא מקוון</Text>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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