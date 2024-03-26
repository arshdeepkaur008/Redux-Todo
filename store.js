import { configureStore } from "@reduxjs/toolkit"
import TodoReducer from "./reducers/TodoSlice"

const store = configureStore({
   reducer: {
    todos: TodoReducer
   }
})

export default store