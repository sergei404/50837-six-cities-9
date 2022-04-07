import {createAsyncThunk} from '@reduxjs/toolkit';
import browserHistory from '../browser-history';
import { AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import {store, api} from '../store';
import { AuthData } from '../types/auth-data';
import { FavoriteActionType } from '../types/favorite-action-type';
import { ReviewData } from '../types/review-data';
import { favoriteAction, favoritesAction, loadOffersAction, loginAction, offerAction, reviewAction, setError } from './action';

export const loadFetchOffersAction = createAsyncThunk(
  'loadFetchOffers',
  async () => {
    try {
      const {data} = await api.get('/hotels');
      store.dispatch(loadOffersAction(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
  async () => {
    try {
      await api.get('/login');
      store.dispatch(loginAction(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const authorizationAction = createAsyncThunk(
  'login',
  async (authData: AuthData) => {
    try {
      const {data: {token}} = await api.post('/login', {...authData});
      saveToken(token);
      store.dispatch(loginAction(AuthorizationStatus.Auth));
      browserHistory.push('/');
    } catch (error) {
      errorHandle(error);
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const offerFetchAction = createAsyncThunk(
  'offerFetch',
  async (offerId: number) => {
    try {
      const {data: dataOffer} = await api.get(`/hotels/${offerId}`);
      const {data: dataComments} = await api.get(`/comments/${offerId}`);
      const {data: dataNearby} = await api.get(`/hotels/${offerId}/nearby`);

      store.dispatch(offerAction({dataOffer, dataComments, dataNearby}));
    } catch (error) {
      errorHandle(error);
      browserHistory.push('*');
    }
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const addReviewAction = createAsyncThunk(
  'review',
  async ({offerId, reviewData}: ReviewData) => {
    try {
      const {data} = await api.post(`/comments/${offerId}`, {...reviewData});
      store.dispatch(reviewAction(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const addFavoriteAction = createAsyncThunk(
  'addFavorite',
  async ({offerId, status} : FavoriteActionType) => {
    try {
      const {data} = await api.post(`/favorite/${offerId}/${status}`);
      store.dispatch(favoriteAction(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
      browserHistory.push('/login');
    }
  },
);

export const addFavoritesAction = createAsyncThunk(
  'addFavorites',
  async () => {
    try {
      const {data} = await api.get('/favorite');
      store.dispatch(favoritesAction(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'logout',
  async () => {
    try {
      await api.delete('/logout');
      dropToken();
      store.dispatch(loginAction(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

