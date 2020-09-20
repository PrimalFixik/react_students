import axios from "axios";

export const type = 'GROUP';
const route = 'groups';

export const GET = `GET_${type}ES`;
export const ADD = `ADD_${type}`;
export const UPDATE = `UPDATE_${type}`;
export const DELETE = `DELETE_${type}`;

export function groupGotAll(groups) {
    return { type: GET, groups };
}
export function groupAdded(groups) {
    return { type: ADD, groups };
}
export function groupUpdated(groups) {
    return { type: UPDATE, groups };
}
export function groupDeleted(groups) {
    return { type: DELETE, groups };
}

export function getGroups() {
    return dispatch => {
        return axios.get(`/${route}`)
            .then(response => dispatch(groupGotAll(response.data)))
            .catch(error => console.log(error));
    }
}
export function addGroup(group) {
    return dispatch => {
        let { id } = group;
        return axios.post(`/${route}`, { id })
            .then(response => {dispatch(groupAdded(response.data))})
            .catch(error => console.log(error));
    }
}
export function updateGroup(group) {
    return dispatch => {
        let { id, oldID} = group;
        return axios.put(`/${route}`, { id, oldID })
            .then(response => {dispatch(groupUpdated(response.data))})
            .catch(error => console.log(error));
    }
}
export function deleteGroup(group) {
    return dispatch => {
        let {id} = group;
        return axios.delete(`/${route}`, {
            data: { id: id }
        })
            .then(response => {dispatch(groupDeleted(response.data))})
            .catch(error => console.log(error));
    }
}