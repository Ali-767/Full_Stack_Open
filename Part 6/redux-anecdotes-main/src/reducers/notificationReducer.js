import { createSlice } from "@reduxjs/toolkit"

const initialState='';

const notificationSlice=createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNotification(state,action){
            return action.payload
        },
        clearNotification() {
            return ''          
    }
    },
})

export const showNotification = (message, timeout = 5) => dispatch => {
    timeout=timeout*1000
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(clearNotification())
    }, timeout)
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer