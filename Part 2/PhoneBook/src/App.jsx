import { useState } from 'react'
import PersonForm from './Components/Form'
import DisplayAll from './Components/DisplayAll'
import Filter from './Components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456',
      id: '1',
     },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  
const addPerson = (event) =>{

    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id : String(persons.length + 1),
    } 
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
}
const search=(event) => {
            const searchTerm_= event.target.value.toLowerCase()
            setSearchTerm(searchTerm_)
            const filtered = persons.filter(person => 
                person.name.toLowerCase().includes(searchTerm_)
            )
            setFilteredPersons(filtered)
        }
          
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} searchTerm={searchTerm} filteredPersons={filteredPersons}/>
      <h3>Add a new Person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleName={setNewName} newNumber={newNumber} handleNumber={setNewNumber}/>
      <DisplayAll persons={persons} />
    </div>
  )
}

export default App