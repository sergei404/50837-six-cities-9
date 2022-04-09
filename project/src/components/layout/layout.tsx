import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { addFavoritesAction, logoutAction } from '../../store/api-action';
import { initialStateType } from '../../store/reducer';

function Layout(): JSX.Element {
  const authorizationStatus = useSelector((state: initialStateType) => state.authorizationStatus);
  const { pathname } = useLocation();
  const isShowFooter = pathname === '/favorites';
  const dispatch = useDispatch();

  function handleFavoriteOffers() {
    dispatch(addFavoritesAction());
  }

  function handleLogout() {
    dispatch(logoutAction());
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a href='#s' className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              {authorizationStatus === AuthorizationStatus.Auth ?
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span onClick={handleFavoriteOffers} className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link onClick={handleLogout} className="header__nav-link" to={''}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>:
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={'/login'} className="header__nav-link  header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>}
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
      {isShowFooter ?
        <footer className="footer container">
          <Link className="footer__logo-link" to={'/'}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer> :
        null}
    </>
  );
}

export default Layout;
