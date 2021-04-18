import debug from 'debug';
import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

debug.enable('lokki');

render(<App />, document.getElementById('root'));
