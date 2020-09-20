import { GET, ADD, UPDATE, DELETE } from '../actions/groups'

const studentReducer = (state = [], action = {}) => {
    switch (action.type) {
        case GET:
            return action.groups;
        case ADD:
            return action.groups;
        case UPDATE:
            return action.groups;
        case DELETE:
            return action.groups;
        default:
            return state;
    }
};

export default studentReducer;