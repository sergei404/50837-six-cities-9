import {createAction} from '@reduxjs/toolkit';
import { offerType } from '../types/offerType';

export const getCityAction = createAction<string>('getCity');
export const filterOffersAction = createAction<string>('filterOffers');
export const loadOffersAction = createAction<[] | offerType[]>('loadOffers');
