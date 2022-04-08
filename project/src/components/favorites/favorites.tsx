import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initialStateType } from '../../store/reducer';
import OfferList from '../offer-list/offer-list';

function Favorites(): JSX.Element {
  const offers = useSelector((state: initialStateType) => state.favoriteOffers.filter((offer) => offer.isFavorite));

  const cityOfFavorite = [...new Set(offers.map((item) => item.city.name))];

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          {offers.length ?
            <h1 className="favorites__title">Saved listing</h1> :
            <h1 className="favorites__title">Nothing yet saved</h1>}
          <ul className="favorites__list">
            {cityOfFavorite.map((city) => (
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={'/'}>
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <OfferList offerList={offers.filter((offer) => offer.city.name === city)} isRoom={false} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
