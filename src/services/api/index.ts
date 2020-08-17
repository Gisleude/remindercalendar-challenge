import axios, { AxiosResponse } from 'axios';

async function getResponseFromAPI(
  city: string,
  date: string,
): Promise<AxiosResponse> {
  const apiKey = '5ec9c29aa2e34b59a3f04134201608';

  const response = await axios.get(
    // `pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=fae4200413ec914488121a3e90dcd3c1`,
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&dt=${date}`,
  );

  return response;
}

export default getResponseFromAPI;
