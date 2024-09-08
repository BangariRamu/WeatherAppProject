import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../api/api';
import { Weather } from '../types/types';
import { useParams } from 'react-router-dom';
import '../styles/WeatherPage.css';


const WeatherPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      if (cityName) {
        try {
          const data = await fetchWeather(cityName);
          setWeather(data);
        } catch (err) {
          setError('Failed to fetch weather data.');
        }
      } else {
        setError('City name is not provided.');
      }
    };
    getWeather();
  }, [cityName]);

  if (error) return <div>{error}</div>;
  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h1>{weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>{weather.weather[0].description}</p>
      <p>Min Temp: {weather.main.temp_min}°C</p>
      <p>Max Temp: {weather.main.temp_max}°C</p>
    </div>
  );
};

export default WeatherPage;
