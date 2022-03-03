import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';

const cityList: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

ReactDOM.render(
  <React.StrictMode>
    <App offerList={offers} cityList={cityList}/>
  </React.StrictMode>,
  document.getElementById('root'));
