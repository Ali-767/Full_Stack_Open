import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AnecdoteForm = (props) => {

  const queryClient=useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      props.setMessage(`A new anecdote '${anecdote.content}' created!`)
    },
    onError: (error) => {
      let message = error.response?.data?.error || 'Error creating anecdote'
      props.setMessage(message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content,votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
