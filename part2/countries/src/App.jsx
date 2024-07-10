import { useState ,useEffect} from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const Weather=({weatherInfo,name})=>{
  return (<div>
    <h2>Weather in {name}</h2>
    <p><b>temperature</b> {weatherInfo.main.temp-273.15} Celcius</p>
    <p><b>Description</b> {weatherInfo.weather[0].description}</p>
    <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}/>
    <p><b>Wind </b>{weatherInfo.wind.speed} m/s</p>
  </div>)
}
const DisplayDetail=({countryDetail})=>{
  const [weatherInfo,setWeatherInfo]=useState(null)
  useEffect(()=>{
    const query=`https://api.openweathermap.org/data/2.5/weather?lat=${countryDetail.capitalInfo.latlng[0]}&lon=${countryDetail.capitalInfo.latlng[1]}&appid=${api_key}`
    axios.get(query)
    .then((response)=>setWeatherInfo(response.data))
  },[])
  return(
    <div>
      <h2>{countryDetail.name.common}</h2>
      <p>Capital : {countryDetail.capital[0]}</p>
      <p>Area : {countryDetail.area}</p>
      <h3>Languages :</h3>
      <ul>{Object.keys(countryDetail.languages).map((language)=><li key={language}>{countryDetail.languages[language]}</li>)}</ul>
      <img src={countryDetail.flags.png} alt={countryDetail.flags.alt}/>
      {weatherInfo && <Weather weatherInfo={weatherInfo} name={countryDetail.capital[0]}/>}
    </div>
  );
}
const Country=({data})=>{
  const [show,setShow]=useState(false)
  const handleClick=()=>setShow(!show)
  return(
    <div key={data.name.common}>
    <p style={{display:'inline',marginRight:10}}>
    {data.name.common}
    </p>
    <button onClick={handleClick}>
      {show?'Hide':'Show'}
    </button>
    {show && <DisplayDetail countryDetail={data}/>}
  </div>
  )
}
const Display=({countryDatas})=>{

  if(countryDatas.length>10){
    return(<p>Too many matches,specify another filter</p>);
  }else if(countryDatas.length===1){
    return(<>
      <DisplayDetail countryDetail={countryDatas[0]}/>
    </>)
  }
  return (
    <div style={{marginTop:10}}>
      {countryDatas.map((data)=>
        <Country key={data.name.common} data={data}/>
      )}
    </div>
  )
}
const App=()=>{
  const [name,setName]=useState('')
  const [datas,setDatas]=useState([])
  const [filteredData, setFilteredData] = useState([]);
  const handleChange=(event)=>{
    setName(event.target.value)
  }
  useEffect(()=>{
    if(name){
      setFilteredData(datas.filter(data=>data.name.common.toLowerCase().includes(name.toLowerCase())))
    }
    else if (datas.length===0){
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response)=>{
        setDatas(response.data)
      })
    }else{
      setFilteredData([])
    }
  },[name])
  return(<div>
   find countries : <input value={name} onChange={handleChange}></input>
   <Display countryDatas={filteredData} />
  </div>)
}
export default App
