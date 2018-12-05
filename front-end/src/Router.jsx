import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, hashHistory, Link } from 'react-router';
import { LocaleProvider, message } from 'antd';
import Routes from './Routers.jsx';
import * as stores from './stores/index';
render((
  <Provider {...stores}>
        <Router history={hashHistory}>
          {Routes}
        </Router>
  </Provider>
  ), document.getElementById('layout'))