import { useContext } from 'react'
import NotificationContext from "./createContext"

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification.visible ? '' : 'none',
  }
  
  


  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
