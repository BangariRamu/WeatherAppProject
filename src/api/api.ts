import axios from 'axios';

export const fetchCities = async (start: number, rows: number) => {
  const response = await axios.get(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&start=${start}&rows=${rows}`
  );
  return response.data.records;
};

export const fetchWeather = async (cityName: string) => {
  const API_KEY = '829b02de6cc9f98b44130e014a34774b'; // This is My API key from open weather api
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
