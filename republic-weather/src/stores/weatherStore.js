import { observable, action } from 'mobx';
import { weather } from '../api';

export default class WeatherStore {
  @observable isWeatherLoading = true;
  @observable isForecastLoading = true;
  @observable locationWeather = {};
  @observable locationForecast = {};

  @action setLocationWeather(weather) {
    this.locationWeather = weather;
    this.isWeatherLoading = false;
  }

  @action setLocationForecast(forecast) {
    this.locationForecast = forecast;
    this.isForecastLoading = false;
  }

  @action.bound getLocationWeather(city, country = false) {
    weather.getWeatherByLocation(city, country).then(
      action('Set location weather', (weather) => {
        this.setLocationWeather(weather);
      })
    );
  }

  @action.bound getLocationForecast(city, country = false) {
    weather.getWeatherByForecast(city, country).then(
      action('Set location forecast', (weather) => {
        this.setLocationWeather(weather);
      })
    );
  }
}
