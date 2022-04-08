type FavoriteButtonType = {
  isFavorite: boolean;
  getFavoriteOrNotFavorite: () => void
}

function FavoriteButton({isFavorite, getFavoriteOrNotFavorite}: FavoriteButtonType): JSX.Element {

  return (
    <button onClick={getFavoriteOrNotFavorite} className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      {isFavorite ? <span className="visually-hidden">In bookmarks</span> : <span className="visually-hidden">To bookmarks</span>}
    </button>
  );
}

export default FavoriteButton;
