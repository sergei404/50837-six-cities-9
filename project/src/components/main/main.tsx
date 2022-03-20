/* eslint-disable react/no-array-index-key */
import { useSelector, useDispatch } from 'react-redux';
import City from '../city/city';
import OfferList from '../offer-list/offer-list';
import { useState } from 'react';
import Map from '../map/map';
import {getCityAction} from '../../store/action';
import { initialStateType } from '../../store/reducer';

// type MainProps = {
//   offerList: offerType[]
// };

//function Main({offerList}: MainProps): JSX.Element {
function Main(): JSX.Element {

  const offersOfCity = useSelector((state: initialStateType) => state.offersOfCity);
  const cities = useSelector((state: initialStateType) => state.cityList);

  const coordinates = offersOfCity.map((offer) => offer.coordinate);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offerActive, setOfferActive] = useState<number | null>(null);
  const [activeCity, setCityActive] = useState<number>(0);

  const dispatch = useDispatch();

  const getCityName = (name: string) => {
    dispatch(getCityAction(name));
  };

  const getActive = (index: number) => {
    setCityActive(index);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city: string, index: number) => <City key={index} getName={getCityName} name={city} index={index} getActive={getActive} isActive={index === activeCity}/>)}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersOfCity.length} places to stay in {cities[activeCity]}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <OfferList setOfferActive={setOfferActive} offerList={offersOfCity}/>
          </section>
          <div className="cities__right-section">
            <Map coordinates={coordinates}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
