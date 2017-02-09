import Gallery from './components/Gallery';
import { render } from 'react-dom';
import React from 'react';
require('./styles/main.scss');

render(
  <Gallery />,
  document.getElementById('app')
)