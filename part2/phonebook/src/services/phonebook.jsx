import axios from 'axios'

const create=(newPerson)=>{
    const url="http://localhost:3001/api/persons"
    return axios.post(url,newPerson).then(
        response=> response.data
    )
}
const getAll=()=>{
    const url="http://localhost:3001/api/persons"
    return axios.get(url).
    then(
      response=> response.data
      
    )
}
const remove=(id)=>{
    const url=`http://localhost:3001/api/persons/${id}`

    return axios.delete(url).then(
        response=>response.data.id
    )
}
const update=(id,newPerson)=>{
    const url=`http://localhost:3001/api/persons/${id}`
    return axios.put(url,newPerson).then(
        response=>response.data
    )
}
export default {create,getAll,remove,update}