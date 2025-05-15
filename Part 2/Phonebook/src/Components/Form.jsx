
const PersonForm = ({addPerson,newName,handleName,newNumber,handleNumber}) => {          
    return (
        <>
        <form onSubmit={addPerson}>
            <div>
            name: <input 
                value={newName}
                onChange={(event) => handleName(event.target.value)}
                placeholder="Enter name"
                />
            </div>
            <div>
            number: <input 
                value={newNumber}
                onChange={(event) => handleNumber(event.target.value)}
                placeholder="Enter number"
            />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm