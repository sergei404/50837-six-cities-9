import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import {offers} from './mocks/offers';
import {store} from './store';
import {loadFetchOffersAction} from './store/api-action';

store.dispatch(loadFetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offerList={offers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
