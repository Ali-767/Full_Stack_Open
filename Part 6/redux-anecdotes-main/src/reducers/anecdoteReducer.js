import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from "../services/anecdoteServices"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload)
    },
    incVote(state, action) {
      const anecdote = state.find(s => s.id === action.payload)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const { append, incVote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(append(newAnecdote))
  }
}

export const incrementVotes = anecdote => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteServices.increaseVote(anecdote)
    dispatch(incVote(modifiedAnecdote.id))
  }
}

export default anecdoteSlice.reducer