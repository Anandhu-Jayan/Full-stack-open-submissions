import { useState } from 'react'

const Button=({text,onClick})=>{
  return (
    <button onClick={onClick}> 
          {text}
    </button>
  )
}
const DisplayAnecdote=({selected,votes,anecdotes})=>{
  return(
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
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
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(Array(anecdotes.length).fill(0))
  const [max,setMax]=useState(0)
  const handleClick=()=>{
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }
  const handleVote=()=>{
    let tempVotes=[...votes]
    tempVotes[selected]+=1
    setMax(tempVotes.indexOf(Math.max(...tempVotes)))
    setVotes(tempVotes)
  }
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <DisplayAnecdote selected={selected} votes={votes} anecdotes={anecdotes}/>
      <Button text='vote' onClick={handleVote}/>
      <Button text='next anecdote' onClick={handleClick}/>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote selected={max} votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App