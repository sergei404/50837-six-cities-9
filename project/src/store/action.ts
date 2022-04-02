import {createAction} from '@reduxjs/toolkit';
import { offerActionType } from '../types/offerActionType';
import { offerType } from '../types/offerType';
import { reviewsType } from '../types/reviewType';

export const getCityAction = createAction<string>('getCity');

export const filterOffersAction = createAction<string>('filterOffers');

export const loadOffersAction = createAction<[] | offerType[]>('loadOffers');

export const loginAction = createAction<string>('login');
export const offerAction = createAction('offer', ({dataOffer, dataComments, dataNearby}: offerActionType) =>  ({payload: {
  dataOffer,
  dataComments,
  dataNearby,
}}));
export const setError = createAction<string>('setError');

export const reviewAction = createAction<reviewsType>('review');
