import { GET, ADD, UPDATE, DELETE } from '../actions/student'

const studentReducer = (state = [], action = {}) => {
    switch (action.type) {
        case GET:
            return action.students;
        case ADD:
            return action.students;
        case UPDATE:
            return action.students;
        case DELETE:
            return action.students;
        default:
            return state;
    }
};

export default studentReducer;