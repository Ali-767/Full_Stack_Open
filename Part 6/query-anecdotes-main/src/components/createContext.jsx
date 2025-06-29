import { createContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "Vis":
        return { message: action.payload, visible: true }
    case "notVis":
      return { ...state, visible: false }
    default:
        return state
  }
}


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext