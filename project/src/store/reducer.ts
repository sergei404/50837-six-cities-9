import { createReducer } from '@reduxjs/toolkit';
import { filterOffersAction, getCityAction, loadOffersAction } from './action';
//import { offers, cityList } from '../mocks/offers';
import { offerType, FilterOffers } from '../types/offerType';

export type initialStateType = {
  city: string;
  offersOfCity: offerType[];
  // offersList: offerType[];
  // cityList: string[];
  isLoading: boolean;
  dataOffers: offerType[]
}

const initialState: initialStateType = {
  city: 'Paris',
  offersOfCity: [],
  // offersList: offers,
  // cityList,
  isLoading: false,
  dataOffers: [],
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
    .addCase(loadOffersAction, (state, {payload}: PayloadAction<[] | offerType[]>): void => {
      state.dataOffers = payload;
      const newOfferList = state.dataOffers.filter((offer: { city: {name: string}}) => offer.city.name === state.city);
      state.offersOfCity = newOfferList;
      state.isLoading = true;
    });
});

export { reducer };
