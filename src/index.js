import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import MarvelService from './services/MarvelService';

// import Test from './test';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
    // <Test/>
  /* </React.StrictMode> */
);

