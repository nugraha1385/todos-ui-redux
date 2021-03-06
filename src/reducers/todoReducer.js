/**
 * Created by Indrap on 29/11/2017.
 */

import {
    ADD_TODO_ACTION, DELETE_TODO_ACTION, SAVE_TODO_ACTION,
    FILTER_TODO_ACTION,SHOW_TODO_ACTION
} from '../actions/todoAction';
import { updateObject } from "../utils/updateObject";


//maxs one level of nested object
const initialState = {
    todos:
        [],
    todosFilter: {
        statusFilter: "",
        priorityFilter: ""
    }
}



//manual deep copy
export const updateObjectTodo = (oldState, updatedState) => {
    return {
        ...oldState,
        todos: [oldState.todos.slice()],
        todosFilter: {
            ...oldState.todosFilter
        },
        ...updatedState
    }
}

const addTodoResult = (state, action) => {
    let newState = updateObjectTodo(state);
    newState.todos = state.todos.concat(
        {
            id: new Date(),
            description: action.payload.description,
            no: state.todos.length + 1,
            status: action.payload.status,
            priority: action.payload.priority
        }
    );
    return newState;
}

const deleteTodoResult = (state, action) => {
    return updateObjectTodo(state,
        { todos: state.todos.filter((todo) => (todo.id !== action.payload.id)) });
}

const saveTodoResult = (state, action) => {
    let newState = updateObjectTodo(state);
    newState.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
            todo = {
                ...todo,
                status: action.payload.status,
                priority: action.payload.priority,
                description: action.payload.description,
                isLoading: false
            }
        }
        return todo;
    });
    console.log(newState);
    return newState;
}

const filterTodoResult = (state, action) => {
    let newState = updateObjectTodo(state,
        {
            todosFilter: {
                statusFilter: action.payload.statusFilter,
                priorityFilter: action.payload.priorityFilter
            }
        }
    );
    return newState;
}

const showTodoResult = (state, action) => {
    let newState = updateObjectTodo(state);  
    newState.todos = action.payload.todos; 
    return newState;
}

const todoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_TODO_ACTION:
            return addTodoResult(state, action);
        case DELETE_TODO_ACTION:
            return deleteTodoResult(state, action);
        case SAVE_TODO_ACTION:
            return saveTodoResult(state, action);
        case FILTER_TODO_ACTION:
            return filterTodoResult(state, action);
        case SHOW_TODO_ACTION:
            return showTodoResult(state, action);
        default:
            newState = { ...state };
    };
    return newState;
};

export default todoReducer;