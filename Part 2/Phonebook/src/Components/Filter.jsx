import DisplayOne from "./DisplayOne"

const Filter = ({search, searchTerm,filteredPersons}) => { 
    
    const show =() =>{
        if (searchTerm) {
            return(
            <>
                {filteredPersons.map((person) => (
                <DisplayOne key={person.id} person={person} />
            ))}
            </> 
            )
        }
        else{
            return(
                <>
                    <p>Search using Name...</p>
                </>
            )
        }
    }
     
    return(
        <div>
            filter shown with <input
            placeholder="Search"
            value={searchTerm}
            onChange={search}
            />
            {show()} 
       </div>
    )
}

export default Filter
