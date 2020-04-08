import uuid from 'uuid';

import { weatherIconUrl } from './urlGenerator';

const selectWeatherFields = (weatherData) => {
  const {
    id: countryId,
    name: city,
    dt: unixTimestamp,
    main: {
      pressure,
      humidity,
      temp_min,
      temp_max
    },
    weather: [{
      main: forecast,
      icon
    }],
    sys: {
      country
    }
  } = weatherData;

  return {
    id: uuid.v4(),
    date: new Date(unixTimestamp * 1000),
    countryId,
    city,
    country,
    pressure,
    humidity,
    temp_min,
    temp_max,
    forecast,
    weatherIcon: weatherIconUrl(icon)
  };
};

const selectForecastFields = (forecastData) => {
  const {
    city: {
      id: countryId,
      name: city,
      country
    },
    list: forecasts
  } = forecastData;

  const forecastedWeather = forecasts.map((dayForecast) => {
    const { dt: unixTimestamp, weather: [{ main: forecast, icon }]} = dayForecast;
    return {
      date: new Date(unixTimestamp * 1000),
      pressure: dayForecast.pressure,
      humidity: dayForecast.humidity,
      temp_min: dayForecast.temp.min,
      temp_day: dayForecast.temp.day,
      temp_max: dayForecast.temp.max,
      forecast,
      weatherIcon: weatherIconUrl(icon)
    };
  });

  return {
    id: uuid.v4(),
    countryId,
    city,
    country,
    forecastedWeather
  };
};

export {
  selectWeatherFields,
  selectForecastFields
};
