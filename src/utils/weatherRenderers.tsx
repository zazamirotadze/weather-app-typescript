import { FaSun, FaCloud, FaCloudRain, FaSnowflake} from 'react-icons/fa';
import { BsCloudFog2, BsMoonStarsFill, BsFillCloudDrizzleFill, BsCloudFogFill} from 'react-icons/bs';
import { SupportedLanguages, WeatherData } from '../types/weather.types';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { translations } from '../data/translations';

const renderWeatherIcon = (weatherData: WeatherData, sizeInPx: number): JSX.Element | null => {
    if (!weatherData || !weatherData.weather.length || sizeInPx <= 0){
        return null;
    }

    const 
        currentHour = new Date().getHours(),
        iconSize = `${sizeInPx}px`;

    switch (weatherData.weather[0].main) {
        case "Clear": return  (currentHour>=0 && currentHour <7) || currentHour> 18? 
            <BsMoonStarsFill  size={iconSize} color={"#F69307"} />:
            <FaSun  size={iconSize} color={"#F69307"} />;

        case "Clouds": return <FaCloud size={iconSize} color={"#3F3E51"} />;

        case "Rain": return <FaCloudRain size={iconSize} color={"#1B1B56"} />; 

        case "Snow": return <FaSnowflake size={iconSize} color={"cyan"} />;

        case "Mist": return <BsCloudFog2 size={iconSize} color={"grey"} />;

        case "Drizzle": return <BsFillCloudDrizzleFill size={iconSize} color={"grey"} />;

        case "Fog": return <BsCloudFogFill size={iconSize} color={"grey"} />;

        default: return <FaSun  size={iconSize} color={"#F69307"} />;
    }
};

const renderWeatherInfo = (weatherData: WeatherData, infos: string[], supportedLanguage: SupportedLanguages | null): JSX.Element | null => {
    if (!weatherData || !weatherData.weather.length || !infos.length){
        return null;
    }

    const 
        infosMap: Record<string, JSX.Element> = {
            temp: <h2>{translations.temp[supportedLanguage ?? 'ka'].replace('{value}',weatherData.main.temp.toFixed(1))}</h2>,
            feels_like:<h2>{translations.feelsLike[supportedLanguage ?? 'ka'].replace('{value}',weatherData.main.feels_like.toFixed(1).toString())}</h2>,
            humidity: <h2>{translations.humidity[supportedLanguage ?? 'ka'].replace('{value}',weatherData.main.humidity.toString())}</h2>,
            pressure: <h2>{translations.pressure[supportedLanguage ?? 'ka'].replace('{value}',(weatherData.main.pressure / 10).toFixed(1).toString())}</h2>,
            windSpeed: <h2>{translations.windSpeed[supportedLanguage ?? 'ka'].replace('{value}',(weatherData.wind.speed * 3.6).toFixed(1).toString())}</h2>
        },

        selectedInfos = infos.map(info => <React.Fragment key={info}>{infosMap[info]}</React.Fragment>);

    return <>{selectedInfos}</>;
};

const convertIntoGeorgianDate = (date: string, supportedLanguage: SupportedLanguages | null): string => {
    const isoDate = date.replace(" ", "T")
    
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(isoDate)){
        return date
    }

    const
        formattedDate = new Date(isoDate).toLocaleString("en-US", {
            weekday: "long", 
            month: "long",  
            day: "numeric"
        }),

        engWeekday = formattedDate.split(',')[0],
        engMonth = formattedDate.split(' ')[1],
        translatedWeekday = translations.dates.weekdays[engWeekday as keyof typeof translations.dates.weekdays][supportedLanguage ?? 'ka'],
        translatedMonth = translations.dates.months[engMonth as keyof typeof translations.dates.months][supportedLanguage ?? 'ka']

    return formattedDate.replace(engWeekday, translatedWeekday).replace(engMonth, translatedMonth);
}


const useUpdateSearchParam = () => {
    const 
        [searchParams, setSearchParams] = useSearchParams(),

        updateParam = (param: string, value: string) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(param, value);
            setSearchParams(newParams);
        };

  return updateParam;
}

export {renderWeatherIcon, renderWeatherInfo, convertIntoGeorgianDate, useUpdateSearchParam};