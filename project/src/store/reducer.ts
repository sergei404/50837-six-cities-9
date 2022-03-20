import { createReducer } from '@reduxjs/toolkit';
import { getCityAction } from './action';
import { offers, cityList } from '../mocks/offers';
import { offerType } from '../types/offerType';

export type initialStateType = {
  city: string;
  offersOfCity: offerType[];
  offersList: offerType[];
  cityList: string[]
}

const initialState: initialStateType = {
  city: 'Paris',
  offersOfCity: offers.filter((offer) => offer.city === 'Paris')
  ,
  offersList: offers,
  cityList,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCityAction, (state, action) => {
      state.city = action.payload;
      const newOfferList = state.offersList.filter((offer: { city: string; }) => offer.city === state.city);
      state.offersOfCity = newOfferList;
    });
});

export { reducer };


