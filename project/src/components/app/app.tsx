/* eslint-disable react/no-unused-prop-types */
import Main from '../main/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingIn from '../sing_in/sing-in';
import Favorites from '../favorites/favorites';
import Property from '../room/room';
import NotFound from '../not_found/not-found';
import PrivateRoute from '../private_route/private-route';
import Layout from '../layout/layout';
import {offerType} from '../../types/offerType';

type AppProps = {
  cityList: string[];
  offerList: offerType[]
};

function App(props: AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main {...props} />} />
          <Route path="favorites" element={
            <PrivateRoute>
              <Favorites offerList={props.offerList}/>
            </PrivateRoute>
          }
          />
          <Route path="offer" element={<Property />} >
            <Route path=":id" element={<Property />} />
          </Route>
        </Route>
        <Route path="login" element={<SingIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
