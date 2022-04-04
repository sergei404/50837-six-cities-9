import { createReducer } from '@reduxjs/toolkit';
import { filterOffersAction, getCityAction, loadOffersAction, loginAction, offerAction, reviewAction, setError } from './action';
import { AuthorizationStatus } from './../const';
import { offerType, FilterOffers } from '../types/offerType';
import { reviewsType } from '../types/reviewType';

export type initialStateType = {
  city: string;
  offersOfCity: offerType[];
  cityList: string[];
  isLoading: boolean;
  dataOffers: offerType[];
  authorizationStatus: string;
  offer: offerType | null;
  comments: reviewsType[];
  nearby: offerType[];
  error: string;
  favoriteOffers: offerType[];
}

const initialState: initialStateType = {
  city: 'Paris',
  offersOfCity: [],
  cityList: [],
  isLoading: false,
  dataOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  offer: null,
  comments: [],
  nearby: [],
  error: '',
  favoriteOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCityAction, (state, action) => {
      state.city = action.payload;
      const newOfferList = state.dataOffers.filter((offer: { city: {name: string}}) => offer.city.name === state.city);
      state.offersOfCity = newOfferList;
    })
    .addCase(filterOffersAction, (state, action) => {
      const filterOffers: FilterOffers = {
        'Price: low to high': (prev: offerType, next: offerType) => prev.price - next.price,
        'Price: high to low': (prev: offerType, next: offerType): number => next.price - prev.price,
        'Top rated first': (prev: offerType, next: offerType) => next.rating - prev.rating,
      };
      if (action.payload === 'Popular') {
        state.offersOfCity = state.dataOffers.filter((offer: { city: {name: string}}) => offer.city.name === state.city);
      }
      state.offersOfCity = state.offersOfCity.sort(filterOffers[action.payload]);
    })
    .addCase(loadOffersAction, (state, {payload}): void => {
      state.dataOffers = payload;
      const newOfferList = state.dataOffers.filter((offer: { city: {name: string}}) => offer.city.name === state.city);
      state.offersOfCity = newOfferList;
      state.cityList = [...new Set(state.dataOffers.map((offer) => offer.city.name))];
      state.isLoading = true;
    })
    .addCase(loginAction, (state, action) => {
      state.authorizationStatus = action.payload;
      if (state.authorizationStatus === AuthorizationStatus.Auth) {
        state.favoriteOffers = state.dataOffers.filter((item) => item.isFavorite);
      }
    })
    .addCase(offerAction, (state, {payload}): void => {
      state.offer = payload.dataOffer;
      state.comments = payload.dataComments;
      state.nearby = payload.dataNearby;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(reviewAction, (state, action) => {
      state.comments.push(action.payload);
    });
});

export { reducer };
