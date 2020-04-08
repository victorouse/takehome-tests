import * as url from './utils/urlGenerator';
import { selectWeatherFields, selectForecastFields } from './utils/dataSelectors';
import validateResponse from './utils/responseValidator';

export function getWeatherByLocation(city, country = false) {
  return fetch(url.weatherByLocation(city, country))
    .then(res => validateResponse(res))
    .then(res => selectWeatherFields(res))
    .catch(error => ({ error: true, message: error.message }));
}

export function getWeatherById(cityId) {
  return fetch(url.weatherById(cityId))
    .then(res => validateResponse(res))
    .then(res => selectWeatherFields(res))
    .catch(error => ({ error: true, message: error.message }));
}

export function getWeatherByIds(cityIds) {
  return fetch(url.weatherByIds(cityIds))
    .then(res => validateResponse(res))
    // TODO: handle multiple results
    .then(res => selectWeatherFields(res))
    .catch(error => ({ error: true, message: error.message }));
}

export function getForecastByLocation(city, country = false) {
  return fetch(url.forecastByLocation(city, country))
    .then(res => validateResponse(res))
    .then(res => selectForecastFields(res))
    .catch(error => ({ error: true, message: error.message }));
}

export function getForecastById(cityId) {
  return fetch(url.forecastById(cityId))
    .then(res => validateResponse(res))
    .then(res => selectForecastFields(res))
    .catch(error => ({ error: true, message: error.message }));
}

export function getForecastByIds(cityIds) {
  return fetch(url.forecastByIds(cityIds))
    .then(res => validateResponse(res))
    // TODO: handle multiple results
    .then(res => selectForecastFields(res))
    .catch(error => ({ error: true, message: error.message }));
}
