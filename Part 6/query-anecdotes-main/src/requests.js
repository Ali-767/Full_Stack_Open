import axios from 'axios'
const baseUrl= 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>{
   return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const increaseVote = anecdote => {
    const object = {...anecdote, votes:anecdote.votes+1}
    return axios.put(`${baseUrl}/${anecdote.id}`,object).then(res =>res.data)
}