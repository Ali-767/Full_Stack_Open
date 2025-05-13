const Header = (props) => <h1>{props.course}</h1>
const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
  <>
  <h2>Total exercises:{total}</h2>
  </>
  )
  }

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => {
  return(
    <div>
      <ul>
        {props.parts.map((part) => (
          <li key={part.id}>
            <Part part={part} />
          </li>
        ))}
      </ul>
    </div>
    )
}


const Course = (props) =>{ 
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
};
export default Course;