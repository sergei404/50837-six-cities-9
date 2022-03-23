/* eslint-disable react/no-array-index-key */
import { useSelector, useDispatch } from 'react-redux';
import City from '../city/city';
import OfferList from '../offer-list/offer-list';
import { useState } from 'react';
import Map from '../map/map';
import {filterOffersAction, getCityAction} from '../../store/action';
import { initialStateType } from '../../store/reducer';
import SortOptions from '../sort-options/sort-options';

function Main(): JSX.Element {
  const cityName = useSelector((state: initialStateType) => state.city);
  const offersOfCity = useSelector((state: initialStateType) => state.offersOfCity);
  const cities = useSelector((state: initialStateType) => state.cityList);
  const [selectedPoint, setSelectedPoint] = useState(0);

  const onListItemHover = (listItemId: number) => {
    setSelectedPoint(listItemId);
  };


  const coordinates: number[][] = offersOfCity.map((offer) => [...offer.coordinate, offer.id]);

  const dispatch = useDispatch();

  const getCityName = (name: string) => {
    dispatch(getCityAction(name));
  };

  const getFilter = (filter: string) => {
    dispatch(filterOffersAction(filter));
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city: string, index: number) => <City key={index} getName={getCityName} name={city} isActive={city === cityName}/>)}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersOfCity.length} places to stay in {cityName}</b>
            <SortOptions getFilter={getFilter}/>
            <OfferList onListItemHover={onListItemHover} offerList={offersOfCity}/>
          </section>
          <div className="cities__right-section">
            <Map coordinates={coordinates} selectedPoint={selectedPoint}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
