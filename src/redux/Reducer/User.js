import { ADD_USER } from '../ActionTypes'
const initialState = {
    addedUsers: localStorage.getItem('addedUsers') ? JSON.parse(localStorage.getItem('addedUsers')) : []
}
const users = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                addedUsers: action.payload
            }
        default:
            return state
    }
}
export default users