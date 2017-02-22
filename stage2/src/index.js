import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

require('./styles/main.scss');

import Gallery from './components/Gallery';
import store from 'config/store';
import { actions } from 'actions/stage';

//初始化store，如果不在这里调用，初始state的imgArrangeArr为[]空数组，会触发render，导致后面ref取不到Dom节点
store.dispatch(actions.initState());

render(
  <Provider store={ store }>
    <Gallery />
  </Provider>,
  document.getElementById('app')
);