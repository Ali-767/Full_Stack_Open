import DisplayOne from "./DisplayOne"


const DisplayAll = ({ persons }) => {
    return (
        <div>
            <h2>All Contacts</h2>
                <ul>
                    {persons.map((person) => (
                    <DisplayOne key={person.id} person={person} />
                    ))}
                </ul>
        </div>
    )
}
export default DisplayAll