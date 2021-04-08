import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MusclesProvider}   from './components/exercises/MuscleContext'

ReactDOM.render(
  <React.StrictMode>
    <MusclesProvider>
    <App />
    </MusclesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
