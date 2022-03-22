import { createReducer } from '@reduxjs/toolkit';
import { filterOffersAction, getCityAction } from './action';
import { offers, cityList } from '../mocks/offers';
import { offerType } from '../types/offerType';

export type initialStateType = {
  city: string;
  offersOfCity: offerType[];
  offersList: offerType[];
  cityList: string[];
  filter: string;
}

const initialState: initialStateType = {
  city: 'Paris',
  offersOfCity: offers.filter((offer) => offer.city === 'Paris')
  ,
  offersList: offers,
  cityList,
  filter: 'Pooular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCityAction, (state, action) => {
      state.city = action.payload;
      const newOfferList = state.offersList.filter((offer: { city: string; }) => offer.city === state.city);
      state.offersOfCity = newOfferList;
    })
    .addCase(filterOffersAction, (state, action) => {
      state.filter = action.payload;
      const filterOffers = {
        'Popular': state.offersOfCity,
        'Price: low to high': state.offersOfCity.sort((prev, next) => prev.price - next.price),
        'Price: high to low': state.offersOfCity.sort((prev, next) => next.price - prev.price),
        'Top rated first': state.offersOfCity.sort((prev, next) => next.rating - prev.rating),
      };
      // eslint-disable-next-line no-console
      console.log(filterOffers[action.payload]);

      state.offersOfCity = filterOffers[action.payload];
    });
});

export { reducer };


