import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

require('./styles/main.scss');

import Gallery from './components/Gallery';
import store from 'config/store';

render(
  <Provider store={ store }>
    <Gallery />
  </Provider>,
  document.getElementById('app')
);