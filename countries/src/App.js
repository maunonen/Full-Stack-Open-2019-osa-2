import React, { useEffect, useState} from 'react';
import _ from 'lodash'
import axios from 'axios'

const App = () => {

  const [ newFilter, setNewFilter] = useState('')
  const [ countries , setCountries ] = useState([])
  const [ weather , setWeather ] = useState({})
  const [ error, setError] = useState({})
  
  const handleFilterChange = ( event ) => {
    setNewFilter(event.target.value)
  }
  const countriesToShow  = newFilter ? countries.filter( country => country.name.toLowerCase().includes( newFilter.toLowerCase())) : []

  useEffect (() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        setCountries( response.data)
        setError({})
      }).catch( error => {
        if (error.message){
              setError({ type : 'country', 
                          message : error.message})
        }
      }) 
  }, [])

  
  useEffect (() => {
    if ( countriesToShow.length === 1 ){
        const url = "http://api.weatherstack.com/current"+ 
            "?access_key=77502c35e2b7f42e8950550b9b74891b"+
            "&query=" + countriesToShow[0].capital
        axios
        .get(url)
        .then( response => {
          
          if ( response.data.success === false ){
            setError({ 
              type : 'weather', 
              message : response.data.error.info
          })
          } else if ( !_.isEmpty(response.data.request)){
            setWeather(response.data) 
            setError( {})
          }
        }).catch( error => {
            if (error.message)  {
              setError( { 
                type : 'weather', 
                message : error.message
              })
            }
        }) 
    }
    
  }, [newFilter])

  return (
    <div>
    { (!_.isEmpty(error) && ( error.type === 'country') )&& ( <h1>{ error.message}</h1> )}
      <form> 
        find countries 
        <input value={newFilter} onChange={handleFilterChange}
        />
      </form>
       { (countriesToShow.length > 1 && countriesToShow.length < 10 ) ?  
          (
            <ul>
              {countriesToShow.map((country) => {
                return (
                  <div key={country.alpha3Code.toString()}>
                      <li>{country.name} 
                          <button key = { country.alpha3Code} value={ country.name} onClick={handleFilterChange }>show</button>
                      </li>
                  </div>
                )
              }
            )} 
            </ul>
          ) : 
              (countriesToShow.length === 1) ? 
                      (
                        <div>
                            <h1>{countriesToShow[0].name}</h1>
                            <p>capital {countriesToShow[0].capital}</p>
                            
                            <p>population {countriesToShow[0].population}</p>
                              <h3>languages</h3>  
                                  <ul>
                                      {countriesToShow[0].languages.map((lang)=> {
                                          return <li key={lang.name}>{lang.name}</li>
                                      })}
                                  </ul>
                            <img src={countriesToShow[0].flag} height="80px"/>
                            { _.isEmpty(weather) ? 
                              <div>{ (!_.isEmpty(error) && ( error.type === 'weather') )&& ( <h1>{ error.message}</h1> )}</div> :
                              <div> 
                                  <h1>Weather in { weather.location.name}</h1>
                                  <p><strong>tempretaure</strong>{weather.current.temperature} Celsius</p>
                                  <img src={ weather.current.weather_icons[0]}/>
                                  <p><strong>wind: </strong>{ weather.current.wind_speed} kph direction {weather.current.wind_dir} </p>
                              </div>  
                              }
                        </div>

                      ) : 
                      (countriesToShow.length === 0) ?  
                      (<p>Nothing found</p>) :
                      (<p>Too many matches, specify another filter</p>)
      }
      
    </div>
  );
}

//<button key = { country.alpha3Code} value={ country.name} onClick={handleFilterChange }>show</button>
export default App;
