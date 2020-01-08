import React, { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import personServices from './services/persones'
import Notification from './component/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
      personServices
          .getPersons()
          .then( initailPersones => {
              setPersons( initailPersones)
          }).catch( error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // Object not found chech status code 
    
              if ( error.response.status && error.response.status === 404){
                setNotificationMessage({ 
                  type : 'error', 
                  text : `Can not get person data from server`
                  }
                )
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              } else {
                setNotificationMessage({ 
                  type : 'error', 
                  text : `Something went wrong`
                  }
                )
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              }
            } else if (error.request) {
              setNotificationMessage({ 
                type : 'error', 
                text : `Connection to server lost`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            } else {
              // Something happened in setting up the request that triggered an Error
              setNotificationMessage({ 
                type : 'error', 
                text : `Wrong request setting`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            }

          }) 
  }, []) 

  const addPerson = (event) => {
    event.preventDefault()
    
    if ( !newName || !newNumber) {
        alert('PLease enter the name of person and number')
        return
    }
    const nameExist = persons.filter( (person) => person.name === newName )
    
    
    const personObject =  {
        name : newName, 
        number : newNumber
    }
    if (nameExist.length > 0){
      const id = nameExist[0].id
      const confirmUpdate  = window.confirm(`${ newName } is already added to phonebook, replace the old number with new one`)
      
      if (confirmUpdate) {
        personServices
          .updatePerson( id, personObject)  
          .then( updatedPerson => {
            setPersons( persons.map( person => person.id !== id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage( {
              type : 'successful', 
              text  :`The phonenumber has been upated for ${newName}`
            }
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            
          }).catch( error => { 
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // Object not found chech status code 
    
              if ( error.response.status && error.response.status){
                setNotificationMessage({ 
                  type : 'error', 
                  text : `Can not update person an error has been acquried ${ error.response.status }`
                  }
                )
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              } else {
                setNotificationMessage({ 
                  type : 'error', 
                  text : `Something went wrong ${ error.response.status}`
                  }
                )
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              }
            } else if (error.request) {
              setNotificationMessage({ 
                type : 'error', 
                text : `Connection to server lost`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            } else {
              // Something happened in setting up the request that triggered an Error
              setNotificationMessage({ 
                type : 'error', 
                text : `Wrong request setting`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            }

          }) 
      } else {
          return
      }
    } else {
        personServices
          .addPerson(personObject)
          .then( addedPeson => {
            setPersons( persons.concat( addedPeson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage({ 
                type : 'successful', 
                text : `Added ${newName}`
              }
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          }).catch ( error => {
            
            // handle addPerson error 
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // Object not found chech status code 
    
              if ( error.response.status){
                if (error.response.status === 400){
                  //console.log(error.response.data.error)
                  setNotificationMessage({ 
                    type : 'error', 
                    text : `${ error.response.data.error}`
                    }
                  )
                } else {
                  setNotificationMessage({ 
                    type : 'error', 
                    text : `Something went wrong ${ error.response.status}`
                    }
                  )
                }
                
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              }
            } else if (error.request) {
              setNotificationMessage({ 
                type : 'error', 
                text : `Connection to server lost`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            } else {
              // Something happened in setting up the request that triggered an Error
              setNotificationMessage({ 
                type : 'error', 
                text : `Wrong request setting`
                }
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            }
          }) 
        }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    
    const name = event.target.name
    const confirmDelete  = window.confirm(`Delete ${ name} ?`)
    if ( !confirmDelete){
      return 
    }

    const id = event.target.value
    personServices
      .deletePerson(id)
      .then( result => {
        setPersons( persons.filter( person => person.id !== id)) 
        setNotificationMessage({
          type : 'successful', 
          text : `Person ${name} has been successfully deleted`
        }
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } ).catch( error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // Object not found chech status code 

          if ( error.response.status && error.response.status === 404){
            setNotificationMessage({ 
              type : 'error', 
              text : `Information fof ${name} has already been removed from the server`
              }
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          } else {
            setNotificationMessage({ 
              type : 'error', 
              text : `Something went wrong`
              }
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          }
        } else if (error.request) {
          setNotificationMessage({ 
            type : 'error', 
            text : `Connection to server lost`
            }
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        } else {
          // Something happened in setting up the request that triggered an Error
          setNotificationMessage({ 
            type : 'error', 
            text : `Wrong request setting`
            }
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }
      })

  }

  const handleNameChange = ( event) => {
    setNewName( event.target.value)
  }

  const handleNumberChange = ( event) => {
      setNewNumber( event.target.value)
  }

  const handleFilerChange = ( event) => {
    setNewFilter( (event.target.value).toLowerCase())
  }

  const personsToShow = newFilter ?  
        persons.filter( person => person.name
                                .toLowerCase()
                                .includes(newFilter.toLowerCase())    
        ) : persons
  

  return (
    <div>
        <h2>Phonebook</h2>
        <a href="README.md">Read me</a>
        <Notification message={ notificationMessage} />
        <Filter 
            newFilter={newFilter}
            handleFilerChange={handleFilerChange}
        />
        <h3>Add a new</h3>
        <PersonForm 
            addPerson = {addPerson} 
            newName = { newName}
            newNumber = { newNumber} 
            handleNameChange ={ handleNameChange}
            handleNumberChange={ handleNumberChange}
        />
        <h3>Numbers</h3>
        <Persons deletePerson={deletePerson} personsToShow={ personsToShow } />
    </div>
  )
}

export default App