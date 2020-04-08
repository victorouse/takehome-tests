import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import configureStore from './store/configureStore';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles/global.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      document.getElementById('root')
    );
  });
}
