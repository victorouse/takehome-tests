import {
  BASE_URL,
  WEATHER_ENDPOINT,
  FORECAST_ENDPOINT,
  IMG_BASE_URL,
  APPID,
  UNITS,
  DAYS_FORECAST
} from '../../constants/weather.js';

export const weatherIconUrl = (weatherCode) =>
  `${IMG_BASE_URL}/${weatherCode}.png`;

export const weatherByLocation = (city, country) =>
  `${BASE_URL}/${WEATHER_ENDPOINT}?q=${city}${country && ',' + country}&units=${UNITS}&APPID=${APPID}`;

export const weatherById = (cityId) =>
  `${BASE_URL}/${WEATHER_ENDPOINT}?id=${cityId}&units=${UNITS}&APPID=${APPID}`;

export const weatherByIds = (cityIds) =>
  `${BASE_URL}/${WEATHER_ENDPOINT}?id=${cityIds.join(',')}&units=${UNITS}&APPID=${APPID}`;

export const forecastByLocation = (city, country) =>
  `${BASE_URL}/${FORECAST_ENDPOINT}?q=${city}${country && ',' + country}&units=${UNITS}&cnt=${DAYS_FORECAST}&APPID=${APPID}`;

export const forecastById = (cityId) =>
  `${BASE_URL}/${FORECAST_ENDPOINT}?id=${cityId}&units=${UNITS}&cnt=${DAYS_FORECAST}&APPID=${APPID}`;

export const forecastByIds = (cityIds) =>
  `${BASE_URL}/${FORECAST_ENDPOINT}?id=${cityIds.join(',')}&units=${UNITS}&cnt=${DAYS_FORECAST}&APPID=${APPID}`;
