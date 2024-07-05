import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

// Map each category to a number, for the dropdown menu
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
    const navigation = useNavigation(); 

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [exerciseData, setExerciseData] = useState({
        name: '',
        category: '',
        description: '',
        file: null, 
        approval: false,        
    });

    const URL = process.env.EXPO_PUBLIC_API_URL;

    const [isLoading, setIsLoading] = useState(false); 

    useFocusEffect(
        useCallback(() => {
            // Reset the state when the screen is focused
            setExerciseData({
                name: '',
                category: '',
                description: '',
                file: null,
                approval: false,
            });
            setValue(null);
            setIsFocus(false);
        }, [])
    );

    // The function will access the properties of the video file from exerciseData.file 
    // and include them in the FormData object when uploading the video to the Django server. 
    const handleSubmit = async () => {
        try {
            if (!exerciseData.file || !exerciseData.file.uri) {
                Alert.alert('Error', 'Video file information missing');
                return;
            }
            // Set loading state to true
            setIsLoading(true); 

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
            const uploadResponse = await axios.post(`http://${URL}:8000/api/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            // Set loading state to false
            setIsLoading(false); 
            console.log(uploadResponse.data)

            // Handle the response from the backend
            if (uploadResponse.data.video_id && uploadResponse.data.video_id.success) { 
                console.log('Upload successful'); 
                Alert.alert('Success', 'Video uploaded successfully!');
                setExerciseData({
                    name: '',
                    category: '',
                    description: '',
                    file: null,
                    approval: false,
                });
                
                // Navigate back to the previous screen
                navigation.navigate('exerciseManager'); 
                return; 
            } else {
                console.log('Upload failed'); 
                Alert.alert('Error', uploadResponse.data.error || 'Failed to upload the video. Please try again.');
            }

        } catch (error) {
            // Handle error
            console.error('Error:', error.response ? error.response.data : error.message); 
            // Set loading state to false
            setIsLoading(false); 
            console.log('Error occurred, showing alert'); 
            Alert.alert('Error', 'An error occurred while uploading the video. Please try again.');
        }
    };

    // Function to handle changes in the form fields
    const handleChange = (field, value) => {
        console.log('handleChange called with:', field, value);
        
        if (field === 'file') {
            // Handle the selected video file from the device 
            const videoFile = value.assets && value.assets.length > 0
            ? {
                uri: value.assets[0].uri,
                type: value.assets[0].type || value.assets[0].mimeType,
                name: value.assets[0].fileName || `video_${Date.now()}.${value.assets[0].type.split('/')[1] || 'mp4'}`,
                }
            : null;
        
            if (videoFile) {
            console.log('videoFile object:', videoFile);
        
            setExerciseData(prevState => {
                const updatedState = {
                ...prevState,
                [field]: videoFile,
                };
                console.log('Updated exerciseData:', updatedState);
                return updatedState;
            });
            } else {
            console.log('Invalid video file data');
            }
        } else {
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
    
    // Function to handle video file picking
    const handleFilePick = async () => {
    console.log('handleFilePick function called');
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
        console.log('Video file selected:', result);
        handleChange('file', result);
    }
    };


    return (
        <SafeAreaView style={styles.safeArea}> 
        <TouchableOpacity onPress={() => navigation.navigate('exerciseManager')} style={styles.backButton}> 
            <AntDesign name="arrowleft" size={40} color="black" padding={20} />
        </TouchableOpacity>
        {isLoading ? (
            // Starting loading file animation 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
                <Text style={styles.loadingText}>Uploading video...</Text>
            </View>
        ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                            // Update category in exerciseData
                            handleChange('category', item.label); 
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
            </ScrollView>
        )}
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

    safeArea: {
        flex: 1,
        backgroundColor: '#d8f6fa',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d8f6fa',
        },

    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
        },
});
