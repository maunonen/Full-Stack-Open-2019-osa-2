import axios from 'axios'

const serverUrl = '/api/persons'

const getPersons = () => {
    const request = axios.get(serverUrl)
    return request.then( response => response.data)
}

const addPerson = (newPerson) => {
    const request = axios.post(serverUrl, newPerson)
    return request.then( response => response.data)
}

const updatePerson = ( id, updatedPerson ) => {
    const request = axios.put(`${serverUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}


const deletePerson = (id ) => {
    const request = axios.delete(`${serverUrl}/${id}`)
    return request.then( responce => responce.data )
}

export default {
    getPersons, addPerson, updatePerson, deletePerson
}