import { useSelector } from 'react-redux';
import { initialStateType } from '../../store/reducer';
import OfferList from '../offer-list/offer-list';

function Favorites(): JSX.Element {
  const offersOfFavorite = useSelector((state: initialStateType) => state.favoriteOffers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <OfferList offerList={offersOfFavorite} isRoom={false}/>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
