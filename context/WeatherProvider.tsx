'use client'
import React, { useState, createContext, useContext } from "react";
import { IWeather, IForecast, ICoord, IWeatherDefaultState} from "@interfaces";


const defaultState: IWeatherDefaultState = {
    positionCoord: { lat: 0, lon: 0 },
    weather: {},
    forecasts: [],
    error: false,
    getCurrentWeather: () => {},
    searchWeather: () => {},
}

const WeatherContext = createContext<IWeatherDefaultState>(defaultState);

export default function WeatherProvider({children}: {children: React.ReactNode}) {
    const [positionCoord, setPositionCoord] = useState<ICoord>({ lat: 0, lon: 0 });
    const [weather, setWeather] = useState<IWeather>({
        id: 0,
        icon: '',
        description: '',
        windSpeed: 0,
        humidity: 0,
        temp: 0,
        datetime: '',
        city: '',
    });
    const [forecasts, setForecasts] = useState<IForecast[]>([]);
    const [error, setError] = useState(false);


    const formatWeatherTime = function (dateTime: number): string {
        const time = new Date(dateTime * 1000);
        const locale = navigator.language;
        const timeFormat = new Intl.DateTimeFormat(locale, {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeFormat.format(time);
    };

    const formatForcastTime = function (dateTime: number): string {
        const time = new Date(dateTime * 1000);
        const locale = navigator.language;
        const timeFormat = new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
        });
        return timeFormat.format(time) === timeFormat.format(Date.now()) ? 'Today': timeFormat.format(time);
    };

    const getMyCoord = async () => {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const coord: ICoord = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        };     
        return coord;
    };

    const getWeather = async (coord: ICoord) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        const API_WEATHER_URL= process.env.NEXT_PUBLIC_API_WEATHER_URL;
        const res = await fetch(`${API_WEATHER_URL}?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`);
        return await res.json();
    }

    const getForecasts = async (coord: ICoord) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        const API_FORECAST_URL = process.env.NEXT_PUBLIC_API_FORECAST_URL;
        const res = await fetch(`${API_FORECAST_URL}?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`); 
        return await res.json();
    }

    const getCurrentWeather = async () => {
        try {                                
            const coord: ICoord = await getMyCoord();            
            const weather = await getWeather(coord);
            const forecasts = await getForecasts(coord);

            displayWeather(weather.coord, weather, forecasts.daily);

        } catch (err) {
            setError(true);
        }
    }

    const searchWeather = async (location: string) => {
        try {  
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            const API_WEATHER_URL= process.env.NEXT_PUBLIC_API_WEATHER_URL;
            const API_FORECAST_URL = process.env.NEXT_PUBLIC_API_FORECAST_URL;

            const weather = await (await fetch(`${API_WEATHER_URL}?q=${location}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`)).json();
            const forecasts = await (await fetch(`${API_FORECAST_URL}?q=${location}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`)).json();

            displayWeather(weather.coord, weather, forecasts.daily);
            
        } catch (err) {
            setError(true);
        }
    }

    const displayWeather = (coords: any, weather: any, forecasts: any) => {
        const region = new Intl.DisplayNames(["en"], { type: 'region' });

        setPositionCoord({ lat: coords.lat, lon: coords.lon });

        setWeather({
            id: weather.id,
            icon: weather.weather[0].icon,
            description: weather.weather[0].main,
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            temp: Math.round(weather.main.temp),
            datetime: formatWeatherTime(weather.dt),
            city: `${weather.name}, ${region.of(weather.sys.country)}`,
        });

        setForecasts(forecasts.map((forecast: any) => (
            {
                id: forecast.weather[0].id,
                icon: forecast.weather[0].icon,
                description: forecast.weather[0].main,
                temp: Math.round(forecast.temp.day),
                humidity: forecast.humidity,
                datetime: formatForcastTime(forecast.dt),
            }
        )));
    }


    return (
        <WeatherContext.Provider value={{weather, forecasts, positionCoord, error, getCurrentWeather, searchWeather}}>{children}</WeatherContext.Provider>
    )
}

export const useWeatherContext = () => useContext(WeatherContext); 