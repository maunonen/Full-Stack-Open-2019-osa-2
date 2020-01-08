import React from 'react'

const Person = ({ person, deletePerson}) => {
    
    return (
        <div>
            <li key={person.id}>{person.name} { person.number}<button value={person.id} onClick={ deletePerson} name={person.name} >delete</button></li>
        </div>
    ) 
}

export default Person