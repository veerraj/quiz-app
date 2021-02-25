import { combineReducers } from 'redux'
import authReducer from './authReducer';
import quizReducer from './quizReducer';

const rootReducer = combineReducers({
    quiz:quizReducer,
    auth:authReducer
})

export default rootReducer;