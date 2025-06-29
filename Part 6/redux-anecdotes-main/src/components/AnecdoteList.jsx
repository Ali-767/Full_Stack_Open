import { incrementVotes } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotess = useSelector(state => state.anecdotess)
    const filter = useSelector(state => state.filter)

    const anecdotes = useMemo(() => {
        const filtered = anecdotess.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        return [...filtered].sort((a, b) => b.votes - a.votes)
    }, [anecdotess, filter])

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(incrementVotes(anecdote))
        dispatch(showNotification(`you voted '${anecdote.content}'`,10))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList