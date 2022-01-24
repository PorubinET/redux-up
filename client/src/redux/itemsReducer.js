import {
    LOAD_TASK,
    CREATE_TASK,
    FILTER_TASK,
    UPDATE_TEXT,
    UPDATE_DESC,
    DELETE_TASK,
    DELETE_TASK_ALL,
    COMPLETED_ALL_TASK,
    UPDATE_CHECK_TASK
} from "./types";



const initialState = {
    tasks: [],
    filter: 'all',
}

export const itemsReducer = (state = initialState, action) => {
    const { payload } = action;
    const { tasks } = state;

    switch (action.type) {
        case LOAD_TASK:
            return { ...state, tasks: payload }
        case CREATE_TASK:
            return { ...state, tasks: [...state.tasks, payload] } 
        case FILTER_TASK:
            return { ...state, filter: action.filt }
        case DELETE_TASK_ALL:
            return { ...state, tasks: tasks.filter((items) => !items.done) } 

        case UPDATE_TEXT: 
            return {
                ...state,
                tasks: tasks.map(item => ({ ...item, text: item._id === payload._id ? payload.text: item.text }))
            }
        case UPDATE_DESC: 
        console.log(UPDATE_DESC)
            return {
                ...state,
                tasks: tasks.map(item => ({ ...item, desc: item._id === payload._id ? payload.desc: item.desc }))
            }
        case UPDATE_CHECK_TASK:
            return {
                ...state,
                tasks: tasks.map(item => ({ ...item, done: item._id === payload._id ? !item.done : item.done }))
            }
        case COMPLETED_ALL_TASK:
            return (() => {     
                tasks.every(items => items.done) ? tasks.map(res => res.done = !res.done) : tasks.map(res => res.done = true)              
                return {
                    ...state,
                    tasks: [...state.tasks]
                }
            })();
        case DELETE_TASK:
            return { ...state, tasks: [...state.tasks].filter(text => text._id !== action._id) }
        default:
            return state;
    }
}