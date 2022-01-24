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

import {
    getTasks,
    updateTasks,
    updateTask,
    updateCheck,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";

export function inputLoad() {
    return async dispatch => {
        try {
            const response = await getTasks()
                dispatch({
                    type: LOAD_TASK,
                    payload: response.data
                });
        } catch (error) {
            console.log(error)
        }        
    }
}

export function taskCreate(data) {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_TASK,
                payload: data
            }); 
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterUpdate(filt){
    return async dispatch => {    
        try {
            dispatch({
                type: FILTER_TASK,
                filt
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function updateText(text, _id, done) {  
    return async dispatch => {
        try {
            await updateTask(_id, {text: text})
            dispatch({
                type: UPDATE_TEXT,
                payload: {text, _id, done}
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export function updateDate(_id, value) { 
    return async dispatch => {
        try {
            await updateTask(_id, {date: value})
        } catch (error) {
            console.log(error);
        }
    }
}
///////////////




///////////////////
export function updateDesc(_id, desc) {  
    return async dispatch => {
        try {
            await updateTask(_id, {desc: desc})
            dispatch({
                type: UPDATE_DESC,
                payload: {_id, desc}
            });
        } catch (error) {
            console.log(error);
        }
    }
}
///////////////////////
export function checkUpdate(_id, done) {
    console.log(_id, done, "checkUpdate")
    return async dispatch => {
        try {
            await updateCheck(_id, done)
            dispatch({
                type: UPDATE_CHECK_TASK,
                payload: {_id, done}
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function inputDelete(_id) {
    console.log(_id)
    return async dispatch => {
        try {
            await deleteTask(_id);
            dispatch({
                type: DELETE_TASK,
                _id
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function taskDeleteAll() {
    return async dispatch => {    
        try {
            dispatch({
                type: DELETE_TASK_ALL,
            });
            await deleteTaskAll();
        } catch (error) {
            console.log(error);
        }
    }
}

export function completedAll(done) {
    return async dispatch => {    
        try {
            dispatch({
                type: COMPLETED_ALL_TASK,
                done
            });
            if(done){
                await updateTasks({done: false});
            }
            else{
                await updateTasks({done: true})
            }
        } catch (error) {
            console.log(error);
        }
    }
}




