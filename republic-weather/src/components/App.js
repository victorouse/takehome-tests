import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer(['weatherStore', 'viewStore'])
export default class App extends Component {
  constructor(props) {
    super(props);
    this.weatherStore = this.props.weatherStore;
  }

  componentDidMount() {
    this.weatherStore.getLocationWeather('Brisbane');
  }

  render() {
    return (
      <div>
        <h1>Hello Republic</h1>
        {
          this.weatherStore.isWeatherLoading ?
          'Loading...' :
          JSON.stringify(this.weatherStore.locationWeather)
        }
        <DevTools />
      </div>
    );
  }
}
