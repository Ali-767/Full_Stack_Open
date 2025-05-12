import { useState } from 'react'


const Favorite = ({anecdote, votes}) => {
  const maxVotes = Math.max(...votes);
  if (maxVotes !== 0 ) {
    const selectedAnecdote = anecdote[votes.indexOf(Math.max(...votes))]
    return (
      <div>
      <h1>Anecdote with most votes is:</h1>
      <p>{selectedAnecdote}</p>
    </div>
    )
  }
  return (
    <>
    <p>No votes yet.</p>
    </>  
  )
}
const Button = ({ setvotes, text, vote, select }) => {
    const click = () => {
    const copy =[...vote]
    copy[select] += 1
    setvotes(copy)
  }
  return (
    <>
     <p>Has {vote[select]} votes !</p>
    <button onClick={click}>
      {text}
    </button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const randomNumber= (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const [votes,setVotes]= useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Anecdote:</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(randomNumber(0, anecdotes.length - 1))}>
        Next anecdote
      </button>
      <Button setvotes={setVotes} text='vote' vote={votes} select={selected} />
      <Favorite anecdote={anecdotes} votes={votes} />
    </div>
  )
}

export default App