import {createAction} from '@reduxjs/toolkit';

export const getCityAction = createAction<string>('getCity');
export const filterOffersAction = createAction<string>('filterOffers');
export const loadOffersAction = createAction<string>('loadOffers');
