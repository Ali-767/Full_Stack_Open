import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )

}
const StatisticsLine = ({ text, value }) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if(good + neutral + bad !== 0){
    return (
    <>
    <h1>Statistics</h1>
    <table>     
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='All' value={good + neutral + bad} />
        <StatisticsLine text='Average' value={(good - bad) / (good + neutral + bad)} />
        <StatisticsLine text='Positive' value={(good / (good + neutral + bad)) * 100 + ' %'} />
      </tbody>
    </table>
    </>
    )
  }
  else {
      return (
        <>
          <h1>Statistics</h1>
          <p>No feedback given</p>
        </>
      )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App