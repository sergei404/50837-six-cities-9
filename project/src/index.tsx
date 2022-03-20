import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import {offers} from './mocks/offers';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offerList={offers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
