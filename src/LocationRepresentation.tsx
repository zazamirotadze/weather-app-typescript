import React,{useState, useEffect} from 'react'
import { FaSun, FaCloud, FaCloudRain, FaSnowflake} from 'react-icons/fa';
import { BsCloudFog2, BsMoonStarsFill, BsFillCloudDrizzleFill} from 'react-icons/bs';


interface DataObject {
    data: (number | string)[];
}

interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface mainData {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface windData{
    speed: number;
    deg: number
}







const LocationRepresentation = (props:DataObject) => {
    const date = new Date();
    const currentHour = date.getHours();
    

    const [weather, setWeather] = useState<WeatherData[]>([])
    const [main, setMain] = useState<mainData[]>([])
    const [wind, setWind] = useState<windData[]>([])

    const data = props.data
    let apiKey = "5f60561b8fb957012217042709a97a33"

    
    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${apiKey}`)
        .then(response => response.json())
        .then(info => {
             setWeather(info.weather)
             setMain([info.main])
             setWind([info.wind])
             
        })
    },[apiKey, data])
    
    
  return (
    <div className='card' >
        <h1>{data[2]}</h1>

        <div>{weather.length > 0 
        ? (() => {
            switch (weather[0].main) {
                case "Clear": 
                    return  currentHour>18?<BsMoonStarsFill  size={"100px"} color={"#F69307"} />:
                    <FaSun  size={"100px"} color={"#F69307"} />;
                case "Clouds": return <FaCloud size={"100px"} color={"#3F3E51"} />;
                case "Rain": return <FaCloudRain size={"100px"} color={"#1B1B56"} />; 
                case "Snow": return <FaSnowflake size={"100px"} color={"cyan"} />;
                case "Mist": return <BsCloudFog2 size={"100px"} color={"grey"} />;
                case "Drizzle": return <BsFillCloudDrizzleFill size={"100px"} color={"grey"} />;
                default: return null;
            }
            })()
        : null}</div>

        {main.length > 0 && (
            <>
                <h2>ტემპერატურა: {(main[0].temp-273.15).toFixed(1)} გრადუსი</h2>
                <h2>ქარში მგრძნობელობა: {(main[0].feels_like-273.15).toFixed(1)} გრადუსი</h2>
                <h2>ტენიანობა: {main[0].humidity} პროცენტი</h2>
                <h2>წნევა: {main[0].pressure} მილიბარი</h2>
                <h2>ქარის სისწრაფე: {((wind[0].speed)* 3.6).toFixed(1)} კილომეტრი საათში</h2>
            </>
        )}

    </div>
  )
}

export default LocationRepresentation