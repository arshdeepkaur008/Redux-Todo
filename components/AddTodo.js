import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../reducers/TodoSlice'

export default function AddTodo() {
    const[text, setText] = useState("")

    const dispatch = useDispatch()

    function adds(){
        dispatch(addTodo(text))
        setText('')
    }

    const styles = StyleSheet.create({
        head: {
            marginTop: 100,
            alignItems: 'center',
            marginLeft: 140,
            fontSize: 30,
            fontWeight: '700',
            color: 'blue'
        },
        place: {
            width: 280,
            paddingLeft: 10,
            fontSize: 20,
            height: 50,
            marginTop: 20,
            marginLeft: 10,
            borderWidth: 1,
            borderColor: 'skyblue'
        },
        add: {
            width: 90,
            marginTop: 22,
            height: 43,
            marginLeft: 15,
            paddingLeft: 15,
            paddingTop: 10,
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'skyblue',
        }
    })
  return (
    <View>
       <Text style={styles.head}>TODO APP</Text> 
       <View style={{flexDirection: 'row'}}>
       <TextInput placeholder='Enter your task' 
       value={text}
       onChangeText={setText}
       style={styles.place}/>
              <TouchableOpacity style={styles.add} onPress={adds}><Text style={{color: 'blue', fontWeight: '500'}}>Add Task</Text></TouchableOpacity>
        </View>
    </View>
  )
}

