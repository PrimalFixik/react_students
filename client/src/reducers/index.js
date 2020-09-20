import {combineReducers} from 'redux';
import studentReducer from './student';
import groupReducer from './group';

export default combineReducers({
    students: studentReducer,
    groups: groupReducer
})