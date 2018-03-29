// import $ from 'jquery';
import React from 'react';
import App from './app'
import { render } from 'react-dom';
import 'antd/dist/antd.css'
import 'static/css/index.scss';

// import ImgDemo from 'components/ImgDemo';
// import Index from '../app/view/index'


// render(<ImgDemo />, $('#img-demo')[0]);
render(<App/>, document.getElementById('app'))