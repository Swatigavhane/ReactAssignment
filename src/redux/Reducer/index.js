import { combineReducers } from 'redux'
import users from './User'
import { routerReducer } from 'react-router-redux';
export default combineReducers({
    users,
    router: routerReducer
})