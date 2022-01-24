import axios from "axios";
const apiUrl = "http://localhost:8080/api/tasks";

export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(text) {
    return axios.post(apiUrl, text);
}

export function updateTask(id, body) {
    console.log(id, body, "sevices")
    return axios.put(apiUrl + "/" + id, body);
}

export function updateCheck(id, done) {  
    return axios.put(apiUrl + "/" + id, {done: done});
}

export function updateTasks(done) {
    return axios.put(apiUrl, done);
}

export function deleteTaskAll() {
    return axios.delete(apiUrl);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}

