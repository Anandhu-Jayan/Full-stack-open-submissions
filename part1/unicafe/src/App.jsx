import { useState } from 'react'
const Button=({text,onClick})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine =({text,value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics=({good,neutral,bad,total,average,positive})=>{
  if(total!=0){
  return(
    <>
      <h1>Statistics</h1>
      <table>
      <tbody>
        <StatisticLine  text='Good' value={good}/>
        <StatisticLine  text='Neutral' value={neutral}/>
        <StatisticLine  text='Bad' value={bad}/>
        <StatisticLine  text='all' value={total}/>
        <StatisticLine  text='average' value={average}/>
        <StatisticLine  text='positive percentage' value={positive}/>
      </tbody>
      </table>
    </>
  )
  }else{
    return (<>
      <h1>Statistics</h1>
      <p>No Feedback Given</p>
    </>)

  }

}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal]=useState(0)
  const [average,setAverage]=useState(0)
  const [positive,setPositive]=useState(0)
  const handleGood=()=>{
    let updatedGood=good+1
    let updatedTotal=total+1
    setGood(good+1)
    setTotal(total+1)
    setAverage((updatedGood*1+bad*-1)/updatedTotal)
    setPositive(updatedGood*100/updatedTotal)
  }
  const handleNeutral=()=>{
    let updatedTotal=total+1
    setNeutral(neutral+1)
    setTotal(total+1)
    setAverage((good*1+bad*-1)/updatedTotal)
    setPositive(good*100/updatedTotal)
  }
  const handleBad=()=>{
    let updatedBad=bad+1
    let updatedTotal=total+1
    setBad(bad+1)
    setTotal(total+1)
    setAverage((good*1+updatedBad*-1)/updatedTotal)
    setPositive(good*100/updatedTotal)
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='Good' onClick={handleGood}/>
      <Button text='Neutral' onClick={handleNeutral}/>
      <Button text='Bad' onClick={handleBad}/>
      <Statistics good={good } neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App