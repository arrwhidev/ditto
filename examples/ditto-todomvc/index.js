import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.js';
import MyStore from './store/MyStore.js';
import * as actions from './actions/Actions.js';
import { Wrapper } from 'dittojs';
import 'todomvc-app-css/index.css'

const store = new MyStore();
const PANEL = document.getElementById('web-panel');
ReactDom.render(<Wrapper store={store} actions={actions}><App/></Wrapper>, PANEL);
