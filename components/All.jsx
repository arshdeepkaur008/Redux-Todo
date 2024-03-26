// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { selectTodos } from '../reducers/TodoSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { removeTodo } from '../reducers/TodoSlice';
// import { clearAll } from '../reducers/TodoSlice';
// import { useNavigation } from '@react-navigation/native';

// export default function All() {
//     const dispatch = useDispatch();
//     const navigation = useNavigation();

//     const todos = useSelector(selectTodos)

//     function remove(index) {
//         dispatch(removeTodo(index));
//     }

//     function clear() {
//         dispatch(clearAll());
//     }

//     function handleAddMore() {
//         navigation.navigate('CreateTodo');
//     }

//     const styles = StyleSheet.create({
//         container: {
//             padding: 20,
//         },
//         head: {
//             fontSize: 30,
//             marginTop: 100,
//             paddingBottom: 30,
//             marginLeft: 90,
//             color: 'darkblue',
//             fontWeight: '800'
//         },
//         todoItem: {
//             marginBottom: 10,
//             borderBottomWidth: 1.5,
//             borderStartWidth: 1.5,
//             borderStartColor: 'skyblue',
//             borderBottomColor: 'skyblue',
//             paddingBottom: 10,
//             borderTopWidth: 1.5,
//             borderTopColor: 'skyblue',
//             borderEndWidth: 1.5,
//             borderEndColor: 'skyblue',
//             paddingLeft: 20,
//             paddingTop: 10,
//             marginBottom: 30,
//             position: 'relative',
//         },
//         todoText: {
//             fontSize: 16,
//             fontWeight: 'bold',
//         },
//         icon: {
//             position: 'absolute',
//             right: 10,
//             top: '50%', 
//             transform: [{ translateY: -8 }], 
//         },
//         buttonContainer: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: 20,
//         },
//         button: {
//             width: 75,
//             height: 40,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'darkblue',
//             borderRadius: 30,
//             marginLeft: 10,
//             marginTop: 100
//         },
//         buttonText: {
//             color: 'white',
//             fontWeight: '700',
//         },
//     });

//     return (
//         <ScrollView style={styles.container}>
//             <View style={{ flexDirection: 'row' }}>
//                 <Text style={styles.head}>My Tasks</Text>
//                 <TouchableOpacity onPress={clear} style={styles.button}>
//                     <Text style={styles.buttonText}>Clear All</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleAddMore} style={styles.button}>
//                     <Text style={styles.buttonText}>Add More</Text>
//                 </TouchableOpacity>
//             </View>
//             {todos?.map((todo, index) => (
//                 <View key={index} style={styles.todoItem}>
//                     <Text style={styles.todoText}>Task Name: {todo.taskName}</Text>
//                     <Text style={styles.todoText}>Category: {todo.category}</Text>
//                     <Text style={styles.todoText}>Date: {todo.date}</Text>
//                     <Text style={styles.todoText}>Start Time: {todo.startTime}</Text>
//                     <Text style={styles.todoText}>End Time: {todo.endTime}</Text>
//                     <Text style={styles.todoText}>Description: {todo.description}</Text>
//                     <TouchableOpacity onPress={() => remove(index)} style={styles.icon}>
//                         <FontAwesomeIcon icon={faTrash} size={16} />
//                     </TouchableOpacity>
//                 </View>
//             ))}
//         </ScrollView>
//     );
// }




import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { selectTodos, removeTodo, clearAll } from '../reducers/TodoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';


export default function All() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const todos = useSelector(state=> state.todos.todos);


    function remove(index) {
        dispatch(removeTodo(index));
    }

    function clear() {
        dispatch(clearAll());
    }

    function handleAddMore() {
        navigation.navigate('CreateTodo');
    }

    console.log(todos)


    const renderTodoItem = ({ item, index }) => (
        <Swipeable renderRightActions={() =>(
            <View style={styles.rightSwipeAction}>

            </View>
        )}
        
        onSwipeableWillOpen={()=> remove(index)}>
            <View style={styles.todoItem}>
                <Text style={styles.todoText}>Task Name: {item.taskName}</Text>
                <Text style={styles.todoText}>Category: {item.category}</Text>
                <Text style={styles.todoText}>Date: {item.date}</Text>
                <Text style={styles.todoText}>Start Time: {item.startTime}</Text>
                <Text style={styles.todoText}>End Time: {item.endTime}</Text>
                <Text style={styles.todoText}>Description: {item.description}</Text>
            </View>
         </Swipeable> 
    );

    return (
        <GestureHandlerRootView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.head}>My Task List</Text>
                    <TouchableOpacity onPress={clear} style={styles.button}>
                        <Text style={styles.buttonText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddMore} style={styles.button}>
                        <Text style={styles.buttonText}>Add More</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={todos}
                    renderItem={renderTodoItem}
                    contentContainerStyle={{padding:8}}
                    style={styles.list}
                />
            </View>
        </GestureHandlerRootView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    head: {
        fontSize: 30,
        color: 'darkblue',
        fontWeight: '800',
        flex: 1,
        marginTop: 70,
        marginLeft: 50
    },
    button: {
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkblue',
        borderRadius: 30,
        marginLeft: 10,
        marginTop: 70
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
    },
    todoItem: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    todoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
   
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 20,
    },
});
