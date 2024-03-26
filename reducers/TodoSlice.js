// import { createSlice } from "@reduxjs/toolkit";

// const TodoSlice = createSlice({
//     name: 'todo',
//     initialState: [],
//     reducers: {

//         addTodo: (state, action) => {
//             const newTodo = action.payload;
//             console.log('New Todo:', newTodo); 
//             state.push(newTodo);
//         },

//         removeTodo: (state, action) => {
//             return state.filter((todo, index) => index !== action.payload);
//         },

//         clearAll: (state, action) => {
//             return []
//         },
//         updateTodo: (state, action) => {
//             const { index, task } = action.payload;
//             state[index] = task;
//         },
//     }
// });

// export const { addTodo, removeTodo, clearAll, updateTodo } = TodoSlice.actions
// export default TodoSlice.reducer



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload); 
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo, index) => index !== action.payload);
        },
        clearAll: (state, action) => {
            state.todos = [];
        },
    },
});

export const { addTodo, removeTodo, clearAll } = todoSlice.actions;

export const selectTodos = (state) => state.todos.todos;

export default todoSlice.reducer;
