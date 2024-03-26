import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { addTodo } from '../reducers/TodoSlice';
import { useNavigation } from '@react-navigation/native';

export default function CreateTodo() {

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [endTimePickerEnabled, setEndTimePickerEnabled] = useState(false);

    const handleDateConfirm = (date) => {
        setSelectedDate(date.toLocaleDateString());
        setDatePickerVisible(false);
    };

    const handleStartTimeConfirm = (time) => {
        const selectedStartTime = new Date(time);
        setStartTime(selectedStartTime);
        setEndTime(null); 
        setStartTimePickerVisible(false);
    };

    const handleEndTimeConfirm = (time) => {
        const selectedEndTime = new Date(time);

      
        if (startTime !== null && selectedEndTime < startTime) {
            Alert.alert(
                'Error',
                'End time cannot be before start time.',
                [{ text: 'OK', onPress: () => setEndTimePickerEnabled(true) }]
            );
            setEndTime(null);
        } else {
            setEndTime(selectedEndTime);
         
            setEndTimePickerEnabled(false);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };


    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleCreateTask = () => {
        if (taskName && selectedCategory && selectedDate && startTime && endTime && description) {
            const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            {
                const newTodo = {
                    taskName,
                    category: selectedCategory,
                    date: selectedDate,
                    startTime: formattedStartTime,
                    endTime: formattedEndTime,
                    description
                };

                dispatch(addTodo(newTodo));
                navigation.navigate('All', { newTodo });
            }
        } else {
            Alert.alert('Error', 'All fields are mandatory.');
        }
    };



    const styles = StyleSheet.create({
        h1: {
            marginTop: 100,
            marginLeft: 100,
            fontSize: 30,
            fontWeight: '700',
            color: 'darkblue'
        },
        inp1: {
            width: 340,
            height: 40,
            borderWidth: 1,
            paddingLeft: 17,
            marginLeft: 20,
            marginTop: 8,
            borderRadius: 10,
            borderColor: 'darkblue',
            backgroundColor: 'skyblue'
        },
        h2: {
            paddingTop: 30,
            marginLeft: 25,
            fontSize: 20,
            fontWeight: '700'
        },
        container: {
            flexDirection: 'row',
            marginBottom: 10,
        },
        cat: {
            width: 100,
            height: 50,
            backgroundColor: 'skyblue',
            borderColor: 'daekblue',
            paddingLeft: 0,
            paddingTop: 0,
            margin: 5,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'column',
        },
        catText: {
            color: 'black',
        },
        selectedCat: {
            backgroundColor: 'darkblue',
        },
        selectedCatText: {
            color: 'white',
        },
        h3: {
            paddingTop: 30,
            marginLeft: 25,
            fontSize: 20,
            fontWeight: '700'
        },
        inp2: {
            width: 340,
            height: 120,
            borderWidth: 1,
            paddingLeft: 17,
            marginLeft: 20,
            marginTop: 8,
            borderRadius: 10,
            borderColor: 'darkblue',
            backgroundColor: 'skyblue'
        },
        inp3: {
            width: 340,
            height: 40,
            borderWidth: 1,
            paddingLeft: 17,
            marginLeft: 40,
            marginTop: 8,
            borderRadius: 10,
            borderColor: 'darkblue',
            backgroundColor: 'skyblue'
        },
        timePickerButton: {
            width: 160,
            height: 40,
            borderWidth: 1,
            paddingLeft: 17,
            marginLeft: 20,
            marginTop: 8,
            borderRadius: 10,
            borderColor: 'darkblue',
            backgroundColor: 'skyblue',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'darkblue',
            borderRadius: 10,
            marginTop: 8,
            backgroundColor: 'skyblue',
            width: 340,
            height: 40,
            marginLeft: 20
        },
        input: {
            flex: 1,
            paddingLeft: 40,
        },
        icon: {
            left: 10,
            paddingTop: 0
        },
        clock: {
            padding: 5
        },
        sub: {
            borderRadius: 10,
            borderWidth: 1,
            width: 200,
            height: 50,
            marginTop: 20,
            marginLeft: 100,
            paddingLeft: 70,
            paddingTop: 10,
            fontSize: 20,
            color: 'white',
            backgroundColor: 'darkblue',
            fontWeight: '700'
        },
        inp5: {
            textAlignVertical: 'top',
            width: 340,
            height: 120,
            borderWidth: 1,
            paddingLeft: 17,
            marginLeft: 20,
            marginTop: 8,
            borderRadius: 10,
            borderColor: 'darkblue',
            backgroundColor: 'skyblue',
        }

    })

        return (
          <ScrollView>
                <Text style={styles.h1}>Create New Task</Text>
                <Text style={styles.h2}>Task Name :</Text>
                <TextInput
                    placeholder='Enter Task ...'
                    style={styles.inp1}
                    onChangeText={setTaskName}
                    value={taskName}
                    required
                />
                <Text style={styles.h2}>Category :</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => handleCategorySelect('Personal')} style={[styles.cat, selectedCategory === 'Personal' && styles.selectedCat]}>
                        <Text style={[styles.catText, selectedCategory === 'Personal' && styles.selectedCatText]}>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCategorySelect('Work')} style={[styles.cat, selectedCategory === 'Work' && styles.selectedCat]}>
                        <Text style={[styles.catText, selectedCategory === 'Work' && styles.selectedCatText]}>Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCategorySelect('Study')} style={[styles.cat, selectedCategory === 'Study' && styles.selectedCat]}>
                        <Text style={[styles.catText, selectedCategory === 'Study' && styles.selectedCatText]}>Study</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => handleCategorySelect('Finance')} style={[styles.cat, selectedCategory === 'Finance' && styles.selectedCat]}>
                        <Text style={[styles.catText, selectedCategory === 'Finance' && styles.selectedCatText]}>Finance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCategorySelect('Other')} style={[styles.cat, selectedCategory === 'Other' && styles.selectedCat]}>
                        <Text style={[styles.catText, selectedCategory === 'Other' && styles.selectedCatText]}>Other</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.h2}>Date:</Text>
                <View style={styles.inputWrapper}>
                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                        <Icon name="calendar-outline" size={20} color="black" style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Select Date"
                        value={selectedDate}
                        style={styles.input}
                        editable={false}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date(getCurrentDate())}
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisible(false)}
                />
              
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                   <TouchableOpacity
                        style={styles.timePickerButton}
                        onPress={() => setStartTimePickerVisible(true)}
                    >
                        <FontAwesomeIcon icon={faClock} style={styles.clock} />
                        <Text style={styles.clock}>{startTime ? `${startTime.toLocaleTimeString()}` : 'Start Time'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        onConfirm={handleStartTimeConfirm}
                        onCancel={() => setStartTimePickerVisible(false)}
                    />

                    <TouchableOpacity
                        style={[styles.timePickerButton, { marginLeft: 10 }]}
                        onPress={() => {
                            setEndTimePickerVisible(!isEndTimePickerVisible);
                         
                            setStartTimePickerVisible(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faClock} />
                        <Text style={styles.clock}>{endTime ? `${endTime.toLocaleTimeString()}` : 'End Time'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleEndTimeConfirm}
                        onCancel={() => {
                            setEndTimePickerVisible(false);
                        }}
                    />

                </View>

                <Text style={styles.h3}>Description :</Text>
                <TextInput
                    placeholder='Enter Description...'
                    style={styles.inp5}
                    onChangeText={setDescription}
                    multiline
                    value={description}
                    required
                />
                <TouchableOpacity onPress={handleCreateTask}><Text style={styles.sub}>Create</Text></TouchableOpacity>
          </ScrollView>
          );
}
