import { createReducer } from '@reduxjs/toolkit';
import { filterOffersAction, getCityAction } from './action';
import { offers, cityList } from '../mocks/offers';
import { offerType } from '../types/offerType';

export type initialStateType = {
  city: string;
  offersOfCity: offerType[];
  offersList: offerType[];
  cityList: string[];
  //filter: string;
}

const initialState: initialStateType = {
  city: 'Paris',
  offersOfCity: offers.filter((offer) => offer.city === 'Paris')
  ,
  offersList: offers,
  cityList,
  //filter: 'Pooular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCityAction, (state, action) => {
      state.city = action.payload;
      const newOfferList = state.offersList.filter((offer: { city: string; }) => offer.city === state.city);
      state.offersOfCity = newOfferList;
    })
    .addCase(filterOffersAction, (state, action) => {
      const filterOffers = {
        'Price: low to high': (prev: offerType, next: offerType) => prev.price - next.price,
        'Price: high to low': (prev: offerType, next: offerType): number => next.price - prev.price,
        'Top rated first': (prev: offerType, next: offerType) => next.rating - prev.rating,
      };
      if (action.payload === 'Popular') {
        state.offersOfCity = state.offersList.filter((offer: { city: string; }) => offer.city === state.city);
      }
      state.offersOfCity = state.offersOfCity.sort(filterOffers[action.payload]);
    });
});

export { reducer };
