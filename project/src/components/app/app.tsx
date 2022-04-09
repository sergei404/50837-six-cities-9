import Main from '../main/main';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing-in/sing-in';
import Favorites from '../favorites/favorites';
import Property from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Preloader from './../preloader/preloader';
import browserHistory from '../../browser-history';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { initialStateType } from '../../store/reducer';


function App(): JSX.Element {
  const {authorizationStatus, isLoading} = useSelector((state: initialStateType) => state);

  if (authorizationStatus === AuthorizationStatus.NoAuth && !isLoading) {
    return (
      <Preloader />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <Favorites/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<Property/>} />
        </Route>
        <Route path={AppRoute.Login} element={<SingIn />} />
        <Route path={AppRoute.Others} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
