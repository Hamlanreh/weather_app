'use client';
import './globals.css';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { FormEvent, useEffect, useState } from 'react'
import { useWeatherContext } from '@/context/WeatherProvider';
import ThemeToggle from './components/ThemeToggle';


export default function Home() {
  const [ searchText, setSearchText ] = useState('');
  const { weather, forecasts, getCurrentWeather, searchWeather }: any = useWeatherContext();

  const Map = dynamic(() => import("./components/Map"), { 
    ssr: false 
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchText) return;
    searchWeather(searchText);
    setSearchText('');
  };       

  useEffect(() => { 
    getCurrentWeather();
  }, [])


  return (
    <div className="min-h-screen px-8 py-4">    
      <header className="flex flex-col sm:flex-row justify-between items-center py-4 mb-4">
        <form onSubmit={handleSubmit} className="flex justify-between items-center order-2 sm:order-1">
          <input 
            type="search" 
            placeholder="Your Location..." 
            className="p-2 mr-4 shadow-sm dark:bg-white dark:text-black" 
            value={searchText} 
            onChange={e => setSearchText(e.target.value)} 
          />
          <button type="submit" className="bg-black dark:bg-gray-700 text-white text-center font-bold py-2 px-6 rounded-sm shadow-sm">Search</button>
        </form>
        <h1 className="hidden md:block font-bold text-lg uppercase order-1 sm:order-2">Weather App</h1>
        <ThemeToggle />
      </header>

      <main className="min-h-full flex flex-col md:flex-row gap-x-10">
        <section key={weather.id} className="w-full md:w-2/5 p-8">
          <div className="mb-8 text-center">
            <p className="font-bold text-xl mb-4">Location: <span>{weather.city}</span></p>
            <p className="text-md mb-10">{weather.datetime}</p>
            <div className="flex justify-center items-center gap-x-4">
              <Image src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" width="120" height="120" />
              <h3 className="font-bold text-5xl">{weather.temp} <sup>&deg;C</sup></h3>
            </div>
          </div>
          <h2 className="font-bold text-2xl text-center mb-10">{weather.description}</h2>
          <div className="flex justify-center gap-x-12 text-center">
            <div>
              <p className="text-lg mb-4">Humidity</p>
              <p className="text-lg font-bold mb-4">{weather.humidity}&#37;</p>
            </div>  
            <div>
              <p className="text-lg mb-4">Wind speed</p>
              <p className="text-lg font-bold mb-4">{weather.windSpeed} km/j</p>
            </div>  
          </div>        
        </section>

        <section className="w-full md:w-3/5">
          <div className="bg-gray-100 dark:bg-gray-700 w-full md:h-5/7 mb-8">
            <div id="map">
              <Map />
            </div>
          </div>

          <div className="w-full flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-5 md:overflow-x-scroll">
            {forecasts.length > 0 && forecasts.map((forecast: any) => (
              <div key={forecast.id} className="bg-gray-100 dark:bg-gray-700 text-center font-bold flex flex-col justify-center items-center px-12 py-6 rounded-lg">
                <h3 className="mb-2">{forecast.datetime}</h3>
                <Image className="mb-2" src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt="weather icon" width="100" height="100" />                
                <p className="font-normal mb-2">{forecast.description}</p>
                <p>{forecast.temp}&#37;</p>
                <p className="font-normal mb-2">Humidity</p>
                <p>{forecast.humidity}&#37;</p>
              </div>)
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

