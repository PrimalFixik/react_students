import axios from "axios";

export const type = 'STUDENT';
const route = 'students';

export const GET = `GET_${type}S`;
export const ADD = `ADD_${type}`;
export const UPDATE = `UPDATE_${type}`;
export const DELETE = `DELETE_${type}`;

export function studentGotAll(students) {
    return { type: GET, students };
}
export function studentAdded(students) {
    return { type: ADD, students };
}
export function studentUpdated(students) {
    return { type: UPDATE, students };
}
export function studentDeleted(students) {
    return { type: DELETE, students };
}

export function getStudents(id) {
    return dispatch => {
        if(id !== undefined){
            return axios.get(`/${route}/${id.parentID}`)
                .then(response => dispatch(studentGotAll(response.data)))
                .catch(error => console.log(error));
        }
        else{
            return axios.get(`/${route}`)
                .then(response => dispatch(studentGotAll(response.data)))
                .catch(error => console.log(error));
        }
    }
}
export function addStudent(student) {
    return dispatch => {
        let { id, studentName, rating, isDebtor, age, group, parentID } = student;
        return axios.post(`/${route}`, { id, studentName, rating, isDebtor, age, group, parentID })
            .then(response => {dispatch(studentAdded(response.data))})
            .catch(error => console.log(error));
    }
}
export function updateStudent(student) {
    return dispatch => {
        let { id, studentName, rating, isDebtor, age, group, oldID, parentID } = student;
        return axios.put(`/${route}`, { id, studentName, rating, isDebtor, age, group, oldID, parentID})
            .then(response => {dispatch(studentUpdated(response.data))})
            .catch(error => console.log(error));
    }
}
export function deleteStudent(student) {
    return dispatch => {
        let {id, parentID} = student;
        return axios.delete(`/${route}`, {
            data: { id: id, parentID: parentID }
        })
            .then(response => {dispatch(studentDeleted(response.data))})
            .catch(error => console.log(error));
    }
}