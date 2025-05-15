const DisplayOne = ({person,handleDelete }) => {

    return(
        <>
        <li>{person.name} {person.number}</li> <button onClick={() => handleDelete(person.id)}> Delete </button>
        </>
    )

}
export default DisplayOne