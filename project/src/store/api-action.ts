import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../store';
import {store} from '../store';
import { loadOffersAction } from './action';

export const loadFetchOffersAction = createAsyncThunk(
  'loadFetchOffers',
  async () => {
    const {data} = await api.get('/hotels');
    store.dispatch(loadOffersAction(data));
  },
);
