import axios from 'axios'

const create=(newPerson)=>{
    const url="/api/persons"
    return axios.post(url,newPerson).then(
        response=> response.data
    )
}
const getAll=()=>{
    const url="/api/persons"
    return axios.get(url).
    then(
      response=> response.data
      
    )
}
const remove=(id)=>{
    const url=`/api/persons/${id}`

    return axios.delete(url).then(
        response=>response.data.id
    )
}
const update=(id,newPerson)=>{
    const url=`/api/persons/${id}`
    return axios.put(url,newPerson).then(
        response=>response.data
    )
}
export default {create,getAll,remove,update}