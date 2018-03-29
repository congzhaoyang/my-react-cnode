// import $ from 'jquery';
import React from 'react';
import App from './app'
import { render } from 'react-dom';
import { Provider } from 'mobx-react'
import Store from '../app/store'
import 'antd/dist/antd.css'
import 'static/css/index.scss';
const store = new Store();
// import ImgDemo from 'components/ImgDemo';
// import Index from '../app/view/index'


// render(<ImgDemo />, $('#img-demo')[0]);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)