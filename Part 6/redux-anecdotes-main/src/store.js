import anecdoteReducer,{initializeAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/anecdoteFilter'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

import anecdoteServices from './services/anecdoteServices'

const store=configureStore({
  reducer: {
    anecdotess: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

store.dispatch(initializeAnecdotes())

export default store