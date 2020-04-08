'use strict';

if (module.hot) {
  module.hot.accept();
}

if (process.env.NODE_ENV !== 'development') {
  require('../index.html');
}

import '../styles/index.scss';
import 'babel-polyfill';