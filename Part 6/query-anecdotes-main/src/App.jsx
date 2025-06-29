import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,increaseVote } from './requests'
import NotificationContext from './components/createContext'
import { useContext } from 'react'


const App = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

   const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  
  const voteAnecdoteMutation = useMutation({
    mutationFn:increaseVote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
      setMessage(`you voted ' ${anecdote.content}'`)
    },
    onError: (error) => {
      let message = error.response?.data?.error || 'Error voting anecdote'
      setMessage(message)
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if( result.isError ){
    return(
      <div><p>anecdote service is not available due to problem in server</p></div>
    )
  }

  const anecdotes = result.data

  const setMessage = (messages) => {
    notificationDispatch({ type: "Vis",payload: messages })
    setTimeout(() => {
      notificationDispatch({ type: "notVis" })
    }, 5000)
  }

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification/>
      <AnecdoteForm setMessage={setMessage}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
