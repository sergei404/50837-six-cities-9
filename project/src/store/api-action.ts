import {createAsyncThunk} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { saveToken } from '../services/token';
import {store, api} from '../store';
import { AuthData } from '../types/auth-data';
import { loadOffersAction, loginAction } from './action';
import browserHistory from '../browser-history';

export const loadFetchOffersAction = createAsyncThunk(
  'loadFetchOffers',
  async () => {
    const {data} = await api.get('/hotels');
    store.dispatch(loadOffersAction(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
  async () => {
    await api.get('/login');
    store.dispatch(loginAction(AuthorizationStatus.Auth));
  },
);

export const authorizationAction = createAsyncThunk(
  'login',
  async (authData: AuthData) => {
    const {data: {token}} = await api.post('/login', {...authData});
    saveToken(token);
    store.dispatch(loginAction(AuthorizationStatus.Auth));
    browserHistory.push('/');
  },
);

