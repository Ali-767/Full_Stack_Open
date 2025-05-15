import { useState,useEffect, use } from 'react'
import PersonForm from './Components/Form'
import DisplayAll from './Components/DisplayAll'
import Filter from './Components/Filter'
import personServices from './services/personsCom'
import Notification from './Components/notificationAdded'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() =>{
    personServices
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const msgSetter = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
   
  const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            personServices
            .erase(id)
                .then(() => {
                    console.log("Contact deleted successfully");
                    setPersons(persons.filter(person => person.id !== id));
                    
                })
                .catch((error) => {
                    console.error("Error deleting contact:", error);
                    msgSetter(`Failed to delete ${deletedPerson.Name}`)
                });
        }
    };

const addPerson = (event) =>{

    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    } 
    if (persons.some(person => person.name === newName )) {
        const existingPerson = persons.find(person => person.name === newName);
        if(existingPerson.number !== newNumber){
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personServices
                .update(nameObject,existingPerson.id)
                .then(() =>{
                  setPersons(persons.map(person => person.id === existingPerson.id ? { ...person, number: newNumber } : person))
                  msgSetter(`Updated ${newName}`)  
                })
                .catch(error => {
                  console.error('Failed to add person:', error)
                  msgSetter(`${newName} was already deleted from server`)
                })
            }
        }
        else{
        msgSetter(`${newName} is already added to phonebook with this number`)}
    }
     else {
        personServices
        .add(nameObject)
        .then(response =>{
          console.log('Added:', response)
          setPersons(persons.concat(response))
          msgSetter(`Added ${newName}`)
          })
        .catch(error => {
          console.error('Failed to add person:', error)
          msgSetter(`Failed to add ${newName}`)
        })
          
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
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter search={search} searchTerm={searchTerm} filteredPersons={filteredPersons}/>
      <h3>Add a new Person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleName={setNewName} newNumber={newNumber} handleNumber={setNewNumber}/>
      <DisplayAll persons={persons}  handleDelete={handleDelete} />
    </div>
  )
}

export default App