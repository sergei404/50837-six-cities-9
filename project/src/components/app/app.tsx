/* eslint-disable react/no-unused-prop-types */
import Main from '../main/main';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing-in/sing-in';
import Favorites from '../favorites/favorites';
import Property from '../room/room';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { offerType } from '../../types/offerType';
import Preloader from './../preloader/preloader';
import { useSelector } from 'react-redux';
import { initialStateType } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';
import browserHistory from '../../browser-history';

type AppProps = {
  offerList: offerType[]
};

function App(props: AppProps): JSX.Element {
//function App(): JSX.Element {
  const {authorizationStatus, isLoading} = useSelector((state: initialStateType) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown &&!isLoading) {
    return (
      <Preloader/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main/>} />
          <Route path="favorites" element={
            <PrivateRoute>
              <Favorites/>
            </PrivateRoute>
          }
          />
          <Route path="offer/:id" element={<Property/>} />
        </Route>
        <Route path="login" element={<SingIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
