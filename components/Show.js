import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { clearAll, removeTodo, updateTodo } from '../reducers/TodoSlice';

export default function Show() {
    const data = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    function remove(id) {
        dispatch(removeTodo(id));
    }

    function clear() {
        dispatch(clearAll())
    }

    function startEdit(id, task) {
        setEditIndex(id);
        setEditedTask(task);
    }

    function saveEdit(id) {
        dispatch(updateTodo({ index: id, task: editedTask }));
        setEditIndex(null);
        setEditedTask('');
    }

    const styles = StyleSheet.create({
        t1: {
            fontSize: 25,
            fontWeight: '800',
            marginLeft: 130,
            paddingTop: 20,
            color: 'skyblue',
            paddingBottom: 20,
        },
        task: {
            fontSize: 25,
            marginLeft: 20,
            paddingTop: 8,
            flex: 1,
        },
        icon: {
            position: 'absolute',
            right: 40,
            top: 12,
            color: 'blue'
        },
        icon1: {
            position: 'absolute',
            right: 80,
            top: 12,
            color: 'blue',
        },
        all: {
            width: 80,
            paddingLeft: 12,
            paddingTop: 8,
            height: 35,
            marginLeft: 40,
            marginTop: 20,
            backgroundColor: 'blue',
            borderWidth: 1,
        },
        editInput: {
            width: 280,
            paddingLeft: 10,
            fontSize: 20,
            height: 40,
            marginTop: 20,
            marginLeft: 10,
            borderWidth: 0.5,
            borderColor: 'blue',
            borderRadius: 50
        },
    });

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.t1}>Your Tasks</Text>
                <TouchableOpacity onPress={() => setEditIndex(null)} style={styles.all}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Clear All</Text>
                </TouchableOpacity>
            </View>
            {data?.map((task, id) => (
                <View style={{ flexDirection: 'row' }} key={id}>
                    {editIndex === id ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={styles.editInput}
                                value={editedTask}
                                onChangeText={setEditedTask}
                                autoFocus
                            />
                            <TouchableOpacity onPress={() => saveEdit(id)} style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'blue', paddingTop: 16, fontWeight: '700' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.task}>{task}</Text>
                            <TouchableOpacity onPress={() => remove(id)} style={styles.icon}>
                                <FontAwesomeIcon icon={faTrash} size={16} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => startEdit(id, task)} style={styles.icon1}>
                                <FontAwesomeIcon icon={faPenNib} size={16} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            ))}
        </View>
    );
}

