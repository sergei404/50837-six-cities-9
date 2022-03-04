/* eslint-disable react/no-array-index-key */
import City from '../city/city';
import OfferList from '../offer-list/offer-list';
import {offerType} from '../../types/offerType';
import { useState } from 'react';

type MainProps = {
  cityList: string[];
  offerList: offerType[]
};

function Main({cityList, offerList}: MainProps): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offerActive, setOfferActive] = useState<number | null>(null);

  const setId = (id: number) => {
    setOfferActive(id);
  };

  const setNull = () => {
    setOfferActive(null);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityList.map((city: string, index: number) => <City key={index} name={city} isActive={index === 0}/>)}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
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
            <OfferList setNull={setNull} setId={setId} offerList={offerList}/>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
