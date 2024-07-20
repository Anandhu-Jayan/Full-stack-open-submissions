import { useState,useEffect } from 'react'
import axios from 'axios'
import phonebookServices from './services/phonebook'
const Filter=({searchName,handleChangeSearch})=>{
  return(<>
    <div>filter shown with: <input value={searchName} onChange={handleChangeSearch}/></div>
    <h2>add new</h2>
  </>)
}
const PersonForm=({handleSubmit,newName,handleChangeName,newNumber,handleChangeNumber})=>{
  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Persons=({filteredPersons,handleDeleteFor})=>{
  return (<>{
    filteredPersons.map((person)=><div key={person.id}>
  <p style={{display: 'inline-block', marginRight: 20 }}>{person.name} {person.number}</p>
  <button   onClick={()=>{handleDeleteFor(person.id,person.name)}}>Delete</button>
  </div>
)}</>
)
}
const ErrorComponent=({message,flag})=>{
  const stylePropertiesSuccess={
    border: "5px solid green",
    backgroundColor:'lightgrey',
    color:'green',
    fontSize:20,
    textAlign:'center',
    padding: '10px',
    marginBottom: '10px',
    borderRadius:10
  }
  const stylePropertiesFail={
    ...stylePropertiesSuccess,
    color:'red',
    border: "5px solid red"
  }
  if(!message){
    return <></>
  }
  return(<div style={(flag)?stylePropertiesFail:stylePropertiesSuccess}>
    {message}
  </div>);
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber,setNewNumber]=useState('')
  const [newName, setNewName] = useState('')
  const [searchName,setSearchName]=useState('')
  const [errorMessage,setErrorMessage]=useState('')
  const [isError,setIsError]=useState(false)
  const showMessage=(message)=>{
    setErrorMessage(message)
    setTimeout(()=>{
      setErrorMessage('')
    },5000)
  }
  const handleDeleteFor=(id,name)=>{
    if(window.confirm(`Delete ${name}`)){
      phonebookServices.remove(id).then(
        (id)=>{
          setPersons(persons.filter(
            (person)=>person.id!==id
          ))
        }
      ).catch(()=>{
        setIsError(true)
        showMessage(`Information of ${name} has already been removed from server` )
        phonebookServices.getAll().then(
          (data)=>{
            setPersons(data)
          }
        )
      })
    }
  }
  const handleSubmit=(event)=>{
    event.preventDefault()
    const newPerson={
      name:newName,
      number:newNumber,
      id:(persons.length+1).toString()
    }
    // const isFound=persons.findIndex((person)=>JSON.stringify(newPerson)===JSON.stringify(person))
    const isFound=persons.find(
      (person)=>newPerson.name.toLowerCase()===person.name.toLowerCase()
    )
    if(isFound){
      if(window.confirm(`${newName} is already added to phonebook,replace old number with new number?`)){
        phonebookServices.update(isFound.id,newPerson).then(
          (data)=>{
            setPersons(persons.map(
              (person)=>person.id===data.id?data:person
            ))
            setNewName('')
            setNewNumber('')
            setIsError(false)
            showMessage(`Number Changed for ${data.name}` )
          }
        ).catch((error)=>{
          if(error.response){
            setIsError(true)
            showMessage(error.response.data.error )
          }
          else
          {
          setIsError(true)
          showMessage(`Information of ${newPerson.name} has already been removed from server` )
          phonebookServices.getAll().then(
            (data)=>{
              setPersons(data)
            }
          )
        }
        })

      }
    }
    else{
      phonebookServices.create(newPerson).then(
        (data)=>{
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setIsError(false)
          showMessage(`Added ${data.name}`)
        }
      ).catch((error)=> { 
        setIsError(true)
        showMessage(error.response.data.error)
      }
      )
    }
  }
  const handleChangeName=(event)=>{
    setNewName(event.target.value);
  }
  const handleChangeNumber=(event)=>{
    setNewNumber(event.target.value);
  }
  const handleChangeSearch=(event)=>{
    setSearchName(event.target.value)
  }
  const filteredPersons=persons.filter((person)=>person.name.toLowerCase().includes(searchName.toLowerCase()))
  useEffect(()=>{
    phonebookServices.getAll().then(
      (data)=>{
        setPersons(data)
      }
    )
  },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorComponent message={errorMessage} flag={isError}/>
      <Filter searchName={searchName} handleChangeSearch={handleChangeSearch}/>
      <PersonForm handleSubmit={handleSubmit} newName={newName} 
      handleChangeName={handleChangeName} newNumber={newNumber} 
      handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeleteFor={handleDeleteFor}/>
    </div>
  )
}

export default App