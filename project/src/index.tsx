import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


const cityList: Array<string> = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];


ReactDOM.render(
  <React.StrictMode>
    <App cityList={cityList}/>
  </React.StrictMode>,
  document.getElementById('root'));
