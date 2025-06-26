import {useState, useEffect} from 'react'
import { convertIntoGeorgianDate, renderWeatherIcon, renderWeatherInfo } from '../utils/weatherRenderers';
import { Location, WeatherData } from '../types/weather.types';
import {SupportedLocations, SupportedLanguages } from '../types/weather.types'
import { translations } from '../data/translations';
const LocationRepresentation: React.FC<{isLoaded: boolean, supportedLanguage: SupportedLanguages | null, supportedLocation: Location | null, setIsLoaded: (isLoaded: boolean) => void}> = 
({isLoaded, supportedLanguage, supportedLocation, setIsLoaded}) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);    

    useEffect(()=>{
        if (!process.env.REACT_APP_API_KEY || !supportedLocation){
            setIsLoaded(true)
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${supportedLocation.lat}&lon=${supportedLocation.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(info => {
            const uniqueDates = new Set();
            const uniqueObjects: any = [];
            info.list.forEach((element: any) => {
                const currentDate = element.dt_txt.split(' ')[0]; 

                if (!uniqueDates.has(currentDate)) {
                    uniqueDates.add(currentDate);
                    uniqueObjects.push(element);
                }
            })
            setWeatherData(uniqueObjects);
        })
        .catch(() => {
            setWeatherData([])
        })
        .finally(() => {
            setIsLoaded(true)
        })
    }, [supportedLocation, setIsLoaded])

    const 
        [currentWeather, ...futureWeather]: WeatherData[] = weatherData,
       
        currentWeatherIcon: JSX.Element | null = renderWeatherIcon(currentWeather, 100),
        currentWeatherInfo: JSX.Element | null = renderWeatherInfo(currentWeather, 
        ["temp", "feels_like", "humidity", "pressure", "windSpeed"], supportedLanguage),

        futureWeatherSection = futureWeather.map((weather) => {
            const 
                weatherIcon: JSX.Element | null = renderWeatherIcon(weather, 40),
                weatherTemperature: JSX.Element | null = renderWeatherInfo(weather, ["temp"], supportedLanguage);

            return (weatherIcon && weatherTemperature ? 
            <div className='info' key={weather.dt_txt}>
                <div><h2>{convertIntoGeorgianDate(weather.dt_txt, supportedLanguage)}</h2></div>
                <div>{weatherIcon}</div>
                <div>{weatherTemperature}</div>    
            </div>: <h2>{translations.dataCanNotbeFetched[supportedLanguage ?? 'ka']}</h2>)
        });

    return (supportedLanguage && supportedLocation) ? (
    <div className={isLoaded ? '' : 'notShown'}>
        {(currentWeatherIcon && currentWeatherInfo) ? (
        <div className='menu'>
            <div>
                <h1>{translations.locations[supportedLocation.name as SupportedLocations][supportedLanguage ?? 'ka']  }</h1>
                <div>{currentWeatherIcon}</div>
                <div>{currentWeatherInfo}</div>
            </div>
            <div>
                {futureWeatherSection}
            </div>
        </div>
        ) : (<h2>{translations.dataCanNotbeFetched[supportedLanguage ?? 'ka']}</h2>)}
    </div>) : null;
}

export {LocationRepresentation}
