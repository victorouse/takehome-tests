import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import stores from './stores';

import './styles/main.scss';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider { ...stores }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
