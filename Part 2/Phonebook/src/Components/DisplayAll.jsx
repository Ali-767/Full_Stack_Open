import DisplayOne from "./DisplayOne"


const DisplayAll = ({ persons, handleDelete }) => {
    if(persons){
    return (
        <div>
            <h2>All Contacts</h2>
                <ul>
                    {persons.map((person) => (
                    <DisplayOne key={person.id} person={person} handleDelete={handleDelete}/>
                    ))}
                </ul>
        </div>
    )
   }
   else{
         return(
              <div>
                <h2>All Contacts</h2>
                <p>No contacts available</p>
              </div>
         )
   }
}
export default DisplayAll