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
import { initialStateType } from '../../store/reducer';

function App(): JSX.Element {
  const {isLoading} = useSelector((state: initialStateType) => state);
  if (!isLoading) {
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
